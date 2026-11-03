import { Body, Controller, Get, Header, Param, Patch, Post, Req, Res } from "@nestjs/common"
import type { Request, Response } from "express"
import {
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
    private readonly questions: QuestionsService,
    private readonly profiles: QuestionProfilesService,
  ) {}

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
