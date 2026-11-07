import { create } from "zustand"
import { persist } from "zustand/middleware"
import { browserStorage } from "@/lib/browser-storage"

export type BackgroundMode = "animated" | "static" | "off"
interface InterfaceSettings {
  background: BackgroundMode
  readingSize: 14 | 16 | 18
  readingSpacing: "normal" | "relaxed" | "wide"
  setBackground: (value: BackgroundMode) => void
  setReadingSize: (value: InterfaceSettings["readingSize"]) => void
  setReadingSpacing: (value: InterfaceSettings["readingSpacing"]) => void
  reset: () => void
}
const defaults = { background: "animated", readingSize: 14, readingSpacing: "normal" } as const
export const useInterfaceSettings = create<InterfaceSettings>()(
  persist(
    (set) => ({
      ...defaults,
      setBackground: (background) => set({ background }),
      setReadingSize: (readingSize) => set({ readingSize }),
      setReadingSpacing: (readingSpacing) => set({ readingSpacing }),
      reset: () => set(defaults),
    }),
    {
      name: "wishu-interface-settings",
      storage:
        browserStorage<Pick<InterfaceSettings, "background" | "readingSize" | "readingSpacing">>(
          "interface",
        ),
      partialize: ({ background, readingSize, readingSpacing }) => ({
        background,
        readingSize,
        readingSpacing,
      }),
    },
  ),
)
