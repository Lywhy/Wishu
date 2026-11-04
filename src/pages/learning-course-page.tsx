import { useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { LearningMarkdown } from "@/components/learning/learning-markdown"
import { LearningPractice } from "@/components/learning/learning-practice"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { useLearningProgress } from "@/stores/learning-progress"
import { courseSteps, stepKey, stepCompleted } from "@/data/learning-course"
import { cn } from "@/lib/utils"
export function LearningCoursePage() {
  const { sectionId, stepId } = useParams()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
    document.getElementById("learning-heading")?.focus({ preventScroll: true })
  }, [sectionId, stepId])
  const { questionSections, questions } = useQuestionCatalog()
  const completed = useLearningProgress((state) => state.completed)
  const mark = useLearningProgress((state) => state.setCompleted)
  const section = questionSections.find((item) => item.id === sectionId)
  if (!section || section.inDevelopment)
    return (
      <div className="space-y-4 py-16">
        <h1 className="text-xl font-semibold">Этот модуль пока недоступен</h1>
        <Link className="text-primary underline" to="/learn">
          Вернуться к обучению
        </Link>
      </div>
    )
  const steps = courseSteps(section, questions)
  if (!steps.length) return <Navigate to="/learn" replace />
  if (!stepId)
    return (
      <Navigate
        to={`/learn/${section.id}/${steps.find((step) => !stepCompleted(section.id, step, completed))?.id ?? steps[0].id}`}
        replace
      />
    )
  const index = steps.findIndex((step) => step.id === stepId)
  const step = steps[index]
  if (!step) return <Navigate to={`/learn/${section.id}`} replace />
  const key = stepKey(section.id, step.id),
    done = stepCompleted(section.id, step, completed)
  const doneCount = steps.filter((item) => stepCompleted(section.id, item, completed)).length
  const base = `/learn/${section.id}/`
  const foundations = steps.filter((item) => item.kind === "lecture" && item.id !== step.id)
  return (
    <>
      <QuestionBreadcrumbs
        items={[
          { label: "Обучение", to: "/learn" },
          { label: section.title, to: `/learn/${section.id}` },
          { label: step.title },
        ]}
      />
      <div className="grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="min-w-0 lg:sticky lg:top-5">
          <Card className="gap-4 rounded-xl p-4 shadow-none">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-lg border border-current/25 font-mono font-semibold",
                  section.color,
                )}
              >
                {section.mark}
              </span>
              <div>
                <h2 className="text-sm font-semibold">{section.title}</h2>
                <p className="text-xs text-muted-foreground">
                  {doneCount} из {steps.length} этапов
                </p>
              </div>
            </div>
            <Progress value={(100 * doneCount) / steps.length} aria-label="Прогресс обучения" />
            <nav aria-label="Содержание модуля" className="max-h-[65vh] space-y-1 overflow-y-auto">
              {steps.map((item, i) => {
                const passed = stepCompleted(section.id, item, completed)
                return (
                  <Link
                    key={item.id}
                    to={base + item.id}
                    aria-current={item.id === step.id ? "step" : undefined}
                    className={cn(
                      "block rounded-lg border border-transparent p-3 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      item.id === step.id ? "border-primary/20 bg-primary/5" : "hover:bg-muted",
                    )}
                  >
                    <span className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                      <span>
                        {String(i + 1).padStart(2, "0")} ·{" "}
                        {item.kind === "lecture" ? "Лекция" : "Практика"}
                      </span>
                      {passed && (
                        <span className="text-emerald-700 dark:text-emerald-400">Пройдено</span>
                      )}
                    </span>
                    <span className="mt-1 block text-xs leading-5 font-medium">{item.title}</span>
                  </Link>
                )
              })}
            </nav>
            <Link to="/learn" className="text-xs text-primary underline underline-offset-4">
              Выбрать другой модуль
            </Link>
          </Card>
        </aside>
        <section key={key} className="min-w-0 space-y-6">
          <header>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{step.kind === "lecture" ? "Лекция" : "Практика"}</Badge>
              <span className="text-xs text-muted-foreground">
                Этап {index + 1} из {steps.length}
              </span>
              {done && (
                <Badge
                  variant="outline"
                  className="border-emerald-400/40 text-emerald-700 dark:text-emerald-400"
                >
                  Пройдено
                </Badge>
              )}
            </div>
            <h1
              id="learning-heading"
              tabIndex={-1}
              className="text-2xl font-semibold tracking-tight outline-none sm:text-3xl"
            >
              {step.title}
            </h1>
          </header>
          {step.kind === "lecture" ? (
            <Card className="gap-5 rounded-xl p-5 shadow-none sm:p-8">
              <LearningMarkdown content={step.markdown ?? ""} topic={section.title} />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5">
                <p className="text-xs leading-6 text-muted-foreground">
                  Разобрались в материале? Отметьте лекцию как пройденную.
                </p>
                <Button
                  variant={done ? "secondary" : "default"}
                  aria-pressed={done}
                  onClick={() => mark(key, !done)}
                >
                  {done ? "Пройдено" : "Отметить пройденным"}
                </Button>
              </div>
            </Card>
          ) : (
            <>
              <p className="text-sm leading-7 text-muted-foreground">
                Выполните {step.tasks.length} задания по материалу. У каждого один тест. Этап
                отметится автоматически, когда все задания будут приняты.
              </p>
              {step.tasks.map((task, i) => (
                <LearningPractice
                  key={key + task.id}
                  task={task}
                  progressKey={key + ":" + task.id}
                  index={i}
                />
              ))}
            </>
          )}
          <section className="rounded-xl border bg-muted/20 p-5" aria-label="Основы">
            <h2 className="text-sm font-semibold">Основы</h2>
            <p className="mt-1 text-xs leading-6 text-muted-foreground">
              Вернитесь к опорным материалам, если нужно освежить теорию.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
              {foundations.length ? (
                foundations.map((item) => (
                  <Link
                    key={item.id}
                    className="text-xs text-primary underline underline-offset-4"
                    to={base + item.id}
                  >
                    {item.title}
                  </Link>
                ))
              ) : (
                <Link className="text-xs text-primary underline underline-offset-4" to="/learn">
                  Модули обучения
                </Link>
              )}
            </div>
          </section>
          <nav aria-label="Переход между этапами" className="flex gap-3">
            {index > 0 ? (
              <Button
                nativeButton={false}
                variant="outline"
                className="h-10 flex-1"
                render={<Link to={base + steps[index - 1].id} />}
              >
                Предыдущий этап
              </Button>
            ) : (
              <Button variant="outline" className="h-10 flex-1" disabled>
                Предыдущий этап
              </Button>
            )}
            {index < steps.length - 1 ? (
              <Button
                nativeButton={false}
                className="h-10 flex-1"
                render={<Link to={base + steps[index + 1].id} />}
              >
                Следующий этап
              </Button>
            ) : (
              <Button nativeButton={false} className="h-10 flex-1" render={<Link to="/learn" />}>
                К модулям
              </Button>
            )}
          </nav>
        </section>
      </div>
    </>
  )
}
