import { open, readFile, unlink } from "node:fs/promises"
import { resolve } from "node:path"
import {
  compileCatalog,
  difficulties,
  equal,
  loadCatalog,
  readJson,
  root,
  saveJson,
} from "./catalog.mjs"
import { rankQuestions, similarity } from "./search.mjs"
import { answerWritePath, serializeAnswer } from "./answer-files.mjs"

const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const normalize = (value) =>
  value.trim().toLocaleLowerCase("ru").replaceAll("ё", "е").replace(/\s+/gu, " ")
const letters = Object.fromEntries(
  [..."абвгдеёжзийклмнопрстуфхцчшщъыьэюя"].map((letter, index) => [
    letter,
    [
      "a",
      "b",
      "v",
      "g",
      "d",
      "e",
      "e",
      "zh",
      "z",
      "i",
      "y",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "r",
      "s",
      "t",
      "u",
      "f",
      "kh",
      "ts",
      "ch",
      "sh",
      "shch",
      "",
      "y",
      "",
      "e",
      "yu",
      "ya",
    ][index],
  ]),
)

export function draftOptions(argv, importing = false) {
  const options = { write: !importing, dryRun: false, difficulty: "Средний" }
  options.full = false
  options.ready = false
  options.verbose = false
  const names = new Set([
    "section",
    "subsection",
    "goal",
    "difficulty",
    ...(importing ? ["file"] : ["title", "id"]),
  ])
  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index]
    if (argument === "--") continue
    if (argument === "--dry-run") {
      options.dryRun = true
      continue
    }
    if (argument === "--verbose") {
      options.verbose = true
      continue
    }
    if (argument === "--full" && importing) {
      options.full = true
      continue
    }
    if (argument === "--ready" && importing) {
      options.ready = true
      continue
    }
    if (argument === "--write" && importing) {
      options.write = true
      continue
    }
    const name = argument.slice(2)
    if (!argument.startsWith("--") || !names.has(name))
      throw new Error(`Неизвестный аргумент: ${argument}`)
    const value = argv[++index]
    if (!value || value.startsWith("--")) throw new Error(`Укажите значение ${argument}`)
    options[name] = value
  }
  for (const key of ["section", "subsection", importing ? "file" : "title"])
    if (!options[key]?.trim()) throw new Error(`Укажите --${key}`)
  if (!difficulties.includes(options.difficulty))
    throw new Error("Допустимая сложность: Базовый, Средний, Продвинутый")
  if (options.dryRun) options.write = false
  if (options.ready && !options.full)
    throw new Error("--ready требует --full и готовых ответов с источниками")
  return options
}

function slug(title) {
  return (
    [...title.toLowerCase()]
      .map((letter) => letters[letter] ?? letter)
      .join("")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 85)
      .replace(/-+$/g, "") || "question"
  )
}

export async function prepareDrafts(options, rows) {
  const catalog = await loadCatalog()
  const item = catalog.bundles.find(
    (item) =>
      item.subsection.sectionId === options.section && item.subsection.id === options.subsection,
  )
  if (!item) throw new Error(`Не найден подраздел ${options.section}/${options.subsection}`)
  const section = catalog.sections.find((section) => section.id === options.section)
  if (section.inDevelopment) throw new Error("Сначала подготовьте и откройте раздел в catalog.json")
  const bundle = structuredClone(item.bundle)
  const goal = options.goal ?? bundle.coverageGoals[0]?.id
  if (!goal || !bundle.coverageGoals.some((item) => item.id === goal))
    throw new Error("Укажите существующий --goal или добавьте coverageGoals в подраздел")
  const known = new Set(catalog.entries.map((entry) => entry.question.id))
  const index = compileCatalog(catalog).index.questions
  const titles = new Map(
    bundle.questions.map((question) => [normalize(question.title), question.id]),
  )
  let order = Math.max(-1, ...bundle.questions.map((question) => question.order)) + 1
  const added = [],
    skipped = [],
    suggestions = []
  const answerFiles = new Map()
  for (const row of rows) {
    if (!row || typeof row !== "object" || Array.isArray(row))
      throw new Error("Каждая строка импорта должна быть названием или объектом вопроса")
    for (const key of Object.keys(row))
      if (!["title", "id", "difficulty", "learningGoal", "keywords", "goalIds"].includes(key))
        throw new Error(`Неизвестное поле импорта ${key}`)
    if (typeof row.title !== "string" || !row.title.trim())
      throw new Error("У вопроса отсутствует title")
    const title = row.title.trim().replaceAll("\u2014", "-")
    const existing = titles.get(normalize(title))
    if (existing) {
      skipped.push({ title, existing })
      continue
    }
    let id = row.id
    if (id === undefined) {
      const base = options.section + "-" + slug(title)
      id = base
      for (let suffix = 2; known.has(id); suffix++) id = base + "-" + suffix
    }
    if (typeof id !== "string" || !idPattern.test(id) || known.has(id))
      throw new Error(`Некорректный или занятый ID: ${id}`)
    const difficulty = row.difficulty ?? options.difficulty
    if (!difficulties.includes(difficulty)) throw new Error(`Неизвестная сложность у ${id}`)
    const goalIds = row.goalIds ?? [goal]
    if (
      !Array.isArray(goalIds) ||
      !goalIds.length ||
      new Set(goalIds).size !== goalIds.length ||
      !goalIds.every((id) => bundle.coverageGoals.some((goal) => goal.id === id))
    )
      throw new Error(`У ${id} укажите существующие неповторяющиеся goalIds`)
    const keywords = row.keywords ?? [section.title, item.subsection.title]
    if (
      !Array.isArray(keywords) ||
      !keywords.every((value) => typeof value === "string" && value.trim())
    )
      throw new Error(`У ${id} keywords должен быть массивом строк`)
    if (
      row.learningGoal !== undefined &&
      (typeof row.learningGoal !== "string" || !row.learningGoal.trim())
    )
      throw new Error(`У ${id} заполните learningGoal`)
    const candidates = rankQuestions(index, title)
      .filter(
        ({ question }) =>
          Math.max(similarity(title, question.title), similarity(title, question.learningGoal)) >=
          0.35,
      )
      .slice(0, 3)
      .map(({ question }) => ({
        id: question.id,
        title: question.title,
        sourceFile: question.sourceFile,
      }))
    if (candidates.length) suggestions.push({ id, candidates })
    const question = {
      id,
      title,
      topic: bundle.questions[0]?.topic ?? section.title,
      difficulty,
      summary: "TODO: уточнить область и проверяемые понятия.",
      answer: [
        "TODO: написать короткий прямой ответ.",
        "### Механизм\n\nTODO: объяснить поведение, ограничения и подходящий пример.",
      ],
      takeaway: "TODO: сформулировать главную мысль.",
      moduleId: section.moduleId,
      order: order++,
      popular: false,
      editorial: {
        learningGoal:
          row.learningGoal ?? "TODO: определить отдельный навык для вопроса «" + title + "».",
        keywords: [...new Set(keywords)],
        kind: "explanation",
        reviewStatus: "draft",
        goalIds,
        relatedQuestionIds: [],
        sources: [],
        priority: bundle.coverageGoals.find((item) => item.id === goalIds[0])?.priority ?? "core",
      },
    }
    question.answerFile = `answers/${options.section}/${id}.md`
    answerFiles.set(question.answerFile, serializeAnswer(question.answer))
    delete question.answer
    bundle.questions.push(question)
    known.add(id)
    titles.set(normalize(title), id)
    const entry = {
      id,
      sectionId: options.section,
      subsectionId: options.subsection,
      title,
      difficulty,
      ...question.editorial,
      sourceFile: `content/questions/${options.section}/${options.subsection}.json`,
    }
    index.push(entry)
    added.push(question)
  }
  return {
    bundle,
    original: item.bundle,
    added,
    skipped,
    suggestions,
    answerFiles,
    file: `content/questions/${options.section}/${options.subsection}.json`,
  }
}

export async function commitDrafts(result) {
  if (!result.added.length) return
  const file = resolve(root, result.file)
  const lockFile = file + ".lock"
  let lock
  const created = []
  try {
    lock = await open(lockFile, "wx")
  } catch (error) {
    if (error.code === "EEXIST")
      throw new Error(
        `Файл занят другим импортом: ${result.file}.lock. Если процесс прервался, удалите оставшийся lock вручную.`,
      )
    throw error
  }
  try {
    if (!equal(await readJson(file), result.original))
      throw new Error(
        "Подраздел изменился во время подготовки. Повторите команду, чтобы сохранить новые изменения.",
      )
    await loadCatalog(
      {},
      { bundles: new Map([[result.file, result.bundle]]), answers: result.answerFiles },
    )
    for (const [file, markdown] of result.answerFiles ?? []) {
      const target = await answerWritePath(file)
      const handle = await open(target, "wx")
      created.push(target)
      try {
        await handle.writeFile(markdown, "utf8")
      } finally {
        await handle.close()
      }
    }
    await saveJson(result.file, result.bundle)
  } catch (error) {
    for (const file of created) await unlink(file)
    throw error
  } finally {
    await lock.close()
    await unlink(lockFile)
  }
}

export async function importRows(file) {
  const text = (await readFile(resolve(process.cwd(), file), "utf8")).replace(/^\uFEFF/, "")
  if (file.toLowerCase().endsWith(".json")) {
    const rows = JSON.parse(text)
    if (!Array.isArray(rows))
      throw new Error("JSON-файл должен содержать массив названий или объектов")
    return rows.map((row) => (typeof row === "string" ? { title: row } : row))
  }
  return text
    .split(/\r?\n/u)
    .map((line) =>
      line
        .trim()
        .replace(/^(?:\d+[.)]\s*|[-*+]\s+)/u, "")
        .trim(),
    )
    .filter(Boolean)
    .map((title) => ({ title }))
}

export function printDraftResult(result, written, options = {}) {
  const limit = options.verbose ? undefined : 3
  console.log(
    `${written ? "Создано" : "Подготовлено"}: ${result.added.length}; пропущено совпадающих названий: ${result.skipped.length}. Файл: ${result.file}`,
  )
  for (const question of result.added.slice(0, limit))
    console.log(`+ ${question.id}: ${question.title}`)
  for (const item of result.skipped.slice(0, limit))
    console.log(`= ${item.existing}: ${item.title}`)
  for (const item of result.suggestions.slice(0, limit))
    console.log(
      `? ${item.id}: сравнить с ${item.candidates.map((candidate) => candidate.id + " (" + candidate.sourceFile + ")").join(", ")}`,
    )
  console.log(
    written
      ? "Вопросы сохранены в исходники со своими редакторскими статусами. Seed и индекс не изменены; выполните content:report, content:build и content:check."
      : "Файлы не изменены. Для импорта добавьте --write; для content:new уберите --dry-run.",
  )
  if (
    !options.verbose &&
    Math.max(result.added.length, result.skipped.length, result.suggestions.length) > 3
  )
    console.log("Подробный список: --verbose.")
}
