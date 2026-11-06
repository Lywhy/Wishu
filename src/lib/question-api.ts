import type { QuestionCatalog, QuestionStatus } from "@/data/question-catalog"
import { questionSectionColors } from "@/data/question-section-colors"

export interface CreateQuestionInput {
  requestId: string
  sectionId: string
  subsectionId: string
  title: string
  difficulty: "Базовый" | "Средний" | "Продвинутый"
  popular: boolean
  summary: string
  shortAnswer: string
  details: string
  code: string
  pitfall: string
  takeaway: string
}
export type CreatedQuestion = QuestionCatalog["questions"][number] & {
  sectionId: string
  subsectionId: string
}

export interface ServerQuestionProgress {
  questionStatuses: Record<string, QuestionStatus>
  savedQuestionIds: string[]
  autoRevealAnswers: boolean
}

export interface ProgressEntry {
  questionId: string
  status: QuestionStatus | null
  saved: boolean
}

type RawCatalog = Omit<QuestionCatalog, "sections" | "questions"> & {
  sections: Omit<QuestionCatalog["sections"][number], "color">[]
  questions: (Omit<QuestionCatalog["questions"][number], "code"> & { code: string | null })[]
}

const baseUrl = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "")

async function request<T>(path: string, method = "GET", body?: unknown): Promise<T> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), 15000)
  try {
    const response = await fetch(`${baseUrl}/questions${path}`, {
      method,
      credentials: "include",
      signal: controller.signal,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    if (!response.ok) {
      const problem = (await response.json().catch(() => null)) as { message?: unknown } | null
      throw new Error(
        (response.status === 400 || response.status === 409) && typeof problem?.message === "string"
          ? problem.message
          : response.status === 401
            ? "Сессия истекла. Обновите страницу."
            : "Не удалось выполнить запрос. Попробуйте ещё раз.",
      )
    }
    return (await response.json()) as T
  } catch (error) {
    if (controller.signal.aborted) throw new Error("Сервер не ответил вовремя.")
    if (error instanceof TypeError) throw new Error("Нет соединения с сервером.")
    throw error
  } finally {
    window.clearTimeout(timer)
  }
}

export const questionApi = {
  async create(body: CreateQuestionInput): Promise<CreatedQuestion> {
    const question = await request<Omit<CreatedQuestion, "code"> & { code: string | null }>(
      "",
      "POST",
      body,
    )
    return { ...question, code: question.code ?? undefined }
  },
  async catalog(): Promise<QuestionCatalog> {
    const catalog = await request<RawCatalog>("/catalog")
    return {
      groups: catalog.groups,
      sections: catalog.sections.map((section) => ({
        ...section,
        color: questionSectionColors[section.id] ?? "bg-muted text-foreground",
      })),
      questions: catalog.questions.map((question) => ({
        ...question,
        code: question.code ?? undefined,
      })),
    }
  },
  session: () =>
    request<{ requiresImport: boolean; progress: ServerQuestionProgress }>("/session", "POST"),
  importProgress: (entries: ProgressEntry[], autoRevealAnswers: boolean) =>
    request<ServerQuestionProgress>("/progress/import", "POST", { entries, autoRevealAnswers }),
  patchProgress: (questionId: string, body: { status?: QuestionStatus | null; saved?: boolean }) =>
    request<ProgressEntry>(`/progress/${encodeURIComponent(questionId)}`, "PATCH", body),
  settings: (autoRevealAnswers: boolean) =>
    request<{ autoRevealAnswers: boolean }>("/settings", "PATCH", { autoRevealAnswers }),
}
