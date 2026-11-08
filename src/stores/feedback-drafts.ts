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
const newSuggestion = (page: FeedbackPage): SuggestionDraft => ({
  id: crypto.randomUUID(),
  mode: page === "interviews" ? "improvement" : "content",
  details: "",
  items: [newTopic()],
})
interface Drafts {
  bug: BugDraft
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
      suggestions: {
        learn: newSuggestion("learn"),
        questions: newSuggestion("questions"),
        tasks: newSuggestion("tasks"),
        interviews: newSuggestion("interviews"),
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
            ? { bug: { id: crypto.randomUUID(), page: s.bug.page, path: s.bug.path, details: "" } }
            : { suggestions: { ...s.suggestions, [page]: newSuggestion(page) } },
        ),
    }),
    {
      name: "wishu-feedback-drafts",
      version: 1,
      storage: browserStorage<Drafts>("feedback-drafts"),
    },
  ),
)
