import { Controller, Get, ServiceUnavailableException } from "@nestjs/common"
import { DatabaseService } from "../../database/database.service"

@Controller("health")
export class HealthController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  live() {
    return { status: "ok", service: "wishu-api" }
  }

  @Get("ready")
  async ready() {
    try {
      await this.database.ping()
    } catch {
      throw new ServiceUnavailableException("Database is unavailable")
    }
    return { status: "ok", database: "up" }
  }
}
