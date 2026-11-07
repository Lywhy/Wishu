import { create } from "zustand"
import { persist } from "zustand/middleware"
import { browserStorage } from "@/lib/browser-storage"
import type { QuestionStatus } from "@/data/question-catalog"
interface MockData {
  phase: "setup" | "active" | "summary"
  ids: string[]
  index: number
  ratings: Record<string, QuestionStatus>
}
interface MockInterview extends MockData {
  start: (ids: string[]) => void
  rate: (id: string, status: QuestionStatus) => void
  move: (index: number) => void
  finish: () => void
  configure: () => void
}
export const useMockInterview = create<MockInterview>()(
  persist(
    (set) => ({
      phase: "setup",
      ids: [],
      index: 0,
      ratings: {},
      start: (ids) => set({ phase: "active", ids: [...new Set(ids)], index: 0, ratings: {} }),
      rate: (id, status) => set((state) => ({ ratings: { ...state.ratings, [id]: status } })),
      move: (index) =>
        set((state) => ({ index: Math.max(0, Math.min(state.ids.length - 1, index)) })),
      finish: () => set({ phase: "summary" }),
      configure: () => set({ phase: "setup" }),
    }),
    {
      name: "wishu-mock-interview",
      storage: browserStorage<MockData>("mock-interview"),
      partialize: ({ phase, ids, index, ratings }) => ({ phase, ids, index, ratings }),
    },
  ),
)
