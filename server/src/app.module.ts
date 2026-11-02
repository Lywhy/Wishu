import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { validateEnvironment } from "./config/environment"
import { DatabaseModule } from "./database/database.module"
import { HealthModule } from "./modules/health/health.module"
import { LearningModule } from "./modules/learning/learning.module"
import { QuestionsModule } from "./modules/questions/questions.module"
import { TasksModule } from "./modules/tasks/tasks.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ".env",
      validate: validateEnvironment,
    }),
    DatabaseModule,
    HealthModule,
    LearningModule,
    QuestionsModule,
    TasksModule,
  ],
})
export class AppModule {}
