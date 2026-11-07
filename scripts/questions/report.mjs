import { command, compileCatalog, loadCatalog } from "./catalog.mjs"
import { options } from "./options.mjs"
import { duplicateCandidates } from "./search.mjs"
import { changes, technicalSummary } from "./review.mjs"
import { readBatch } from "./planning.mjs"

command(async () => {
  const argv = process.argv.slice(2)
  const args = options(argv, { flags: ["all", "json", "verbose"], values: ["batch"] })
  if (!argv.includes("--limit")) args.limit = 3
  const batch = args.batch ? await readBatch(args.batch) : undefined
  if (batch) {
    if (
      (args.section && args.section !== batch.sectionId) ||
      (args.subsection && args.subsection !== batch.subsectionId)
    )
      throw new Error("Фильтры не совпадают с областью пакета")
    args.section = batch.sectionId
    args.subsection = batch.subsectionId
  }
  const catalog = await loadCatalog(args),
    compiled = compileCatalog(catalog)
  const delta = await changes(compiled, args, batch)
  const summary = technicalSummary(catalog, compiled, delta)
  const selected = args.all ? new Set(compiled.index.questions.map((item) => item.id)) : delta.ids
  const candidates = duplicateCandidates(
    [...catalog.referenceQuestions, ...compiled.index.questions],
    selected,
    args.limit,
  )
  if (args.json) {
    console.log(
      JSON.stringify(
        { summary, added: delta.added, updated: delta.updated, removed: delta.removed, candidates },
        null,
        2,
      ),
    )
    return
  }
  if (!args.verbose) {
    console.log(
      `OK: ${summary.questions} вопросов; +${summary.added} ~${summary.updated} -${summary.removed}; draft=${summary.drafts.length}; TODO=${summary.todo.length}; совпадений=${candidates.length}.`,
    )
    for (const item of [...delta.added, ...delta.updated, ...delta.removed].slice(0, args.limit))
      console.log(`${item.id}: ${item.title}`)
    for (const pair of candidates) console.log(`Сопоставить: ${pair.left.id} / ${pair.right.id}`)
    if (summary.added + summary.updated + summary.removed > args.limit)
      console.log("Остальные записи: --verbose или --json.")
    return
  }
  console.log(
    `# Обзор контента\n\nДобавлено: ${summary.added}; изменено: ${summary.updated}; исключено из области: ${summary.removed}.\nСложность изменённых: ${JSON.stringify(summary.changedLevels)}.\nTODO: ${summary.todo.length}; черновики: ${summary.drafts.length}; требуют редакторского разбора: ${summary.needsEditorialReview.length}.\n`,
  )
  for (const [label, items] of [
    ["Добавленные", delta.added],
    ["Изменённые", delta.updated],
    ["Исключённые", delta.removed],
  ]) {
    console.log(`## ${label}\n`)
    for (const item of items) console.log(`- ${item.id}: ${item.title}`)
    if (!items.length) console.log("Нет.")
  }
  console.log(
    `\n## Кандидаты на пересечение\n\nРежим: ${args.all ? "вся область" : "только новые и изменённые вопросы"}. Лексическое сходство не доказывает дублирование.\n`,
  )
  for (const pair of candidates)
    console.log(`- ${pair.left.id} / ${pair.right.id}: ${Math.round(pair.score * 100)}%`)
  if (!candidates.length) console.log("Сильных лексических совпадений не найдено.")
  console.log(
    `\n${catalog.partial ? "Другие исходники не читались; связи с ними взяты из последнего индекса. " : ""}Отчёт не меняет базу. Исключение из seed не удаляет запись PostgreSQL. Без --batch baseline обновляется при content:build; с --batch сохраняется в плане.\n${summary.note}`,
  )
})
