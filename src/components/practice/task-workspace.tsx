import type { ReactNode } from "react"
import { useState, useSyncExternalStore } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { useWorkspace } from "@/stores/workspace"
import { cn } from "@/lib/utils"

const desktopQuery = "(min-width: 1280px)"
function subscribe(callback: () => void) {
  const media = window.matchMedia(desktopQuery)
  media.addEventListener("change", callback)
  return () => media.removeEventListener("change", callback)
}
const desktopSnapshot = () => window.matchMedia(desktopQuery).matches
const serverSnapshot = () => false

export function TaskWorkspace({
  condition,
  children,
  expanded = false,
}: {
  condition: ReactNode
  children: ReactNode
  expanded?: boolean
}) {
  const desktop = useSyncExternalStore(subscribe, desktopSnapshot, serverSnapshot)
  const focus = useWorkspace((state) => state.focus)
  const split = useWorkspace((state) => state.split)
  const setSplit = useWorkspace((state) => state.setSplit)
  const [initialSplit] = useState(() => Math.min(65, Math.max(30, split)))
  const horizontal = desktop && !focus && !expanded
  const stackedPanel = !horizontal && "w-full! basis-auto! grow-0!"
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      disabled={!horizontal}
      className={cn(
        "h-auto! items-stretch overflow-visible!",
        !horizontal &&
          "flex-col! gap-5 *:data-[slot=resizable-panel]:h-auto! *:data-[slot=resizable-panel]:max-h-none! *:data-[slot=resizable-panel]:flex-none!",
      )}
      onLayoutChanged={(layout, meta) => {
        if (horizontal && meta.isUserInteraction) {
          const value = (meta.requestedLayout ?? layout).condition
          if (Number.isFinite(value)) setSplit(Math.min(65, Math.max(30, Math.round(value))))
        }
      }}
    >
      <ResizablePanel
        id="condition"
        defaultSize={`${initialSplit}%`}
        minSize={horizontal ? "30%" : 0}
        maxSize={horizontal ? "65%" : "100%"}
        className={stackedPanel || undefined}
        style={{ overflow: "visible", display: expanded ? "none" : undefined }}
      >
        {condition}
      </ResizablePanel>
      <ResizableHandle
        withHandle
        disabled={!horizontal}
        aria-label="Изменить ширину условия задачи"
        className={cn(
          "mx-2 w-2 shrink-0 rounded-full bg-transparent transition-colors duration-150 hover:bg-primary/15 focus-visible:bg-primary/15 motion-reduce:transition-none [&>div]:bg-primary/45",
          !horizontal && "hidden",
        )}
      />
      <ResizablePanel
        id="solution"
        defaultSize={`${100 - initialSplit}%`}
        minSize={horizontal ? "35%" : 0}
        className={stackedPanel || undefined}
        style={{ overflow: "visible" }}
      >
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
