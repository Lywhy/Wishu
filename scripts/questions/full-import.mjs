import { parseAnswer, readAnswer, serializeAnswer } from "./answer-files.mjs"
import { loadCatalog } from "./catalog.mjs"
import { prepareDrafts } from "./drafts.mjs"

const normalized = (value) =>
  value
    .trim()
    .toLocaleLowerCase("ru")
    .replaceAll("ё", "е")
    .replace(/\s+/gu, " ")
    .replaceAll("\u2014", "-")
export async function prepareFullImport(options, rows) {
  const allowed = new Set([
    "id",
    "title",
    "difficulty",
    "learningGoal",
    "keywords",
    "goalIds",
    "summary",
    "answer",
    "answerMarkdown",
    "answerFile",
    "code",
    "pitfall",
    "takeaway",
    "sources",
    "sourceRefs",
    "relatedQuestionIds",
    "kind",
    "priority",
    "popular",
  ])
  for (const row of rows) {
    if (row?.sourceRefs !== undefined && row?.sources !== undefined)
      throw new Error("Укажите sources или sourceRefs, не оба поля")
    if (!row || typeof row !== "object" || Array.isArray(row))
      throw new Error("--full требует объекты с полями ответа")
    for (const key of Object.keys(row))
      if (!allowed.has(key)) throw new Error(`Неизвестное поле полного импорта ${key}`)
    for (const field of ["title", "summary", "takeaway", "learningGoal"])
      if (typeof row[field] !== "string" || !row[field].trim())
        throw new Error(`Заполните ${field} в полном импорте`)
    if (
      [row.answer, row.answerMarkdown, row.answerFile].filter((value) => value !== undefined)
        .length !== 1
    )
      throw new Error("Укажите ровно один из answer[], answerMarkdown, answerFile")
  }
  const headers = rows.map((row) =>
    Object.fromEntries(
      Object.entries(row).filter(([key]) =>
        ["id", "title", "difficulty", "learningGoal", "keywords", "goalIds"].includes(key),
      ),
    ),
  )
  const result = await prepareDrafts(options, headers)
  // Existing matching titles remain untouched, even in full-import mode.
  const firstRows = new Map()
  for (const row of rows)
    if (!firstRows.has(normalized(row.title))) firstRows.set(normalized(row.title), row)
  for (const question of result.added) {
    const row = firstRows.get(normalized(question.title))
    const answer =
      row.answer !== undefined
        ? row.answer
        : row.answerMarkdown !== undefined
          ? parseAnswer(row.answerMarkdown)
          : await readAnswer(row.answerFile)
    result.answerFiles.set(question.answerFile, serializeAnswer(answer))
    Object.assign(question, { summary: row.summary, takeaway: row.takeaway })
    for (const field of ["code", "pitfall", "popular"])
      if (row[field] !== undefined) question[field] = row[field]
    Object.assign(question.editorial, {
      learningGoal: row.learningGoal,
      sources: row.sources ?? [],
      relatedQuestionIds: row.relatedQuestionIds ?? [],
      kind: row.kind ?? "explanation",
      reviewStatus: options.ready ? "ready" : "draft",
      priority: row.priority ?? question.editorial.priority,
    })
    if (row.sourceRefs !== undefined) {
      question.editorial.sourceRefs = row.sourceRefs
      delete question.editorial.sources
    }
  }
  await loadCatalog(
    {},
    { bundles: new Map([[result.file, result.bundle]]), answers: result.answerFiles },
  )
  return result
}
