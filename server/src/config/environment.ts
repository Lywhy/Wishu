function requiredString(config: Record<string, unknown>, key: string): string {
  const value = config[key]
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Environment variable ${key} is required`)
  }
  return value
}

function portNumber(config: Record<string, unknown>, key: string, fallback: number): number {
  const raw = config[key] ?? fallback
  if (!/^\d+$/.test(String(raw))) {
    throw new Error(`Environment variable ${key} must be a valid port`)
  }
  const value = Number(raw)
  if (!Number.isInteger(value) || value < 1 || value > 65535) {
    throw new Error(`Environment variable ${key} must be between 1 and 65535`)
  }
  return value
}

export function validateEnvironment(config: Record<string, unknown>) {
  const nodeEnv = config.NODE_ENV ?? "development"
  if (!["development", "production", "test"].includes(String(nodeEnv))) {
    throw new Error("Environment variable NODE_ENV must be development, production or test")
  }

  const cookieSecure = String(config.COOKIE_SECURE ?? (nodeEnv === "production" ? "true" : "false"))
  if (!["true", "false"].includes(cookieSecure))
    throw new Error("Environment variable COOKIE_SECURE must be true or false")

  const corsOrigin = requiredString(config, "CORS_ORIGIN")
  let parsedOrigin: URL
  try {
    parsedOrigin = new URL(corsOrigin)
  } catch {
    throw new Error("Environment variable CORS_ORIGIN must be an HTTP(S) origin")
  }
  if (!["http:", "https:"].includes(parsedOrigin.protocol) || parsedOrigin.origin !== corsOrigin) {
    throw new Error("Environment variable CORS_ORIGIN must contain only an HTTP(S) origin")
  }

  return {
    ...config,
    NODE_ENV: nodeEnv,
    COOKIE_SECURE: cookieSecure === "true",
    PORT: portNumber(config, "PORT", 3000),
    CORS_ORIGIN: corsOrigin,
    PGHOST: requiredString(config, "PGHOST"),
    PGPORT: portNumber(config, "PGPORT", 5432),
    PGUSER: requiredString(config, "PGUSER"),
    PGPASSWORD: requiredString(config, "PGPASSWORD"),
    PGDATABASE: requiredString(config, "PGDATABASE"),
  }
}
