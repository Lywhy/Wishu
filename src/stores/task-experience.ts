import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { TaskCheckResult } from "@/lib/task-checker"
import type { editor } from "monaco-editor"
import { browserStorage } from "@/lib/browser-storage"

interface TaskExperienceData {
  lastTaskId: string | null
  editorStates: Record<string, editor.ICodeEditorViewState>
  resultTabs: Record<string, "tests" | "console">
}
interface TaskExperience extends TaskExperienceData {
  checkRuns: Record<string, { code: string; results: TaskCheckResult[] }>
  cacheCheck: (id: string, code: string, results: TaskCheckResult[]) => void
  clearCheck: (id: string) => void
  rememberTask: (id: string) => void
  saveEditorState: (id: string, value: editor.ICodeEditorViewState) => void
  setResultTab: (id: string, value: "tests" | "console") => void
}
export const useTaskExperience = create<TaskExperience>()(
  persist(
    (set, get) => ({
      checkRuns: {},
      cacheCheck: (id, code, results) =>
        set((state) => ({
          checkRuns: Object.fromEntries(
            [
              ...Object.entries(state.checkRuns).filter(([key]) => key !== id),
              [id, { code, results }],
            ].slice(-12),
          ),
        })),
      clearCheck: (id) => {
        if (!get().checkRuns[id]) return
        const checkRuns = { ...get().checkRuns }
        delete checkRuns[id]
        set({ checkRuns })
      },
      lastTaskId: null,
      editorStates: {},
      resultTabs: {},
      rememberTask: (lastTaskId) => set({ lastTaskId }),
      saveEditorState: (id, value) =>
        set((state) => ({
          editorStates: Object.fromEntries(
            [
              ...Object.entries(state.editorStates).filter(([key]) => key !== id),
              [id, value],
            ].slice(-40),
          ),
        })),
      setResultTab: (id, value) =>
        set((state) => ({ resultTabs: { ...state.resultTabs, [id]: value } })),
    }),
    {
      name: "wishu-task-experience",
      storage: browserStorage<TaskExperienceData>("task-view"),
      partialize: ({ lastTaskId, editorStates, resultTabs }) => ({
        lastTaskId,
        editorStates,
        resultTabs,
      }),
    },
  ),
)
