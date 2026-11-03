import { MigrationsService } from "./migrations.service"
import { QuestionsSeedService } from "./questions-seed.service"
import { Module } from "@nestjs/common"
import { DatabaseService } from "./database.service"

@Module({
  providers: [DatabaseService, MigrationsService, QuestionsSeedService],
  exports: [DatabaseService, MigrationsService, QuestionsSeedService],
})
export class DatabaseModule {}
