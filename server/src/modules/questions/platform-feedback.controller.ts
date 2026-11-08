import { Body, Controller, Header, Post, Req } from "@nestjs/common"
import type { Request } from "express"
import { QuestionProfilesService } from "./question-profiles.service"
import { CreatePlatformFeedbackDto } from "./platform-feedback.dto"
import { PlatformFeedbackService } from "./platform-feedback.service"

@Controller("questions/platform-feedback")
export class PlatformFeedbackController {
  constructor(
    private readonly profiles: QuestionProfilesService,
    private readonly feedback: PlatformFeedbackService,
  ) {}

  @Post()
  @Header("Cache-Control", "no-store")
  async create(@Req() request: Request, @Body() body: CreatePlatformFeedbackDto) {
    this.profiles.assertOrigin(request)
    const profile = await this.profiles.requireProfile(request)
    return this.feedback.create(profile.id, body)
  }
}
