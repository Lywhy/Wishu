import { resolve } from "node:path"
import { command, compileCatalog, equal, loadCatalog, outputs, readJson, root } from "./catalog.mjs"
import { parseOptions } from "./search.mjs"
import { planningData } from "./planning.mjs"
import { fileIndex } from "./fingerprints.mjs"

command(async () => {
  const options = parseOptions(process.argv.slice(2))
  const catalog = await loadCatalog(options)
  await planningData(catalog)
  if (catalog.partial) {
    console.log(
      `OK: ${catalog.entries.length} вопросов, ${catalog.bundles.length} подразделов. Только выбранные исходники; прочие связи - по индексу.`,
    )
    return
  }
  const compiled = compileCatalog(catalog)
  compiled.files = await fileIndex(catalog)
  const stale = []
  for (const [key, file] of Object.entries(outputs)) {
    try {
      if (!equal(await readJson(resolve(root, file)), compiled[key])) stale.push(file)
    } catch (error) {
      stale.push(`${file}: ${error.message}`)
    }
  }
  if (stale.length)
    throw new Error(
      `Артефакты не соответствуют исходникам:\n${stale.join("\n")}\nВыполните pnpm content:build, просмотрите изменения и повторите проверку.`,
    )
  console.log(
    `OK: ${compiled.seed.questions.length} вопросов; структура, связи и 5 артефактов согласованы.`,
  )
})
