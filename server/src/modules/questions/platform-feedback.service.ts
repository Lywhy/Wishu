import { createHash } from "node:crypto"
import { BadRequestException, ConflictException, Injectable } from "@nestjs/common"
import { DatabaseService } from "../../database/database.service"
import { CreatePlatformFeedbackDto } from "./platform-feedback.dto"

interface SavedFeedbackRow {
  id: string
  profileId: string | null
  requestHash: string
  payload: Record<string, unknown>
  createdAt: string
}

@Injectable()
export class PlatformFeedbackService {
  constructor(private readonly database: DatabaseService) {}

  async create(profileId: string, input: CreatePlatformFeedbackDto) {
    if (input.path && (!input.path.startsWith("/") || /[?#\s]/.test(input.path)))
      throw new BadRequestException("Укажите путь страницы без параметров и личных данных")
    const content = input.kind === "suggestion" && input.mode === "content"
    if (input.kind === "suggestion" && input.page === "other")
      throw new BadRequestException("Выберите страницу для предложения")
    if (content && (input.page === "interviews" || !input.items.length))
      throw new BadRequestException("Выберите хотя бы один раздел для материалов")
    if (
      !content &&
      (input.items.length || input.mode !== "improvement" || input.details.length < 10)
    )
      throw new BadRequestException("Опишите проблему или улучшение: не менее 10 символов")

    // Hash the accepted input, not mutable catalog titles, to make retries stable across catalog updates.
    const requestHash = createHash("sha256").update(JSON.stringify(input)).digest("hex")
    const previous = await this.database.query<SavedFeedbackRow>(
      'SELECT id, profile_id AS "profileId", request_hash AS "requestHash", payload, created_at::text AS "createdAt" FROM platform_feedback WHERE id=$1',
      [input.id],
    )
    if (previous.rows[0]) return this.receipt(previous.rows[0], profileId, requestHash)

    const items: Record<string, unknown>[] = []
    const targets = new Set<string>()
    if (content) {
      const [groups, sections, subs] = await Promise.all([
        this.database.query<{ id: string; title: string }>("SELECT id, title FROM question_groups"),
        this.database.query<{ id: string; title: string; groupId: string }>(
          'SELECT id, title, group_id AS "groupId" FROM question_sections',
        ),
        this.database.query<{ id: string; title: string; sectionId: string }>(
          'SELECT id, title, section_id AS "sectionId" FROM question_subsections',
        ),
      ])
      for (const item of input.items) {
        const group = groups.rows.find((g) => g.id === item.groupId)
        const section = sections.rows.find(
          (s) => s.id === item.sectionId && s.groupId === item.groupId,
        )
        const newSection = item.sectionId === "__new"
        const newSubsection = item.subsectionId === "__new"
        const anySubsection = item.subsectionId === "__any"
        const sub = subs.rows.find(
          (s) => s.id === item.subsectionId && s.sectionId === item.sectionId,
        )
        const sectionTitle = newSection ? item.sectionTitle.trim() : section?.title
        const subsectionTitle = newSubsection
          ? item.subsectionTitle.trim()
          : anySubsection
            ? "На усмотрение автора"
            : sub?.title
        if (
          !group ||
          !sectionTitle ||
          (!newSection && !section) ||
          !subsectionTitle ||
          (newSection && !newSubsection && !anySubsection)
        )
          throw new BadRequestException(
            "Проверьте группу, раздел и подраздел. Возможно, каталог обновился.",
          )
        const topics = [
          ...new Map(item.topics.map((t) => [t.trim().toLocaleLowerCase("ru"), t.trim()])).values(),
        ]
        if (topics.some((t) => !t)) throw new BadRequestException("Темы не должны быть пустыми")
        const target = JSON.stringify([
          group.id,
          sectionTitle.toLocaleLowerCase("ru"),
          subsectionTitle.toLocaleLowerCase("ru"),
        ])
        if (targets.has(target))
          throw new BadRequestException("Объедините темы одинаковых разделов в один блок")
        targets.add(target)
        items.push({
          groupId: group.id,
          groupTitle: group.title,
          sectionId: newSection ? null : section!.id,
          sectionTitle,
          newSection,
          subsectionId: newSubsection || anySubsection ? null : sub!.id,
          subsectionTitle,
          newSubsection,
          topics,
        })
      }
    }
    const payload = {
      schemaVersion: 1,
      kind: input.kind,
      page: input.page,
      mode: input.mode,
      path: input.path,
      details: input.details,
      items,
    }
    await this.database.query(
      "INSERT INTO platform_feedback (id, profile_id, kind, page, request_hash, payload) VALUES ($1,$2,$3,$4,$5,$6::jsonb) ON CONFLICT (id) DO NOTHING",
      [input.id, profileId, input.kind, input.page, requestHash, JSON.stringify(payload)],
    )
    const saved = await this.database.query<SavedFeedbackRow>(
      'SELECT id, profile_id AS "profileId", request_hash AS "requestHash", payload, created_at::text AS "createdAt" FROM platform_feedback WHERE id=$1',
      [input.id],
    )
    if (!saved.rows[0]) throw new BadRequestException("Не удалось сохранить обращение")
    return this.receipt(saved.rows[0], profileId, requestHash)
  }

  private receipt(row: SavedFeedbackRow, profileId: string, hash: string) {
    if (row.profileId !== profileId || row.requestHash !== hash)
      throw new ConflictException(
        "Это обращение уже сохранено с другим содержимым. Создайте новое.",
      )
    return { saved: true as const, id: row.id, createdAt: row.createdAt, ...row.payload }
  }
}
