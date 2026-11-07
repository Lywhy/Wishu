import { create } from "zustand"
import { persist } from "zustand/middleware"
import { browserStorage } from "@/lib/browser-storage"
import type { QuestionStatus } from "@/data/question-catalog"

export interface ReviewEntry {
  dueDay: string
  reviewedDay: string
  step: number
}
export function localDay(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}
interface ReviewSchedule {
  entries: Record<string, ReviewEntry>
  record: (id: string, status: QuestionStatus | null) => void
  restore: (id: string, entry: ReviewEntry | null) => void
}
const intervals = [1, 3, 7, 14, 30]
export const useReviewSchedule = create<ReviewSchedule>()(
  persist(
    (set) => ({
      entries: {},
      record: (id, status) =>
        set((state) => {
          const entries = { ...state.entries }
          if (status === null) {
            delete entries[id]
            return { entries }
          }
          if (status === "skipped") return {}
          const today = localDay()
          // Repeated clicks on the same day must not skip several repetition intervals.
          const previous = entries[id]
          const step =
            status === "repeat"
              ? 0
              : previous
                ? Math.min(
                    intervals.length - 1,
                    previous.step + (previous.reviewedDay === today ? 0 : 1),
                  )
                : 0
          const due = new Date()
          due.setDate(due.getDate() + intervals[step])
          entries[id] = { step, reviewedDay: today, dueDay: localDay(due) }
          return { entries }
        }),
      restore: (id, entry) =>
        set((state) => {
          const entries = { ...state.entries }
          if (entry) entries[id] = entry
          else delete entries[id]
          return { entries }
        }),
    }),
    {
      name: "wishu-review-schedule",
      storage: browserStorage<Pick<ReviewSchedule, "entries">>("review-schedule"),
      partialize: ({ entries }) => ({ entries }),
    },
  ),
)
