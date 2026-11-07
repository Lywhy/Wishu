import { create } from "zustand"

export interface LocalSaveState {
  error: string | null
  savedAt: number | null
  retry?: () => void
}

export const useLocalSaveStatus = create<{
  areas: Record<string, LocalSaveState>
  update: (area: string, value: LocalSaveState) => void
}>()((set) => ({
  areas: {},
  update: (area, value) => set((state) => ({ areas: { ...state.areas, [area]: value } })),
}))
