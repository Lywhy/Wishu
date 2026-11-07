import { resolve } from "node:path"
import { command, outputs, readJson, root } from "./catalog.mjs"
import { options } from "./options.mjs"
import { filterIndex, rankQuestions, validateFilters } from "./search.mjs"

command(async () => {
  const argv = process.argv.slice(2),
    args = options(argv, { flags: ["json", "verbose"], positionals: true })
  if (!args.query) throw new Error("Укажите текст поиска")
  if (!argv.includes("--limit")) args.limit = 3
  const lookup = await readJson(resolve(root, outputs.lookup))
  validateFilters(lookup.sections, args)
  const matches = rankQuestions(filterIndex(lookup.questions, args), args.query)
  const results = matches
    .slice(0, args.limit)
    .map(({ question }) => ({
      id: question.id,
      title: question.title,
      goal: question.learningGoal,
      ...(args.verbose
        ? {
            topic: `${question.sectionId}/${question.subsectionId}`,
            hash: question.contentHash,
            answerFile: question.answerFile,
          }
        : {}),
    }))
  if (args.json) {
    console.log(JSON.stringify({ total: matches.length, results }, null, 2))
    return
  }
  console.log(`Найдено ${matches.length}; показано ${results.length}.`)
  for (const item of results)
    console.log(
      `${item.id}: ${item.title}\n  ${item.goal}${args.verbose ? "\n  " + JSON.stringify(item) : ""}`,
    )
})
