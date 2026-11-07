import { useReviewSchedule, type ReviewEntry } from "@/stores/review-schedule"
import { usePracticeProgress } from "@/stores/practice-progress"
import { useShortSession } from "@/stores/short-session"
import type { QuestionStatus } from "@/data/question-catalog"

export interface QuestionMarkUndo {
  id: string
  previous: QuestionStatus | null
  next: QuestionStatus | null
  wasDone: boolean
  reviewBefore: ReviewEntry | null
  until: number
}
let last: QuestionMarkUndo | null = null
const listeners = new Set<() => void>()
export function changeQuestionMark(id: string, status: QuestionStatus | null) {
  const previous = usePracticeProgress.getState().questionStatuses[id] ?? null
  usePracticeProgress.getState().setQuestionStatus(id, status)
  last = {
    id,
    previous,
    reviewBefore: useReviewSchedule.getState().entries[id] ?? null,
    next: status,
    until: Date.now() + 15000,
    wasDone: useShortSession.getState().done.includes(id),
  }
  listeners.forEach((fn) => fn())
}

export function getQuestionMarkUndo() {
  return last
}
export function subscribeQuestionMarkUndo(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
export function clearQuestionMarkUndo() {
  last = null
  listeners.forEach((listener) => listener())
}
