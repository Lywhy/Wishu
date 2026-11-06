import { create } from "zustand"
import { persist } from "zustand/middleware"
interface Session {
  questionIds: string[]
  taskId: string | null
  done: string[]
  active: boolean
  start: (ids: string[], taskId: string | null) => void
  mark: (id: string, done: boolean) => void
  finish: () => void
}
export const useShortSession = create<Session>()(
  persist(
    (set) => ({
      questionIds: [],
      taskId: null,
      done: [],
      active: false,
      start: (questionIds, taskId) => set({ questionIds, taskId, done: [], active: true }),
      mark: (id, done) =>
        set((s) =>
          s.active && s.questionIds.includes(id)
            ? { done: done ? [...new Set([...s.done, id])] : s.done.filter((x) => x !== id) }
            : {},
        ),
      finish: () => set({ active: false }),
    }),
    { name: "wishu-short-session", version: 1 },
  ),
)
