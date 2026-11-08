export const feedbackPages = [
  { value: "learn", label: "Обучение" },
  { value: "questions", label: "Вопросы" },
  { value: "tasks", label: "Задачи" },
  { value: "interviews", label: "Собеседования" },
] as const

export type FeedbackPage = (typeof feedbackPages)[number]["value"]
export type BugPage = FeedbackPage | "other"
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

export function downloadFeedback(value: FeedbackReceipt | FeedbackInput) {
  const data = "saved" in value ? value : { schemaVersion: 1, draft: true, ...value }
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

export function githubIssueForFeedback(value: FeedbackReceipt) {
  const repository = String(import.meta.env.VITE_FEEDBACK_GITHUB_REPOSITORY ?? "").trim()
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) return null
  const page = feedbackPages.find((p) => p.value === value.page)?.label ?? "Другая страница"
  const title = `[${value.kind === "bug" ? "Баг" : "Предложение"}] ${page}`
  const body = [
    `## ${title}`,
    `ID обращения: ${value.id}`,
    value.path ? `Страница: ${value.path}` : "",
    value.details,
    ...value.items.map(
      (item) =>
        `### ${item.groupTitle} / ${item.sectionTitle} / ${item.subsectionTitle}\n\n${item.topics.map((t) => "- " + t).join("\n")}`,
    ),
  ]
    .filter(Boolean)
    .join("\n\n")
  const make = (bodyText: string) =>
    `https://github.com/${repository}/issues/new?${new URLSearchParams({ title, body: bodyText })}`
  const full = make(body)
  const attachmentRequired = full.length > 7500
  return {
    url: attachmentRequired
      ? make(
          `ID обращения: ${value.id}\n\nОбращение слишком большое для ссылки. Скачайте JSON в Wishu и приложите его к этому issue. Перед публикацией проверьте отсутствие личных данных.`,
        )
      : full,
    attachmentRequired,
  }
}
