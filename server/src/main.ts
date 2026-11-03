import "reflect-metadata"
import { Logger, ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import helmet from "helmet"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)

  app.setGlobalPrefix("api")
  app.use(helmet())
  app.enableCors({ origin: config.getOrThrow<string>("CORS_ORIGIN"), credentials: true })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.enableShutdownHooks()

  const port = config.getOrThrow<number>("PORT")
  await app.listen(port, "0.0.0.0")
  Logger.log(`Wishu API listening on port ${port} with prefix /api`, "Bootstrap")
}

bootstrap().catch(() => {
  Logger.error("Could not start Wishu API. Check configuration and startup logs.", "Bootstrap")
  process.exitCode = 1
})
