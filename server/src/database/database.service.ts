import { Injectable, Logger, type OnApplicationShutdown } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Pool, type PoolClient, type QueryResultRow } from "pg"

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseService.name)
  private readonly pool: Pool

  constructor(config: ConfigService) {
    this.pool = new Pool({
      host: config.getOrThrow<string>("PGHOST"),
      port: config.getOrThrow<number>("PGPORT"),
      user: config.getOrThrow<string>("PGUSER"),
      password: config.getOrThrow<string>("PGPASSWORD"),
      database: config.getOrThrow<string>("PGDATABASE"),
      max: 10,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      query_timeout: 5000,
      statement_timeout: 5000,
      application_name: "wishu-api",
    })
    this.pool.on("error", () => {
      this.logger.error("Unexpected PostgreSQL connection error")
    })
  }

  query<Row extends QueryResultRow = QueryResultRow>(text: string, values?: unknown[]) {
    return this.pool.query<Row>(text, values)
  }

  async transaction<T>(work: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect()
    let destroy = false
    try {
      await client.query("BEGIN")
      const result = await work(client)
      await client.query("COMMIT")
      return result
    } catch (error) {
      try {
        await client.query("ROLLBACK")
      } catch {
        destroy = true
      }
      throw error
    } finally {
      client.release(destroy)
    }
  }

  async ping(): Promise<void> {
    await this.query("SELECT 1")
  }

  async onApplicationShutdown(): Promise<void> {
    await this.pool.end()
  }
}
