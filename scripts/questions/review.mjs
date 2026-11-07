import { resolve } from "node:path"
import { equal, outputs, readJson, root } from "./catalog.mjs"

export async function changes(compiled, selection, batch) {
  const baseline = batch ? batch.baseline : (await readJson(resolve(root, outputs.index))).questions
  const old = new Map(baseline.map((item) => [item.id, item]))
  const selected = (item) =>
    (!selection.section || item.sectionId === selection.section) &&
    (!selection.subsection || item.subsectionId === selection.subsection)
  const current = compiled.index.questions.filter(selected)
  const currentIds = new Set(current.map((item) => item.id))
  const added = current.filter((item) => !old.has(item.id))
  const updated = current.filter(
    (item) => old.has(item.id) && !equal(old.get(item.id).contentHash, item.contentHash),
  )
  const removed = baseline.filter((item) => (batch || selected(item)) && !currentIds.has(item.id))
  return { added, updated, removed, ids: new Set([...added, ...updated].map((item) => item.id)) }
}

export function technicalSummary(catalog, compiled, delta) {
  const levelCounts = (items) =>
    Object.fromEntries(
      ["Базовый", "Средний", "Продвинутый"].map((level) => [
        level,
        items.filter((item) => item.difficulty === level).length,
      ]),
    )
  const missing = [],
    unresolvedReview = []
  for (const entry of catalog.entries) {
    const question = entry.question
    if (
      [question.summary, ...question.answer, question.takeaway, entry.editorial.learningGoal].some(
        (value) => /(?:^|\n)\s*TODO:/u.test(value),
      )
    )
      missing.push(question.id)
    if (!entry.editorial.sources.length || entry.editorial.reviewStatus === "imported")
      unresolvedReview.push(question.id)
  }
  const goals = compiled.coverage.sections.flatMap((section) =>
    section.topics.flatMap((topic) =>
      topic.goals.map((goal) => ({ sectionId: section.id, subsectionId: topic.id, ...goal })),
    ),
  )
  return {
    scope: catalog.partial ? "selected-sources-and-last-index" : "all-sources",
    questions: catalog.entries.length,
    added: delta.added.length,
    updated: delta.updated.length,
    removed: delta.removed.length,
    levels: levelCounts(compiled.index.questions),
    changedLevels: levelCounts([...delta.added, ...delta.updated]),
    priorities: Object.fromEntries(
      ["core", "extended", "specialist"].map((priority) => [
        priority,
        compiled.index.questions.filter((item) => (item.priority ?? "core") === priority).length,
      ]),
    ),
    drafts: compiled.index.questions
      .filter((item) => item.reviewStatus === "draft")
      .map((item) => item.id),
    todo: missing,
    needsEditorialReview: unresolvedReview,
    plannedSkills: goals
      .filter((goal) => goal.status === "planned")
      .map((goal) => `${goal.sectionId}/${goal.subsectionId}/${goal.id}`),
    structurallyValid: true,
    note: "Структура и внутренние связи проверены загрузчиком. HTTP-доступность источников и правильность ответов автоматически не проверялись.",
  }
}
