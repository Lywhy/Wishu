import { create } from "zustand"
import { persist } from "zustand/middleware"
import { browserStorage } from "@/lib/browser-storage"
import type { InterfacePalette } from "@/lib/interface-palettes"

export type BackgroundMode = "animated" | "static" | "off"
interface InterfaceSettings {
  palette: InterfacePalette
  setPalette: (value: InterfacePalette) => void
  background: BackgroundMode
  readingSize: 14 | 16 | 18
  readingSpacing: "normal" | "relaxed" | "wide"
  setBackground: (value: BackgroundMode) => void
  setReadingSize: (value: InterfaceSettings["readingSize"]) => void
  setReadingSpacing: (value: InterfaceSettings["readingSpacing"]) => void
  reset: () => void
}
const defaults = {
  palette: "coffee",
  background: "animated",
  readingSize: 14,
  readingSpacing: "normal",
} as const
export const useInterfaceSettings = create<InterfaceSettings>()(
  persist(
    (set) => ({
      ...defaults,
      setPalette: (palette) => set({ palette }),
      setBackground: (background) => set({ background }),
      setReadingSize: (readingSize) => set({ readingSize }),
      setReadingSpacing: (readingSpacing) => set({ readingSpacing }),
      reset: () => set(defaults),
    }),
    {
      name: "wishu-interface-settings",
      storage:
        browserStorage<
          Pick<InterfaceSettings, "palette" | "background" | "readingSize" | "readingSpacing">
        >("interface"),
      partialize: ({ palette, background, readingSize, readingSpacing }) => ({
        palette,
        background,
        readingSize,
        readingSpacing,
      }),
    },
  ),
)
