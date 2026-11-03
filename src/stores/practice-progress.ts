import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { QuestionStatus } from "@/data/question-catalog"

interface PracticeProgressData {
  questionStatuses: Record<string, QuestionStatus>
  autoRevealAnswers: boolean
  savedQuestionIds: string[]
  reviewedTaskIds: string[]
  drafts: Record<string, string>
}

interface PracticeProgress extends PracticeProgressData {
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
    (set) => ({
      questionStatuses: {},
      autoRevealAnswers: false,
      savedQuestionIds: [],
      reviewedTaskIds: [],
      drafts: {},
      setQuestionStatus: (id, status) =>
        set((state) => {
          const questionStatuses = { ...state.questionStatuses }
          if (status === null) delete questionStatuses[id]
          else questionStatuses[id] = status
          return { questionStatuses }
        }),
      setAutoRevealAnswers: (autoRevealAnswers) => set({ autoRevealAnswers }),
      toggleSaved: (id) =>
        set((state) => ({ savedQuestionIds: toggle(state.savedQuestionIds, id) })),
      toggleReviewed: (id) =>
        set((state) => ({ reviewedTaskIds: toggle(state.reviewedTaskIds, id) })),
      saveDraft: (id, code) => set((state) => ({ drafts: { ...state.drafts, [id]: code } })),
      resetDraft: (id) =>
        set((state) => {
          const drafts = { ...state.drafts }
          delete drafts[id]
          return { drafts }
        }),
    }),
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
