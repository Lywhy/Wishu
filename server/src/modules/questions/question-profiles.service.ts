import { createHash, randomBytes } from "node:crypto"
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import type { Request, Response } from "express"
import { DatabaseService } from "../../database/database.service"
import { QuestionImportDto, QuestionProgressDto } from "./questions.dto"

interface ProfileRow {
  id: string
  requiresImport: boolean
}
interface ProgressRow {
  questionId: string
  status: "repeat" | "learned" | "skipped" | null
  saved: boolean
}
const cookieName = "wishu_questions"
const durationMs = 180 * 24 * 60 * 60 * 1000

@Injectable()
export class QuestionProfilesService {
  constructor(
    private readonly database: DatabaseService,
    private readonly config: ConfigService,
  ) {}

  assertOrigin(request: Request) {
    const origin = request.headers.origin
    if (origin && origin !== this.config.getOrThrow<string>("CORS_ORIGIN"))
      throw new ForbiddenException("Недопустимый источник запроса")
  }

  private tokenHash(request: Request): string | null {
    const cookie = request.headers.cookie
      ?.split(";")
      .map((part) => part.trim())
      .find((part) => part.startsWith(`${cookieName}=`))
    const token = cookie?.slice(cookieName.length + 1)
    if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) return null
    return createHash("sha256").update(token).digest("hex")
  }

  private async existing(request: Request) {
    const hash = this.tokenHash(request)
    if (!hash) return undefined
    const result = await this.database.query<ProfileRow>(
      'SELECT id, imported_at IS NULL AS "requiresImport" FROM question_profiles WHERE token_hash = $1 AND expires_at > now()',
      [hash],
    )
    return result.rows[0]
  }

  async requireProfile(request: Request): Promise<ProfileRow> {
    const profile = await this.existing(request)
    if (!profile) throw new UnauthorizedException("Сессия истекла. Обновите страницу.")
    return profile
  }

  async session(request: Request, response: Response) {
    this.assertOrigin(request)
    let profile = await this.existing(request)
    if (!profile) {
      const token = randomBytes(32).toString("base64url")
      const hash = createHash("sha256").update(token).digest("hex")
      const created = await this.database.query<ProfileRow>(
        'INSERT INTO question_profiles (token_hash, expires_at) VALUES ($1, $2) RETURNING id, true AS "requiresImport"',
        [hash, new Date(Date.now() + durationMs)],
      )
      profile = created.rows[0]
      if (!profile) throw new Error("Could not create anonymous question profile")
      response.cookie(cookieName, token, {
        httpOnly: true,
        sameSite: "lax",
        secure: this.config.getOrThrow<boolean>("COOKIE_SECURE"),
        path: "/api/questions",
        maxAge: durationMs,
      })
    }
    return { requiresImport: profile.requiresImport, progress: await this.progress(profile.id) }
  }

  async progress(profileId: string) {
    const result = await this.database.query<ProgressRow>(
      'SELECT question_id AS "questionId", status, saved FROM question_progress WHERE profile_id = $1 ORDER BY question_id',
      [profileId],
    )
    const settings = await this.database.query<{ autoRevealAnswers: boolean }>(
      'SELECT auto_reveal_answers AS "autoRevealAnswers" FROM question_profiles WHERE id = $1',
      [profileId],
    )
    const questionStatuses: Record<string, "repeat" | "learned" | "skipped"> = {}
    const savedQuestionIds: string[] = []
    for (const row of result.rows) {
      if (row.status) questionStatuses[row.questionId] = row.status
      if (row.saved) savedQuestionIds.push(row.questionId)
    }
    return {
      questionStatuses,
      savedQuestionIds,
      autoRevealAnswers: settings.rows[0]?.autoRevealAnswers ?? false,
    }
  }

  async patchProgress(profileId: string, questionId: string, body: QuestionProgressDto) {
    const hasStatus = body.status !== undefined
    const hasSaved = body.saved !== undefined
    if (!hasStatus && !hasSaved) throw new BadRequestException("Укажите status или saved")
    const result = await this.database.query<ProgressRow>(
      `INSERT INTO question_progress (profile_id, question_id, status, saved)
      SELECT $1, id, $3, $4 FROM questions WHERE id = $2
      ON CONFLICT (profile_id, question_id) DO UPDATE SET
        status = CASE WHEN $5::boolean THEN EXCLUDED.status ELSE question_progress.status END,
        saved = CASE WHEN $6::boolean THEN EXCLUDED.saved ELSE question_progress.saved END,
        updated_at = now()
      RETURNING question_id AS "questionId", status, saved`,
      [profileId, questionId, body.status ?? null, body.saved ?? false, hasStatus, hasSaved],
    )
    if (!result.rows[0]) throw new NotFoundException("Вопрос не найден")
    return result.rows[0]
  }

  async settings(profileId: string, autoRevealAnswers: boolean) {
    await this.database.query(
      "UPDATE question_profiles SET auto_reveal_answers = $2 WHERE id = $1",
      [profileId, autoRevealAnswers],
    )
    return { autoRevealAnswers }
  }

  async importProgress(profileId: string, body: QuestionImportDto) {
    await this.database.transaction(async (client) => {
      const profile = await client.query<{ imported_at: Date | null }>(
        "SELECT imported_at FROM question_profiles WHERE id = $1 FOR UPDATE",
        [profileId],
      )
      if (!profile.rows[0] || profile.rows[0].imported_at) return
      for (const entry of body.entries) {
        await client.query(
          "INSERT INTO question_progress (profile_id, question_id, status, saved) SELECT $1, id, $3, $4 FROM questions WHERE id = $2 ON CONFLICT (profile_id, question_id) DO NOTHING",
          [profileId, entry.questionId, entry.status ?? null, entry.saved ?? false],
        )
      }
      await client.query(
        "UPDATE question_profiles SET auto_reveal_answers = $2, imported_at = now() WHERE id = $1",
        [profileId, body.autoRevealAnswers],
      )
    })
    return this.progress(profileId)
  }
}
