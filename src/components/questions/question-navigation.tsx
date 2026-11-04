import { useEffect, useRef } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { Card } from "@/components/ui/card"
import type { Question } from "@/data/interview-content"
import { cn } from "@/lib/utils"
import { usePracticeProgress } from "@/stores/practice-progress"

export function QuestionNavigation({ questions, title }: { questions: Question[]; title: string }) {
  const statuses = usePracticeProgress((state) => state.questionStatuses)
  const { pathname } = useLocation()
  const navigationRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const navigation = navigationRef.current
    const activeLink = navigation?.querySelector<HTMLAnchorElement>('[aria-current="page"]')
    if (!navigation || !activeLink) return

    const viewport = navigation.getBoundingClientRect()
    const active = activeLink.getBoundingClientRect()
    if (active.top < viewport.top) {
      navigation.scrollTop += active.top - viewport.top
    } else if (active.bottom > viewport.bottom) {
      navigation.scrollTop += active.bottom - viewport.bottom
    }
  }, [pathname])

  return (
    <Card className="gap-0 rounded-2xl p-4 shadow-none">
      <h2 className="px-1 text-sm font-semibold">{title}</h2>
      <p className="mt-2 px-1 text-[11px] leading-5 text-muted-foreground">Вопросы подраздела</p>
      <nav
        ref={navigationRef}
        aria-label="Вопросы подраздела"
        className="relative mt-4 max-h-84 min-h-0 scrollbar-gutter-stable overflow-y-auto overscroll-contain"
      >
        <ol className="space-y-1">
          {questions.map((question, index) => {
            const status = statuses[question.id]
            const statusLabel =
              status === "repeat"
                ? "Повторить"
                : status === "learned"
                  ? "Изучил"
                  : status === "skipped"
                    ? "Пропустить"
                    : "Без отметки"
            return (
              <li key={question.id} className="h-16">
                <NavLink
                  to={`/questions/${question.id}`}
                  title={question.title}
                  className={({ isActive }) =>
                    cn(
                      "relative flex h-full items-start gap-2.5 rounded-lg border border-transparent p-2.5 text-xs leading-5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "border-primary/15 bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )
                  }
                >
                  <span className="shrink-0 font-mono text-[10px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="line-clamp-2 min-w-0 flex-1 wrap-break-word">{question.title}</span>
                  <span className="sr-only">. {statusLabel}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-1.5 size-1.5 shrink-0 rounded-full",
                      status === "repeat"
                        ? "bg-amber-500"
                        : status === "learned"
                          ? "bg-emerald-500"
                          : status === "skipped"
                            ? "bg-violet-500"
                            : "bg-muted-foreground/30",
                    )}
                  />
                </NavLink>
              </li>
            )
          })}
        </ol>
      </nav>
    </Card>
  )
}
