import { command } from "./catalog.mjs"
import { prepareFullImport } from "./full-import.mjs"
import {
  commitDrafts,
  draftOptions,
  importRows,
  prepareDrafts,
  printDraftResult,
} from "./drafts.mjs"

command(async () => {
  const options = draftOptions(process.argv.slice(2), true)
  const rows = await importRows(options.file)
  if (!rows.length) throw new Error("Список вопросов пуст")
  const result = options.full
    ? await prepareFullImport(options, rows)
    : await prepareDrafts(options, rows)
  if (options.write) await commitDrafts(result)
  printDraftResult(result, options.write, options)
})
