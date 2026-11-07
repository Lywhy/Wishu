import { command, compileCatalog, loadCatalog, outputs, saveJson } from "./catalog.mjs"
import { fileIndex } from "./fingerprints.mjs"

command(async () => {
  if (process.argv.length > 2) throw new Error("Использование: pnpm content:build")
  const catalog = await loadCatalog()
  const compiled = compileCatalog(catalog)
  compiled.files = await fileIndex(catalog)
  for (const [key, file] of Object.entries(outputs)) await saveJson(file, compiled[key])
  console.log(
    `OK: ${compiled.seed.questions.length} вопросов; seed, индексы, карта и снимки обновлены.`,
  )
})
