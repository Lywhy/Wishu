import { create } from "zustand"
import { persist } from "zustand/middleware"
interface LearningProgress {
  lastStepBySection: Record<string, string>
  lastSectionId: string | null
  rememberStep: (sectionId: string, stepId: string) => void
  completed: string[]
  drafts: Record<string, string>
  setCompleted: (id: string, done: boolean) => void
  saveDraft: (id: string, code: string) => void
}
export const useLearningProgress = create<LearningProgress>()(
  persist(
    (set) => ({
      completed: [],
      lastStepBySection: {},
      lastSectionId: null,
      rememberStep: (sectionId, stepId) =>
        set((state) => ({
          lastStepBySection: { ...state.lastStepBySection, [sectionId]: stepId },
          lastSectionId: sectionId,
        })),
      drafts: {},
      setCompleted: (id, done) =>
        set((state) => ({
          completed: done
            ? [...new Set([...state.completed, id])]
            : state.completed.filter((value) => value !== id),
        })),
      saveDraft: (id, code) => set((state) => ({ drafts: { ...state.drafts, [id]: code } })),
    }),
    { name: "wishu-learning-progress", version: 1 },
  ),
)
