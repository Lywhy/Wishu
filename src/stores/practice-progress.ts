import { useReviewSchedule, type ReviewEntry } from "@/stores/review-schedule"
import { browserStorage } from "@/lib/browser-storage"
import { useShortSession } from "@/stores/short-session"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { QuestionStatus } from "@/data/question-catalog"
import { questionApi, type ProgressEntry, type ServerQuestionProgress } from "@/lib/question-api"

interface PracticeProgressData extends ServerQuestionProgress {
  solvedTaskIds: string[]
  reviewedTaskIds: string[]
  drafts: Record<string, string>
}

interface PracticeProgress extends PracticeProgressData {
  discardQuestionWrite: () => void
  retryQuestionWrite: () => void
  questionSavedAt: number | null
  questionSyncReady: boolean
  questionSyncError: string | null
  pendingQuestionWrites: number
  hydrateQuestions: (progress: ServerQuestionProgress) => void
  flushQuestionWrites: () => Promise<void>
  setQuestionStatus: (
    id: string,
    status: QuestionStatus | null,
    sessionDone?: boolean,
    reviewBefore?: ReviewEntry | null,
  ) => void
  setAutoRevealAnswers: (enabled: boolean) => void
  toggleSaved: (id: string) => void
  toggleReviewed: (id: string) => void
  setTaskSolved: (id: string, solved: boolean) => void
  saveDraft: (id: string, code: string) => void
  resetDraft: (id: string) => void
}

const toggle = (items: string[], id: string) =>
  items.includes(id) ? items.filter((item) => item !== id) : [...items, id]

export const usePracticeProgress = create<PracticeProgress>()(
  persist<PracticeProgress, [], [], PracticeProgressData>(
    (set, get) => {
      let writes = Promise.resolve()
      const jobs: (() => Promise<void>)[] = []
      let processing = false
      const drain = () => {
        if (processing || !jobs.length) return
        processing = true
        set({ questionSyncError: null, pendingQuestionWrites: jobs.length })
        writes = (async () => {
          while (jobs.length) {
            try {
              await jobs[0]()
            } catch (error: unknown) {
              set({
                questionSyncError:
                  error instanceof Error ? error.message : "Не удалось сохранить изменение.",
              })
              break
            }
            jobs.shift()
            set({ questionSavedAt: Date.now(), pendingQuestionWrites: jobs.length })
          }
        })().finally(() => {
          processing = false
          set({ pendingQuestionWrites: 0 })
          if (jobs.length && !get().questionSyncError) drain()
        })
      }
      const enqueue = (job: () => Promise<void>) => {
        if (!get().questionSyncReady) return
        jobs.push(job)
        if (processing) set({ pendingQuestionWrites: jobs.length })
        else if (!get().questionSyncError) drain()
      }
      const applyEntry = (entry: ProgressEntry) =>
        set((state) => {
          const questionStatuses = { ...state.questionStatuses }
          if (entry.status === null) delete questionStatuses[entry.questionId]
          else questionStatuses[entry.questionId] = entry.status
          const without = state.savedQuestionIds.filter((id) => id !== entry.questionId)
          return {
            questionStatuses,
            savedQuestionIds: entry.saved ? [...without, entry.questionId] : without,
          }
        })

      return {
        questionStatuses: {},
        autoRevealAnswers: false,
        savedQuestionIds: [],
        solvedTaskIds: [],
        reviewedTaskIds: [],
        drafts: {},
        questionSyncReady: false,
        retryQuestionWrite: drain,
        discardQuestionWrite: () => {
          if (processing) return
          jobs.shift()
          set({ questionSyncError: null, questionSavedAt: null })
          drain()
        },
        questionSavedAt: null,
        questionSyncError: null,
        pendingQuestionWrites: 0,
        hydrateQuestions: (progress) =>
          set({
            ...progress,
            questionSyncReady: true,
            ...(!jobs.length ? { questionSyncError: null } : {}),
          }),
        flushQuestionWrites: () => writes,
        setQuestionStatus: (id, status, sessionDone, reviewBefore) =>
          enqueue(async () => {
            applyEntry(await questionApi.patchProgress(id, { status }))
            if (reviewBefore !== undefined) useReviewSchedule.getState().restore(id, reviewBefore)
            else useReviewSchedule.getState().record(id, status)
            useShortSession.getState().mark(id, sessionDone ?? status !== null)
          }),
        setAutoRevealAnswers: (enabled) =>
          enqueue(async () => {
            set(await questionApi.settings(enabled))
          }),
        toggleSaved: (id) =>
          enqueue(async () => {
            applyEntry(
              await questionApi.patchProgress(id, { saved: !get().savedQuestionIds.includes(id) }),
            )
          }),
        setTaskSolved: (id, solved) =>
          set((state) => ({
            solvedTaskIds: solved
              ? [...new Set([...state.solvedTaskIds, id])]
              : state.solvedTaskIds.filter((item) => item !== id),
          })),
        toggleReviewed: (id) =>
          set((state) => ({ reviewedTaskIds: toggle(state.reviewedTaskIds, id) })),
        saveDraft: (id, code) => set((state) => ({ drafts: { ...state.drafts, [id]: code } })),
        resetDraft: (id) =>
          set((state) => {
            const drafts = { ...state.drafts }
            delete drafts[id]
            return { drafts }
          }),
      }
    },
    {
      name: "wishu-practice",
      storage: browserStorage<PracticeProgressData>("practice"),
      version: 3,
      partialize: ({
        questionStatuses,
        autoRevealAnswers,
        savedQuestionIds,
        solvedTaskIds,
        reviewedTaskIds,
        drafts,
      }) => ({
        questionStatuses,
        autoRevealAnswers,
        savedQuestionIds,
        solvedTaskIds,
        reviewedTaskIds,
        drafts,
      }),
      migrate: (persistedState) => {
        const previous = (persistedState ?? {}) as Partial<PracticeProgressData> & {
          knownQuestionIds?: string[]
        }
        const questionStatuses: Record<string, QuestionStatus> = {}
        for (const id of previous.knownQuestionIds ?? []) questionStatuses[id] = "learned"
        Object.assign(questionStatuses, previous.questionStatuses ?? {})
        return {
          questionStatuses,
          autoRevealAnswers: previous.autoRevealAnswers ?? false,
          savedQuestionIds: previous.savedQuestionIds ?? [],
          solvedTaskIds: previous.solvedTaskIds ?? [],
          reviewedTaskIds: previous.reviewedTaskIds ?? [],
          drafts: previous.drafts ?? {},
        }
      },
    },
  ),
)
