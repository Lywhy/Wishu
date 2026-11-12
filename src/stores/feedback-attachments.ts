import { create } from "zustand"
import type { FeedbackScreenshot } from "@/lib/feedback-attachments"

// Images stay in memory so switching between the dialog and full form keeps them,
// without filling localStorage with base64 data.
export const useFeedbackAttachments = create<{
  items: Record<string, FeedbackScreenshot[]>
  set: (key: string, images: FeedbackScreenshot[]) => void
}>()((set) => ({
  items: {},
  set: (key, images) => set((state) => ({ items: { ...state.items, [key]: images } })),
}))
