import { createHash } from "node:crypto"
import { readFile, readdir } from "node:fs/promises"
import { resolve } from "node:path"
import { Injectable } from "@nestjs/common"
import { DatabaseService } from "./database.service"

@Injectable()
export class MigrationsService {
  constructor(private readonly database: DatabaseService) {}

  async run(): Promise<string[]> {
    const directory = resolve(__dirname, "../../database/migrations")
    const files = (await readdir(directory))
      .filter((name) => /^\d{3}_[a-z0-9_-]+\.sql$/.test(name))
      .sort()
    return this.database.transaction(async (client) => {
      await client.query("SELECT pg_advisory_xact_lock($1)", [1743070001])
      await client.query(
        "CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now())",
      )
      const applied = await client.query<{ name: string; checksum: string }>(
        "SELECT name, checksum FROM schema_migrations",
      )
      const checksums = new Map(applied.rows.map((row) => [row.name, row.checksum]))
      const executed: string[] = []
      for (const name of files) {
        const sql = (await readFile(resolve(directory, name), "utf8")).replace(/\r\n/g, "\n")
        const checksum = createHash("sha256").update(sql).digest("hex")
        const existing = checksums.get(name)
        if (existing && existing !== checksum)
          throw new Error(`Applied migration was modified: ${name}`)
        if (existing) continue
        await client.query(sql)
        await client.query("INSERT INTO schema_migrations (name, checksum) VALUES ($1, $2)", [
          name,
          checksum,
        ])
        executed.push(name)
      }
      return executed
    })
  }
}
