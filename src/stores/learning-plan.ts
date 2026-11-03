import { create } from "zustand"
import { persist } from "zustand/middleware"

interface LearningPlanState {
  savedModuleIds: string[]
  toggleModule: (id: string) => void
}

export const useLearningPlan = create<LearningPlanState>()(
  persist(
    (set) => ({
      savedModuleIds: [],
      toggleModule: (id) =>
        set((state) => ({
          savedModuleIds: state.savedModuleIds.includes(id)
            ? state.savedModuleIds.filter((savedId) => savedId !== id)
            : [...state.savedModuleIds, id],
        })),
    }),
    { name: "wishu-learning-plan", version: 1 },
  ),
)
