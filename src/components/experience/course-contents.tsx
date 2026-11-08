import type { ReactNode } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
export function CourseContents({
  children,
  title,
  done,
  total,
}: {
  children: ReactNode
  title: string
  done: number
  total: number
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="space-y-3 rounded-xl border bg-card p-4 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold wrap-anywhere">{title}</p>
            <p className="text-xs text-muted-foreground">
              Пройдено {done} из {total}
            </p>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button size="sm" variant="outline" />}>Содержание</SheetTrigger>
            <SheetContent
              onClick={(event) => {
                if ((event.target as HTMLElement).closest("a")) setOpen(false)
              }}
            >
              <SheetTitle>Содержание: {title}</SheetTitle>
              <SheetDescription>
                Выберите этап обучения. Прогресс сохраняется в этом браузере.
              </SheetDescription>
              <div className="min-w-0 *:data-[slot=card]:border-0 *:data-[slot=card]:bg-transparent *:data-[slot=card]:p-0">
                {children}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Progress value={total ? (100 * done) / total : 0} aria-label="Прогресс модуля" />
      </div>
      <div className="hidden lg:block">{children}</div>
    </>
  )
}
