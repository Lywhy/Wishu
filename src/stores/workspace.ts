import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
export interface Attempt {
  id: string
  at: string
  code: string
  passed: boolean | null
  summary: string
}
interface Workspace {
  focus: boolean
  compact: boolean
  split: number
  notes: Record<string, string>
  attempts: Record<string, Attempt[]>
  setFocus: (value: boolean) => void
  setCompact: (value: boolean) => void
  setSplit: (value: number) => void
  note: (key: string, text: string) => void
  attempt: (key: string, value: Omit<Attempt, "id" | "at">) => void
}
const memory = new Map<string, string>()
export const useWorkspace = create<Workspace>()(
  persist(
    (set) => ({
      focus: false,
      compact: false,
      split: 43,
      notes: {},
      attempts: {},
      setFocus: (focus) => set({ focus }),
      setCompact: (compact) => set({ compact }),
      setSplit: (split) => set({ split }),
      note: (key, text) => set((state) => ({ notes: { ...state.notes, [key]: text } })),
      attempt: (key, value) =>
        set((state) => ({
          attempts: {
            ...state.attempts,
            [key]: [
              { ...value, id: crypto.randomUUID(), at: new Date().toISOString() },
              ...(state.attempts[key] ?? []),
            ].slice(0, 15),
          },
        })),
    }),
    {
      name: "wishu-workspace",
      version: 1,
      storage: createJSONStorage(() => ({
        getItem: (key) => {
          try {
            return localStorage.getItem(key) ?? memory.get(key) ?? null
          } catch {
            return memory.get(key) ?? null
          }
        },
        setItem: (key, value) => {
          memory.set(key, value)
          try {
            localStorage.setItem(key, value)
          } catch {
            /* Keep the current session usable when storage is unavailable. */
          }
        },
        removeItem: (key) => {
          memory.delete(key)
          try {
            localStorage.removeItem(key)
          } catch {
            /* Memory fallback. */
          }
        },
      })),
    },
  ),
)
