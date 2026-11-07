import { command } from "./catalog.mjs"
import { commitDrafts, draftOptions, prepareDrafts, printDraftResult } from "./drafts.mjs"

command(async () => {
  const options = draftOptions(process.argv.slice(2))
  const row = { title: options.title, ...(options.id ? { id: options.id } : {}) }
  const result = await prepareDrafts(options, [row])
  if (options.write) await commitDrafts(result)
  printDraftResult(result, options.write, options)
})
