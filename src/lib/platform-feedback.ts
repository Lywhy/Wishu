import type { QuestionCatalog } from "@/data/question-catalog"

export const feedbackPages = [
  { value: "learn", label: "Обучение" },
  { value: "questions", label: "Вопросы" },
  { value: "tasks", label: "Задачи" },
  { value: "interviews", label: "Собеседования" },
] as const

export type FeedbackPage = (typeof feedbackPages)[number]["value"]
export type BugPage = FeedbackPage | "other"
export const bugReasons = [
  { value: "answer", label: "Ошибка в ответе" },
  { value: "explanation", label: "Непонятное объяснение" },
  { value: "example", label: "Ошибка в примере" },
  { value: "interface", label: "Проблема интерфейса" },
  { value: "other", label: "Другое" },
] as const
export type BugReason = (typeof bugReasons)[number]["value"]
export interface TopicDraft {
  key: string
  groupId: string
  sectionId: string
  sectionTitle: string
  subsectionId: string
  subsectionTitle: string
  topics: string
}
export interface SuggestionDraft {
  id: string
  mode: "content" | "improvement"
  details: string
  items: TopicDraft[]
}
export interface BugDraft {
  id: string
  page: BugPage
  path: string
  details: string
  steps?: string
  expected?: string
  context?: string
  reason?: BugReason
  fragment?: string
}
export interface FeedbackInput {
  id: string
  kind: "bug" | "suggestion"
  page: BugPage
  mode: "content" | "improvement"
  path: string
  details: string
  items: (Omit<TopicDraft, "key" | "topics"> & { topics: string[] })[]
}
export interface FeedbackReceipt extends Omit<FeedbackInput, "items"> {
  saved: true
  createdAt: string
  schemaVersion: 1
  items: {
    groupId: string
    groupTitle: string
    sectionId: string | null
    sectionTitle: string
    newSection: boolean
    subsectionId: string | null
    subsectionTitle: string
    newSubsection: boolean
    topics: string[]
  }[]
}

export function parseTopics(value: string) {
  return [
    ...new Map(
      value
        .split(/[,;\n]+/)
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => [t.toLocaleLowerCase("ru"), t]),
    ).values(),
  ]
}

export function feedbackPageForPath(path: string): BugPage {
  if (/^\/learn(?:\/|$)/.test(path)) return "learn"
  if (/^\/(questions|session|mock-interview)(?:\/|$)/.test(path)) return "questions"
  if (/^\/tasks(?:\/|$)/.test(path)) return "tasks"
  if (/^\/interviews(?:\/|$)/.test(path)) return "interviews"
  return "other"
}

export function downloadFeedback(
  value: FeedbackReceipt | FeedbackInput,
  catalog?: QuestionCatalog | null,
) {
  const data = {
    ...("saved" in value ? value : { schemaVersion: 1, draft: true, ...value }),
    message: feedbackMessage(value, catalog),
  }
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
  )
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = `wishu-${value.kind}-${value.id}.json`
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function normalizeFeedbackPath(value: string) {
  const trimmed = value.trim()
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      return new URL(trimmed).pathname
    } catch {
      return trimmed
    }
  }
  return trimmed.split(/[?#]/, 1)[0]
}

export function bugDetails(value: BugDraft) {
  return [
    value.context?.trim() ?? "",
    value.reason
      ? `Тип проблемы: ${bugReasons.find((item) => item.value === value.reason)?.label ?? "Другое"}`
      : "",
    value.fragment?.trim() ? `Фрагмент ответа:\n${value.fragment.trim()}` : "",
    value.details.trim(),
    value.steps?.trim() ? `Как повторить:\n${value.steps.trim()}` : "",
    value.expected?.trim() ? `Ожидаемый результат:\n${value.expected.trim()}` : "",
  ]
    .filter(Boolean)
    .join("\n\n")
}

export function feedbackMessage(
  value: FeedbackReceipt | FeedbackInput,
  catalog?: QuestionCatalog | null,
) {
  const page = feedbackPages.find((p) => p.value === value.page)?.label ?? "Другая страница"
  const summary =
    value.details
      .split("\n")
      .find((line) => line.trim())
      ?.trim() ||
    value.items
      .flatMap((item) => item.topics)
      .slice(0, 2)
      .join(", ")
  const title = `[${value.kind === "bug" ? "Баг" : "Предложение"}] ${page}${summary ? ": " + summary.slice(0, 90) : ""}`
  const body = [
    `## ${value.kind === "bug" ? "Проблема" : value.mode === "content" ? "Дополнение материалов" : "Улучшение"}`,
    `Раздел платформы: ${page}`,
    value.path ? `Страница: ${value.path}` : "",
    value.details,
    ...value.items.map((item) => {
      const section = catalog?.sections.find((s) => s.id === item.sectionId)
      const group =
        "groupTitle" in item
          ? item.groupTitle
          : (catalog?.groups.find((g) => g.id === item.groupId)?.title ?? item.groupId)
      const sectionTitle =
        "groupTitle" in item ? item.sectionTitle : (section?.title ?? item.sectionTitle)
      const subsection =
        "groupTitle" in item
          ? item.subsectionTitle
          : (section?.subsections.find((s) => s.id === item.subsectionId)?.title ??
            (item.subsectionId === "__any" ? "На усмотрение автора" : item.subsectionTitle))
      return `### ${[group, sectionTitle, subsection].filter(Boolean).join(" / ")}\n\n${item.topics.map((t) => "- " + t).join("\n")}`
    }),
    `ID обращения: ${value.id}`,
  ]
    .filter(Boolean)
    .join("\n\n")
  return { title, body }
}

export function githubIssueForFeedback(
  value: FeedbackReceipt | FeedbackInput,
  catalog?: QuestionCatalog | null,
) {
  const repository = String(import.meta.env.VITE_FEEDBACK_GITHUB_REPOSITORY ?? "").trim()
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) return null
  const { title, body } = feedbackMessage(value, catalog)
  const make = (bodyText: string) =>
    `https://github.com/${repository}/issues/new?${new URLSearchParams({ title, body: bodyText })}`
  const full = make(body)
  const attachmentRequired = full.length > 7500
  return {
    url: attachmentRequired
      ? make(
          `ID обращения: ${value.id}\n\nОбращение слишком большое для ссылки. Скопируйте полный текст в Wishu и вставьте сюда либо приложите JSON. Перед публикацией проверьте отсутствие личных данных.`,
        )
      : full,
    attachmentRequired,
  }
}
