import { Module } from "@nestjs/common"
import { DatabaseModule } from "../../database/database.module"
import { QuestionProfilesService } from "./question-profiles.service"
import { QuestionsController } from "./questions.controller"
import { QuestionsService } from "./questions.service"

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionProfilesService],
})
export class QuestionsModule {}
