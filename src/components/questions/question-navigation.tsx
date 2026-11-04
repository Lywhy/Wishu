import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { Card } from "@/components/ui/card"
import type { Question } from "@/data/interview-content"
import { cn } from "@/lib/utils"
import { usePracticeProgress } from "@/stores/practice-progress"
import type { QuestionSession } from "@/data/question-session"

export function QuestionNavigation({
  questions,
  title,
  session,
  onNavigate,
  actions,
  footer,
}: {
  questions: Question[]
  title: string
  session?: QuestionSession
  onNavigate?: () => void
  actions?: ReactNode
  footer?: ReactNode
}) {
  const statuses = usePracticeProgress((state) => state.questionStatuses)
  const { pathname } = useLocation()
  const [query, setQuery] = useState("")
  const visible = questions.filter((question) =>
    question.title.toLocaleLowerCase("ru").includes(query.trim().toLocaleLowerCase("ru")),
  )
  const learned = questions.filter((question) => statuses[question.id] === "learned").length
  const current = questions.find((question) => pathname === "/questions/" + question.id)
  const currentHidden = current && !visible.some((question) => question.id === current.id)
  const navigationRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const navigation = navigationRef.current
    const activeLink = navigation?.querySelector<HTMLAnchorElement>('[aria-current="page"]')
    if (!navigation || !activeLink) return

    const revealActive = () => {
      const viewport = navigation.getBoundingClientRect()
      if (!viewport.height) return
      const active = activeLink.getBoundingClientRect()
      if (active.top < viewport.top) navigation.scrollTop += active.top - viewport.top
      else if (active.bottom > viewport.bottom)
        navigation.scrollTop += active.bottom - viewport.bottom
    }
    revealActive()
    const observer = new ResizeObserver(revealActive)
    observer.observe(navigation)
    return () => observer.disconnect()
  }, [pathname, query])

  return (
    <Card className="gap-0 rounded-xl p-4 shadow-none">
      <h2 className="px-1 text-sm leading-6 font-semibold">{title}</h2>
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
          <span>Изучено</span>
          <span className="tabular-nums">
            {learned} / {questions.length}
          </span>
        </div>
        <Progress
          value={questions.length ? (100 * learned) / questions.length : 0}
          aria-label="Изученные вопросы подборки"
        />
      </div>
      {actions && (
        <div className="mt-4 rounded-lg border bg-muted/20 p-3">
          <p className="mb-2 text-[11px] text-muted-foreground">Ваша отметка</p>
          {actions}
        </div>
      )}
      <div className="mt-4 flex items-center gap-2">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Найти в подборке…"
          aria-label="Найти вопрос в боковом меню"
          className="h-9 min-w-0 bg-background text-xs"
        />
        {query && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setQuery("")}
            aria-label="Очистить поиск в подборке"
          >
            Сброс
          </Button>
        )}
      </div>
      {currentHidden && (
        <Button size="sm" variant="ghost" className="mt-2 w-full" onClick={() => setQuery("")}>
          Показать текущий вопрос
        </Button>
      )}
      <nav
        ref={navigationRef}
        aria-label="Вопросы подборки"
        className="relative mt-3 max-h-[min(21rem,38dvh)] min-h-0 scrollbar-gutter-stable overflow-y-auto overscroll-contain"
      >
        <ol className="space-y-1">
          {visible.map((question) => {
            const index = questions.findIndex((item) => item.id === question.id)
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
                  state={session ? { questionSession: session } : undefined}
                  onClick={onNavigate}
                  title={`${question.title} - ${statusLabel}`}
                  className={({ isActive }) =>
                    cn(
                      "relative flex h-full items-start gap-2.5 rounded-lg border border-transparent p-2 text-xs leading-4 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "border-primary/30 bg-primary/10 font-medium text-foreground ring-1 ring-primary/10 ring-inset"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )
                  }
                >
                  <span className="shrink-0 font-mono text-[10px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-2 wrap-break-word">{question.title}</span>
                    {status && (
                      <span className="mt-0.5 block text-[10px] leading-3 text-muted-foreground">
                        {statusLabel}
                      </span>
                    )}
                    {!status && <span className="sr-only">. {statusLabel}</span>}
                  </span>
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
      {!visible.length && (
        <p className="py-5 text-center text-xs leading-6 text-muted-foreground">
          В подборке нет вопросов с таким названием.
        </p>
      )}
      {footer && <div className="mt-3 border-t pt-3">{footer}</div>}
    </Card>
  )
}
