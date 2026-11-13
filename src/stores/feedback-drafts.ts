import { create } from "zustand"
import { persist } from "zustand/middleware"
import { browserStorage } from "@/lib/browser-storage"
import type { BugDraft, FeedbackPage, SuggestionDraft, TopicDraft } from "@/lib/platform-feedback"

const newTopic = (): TopicDraft => ({
  key: crypto.randomUUID(),
  groupId: "",
  sectionId: "",
  sectionTitle: "",
  subsectionId: "__any",
  subsectionTitle: "",
  topics: "",
})
const newSuggestion = (): SuggestionDraft => ({
  id: crypto.randomUUID(),
  mode: "improvement",
  details: "",
  items: [newTopic()],
})
interface Drafts {
  bug: BugDraft
  questionBugs: Record<string, BugDraft>
  startQuestionBug: (questionId: string, path: string, context: string) => void
  updateQuestionBug: (
    questionId: string,
    patch: Partial<
      Pick<BugDraft, "page" | "path" | "details" | "steps" | "expected" | "reason" | "fragment">
    >,
  ) => void
  resetQuestionBug: (questionId: string) => void
  suggestions: Record<FeedbackPage, SuggestionDraft>
  updateBug: (patch: Partial<Omit<BugDraft, "id">>) => void
  updateSuggestion: (page: FeedbackPage, patch: Partial<Omit<SuggestionDraft, "id">>) => void
  addTopic: (page: FeedbackPage) => void
  reset: (kind: "bug" | "suggestion", page: FeedbackPage) => void
}
export const useFeedbackDrafts = create<Drafts>()(
  persist(
    (set) => ({
      bug: { id: crypto.randomUUID(), page: "other", path: "", details: "" },
      questionBugs: {},
      startQuestionBug: (questionId, path, context) =>
        set((s) => {
          const previous = s.questionBugs?.[questionId]
          if (previous?.context === context) return s
          return {
            questionBugs: {
              ...s.questionBugs,
              [questionId]: {
                ...previous,
                id: crypto.randomUUID(),
                page: "questions",
                path,
                context,
                details: previous?.details ?? "",
              },
            },
          }
        }),
      updateQuestionBug: (questionId, patch) =>
        set((s) => {
          const draft = s.questionBugs?.[questionId]
          if (!draft) return s
          return {
            questionBugs: {
              ...s.questionBugs,
              [questionId]: { ...draft, ...patch, id: crypto.randomUUID() },
            },
          }
        }),
      resetQuestionBug: (questionId) =>
        set((s) => {
          const draft = s.questionBugs?.[questionId]
          if (!draft) return s
          return {
            questionBugs: {
              ...s.questionBugs,
              [questionId]: {
                ...draft,
                id: crypto.randomUUID(),
                details: "",
                fragment: "",
                reason: "answer",
                steps: "",
                expected: "",
              },
            },
          }
        }),
      suggestions: {
        learn: newSuggestion(),
        questions: newSuggestion(),
        tasks: newSuggestion(),
        interviews: newSuggestion(),
      },
      updateBug: (patch) => set((s) => ({ bug: { ...s.bug, ...patch, id: crypto.randomUUID() } })),
      updateSuggestion: (page, patch) =>
        set((s) => ({
          suggestions: {
            ...s.suggestions,
            [page]: { ...s.suggestions[page], ...patch, id: crypto.randomUUID() },
          },
        })),
      addTopic: (page) =>
        set((s) => {
          const draft = s.suggestions[page]
          if (draft.items.length >= 10) return s
          return {
            suggestions: {
              ...s.suggestions,
              [page]: { ...draft, id: crypto.randomUUID(), items: [...draft.items, newTopic()] },
            },
          }
        }),
      reset: (kind, page) =>
        set((s) =>
          kind === "bug"
            ? {
                bug: {
                  id: crypto.randomUUID(),
                  page: s.bug.page,
                  path: s.bug.path,
                  details: "",
                  steps: "",
                  expected: "",
                },
              }
            : { suggestions: { ...s.suggestions, [page]: newSuggestion() } },
        ),
    }),
    {
      name: "wishu-feedback-drafts",
      version: 1,
      storage: browserStorage<Drafts>("feedback-drafts"),
    },
  ),
)
