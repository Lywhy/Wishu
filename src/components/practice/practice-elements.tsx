import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Difficulty } from "@/data/interview-content"
import { cn } from "@/lib/utils"

const difficultyColors: Record<Difficulty, string> = {
  Базовый:
    "border-emerald-300 bg-transparent text-emerald-800 dark:border-emerald-700 dark:text-emerald-300",
  Средний:
    "border-amber-300 bg-transparent text-amber-800 dark:border-amber-700 dark:text-amber-300",
  Продвинутый: "border-red-300 bg-transparent text-red-800 dark:border-red-700 dark:text-red-300",
}

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return (
    <Badge variant="outline" className={cn("text-[11px] font-normal", difficultyColors[level])}>
      {level}
    </Badge>
  )
}

export { CodeBlock } from "@/components/practice/code-block"

export function ProgressAside({
  title,
  done,
  total,
  caption,
  children,
}: {
  title: string
  done: number
  total: number
  caption: string
  children?: ReactNode
}) {
  return (
    <Card className="gap-0 rounded-2xl py-0 shadow-none">
      <CardHeader className="p-5 pb-4">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-5">
        <div className="flex items-end justify-between">
          <span className="text-3xl font-semibold tracking-tight tabular-nums">
            {done}
            <span className="ml-1 text-sm font-normal text-muted-foreground">из {total}</span>
          </span>
          <span className="text-xs text-muted-foreground">
            {total ? Math.round((done / total) * 100) : 0}%
          </span>
        </div>
        <Progress aria-label={title} max={total || 1} value={done} />
        <p className="text-xs leading-6 text-muted-foreground">{caption}</p>
        {children}
      </CardContent>
    </Card>
  )
}

export function RelatedModule({ moduleId }: { moduleId: string }) {
  return (
    <div className="rounded-2xl border bg-card p-5 text-card-foreground shadow-none">
      <p className="text-sm font-semibold">Нужно освежить теорию?</p>
      <p className="mt-2 text-xs leading-6 text-muted-foreground">
        Вернитесь к материалу по теме, а затем попробуйте ещё раз.
      </p>
      <Button
        nativeButton={false}
        variant="outline"
        size="sm"
        className="mt-4"
        render={<Link to={`/learn/${moduleId}`} />}
      >
        К учебным модулям
      </Button>
    </div>
  )
}
