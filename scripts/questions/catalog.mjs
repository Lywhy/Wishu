import { readFile, readdir, mkdir, rename, writeFile } from "node:fs/promises"
import { dirname, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { createHash } from "node:crypto"
import { readAnswer } from "./answer-files.mjs"
import { readSourceRegistry, resolveSourceRefs } from "./source-registry.mjs"

export const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..")
export const sourceRoot = resolve(root, "content/questions")
export const outputs = {
  seed: "server/database/seeds/questions.json",
  index: "content/generated/question-index.json",
  coverage: "content/generated/question-coverage.json",
  lookup: "content/generated/question-lookup.json",
  files: "content/generated/content-files.json",
}
export const difficulties = ["Базовый", "Средний", "Продвинутый"]
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const questionKeys = new Set([
  "id",
  "title",
  "topic",
  "difficulty",
  "summary",
  "answer",
  "answerFile",
  "code",
  "takeaway",
  "moduleId",
  "order",
  "popular",
  "pitfall",
  "editorial",
])
const editorialKeys = new Set([
  "learningGoal",
  "keywords",
  "kind",
  "reviewStatus",
  "goalIds",
  "relatedQuestionIds",
  "sources",
  "sourceRefs",
  "priority",
])

export function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical)
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, canonical(value[key])]),
    )
  }
  return value
}

export function equal(left, right) {
  return JSON.stringify(canonical(left)) === JSON.stringify(canonical(right))
}

export async function readJson(file) {
  try {
    return JSON.parse(await readFile(file, "utf8"))
  } catch (error) {
    throw new Error(`${relative(root, file)}: ${error.message}`)
  }
}

const ordered = (items) =>
  [...items].sort((a, b) => a.order - b.order || a.id.localeCompare(b.id, "en"))
const counts = (items) =>
  Object.fromEntries(
    difficulties.map((level) => [level, items.filter((item) => item.difficulty === level).length]),
  )

// This performs structural checks only. It does not evaluate Markdown or execute examples.
export async function loadCatalog(selection = {}, overrides = {}) {
  let sourceRegistry
  const manifest = await readJson(resolve(sourceRoot, "catalog.json"))
  const errors = []
  const requireValue = (condition, message) => {
    if (!condition) errors.push(message)
  }
  const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value)
  const text = (value) => typeof value === "string" && value.trim().length > 0
  const strings = (value) => Array.isArray(value) && value.every(text)
  const uniqueStrings = (value) => strings(value) && new Set(value).size === value.length
  const unknownKeys = (value, allowed, label) => {
    for (const key of Object.keys(value))
      requireValue(allowed.has(key), `${label}: неизвестное поле ${key}`)
  }
  const fail = () => {
    if (errors.length) throw new Error(errors.join("\n"))
  }
  requireValue(object(manifest), "catalog.json: ожидается объект")
  fail()
  requireValue(manifest.schemaVersion === 1, "catalog.json: schemaVersion должен быть 1")
  for (const key of ["groups", "sections", "subsections"])
    requireValue(Array.isArray(manifest[key]), `catalog.json: ${key} должен быть массивом`)
  unknownKeys(
    manifest,
    new Set(["$schema", "schemaVersion", "groups", "sections", "subsections"]),
    "catalog.json",
  )
  fail()

  const register = (items, kind, keyOf, required) => {
    const ids = new Set()
    for (const item of items) {
      requireValue(object(item), `${kind}: ожидается объект`)
      if (!object(item)) continue
      requireValue(text(item.id) && idPattern.test(item.id), `${kind}: некорректный id ${item.id}`)
      const key = keyOf(item)
      requireValue(!ids.has(key), `${kind}: повтор ${key}`)
      ids.add(key)
      for (const field of required)
        requireValue(text(item[field]), `${kind} ${key}: заполните ${field}`)
      requireValue(
        Number.isSafeInteger(item.order) && item.order >= 0,
        `${kind} ${key}: order должен быть неотрицательным целым`,
      )
    }
    return ids
  }
  const groupIds = register(manifest.groups, "Группа", (item) => item.id, ["title", "description"])
  const sectionIds = register(manifest.sections, "Раздел", (item) => item.id, [
    "title",
    "description",
    "groupId",
    "moduleId",
    "mark",
  ])
  const subsectionIds = register(
    manifest.subsections,
    "Подраздел",
    (item) => `${item.sectionId}/${item.id}`,
    ["title", "description", "sectionId"],
  )
  fail()
  for (const section of manifest.sections) {
    unknownKeys(
      section,
      new Set([
        "id",
        "groupId",
        "title",
        "description",
        "moduleId",
        "inDevelopment",
        "mark",
        "order",
      ]),
      section.id,
    )
    requireValue(
      groupIds.has(section.groupId),
      `${section.id}: неизвестная группа ${section.groupId}`,
    )
    requireValue(
      section.inDevelopment === undefined || typeof section.inDevelopment === "boolean",
      `${section.id}: inDevelopment должен быть boolean`,
    )
  }
  for (const group of manifest.groups)
    unknownKeys(group, new Set(["id", "title", "description", "order"]), group.id)
  for (const subsection of manifest.subsections) {
    unknownKeys(
      subsection,
      new Set(["id", "sectionId", "title", "description", "order"]),
      subsection.id,
    )
    requireValue(
      sectionIds.has(subsection.sectionId),
      `${subsection.id}: неизвестный раздел ${subsection.sectionId}`,
    )
  }
  fail()
  const groups = ordered(manifest.groups)
  const sections = groups.flatMap((group) =>
    ordered(manifest.sections.filter((section) => section.groupId === group.id)),
  )
  const subsections = sections.flatMap((section) =>
    ordered(manifest.subsections.filter((subsection) => subsection.sectionId === section.id)),
  )
  const selected = (item) =>
    (!selection.section || item.sectionId === selection.section) &&
    (!selection.subsection || item.id === selection.subsection)
  requireValue(!selection.subsection || Boolean(selection.section), "Для подраздела укажите раздел")
  requireValue(
    !selection.section || sectionIds.has(selection.section),
    `Неизвестный раздел ${selection.section}`,
  )
  requireValue(
    !selection.subsection || subsectionIds.has(`${selection.section}/${selection.subsection}`),
    `Неизвестный подраздел ${selection.subsection}`,
  )
  fail()
  const partial = Boolean(selection.section)
  let referenceQuestions = []
  if (partial) {
    const reference = await readJson(resolve(root, outputs.index))
    if (reference.schemaVersion !== 1 || !Array.isArray(reference.questions))
      throw new Error("Обновите индекс через pnpm content:build")
    referenceQuestions = reference.questions.filter(
      (item) =>
        !selected({ sectionId: item.sectionId, id: item.subsectionId }) &&
        subsectionIds.has(`${item.sectionId}/${item.subsectionId}`),
    )
  }
  const entries = []
  const bundles = []
  const ids = new Set(referenceQuestions.map((question) => question.id))
  const expectedFiles = new Set(
    subsections.map((subsection) => `${subsection.sectionId}/${subsection.id}.json`),
  )
  for (const subsection of subsections) {
    if (!selected(subsection)) continue
    const file = `${subsection.sectionId}/${subsection.id}.json`
    const label = `content/questions/${file}`
    const bundle = overrides.bundles?.get(label) ?? (await readJson(resolve(sourceRoot, file)))
    requireValue(object(bundle), `${label}: ожидается объект`)
    if (!object(bundle)) continue
    unknownKeys(
      bundle,
      new Set(["$schema", "sectionId", "subsectionId", "scope", "coverageGoals", "questions"]),
      label,
    )
    requireValue(
      bundle.sectionId === subsection.sectionId && bundle.subsectionId === subsection.id,
      `${label}: раздел/подраздел не совпадает с каталогом`,
    )
    requireValue(text(bundle.scope), `${label}: заполните scope`)
    requireValue(
      Array.isArray(bundle.coverageGoals),
      `${label}: coverageGoals должен быть массивом`,
    )
    requireValue(Array.isArray(bundle.questions), `${label}: questions должен быть массивом`)
    if (!Array.isArray(bundle.coverageGoals) || !Array.isArray(bundle.questions)) continue
    const goalIds = new Set()
    for (const goal of bundle.coverageGoals) {
      requireValue(object(goal), `${label}: цель покрытия должна быть объектом`)
      if (!object(goal)) continue
      unknownKeys(
        goal,
        new Set([
          "id",
          "title",
          "description",
          "requiredDifficulties",
          "reviewed",
          "priority",
          "relatedSkillIds",
        ]),
        `${label}: цель ${goal.id}`,
      )
      requireValue(
        text(goal.id) && idPattern.test(goal.id) && !goalIds.has(goal.id),
        `${label}: некорректный/повторный goal id ${goal.id}`,
      )
      goalIds.add(goal.id)
      requireValue(
        text(goal.title) && text(goal.description),
        `${label}: у цели ${goal.id} нужны title и description`,
      )
      requireValue(
        uniqueStrings(goal.requiredDifficulties) &&
          goal.requiredDifficulties.every((level) => difficulties.includes(level)),
        `${label}: у цели ${goal.id} некорректные/повторные уровни сложности`,
      )
      requireValue(typeof goal.reviewed === "boolean", `${label}: у цели ${goal.id} нужен reviewed`)
      requireValue(
        goal.priority === undefined || ["core", "extended", "specialist"].includes(goal.priority),
        `${label}: неизвестный приоритет цели ${goal.id}`,
      )
      requireValue(
        goal.relatedSkillIds === undefined || uniqueStrings(goal.relatedSkillIds),
        `${label}: некорректные relatedSkillIds`,
      )
    }
    const orders = new Set()
    for (const sourceQuestion of bundle.questions) {
      const question = structuredClone(sourceQuestion)
      requireValue(object(question), `${label}: вопрос должен быть объектом`)
      if (!object(question)) continue
      const name = `${label}: ${question.id}`
      unknownKeys(question, questionKeys, name)
      requireValue(
        (question.answer === undefined) !== (question.answerFile === undefined),
        `${name}: укажите ровно один из answer и answerFile`,
      )
      if (question.answerFile !== undefined) {
        try {
          question.answer = await readAnswer(question.answerFile, overrides.answers)
        } catch (error) {
          errors.push(`${name}: ${error.message}`)
        }
      }
      requireValue(text(question.id) && idPattern.test(question.id), `${name}: некорректный id`)
      requireValue(!ids.has(question.id), `${name}: ID уже используется в другом вопросе`)
      ids.add(question.id)
      for (const field of ["title", "topic", "summary", "takeaway", "moduleId"])
        requireValue(text(question[field]), `${name}: заполните ${field}`)
      requireValue(difficulties.includes(question.difficulty), `${name}: неизвестная сложность`)
      requireValue(
        strings(question.answer) && question.answer.length > 0,
        `${name}: нужен непустой answer[]`,
      )
      for (const field of ["code", "pitfall"])
        requireValue(
          question[field] === undefined || text(question[field]),
          `${name}: ${field} должен быть непустой строкой или отсутствовать`,
        )
      requireValue(
        question.popular === undefined || typeof question.popular === "boolean",
        `${name}: popular должен быть boolean`,
      )
      requireValue(
        Number.isSafeInteger(question.order) && question.order >= 0 && !orders.has(question.order),
        `${name}: некорректный/повторный order внутри подраздела`,
      )
      orders.add(question.order)
      const editorial = question.editorial
      requireValue(object(editorial), `${name}: нужен editorial`)
      if (!object(editorial)) continue
      if (editorial.sourceRefs !== undefined) {
        requireValue(
          editorial.sources === undefined,
          `${name}: используйте sources или sourceRefs, не оба поля`,
        )
        try {
          sourceRegistry ??= await readSourceRegistry()
          editorial.sources = resolveSourceRefs(
            sourceRegistry,
            subsection.sectionId,
            subsection.id,
            editorial.sourceRefs,
          )
        } catch (error) {
          errors.push(`${name}: ${error.message}`)
          editorial.sources = []
        }
      }
      unknownKeys(editorial, editorialKeys, name + ": editorial")
      requireValue(text(editorial.learningGoal), `${name}: заполните учебную цель`)
      requireValue(
        uniqueStrings(editorial.keywords),
        `${name}: keywords должен быть массивом неповторяющихся строк`,
      )
      requireValue(
        ["explanation", "application", "code-reading"].includes(editorial.kind),
        `${name}: неизвестный kind`,
      )
      requireValue(
        ["imported", "draft", "ready"].includes(editorial.reviewStatus),
        `${name}: неизвестный reviewStatus`,
      )
      requireValue(
        editorial.priority === undefined ||
          ["core", "extended", "specialist"].includes(editorial.priority),
        `${name}: неизвестный priority`,
      )
      requireValue(
        uniqueStrings(editorial.goalIds) &&
          editorial.goalIds.length > 0 &&
          editorial.goalIds.every((id) => goalIds.has(id)),
        `${name}: укажите неповторяющиеся существующие goalIds`,
      )
      requireValue(
        uniqueStrings(editorial.relatedQuestionIds),
        `${name}: relatedQuestionIds должен быть массивом неповторяющихся ID`,
      )
      requireValue(Array.isArray(editorial.sources), `${name}: sources должен быть массивом`)
      if (Array.isArray(editorial.sources)) {
        for (const source of editorial.sources) {
          if (object(source)) unknownKeys(source, new Set(["title", "url"]), name + ": источник")
          let validUrl = false
          try {
            validUrl = ["http:", "https:"].includes(new URL(source?.url).protocol)
          } catch {
            /* Report below. */
          }
          requireValue(
            object(source) && text(source.title) && validUrl,
            `${name}: источник должен иметь title и HTTP(S) url`,
          )
        }
      }
      if (editorial.reviewStatus === "ready") {
        requireValue(
          ![
            question.title,
            question.summary,
            ...(Array.isArray(question.answer) ? question.answer : []),
            question.takeaway,
            editorial.learningGoal,
          ].some((value) => typeof value === "string" && /(?:^|\n)\s*TODO:/u.test(value)),
          `${name}: заполните заготовку TODO перед переводом в ready`,
        )
        requireValue(
          Array.isArray(editorial.sources) && editorial.sources.length > 0,
          `${name}: для ready укажите хотя бы один источник`,
        )
        requireValue(
          !JSON.stringify(question).includes("\u2014"),
          `${name}: используйте дефис вместо длинного тире`,
        )
      }
      entries.push({
        question,
        editorial,
        sectionId: subsection.sectionId,
        subsectionId: subsection.id,
        sourceFile: label,
      })
    }
    bundles.push({ bundle, subsection })
  }
  fail()
  const publishedIds = new Set([
    ...referenceQuestions
      .filter((question) => question.reviewStatus !== "draft")
      .map((question) => question.id),
    ...entries
      .filter((entry) => entry.editorial.reviewStatus !== "draft")
      .map((entry) => entry.question.id),
  ])
  for (const entry of entries) {
    const links = [...entry.editorial.relatedQuestionIds]
    const markdown = [
      ...entry.question.answer,
      entry.question.summary,
      entry.question.takeaway,
      entry.question.pitfall ?? "",
    ].join("\n")
    for (const match of markdown.matchAll(/\]\(\/questions\/([a-z0-9-]+)(?:#[^)]*)?\)/g)) {
      if (!["new", "sections"].includes(match[1])) links.push(match[1])
    }
    for (const id of links) {
      requireValue(
        ids.has(id) && id !== entry.question.id,
        `${entry.question.id}: некорректная связь с ${id}`,
      )
      if (entry.editorial.reviewStatus !== "draft")
        requireValue(
          publishedIds.has(id),
          `${entry.question.id}: опубликованный ответ ссылается на черновик ${id}`,
        )
    }
    requireValue(
      subsectionIds.has(`${entry.sectionId}/${entry.subsectionId}`),
      `${entry.question.id}: неизвестный подраздел`,
    )
  }
  // A forgotten JSON bundle must not be silently omitted from the seed.
  for (const section of await readdir(sourceRoot, { withFileTypes: true })) {
    if (!section.isDirectory()) continue
    if (selection.section && section.name !== selection.section) continue
    for (const file of await readdir(resolve(sourceRoot, section.name), { withFileTypes: true })) {
      if (!file.isFile() || !file.name.endsWith(".json")) continue
      requireValue(
        expectedFiles.has(`${section.name}/${file.name}`),
        `Незарегистрированный файл: ${section.name}/${file.name}`,
      )
    }
  }
  fail()
  return { groups, sections, subsections, entries, bundles, partial, referenceQuestions }
}

export function compileCatalog(catalog) {
  const { groups, sections, subsections, entries, bundles } = catalog
  const sorted = subsections.flatMap((subsection) =>
    entries
      .filter(
        (entry) => entry.sectionId === subsection.sectionId && entry.subsectionId === subsection.id,
      )
      .sort(
        (a, b) =>
          a.question.order - b.question.order || a.question.id.localeCompare(b.question.id, "en"),
      ),
  )
  const published = sorted.filter((entry) => entry.editorial.reviewStatus !== "draft")
  const seed = {
    groups,
    sections,
    subsections,
    questions: published.map((entry) => {
      const question = Object.fromEntries(
        Object.entries(entry.question).filter(
          ([key]) => !["editorial", "answerFile"].includes(key),
        ),
      )
      return { ...question, sectionId: entry.sectionId, subsectionId: entry.subsectionId }
    }),
  }
  const index = {
    schemaVersion: 1,
    sections: sections.map((section) => ({
      id: section.id,
      title: section.title,
      subsections: subsections
        .filter((subsection) => subsection.sectionId === section.id)
        .map((subsection) => ({ id: subsection.id, title: subsection.title })),
    })),
    questions: sorted.map((entry) => ({
      id: entry.question.id,
      sectionId: entry.sectionId,
      subsectionId: entry.subsectionId,
      title: entry.question.title,
      difficulty: entry.question.difficulty,
      ...entry.editorial,
      sourceFile: entry.sourceFile,
      ...(entry.question.answerFile ? { answerFile: entry.question.answerFile } : {}),
      contentHash: createHash("sha256")
        .update(JSON.stringify(canonical(entry.question)))
        .digest("hex"),
    })),
  }
  const coverage = {
    schemaVersion: 1,
    totals: {
      questions: published.length,
      drafts: sorted.length - published.length,
      imported: published.filter((entry) => entry.editorial.reviewStatus === "imported").length,
      difficulties: counts(published.map((entry) => entry.question)),
    },
    sections: sections.map((section) => ({
      id: section.id,
      title: section.title,
      topics: bundles
        .filter((item) => item.subsection.sectionId === section.id)
        .map(({ bundle, subsection }) => ({
          id: subsection.id,
          title: subsection.title,
          scope: bundle.scope,
          goals: bundle.coverageGoals.map((goal) => {
            const linked = published.filter(
              (entry) =>
                entry.sectionId === section.id &&
                entry.subsectionId === subsection.id &&
                entry.editorial.goalIds.includes(goal.id),
            )
            const represented = new Set(linked.map((entry) => entry.question.difficulty))
            const missingDifficulties = goal.requiredDifficulties.filter(
              (level) => !represented.has(level),
            )
            const status =
              linked.length === 0
                ? "planned"
                : !goal.reviewed ||
                    linked.some((entry) => entry.editorial.reviewStatus === "imported")
                  ? "needs-review"
                  : missingDifficulties.length
                    ? "partial"
                    : "covered"
            return {
              ...goal,
              status,
              questionIds: linked.map((entry) => entry.question.id),
              difficulties: counts(linked.map((entry) => entry.question)),
              missingDifficulties,
            }
          }),
        })),
    })),
  }
  const lookup = {
    schemaVersion: 1,
    sections: index.sections,
    questions: index.questions.map((question) =>
      Object.fromEntries(
        [
          "id",
          "title",
          "learningGoal",
          "sectionId",
          "subsectionId",
          "keywords",
          "difficulty",
          "priority",
          "contentHash",
          "answerFile",
        ]
          .filter((key) => question[key] !== undefined)
          .map((key) => [
            key,
            key === "learningGoal"
              ? question[key].replace(/^Объяснить и применить правило с учётом его границ: /u, "")
              : question[key],
          ]),
      ),
    ),
  }
  return { seed, index, coverage, lookup }
}

export async function saveJson(relativeFile, value) {
  const file = resolve(root, relativeFile)
  await mkdir(dirname(file), { recursive: true })
  // Complete the temporary file first. Never truncate the existing artifact on a failed write.
  const temporary = `${file}.${process.pid}.tmp`
  await writeFile(temporary, JSON.stringify(value, null, 2) + "\n")
  await rename(temporary, file)
}

export function command(run) {
  run().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
