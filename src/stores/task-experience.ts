import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useTaskExperience = create<{
  lastTaskId: string | null
  rememberTask: (id: string) => void
}>()(
  persist((set) => ({ lastTaskId: null, rememberTask: (id) => set({ lastTaskId: id }) }), {
    name: "wishu-task-experience",
    partialize: ({ lastTaskId }) => ({ lastTaskId }),
  }),
)
