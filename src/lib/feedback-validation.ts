import type { QuestionCatalog } from "@/data/question-catalog"
import {
  bugDetails,
  normalizeFeedbackPath,
  parseTopics,
  type BugDraft,
  type SuggestionDraft,
} from "@/lib/platform-feedback"

export type TopicFieldErrors = Partial<
  Record<
    "groupId" | "sectionId" | "sectionTitle" | "subsectionId" | "subsectionTitle" | "topics",
    string
  >
>
export interface FeedbackErrors {
  details?: string
  path?: string
  form?: string
  topics: Record<string, TopicFieldErrors>
}
export function validateFeedback(
  kind: "bug" | "suggestion",
  bug: BugDraft,
  suggestion: SuggestionDraft,
  content: boolean,
  catalog: QuestionCatalog | null,
): FeedbackErrors {
  const errors: FeedbackErrors = { topics: {} }
  if (kind === "bug") {
    if (bug.details.trim().length < 10) errors.details = "Опишите проблему: не менее 10 символов."
    else if (bugDetails(bug).length > 5000)
      errors.details = "Сократите описание или дополнительные детали: всего до 5000 символов."
    const path = normalizeFeedbackPath(bug.path)
    if (path && (!path.startsWith("/") || path.startsWith("//") || /\s/.test(path)))
      errors.path = "Вставьте ссылку или путь страницы, например /questions."
    else if (path.length > 500) errors.path = "Оставьте путь страницы до 500 символов."
    return errors
  }
  if (!content) {
    if (suggestion.details.trim().length < 10)
      errors.details = "Опишите идею: не менее 10 символов."
    else if (suggestion.details.trim().length > 5000)
      errors.details = "Сократите описание до 5000 символов."
    return errors
  }
  if (suggestion.details.trim().length > 5000)
    errors.details = "Сократите комментарий до 5000 символов."
  if (!catalog) {
    errors.form = "Не удалось получить каталог. Повторите загрузку разделов."
    return errors
  }
  const targets = new Set<string>()
  for (const item of suggestion.items) {
    const fields: TopicFieldErrors = {}
    const section = catalog.sections.find(
      (s) => s.id === item.sectionId && s.group === item.groupId,
    )
    if (!catalog.groups.some((g) => g.id === item.groupId)) fields.groupId = "Выберите группу."
    if (!section && item.sectionId !== "__new") fields.sectionId = "Выберите раздел."
    if (item.sectionId === "__new" && !item.sectionTitle.trim())
      fields.sectionTitle = "Введите название нового раздела."
    if (item.subsectionId === "__new" && !item.subsectionTitle.trim())
      fields.subsectionTitle = "Введите название нового подраздела."
    if (
      !["__any", "__new"].includes(item.subsectionId) &&
      !section?.subsections.some((s) => s.id === item.subsectionId)
    )
      fields.subsectionId = "Выберите подраздел этого раздела."
    const topics = parseTopics(item.topics)
    if (!topics.length) fields.topics = "Добавьте хотя бы одну тему."
    else if (topics.length > 50 || topics.some((t) => t.length > 200))
      fields.topics = "До 50 тем, каждая - до 200 символов."
    const target = JSON.stringify([
      item.groupId,
      (section?.title ?? item.sectionTitle.trim()).toLocaleLowerCase("ru"),
      item.subsectionId === "__new"
        ? item.subsectionTitle.trim().toLocaleLowerCase("ru")
        : item.subsectionId,
    ])
    if (targets.has(target))
      fields.sectionId = "Этот раздел уже есть выше. Объедините темы в одном блоке."
    targets.add(target)
    if (Object.keys(fields).length) errors.topics[item.key] = fields
  }
  return errors
}
