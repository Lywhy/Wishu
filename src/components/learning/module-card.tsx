import { Toggle } from "@/components/ui/toggle"
import { BookOpen, Braces, Check, Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { LearningModule } from "@/data/learning-modules"
import { cn } from "@/lib/utils"

interface ModuleCardProps {
  module: LearningModule
  saved: boolean
  onOpen: () => void
  onSave: () => void
}

export function ModuleCard({ module, saved, onOpen, onSave }: ModuleCardProps) {
  return (
    <Card className="group h-full gap-0 rounded-2xl p-0 shadow-none transition-shadow hover:shadow-md hover:shadow-stone-200/40 dark:hover:shadow-black/20">
      <CardContent className="flex flex-1 flex-col p-5">
        <div className="mb-5 flex items-start justify-between">
          <span
            aria-hidden="true"
            className={cn(
              "flex size-12 items-center justify-center rounded-xl font-mono text-xl font-bold tracking-tighter",
              module.color,
            )}
          >
            {module.mark}
          </span>
          <Toggle
            size="sm"
            aria-label={
              saved ? `Убрать «${module.title}» из плана` : `Добавить «${module.title}» в план`
            }
            pressed={saved}
            onPressedChange={onSave}
            className={cn("text-muted-foreground", saved && "bg-primary/10 text-primary")}
          >
            {saved ? "В плане" : "В план"}
          </Toggle>
        </div>
        <div className="mb-2.5 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>{module.category}</span>
          <span aria-hidden="true">·</span>
          <span>{module.level}</span>
        </div>
        <h4 className="text-[17px] leading-6 font-semibold tracking-tight">
          <Button
            variant="ghost"
            onClick={onOpen}
            className="h-auto cursor-pointer justify-start rounded p-0 text-left text-base font-semibold whitespace-normal transition-colors outline-none group-hover:text-primary hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring"
          >
            {module.title}
          </Button>
        </h4>
        <p className="mt-2.5 flex-1 text-[13px] leading-6 text-muted-foreground">
          {module.description}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BookOpen className="size-3.5" aria-hidden="true" />
            {module.topics.length} тем
          </span>
          <span className="flex items-center gap-1.5">
            <Braces className="size-3.5" aria-hidden="true" />
            {module.tasks} {module.tasks === 4 ? "задачи" : "задач"}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="size-3.5" aria-hidden="true" />
            {module.duration}
          </span>
        </div>
      </CardContent>
      <CardFooter className="justify-between bg-transparent px-5 py-3">
        {saved ? (
          <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary">
            <Check className="size-3" aria-hidden="true" />В моём плане
          </Badge>
        ) : (
          <span className="text-xs text-muted-foreground">Теория + практика</span>
        )}
        <Button variant="ghost" size="sm" onClick={onOpen} className="-mr-2 gap-1.5 text-xs">
          Программа
        </Button>
      </CardFooter>
    </Card>
  )
}
