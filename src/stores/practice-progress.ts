import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { QuestionStatus } from "@/data/question-catalog"
import { questionApi, type ProgressEntry, type ServerQuestionProgress } from "@/lib/question-api"

interface PracticeProgressData extends ServerQuestionProgress {
  reviewedTaskIds: string[]
  drafts: Record<string, string>
}

interface PracticeProgress extends PracticeProgressData {
  questionSyncReady: boolean
  questionSyncError: string | null
  pendingQuestionWrites: number
  hydrateQuestions: (progress: ServerQuestionProgress) => void
  flushQuestionWrites: () => Promise<void>
  setQuestionStatus: (id: string, status: QuestionStatus | null) => void
  setAutoRevealAnswers: (enabled: boolean) => void
  toggleSaved: (id: string) => void
  toggleReviewed: (id: string) => void
  saveDraft: (id: string, code: string) => void
  resetDraft: (id: string) => void
}

const toggle = (items: string[], id: string) =>
  items.includes(id) ? items.filter((item) => item !== id) : [...items, id]

export const usePracticeProgress = create<PracticeProgress>()(
  persist<PracticeProgress, [], [], PracticeProgressData>(
    (set, get) => {
      let writes = Promise.resolve()
      const enqueue = (job: () => Promise<void>) => {
        if (!get().questionSyncReady) return
        set((state) => ({
          pendingQuestionWrites: state.pendingQuestionWrites + 1,
          questionSyncError: null,
        }))
        writes = writes
          .then(job)
          .catch((error: unknown) => {
            set({
              questionSyncError:
                error instanceof Error ? error.message : "Не удалось сохранить изменение.",
            })
          })
          .finally(() =>
            set((state) => ({ pendingQuestionWrites: state.pendingQuestionWrites - 1 })),
          )
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
        reviewedTaskIds: [],
        drafts: {},
        questionSyncReady: false,
        questionSyncError: null,
        pendingQuestionWrites: 0,
        hydrateQuestions: (progress) =>
          set({ ...progress, questionSyncReady: true, questionSyncError: null }),
        flushQuestionWrites: () => writes,
        setQuestionStatus: (id, status) =>
          enqueue(async () => {
            applyEntry(await questionApi.patchProgress(id, { status }))
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
      version: 2,
      partialize: ({
        questionStatuses,
        autoRevealAnswers,
        savedQuestionIds,
        reviewedTaskIds,
        drafts,
      }) => ({ questionStatuses, autoRevealAnswers, savedQuestionIds, reviewedTaskIds, drafts }),
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
          reviewedTaskIds: previous.reviewedTaskIds ?? [],
          drafts: previous.drafts ?? {},
        }
      },
    },
  ),
)
