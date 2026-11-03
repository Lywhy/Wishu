import "reflect-metadata"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "../app.module"
import { MigrationsService } from "./migrations.service"
import { QuestionsSeedService } from "./questions-seed.service"

async function main() {
  const command = process.argv[2]
  if (!["migrate", "seed", "init"].includes(command ?? ""))
    throw new Error("Expected database command: migrate, seed or init")
  const app = await NestFactory.createApplicationContext(AppModule)
  try {
    if (command === "migrate" || command === "init")
      console.log("Applied migrations:", await app.get(MigrationsService).run())
    if (command === "seed" || command === "init")
      console.log("Seeded question catalog:", await app.get(QuestionsSeedService).run())
  } finally {
    await app.close()
  }
}

main().catch((error: unknown) => {
  console.error(
    "Database command failed. Check PostgreSQL availability, environment and server logs.",
  )
  console.error(error instanceof Error ? error.message : "Unknown database error")
  process.exitCode = 1
})
