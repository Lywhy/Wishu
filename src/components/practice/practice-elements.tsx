import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Difficulty } from "@/data/interview-content"
import { cn } from "@/lib/utils"

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[11px] font-normal",
        level === "Базовый" &&
          "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-300",
        level === "Средний" &&
          "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-500/10 dark:text-amber-300",
        level === "Продвинутый" &&
          "border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-900 dark:bg-violet-500/10 dark:text-violet-300",
      )}
    >
      {level}
    </Badge>
  )
}

export function CodeBlock({ code, label = "Пример" }: { code: string; label?: string }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border bg-muted/40">
      <div className="border-b px-4 py-2 text-[11px] text-muted-foreground">{label}</div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 sm:text-[13px]">
        <code>{code}</code>
      </pre>
    </div>
  )
}

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
    <div className="rounded-2xl border bg-orange-50/60 p-5 dark:border-orange-900/40 dark:bg-orange-950/20">
      <p className="text-sm font-semibold">Нужно освежить теорию?</p>
      <p className="mt-2 text-xs leading-6 text-muted-foreground">
        Вернитесь к материалу по теме, а затем попробуйте ещё раз.
      </p>
      <Button
        nativeButton={false}
        variant="outline"
        size="sm"
        className="mt-4"
        render={<Link to={`/learn?module=${moduleId}`} />}
      >
        К учебным модулям
      </Button>
    </div>
  )
}
