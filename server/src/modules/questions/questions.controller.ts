import { DatabaseService } from "../../database/database.service"
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from "@nestjs/common"
import type { Request, Response } from "express"
import {
  CreateQuestionDto,
  QuestionIdDto,
  QuestionImportDto,
  QuestionProgressDto,
  QuestionSettingsDto,
} from "./questions.dto"
import { QuestionProfilesService } from "./question-profiles.service"
import { QuestionsService } from "./questions.service"

@Controller("questions")
export class QuestionsController {
  constructor(
    private readonly database: DatabaseService,
    private readonly questions: QuestionsService,
    private readonly profiles: QuestionProfilesService,
  ) {}

  @Post()
  @Header("Cache-Control", "no-store")
  async create(@Req() request: Request, @Body() body: CreateQuestionDto) {
    this.profiles.assertOrigin(request)
    await this.profiles.requireProfile(request)
    return this.questions.create(body)
  }

  @Post("feedback")
  @Header("Cache-Control", "no-store")
  async feedback(@Req() request: Request, @Body() body: unknown) {
    this.profiles.assertOrigin(request)
    const profile = await this.profiles.requireProfile(request)
    if (!body || typeof body !== "object") throw new BadRequestException("Некорректный отчёт")
    const value = body as Record<string, unknown>
    const { id, contentKey, reason, details } = value
    if (
      typeof id !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id) ||
      typeof contentKey !== "string" ||
      !contentKey.trim() ||
      contentKey.length > 200 ||
      typeof reason !== "string" ||
      !["answer", "condition", "test", "other"].includes(reason) ||
      typeof details !== "string" ||
      details.trim().length < 5 ||
      details.length > 5000
    )
      throw new BadRequestException("Проверьте поля отчёта")
    await this.database.query(
      "INSERT INTO content_feedback (id,profile_id,content_key,reason,details) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO NOTHING",
      [id, profile.id, contentKey, reason, details.trim()],
    )
    const saved = await this.database.query(
      "SELECT id FROM content_feedback WHERE id=$1 AND profile_id=$2",
      [id, profile.id],
    )
    if (!saved.rows.length) throw new BadRequestException("Не удалось сохранить отчёт")
    return { saved: true, id }
  }

  @Get("catalog")
  @Header("Cache-Control", "no-store")
  catalog() {
    return this.questions.catalog()
  }

  @Post("session")
  @Header("Cache-Control", "no-store")
  session(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    return this.profiles.session(request, response)
  }

  @Get("progress")
  @Header("Cache-Control", "no-store")
  async progress(@Req() request: Request) {
    const profile = await this.profiles.requireProfile(request)
    return this.profiles.progress(profile.id)
  }

  @Post("progress/import")
  @Header("Cache-Control", "no-store")
  async importProgress(@Req() request: Request, @Body() body: QuestionImportDto) {
    this.profiles.assertOrigin(request)
    const profile = await this.profiles.requireProfile(request)
    return this.profiles.importProgress(profile.id, body)
  }

  @Patch("progress/:questionId")
  @Header("Cache-Control", "no-store")
  async patchProgress(
    @Req() request: Request,
    @Param() params: QuestionIdDto,
    @Body() body: QuestionProgressDto,
  ) {
    this.profiles.assertOrigin(request)
    const profile = await this.profiles.requireProfile(request)
    return this.profiles.patchProgress(profile.id, params.questionId, body)
  }

  @Patch("settings")
  @Header("Cache-Control", "no-store")
  async settings(@Req() request: Request, @Body() body: QuestionSettingsDto) {
    this.profiles.assertOrigin(request)
    const profile = await this.profiles.requireProfile(request)
    return this.profiles.settings(profile.id, body.autoRevealAnswers)
  }

  @Get(":questionId")
  findQuestion(@Param() params: QuestionIdDto) {
    return this.questions.findQuestion(params.questionId)
  }
}
