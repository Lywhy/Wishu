import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { InterviewDraft, InterviewMeeting, InterviewRecord } from "@/data/interviews"
export const useInterviewStorage = create<{ error: string | null }>(() => ({ error: null }))
const memory = new Map<string, string>()
const storage = createJSONStorage(() => ({
  getItem: (key: string) => {
    try {
      return localStorage.getItem(key) ?? memory.get(key) ?? null
    } catch {
      useInterviewStorage.setState({
        error: "Хранилище браузера недоступно. Записи будут доступны только до закрытия страницы.",
      })
      return memory.get(key) ?? null
    }
  },
  setItem: (key: string, value: string) => {
    memory.set(key, value)
    try {
      localStorage.setItem(key, value)
      useInterviewStorage.setState({ error: null })
    } catch {
      useInterviewStorage.setState({
        error:
          "Не удалось сохранить записи в браузере. Скачайте резервную копию перед закрытием страницы.",
      })
    }
  },
  removeItem: (key: string) => {
    memory.delete(key)
    try {
      localStorage.removeItem(key)
    } catch {
      useInterviewStorage.setState({ error: "Хранилище браузера недоступно." })
    }
  },
}))
interface Tracker {
  records: InterviewRecord[]
  save: (draft: InterviewDraft, id?: string) => string
  archive: (id: string, value: boolean) => void
  remove: (id: string) => void
  meeting: (id: string, draft: Omit<InterviewMeeting, "id" | "done">, meetingId?: string) => void
  completeMeeting: (id: string, meetingId: string, done: boolean) => void
}
export const useInterviewTracker = create<Tracker>()(
  persist(
    (set) => ({
      records: [],
      save: (draft, id) => {
        const key = id ?? crypto.randomUUID(),
          at = new Date().toISOString()
        set((state) => {
          const existing = state.records.find((item) => item.id === key)
          const record: InterviewRecord = existing
            ? {
                ...existing,
                ...draft,
                updatedAt: at,
                history:
                  existing.stage === draft.stage
                    ? existing.history
                    : [...existing.history, { at, stage: draft.stage }],
              }
            : {
                ...draft,
                id: key,
                createdAt: at,
                updatedAt: at,
                archived: false,
                meetings: [],
                history: [{ at, stage: draft.stage }],
              }
          return {
            records: existing
              ? state.records.map((item) => (item.id === key ? record : item))
              : [record, ...state.records],
          }
        })
        return key
      },
      remove: (id) =>
        set((state) => ({ records: state.records.filter((record) => record.id !== id) })),
      archive: (id, value) =>
        set((state) => ({
          records: state.records.map((item) =>
            item.id === id
              ? { ...item, archived: value, updatedAt: new Date().toISOString() }
              : item,
          ),
        })),
      meeting: (id, draft, meetingId) =>
        set((state) => ({
          records: state.records.map((item) =>
            item.id === id
              ? {
                  ...item,
                  meetings: meetingId
                    ? item.meetings.map((value) =>
                        value.id === meetingId ? { ...value, ...draft } : value,
                      )
                    : [...item.meetings, { ...draft, id: crypto.randomUUID(), done: false }],
                  updatedAt: new Date().toISOString(),
                }
              : item,
          ),
        })),
      completeMeeting: (id, meetingId, done) =>
        set((state) => ({
          records: state.records.map((item) =>
            item.id === id
              ? {
                  ...item,
                  meetings: item.meetings.map((value) =>
                    value.id === meetingId ? { ...value, done } : value,
                  ),
                  updatedAt: new Date().toISOString(),
                }
              : item,
          ),
        })),
    }),
    {
      name: "wishu-interviews",
      version: 1,
      storage,
      partialize: (state) => ({ records: state.records }),
    },
  ),
)
