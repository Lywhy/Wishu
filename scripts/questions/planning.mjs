import { resolve } from "node:path"
import { readdir } from "node:fs/promises"
import { readJson, root } from "./catalog.mjs"

export const priorities = ["core", "extended", "specialist"]
export function batchPath(id) {
  if (typeof id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))
    throw new Error("Некорректный ID пакета")
  return `content/batches/${id}.json`
}
export async function readBatch(id) {
  const batch = await readJson(resolve(root, batchPath(id)))
  if (batch.id !== id || batch.schemaVersion !== 1 || !Array.isArray(batch.baseline))
    throw new Error(`Некорректный план ${id}`)
  return batch
}
export async function planningData(catalog) {
  const bank = await readJson(resolve(root, "content/references/sources.json"))
  const journal = await readJson(resolve(root, "content/decisions.json"))
  const knownTopics = new Set(catalog.subsections.map((item) => `${item.sectionId}/${item.id}`))
  const knownIds = new Set([
    ...catalog.entries.map((item) => item.question.id),
    ...catalog.referenceQuestions.map((item) => item.id),
  ])
  if (
    bank.schemaVersion !== 1 ||
    !Array.isArray(bank.topics) ||
    journal.schemaVersion !== 1 ||
    !Array.isArray(journal.entries)
  )
    throw new Error("Некорректная структура источников или журнала решений")
  const errors = [],
    topicKeys = new Set(),
    decisionIds = new Set()
  const preparation = await readJson(resolve(root, "content/preparation/catalog.json"))
  if (
    preparation.schemaVersion !== 1 ||
    !["profiles", "exemplars", "boundaries", "versionNotes", "interviewFeedback"].every((key) =>
      Array.isArray(preparation[key]),
    )
  )
    throw new Error("Некорректный реестр подготовки")
  for (const profile of preparation.profiles)
    if (
      typeof profile.id !== "string" ||
      !Array.isArray(profile.focusSections) ||
      !profile.focusSections.every((id) => catalog.sections.some((section) => section.id === id)) ||
      !Array.isArray(profile.targetLevels) ||
      !profile.targetLevels.every((level) => ["Базовый", "Средний", "Продвинутый"].includes(level))
    )
      errors.push(`Некорректный профиль ${profile.id}`)
  for (const record of [...preparation.exemplars, ...preparation.versionNotes])
    if (!Array.isArray(record.questionIds) || !record.questionIds.every((id) => knownIds.has(id)))
      errors.push("Неизвестный ID в примерах/оговорках подготовки")
  const questionLevels = new Map([
    ...catalog.entries.map((entry) => [entry.question.id, entry.question.difficulty]),
    ...catalog.referenceQuestions.map((item) => [item.id, item.difficulty]),
  ])
  for (const exemplar of preparation.exemplars)
    if (
      Array.isArray(exemplar.questionIds) &&
      exemplar.questionIds.some((id) => questionLevels.get(id) !== exemplar.level)
    )
      errors.push("Уровень эталонного примера не совпадает с каталогом")
  for (const boundary of preparation.boundaries)
    if (
      !["canonicalQuestionIds", "appliedQuestionIds"].every(
        (key) => Array.isArray(boundary[key]) && boundary[key].every((id) => knownIds.has(id)),
      )
    )
      errors.push("Неизвестный ID в карте пересечений")
  for (const record of preparation.interviewFeedback)
    if (
      !Array.isArray(record.questionIds) ||
      !record.questionIds.every((id) => knownIds.has(id)) ||
      typeof record.observation !== "string" ||
      !record.observation.trim() ||
      !catalog.sections.some((section) => section.id === record.sectionId)
    )
      errors.push("Некорректная запись разбора собеседования")
  for (const topic of bank.topics) {
    const key = `${topic.sectionId}/${topic.subsectionId}`
    if (!knownTopics.has(key) || topicKeys.has(key) || !Array.isArray(topic.sources)) {
      errors.push(`Некорректная тема источников ${key}`)
      continue
    }
    topicKeys.add(key)
    const sourceIds = new Set()
    for (const source of topic.sources) {
      if (
        typeof source.id !== "string" ||
        !/^[a-z0-9-]+$/.test(source.id) ||
        sourceIds.has(source.id)
      )
        errors.push(`Некорректный или повторный ID источника в ${key}`)
      sourceIds.add(source.id)
      let valid = false
      try {
        valid = ["https:", "http:"].includes(new URL(source.url).protocol)
      } catch {
        /* Collected below. */
      }
      if (
        !valid ||
        typeof source.title !== "string" ||
        !source.title.trim() ||
        (source.checkedAt !== null && !/^\d{4}-\d{2}-\d{2}$/.test(source.checkedAt))
      )
        errors.push(`Некорректный источник в ${key}`)
    }
    if (
      topic.caveats !== undefined &&
      (!Array.isArray(topic.caveats) ||
        !topic.caveats.every((value) => typeof value === "string" && value.trim()))
    )
      errors.push(`Некорректные общие оговорки ${key}`)
  }
  for (const decision of journal.entries) {
    if (
      typeof decision.id !== "string" ||
      decisionIds.has(decision.id) ||
      !["keep", "expand", "merge", "separate", "relocate", "workflow"].includes(decision.type) ||
      typeof decision.reason !== "string" ||
      !decision.reason.trim() ||
      !Array.isArray(decision.questionIds) ||
      !decision.questionIds.every((id) => knownIds.has(id)) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(decision.date)
    )
      errors.push(`Некорректное редакторское решение ${decision.id}`)
    decisionIds.add(decision.id)
  }
  // Saved plans deliberately retain old IDs in baseline; baseline is history, not a live link.
  for (const file of await readdir(resolve(root, "content/batches"), { withFileTypes: true })) {
    if (!file.isFile() || !file.name.endsWith(".json")) continue
    const batch = await readBatch(file.name.slice(0, -5))
    if (batch.workspace) {
      const state = batch.workspace
      if (
        !Array.isArray(state.questionIds) ||
        !state.questionIds.every((id) => knownIds.has(id)) ||
        !Array.isArray(state.decisionIds) ||
        !state.decisionIds.every((id) => decisionIds.has(id)) ||
        !Array.isArray(state.nextActions) ||
        state.nextActions.length > 8 ||
        !state.nextActions.every(
          (action) => typeof action === "string" && action.trim() && action.length <= 280,
        ) ||
        !state.files ||
        typeof state.files !== "object" ||
        Array.isArray(state.files)
      )
        errors.push(`Некорректное рабочее состояние ${batch.id}`)
      else
        for (const [file, hash] of Object.entries(state.files))
          if (
            !/^(?:content\/|AGENTS\.md$)/.test(file) ||
            file.includes("..") ||
            file.includes("\\") ||
            (hash !== null && !/^[a-f0-9]{64}$/.test(hash))
          )
            errors.push(`Некорректный снимок файла в ${batch.id}`)
    }
    if (
      !knownTopics.has(`${batch.sectionId}/${batch.subsectionId}`) ||
      !["scope", "answers", "complete"].includes(batch.currentPass) ||
      typeof batch.title !== "string" ||
      !batch.title.trim()
    )
      errors.push(`Некорректная область пакета ${batch.id}`)
    for (const name of ["scopePass", "answerPass"]) {
      const pass = batch[name]
      if (
        !pass ||
        !["pending", "in-progress", "complete"].includes(pass.status) ||
        !Array.isArray(pass.remaining) ||
        !pass.remaining.every((value) => typeof value === "string")
      )
        errors.push(`Некорректный проход ${name} в ${batch.id}`)
    }
    if (!Array.isArray(batch.questionIds) || !batch.questionIds.every((id) => knownIds.has(id)))
      errors.push(`Неизвестный вопрос пакета ${batch.id}`)
    if (!Array.isArray(batch.goalIds)) errors.push(`Нужен goalIds у ${batch.id}`)
    for (const row of batch.baseline)
      if (
        typeof row.id !== "string" ||
        typeof row.contentHash !== "string" ||
        typeof row.title !== "string"
      )
        errors.push(`Некорректный baseline ${batch.id}`)
    if (batch.currentPass === "answers" && batch.scopePass?.status !== "complete")
      errors.push(`В ${batch.id} сначала завершите scopePass`)
    if (
      batch.currentPass === "complete" &&
      (batch.scopePass?.status !== "complete" ||
        batch.answerPass?.status !== "complete" ||
        batch.scopePass.remaining.length ||
        batch.answerPass.remaining.length)
    )
      errors.push(`В ${batch.id} осталась работа по проходам`)
  }
  if (errors.length) throw new Error(errors.join("\n"))
  return { bank, journal }
}
