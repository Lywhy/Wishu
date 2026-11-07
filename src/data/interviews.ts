export const interviewStages = [
  { value: "applied", label: "Отклик", color: "border-border bg-muted/50 text-muted-foreground" },
  {
    value: "hr",
    label: "Знакомство с HR",
    color: "border-sky-500/20 bg-sky-500/10 text-sky-800 dark:text-sky-300",
  },
  {
    value: "technical",
    label: "Техническое интервью",
    color: "border-violet-500/20 bg-violet-500/10 text-violet-800 dark:text-violet-300",
  },
  {
    value: "assignment",
    label: "Тестовое задание",
    color: "border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-300",
  },
  {
    value: "final",
    label: "Финальный этап",
    color: "border-orange-500/20 bg-orange-500/10 text-orange-800 dark:text-orange-300",
  },
  {
    value: "offer",
    label: "Оффер",
    color: "border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
  },
  {
    value: "rejected",
    label: "Отказ",
    color: "border-rose-500/20 bg-rose-500/10 text-rose-800 dark:text-rose-300",
  },
  {
    value: "withdrawn",
    label: "Снял кандидатуру",
    color: "border-border bg-muted/50 text-muted-foreground",
  },
] as const
export type InterviewStage = (typeof interviewStages)[number]["value"]
export interface InterviewMeeting {
  id: string
  title: string
  at: string
  url: string
  notes: string
  done: boolean
}
export interface InterviewPreparationPlan {
  sectionIds: string[]
  questionIds: string[]
  taskIds: string[]
}
export interface InterviewDebriefData {
  asked: string
  difficulties: string
  conclusions: string
  nextSteps: string
}
export interface InterviewRecord {
  debrief?: InterviewDebriefData
  preparation?: InterviewPreparationPlan
  id: string
  company: string
  role: string
  vacancyUrl: string
  contact: string
  salary: string
  notes: string
  stage: InterviewStage
  archived: boolean
  createdAt: string
  updatedAt: string
  meetings: InterviewMeeting[]
  history: { at: string; stage: InterviewStage }[]
}
export type InterviewDraft = Pick<
  InterviewRecord,
  "company" | "role" | "vacancyUrl" | "contact" | "salary" | "notes" | "stage"
>
export const stageDetails = (stage: InterviewStage) =>
  interviewStages.find((item) => item.value === stage) ?? interviewStages[0]
export const isInterviewStage = (stage: string): stage is InterviewStage =>
  interviewStages.some((item) => item.value === stage)
export const isClosedStage = (stage: InterviewStage) =>
  ["offer", "rejected", "withdrawn"].includes(stage)
export function safeInterviewUrl(value: string) {
  try {
    const url = new URL(value)
    return ["https:", "http:"].includes(url.protocol) ? url.href : null
  } catch {
    return null
  }
}
export function nextInterviewMeeting(record: InterviewRecord, now: number) {
  return record.meetings
    .filter((item) => !item.done && new Date(item.at).getTime() >= now)
    .sort((a, b) => a.at.localeCompare(b.at))[0]
}
export const formatInterviewDate = (value: string) =>
  new Intl.DateTimeFormat("ru-RU", { dateStyle: "medium", timeStyle: "short" }).format(
    new Date(value),
  )
