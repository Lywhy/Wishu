import "reflect-metadata"
import { mkdir, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "../app.module"
import { DatabaseService } from "./database.service"

async function main() {
  const destination = process.argv.slice(2).find((arg) => arg !== "--")
  const file = resolve(destination ?? `../exports/feedback/wishu-feedback-${Date.now()}.json`)
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false })
  try {
    const result = await app
      .get(DatabaseService)
      .query<{ id: string; createdAt: string; payload: Record<string, unknown> }>(
        'SELECT id, created_at::text AS "createdAt", payload FROM platform_feedback ORDER BY created_at DESC, id LIMIT 1000',
      )
    const entries = result.rows.map((row) => ({
      id: row.id,
      createdAt: row.createdAt,
      ...row.payload,
    }))
    await mkdir(dirname(file), { recursive: true })
    await writeFile(
      file,
      JSON.stringify(
        { schemaVersion: 1, exportedAt: new Date().toISOString(), limit: 1000, entries },
        null,
        2,
      ) + "\n",
      { flag: "wx" },
    )
    console.log(`Exported ${entries.length} feedback entries to ${file}`)
  } finally {
    await app.close()
  }
}
main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Could not export feedback")
  process.exitCode = 1
})
