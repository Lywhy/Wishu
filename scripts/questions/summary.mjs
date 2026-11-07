import { command, compileCatalog, loadCatalog } from "./catalog.mjs"
import { options } from "./options.mjs"
import { changes, technicalSummary } from "./review.mjs"
import { planningData } from "./planning.mjs"

command(async () => {
  const args = options(process.argv.slice(2), { flags: ["json", "verbose"] })
  try {
    const catalog = await loadCatalog(args),
      compiled = compileCatalog(catalog)
    await planningData(catalog)
    const summary = technicalSummary(catalog, compiled, await changes(compiled, args))
    if (args.json || args.verbose) console.log(JSON.stringify(summary, null, 2))
    else
      console.log(
        `OK: ${summary.questions} вопросов; +${summary.added} ~${summary.updated} -${summary.removed}; draft=${summary.drafts.length}; TODO=${summary.todo.length}; редакторский пересмотр=${summary.needsEditorialReview.length}.`,
      )
  } catch (error) {
    console.log(
      JSON.stringify({ structurallyValid: false, issues: error.message.split("\n") }, null, 2),
    )
    process.exitCode = 1
  }
})
