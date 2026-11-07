export function options(argv, { flags = [], values = [], positionals = false } = {}) {
  const result = { limit: 12, query: "" },
    query = []
  const allowed = new Set(["section", "subsection", "limit", ...values])
  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index]
    if (argument === "--") continue
    const name = argument.slice(2)
    if (argument.startsWith("--") && flags.includes(name)) {
      result[name] = true
      continue
    }
    if (argument.startsWith("--") && allowed.has(name)) {
      const value = argv[++index]
      if (!value || value.startsWith("--")) throw new Error(`Укажите значение ${argument}`)
      result[name] = value
      continue
    }
    if (argument.startsWith("--") || !positionals)
      throw new Error(`Неизвестный аргумент ${argument}`)
    query.push(argument)
  }
  result.limit = Number(result.limit)
  if (!Number.isSafeInteger(result.limit) || result.limit < 1 || result.limit > 100)
    throw new Error("--limit: целое от 1 до 100")
  if (result.subsection && !result.section) throw new Error("Для --subsection укажите --section")
  result.query = [result.query, ...query].filter(Boolean).join(" ").trim()
  return result
}
