import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { CodeBlock, DifficultyBadge, RelatedModule } from "@/components/practice/practice-elements"
import { practiceTasks, type PracticeTask } from "@/data/interview-content"
import { usePracticeProgress } from "@/stores/practice-progress"
import { ComingSoonPage } from "@/components/app-layout"

export function TaskDetailPage() {
  const { taskId } = useParams()
  const task = practiceTasks.find((item) => item.id === taskId)
  return task ? (
    <TaskView key={task.id} task={task} />
  ) : (
    <ComingSoonPage
      title="Задача не найдена"
      description="Возможно, ссылка устарела. Выберите другую задачу в каталоге."
    />
  )
}

function TaskView({ task }: { task: PracticeTask }) {
  const [revealed, setRevealed] = useState(false)
  const draft = usePracticeProgress((state) => state.drafts[task.id])
  const saveDraft = usePracticeProgress((state) => state.saveDraft)
  const resetDraft = usePracticeProgress((state) => state.resetDraft)
  const reviewed = usePracticeProgress((state) => state.reviewedTaskIds.includes(task.id))
  const toggleReviewed = usePracticeProgress((state) => state.toggleReviewed)
  const next = practiceTasks[practiceTasks.findIndex((item) => item.id === task.id) + 1]

  return (
    <>
      <Link
        to="/tasks"
        className="mb-7 inline-block rounded text-xs text-muted-foreground outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
      >
        Все задачи
      </Link>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-xs text-muted-foreground">Задача {task.number}</span>
        <Badge variant="secondary">{task.topic}</Badge>
        <DifficultyBadge level={task.difficulty} />
        <span className="ml-auto text-xs text-muted-foreground">Около {task.duration}</span>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{task.title}</h1>
      <div className="mt-7 grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <article className="min-w-0 space-y-6">
          <Card className="rounded-2xl shadow-none">
            <CardContent className="space-y-5">
              <div>
                <h2 className="text-base font-semibold">Условие</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{task.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold">На что обратить внимание</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
                  {task.requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <CodeBlock code={task.example} label="Входные данные и ожидаемый результат" />
            </CardContent>
          </Card>
          <RelatedModule moduleId={task.moduleId} />
        </article>
        <div className="min-w-0 space-y-5">
          <Card className="gap-0 rounded-2xl py-0 shadow-none">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
              <label htmlFor="task-code" className="text-sm font-semibold">
                Ваше решение
              </label>
              <span className="font-mono text-xs text-muted-foreground">
                {task.topic === "TypeScript"
                  ? "TypeScript"
                  : task.topic === "React"
                    ? "JSX"
                    : "JavaScript"}
              </span>
            </div>
            <div className="p-4">
              <Textarea
                id="task-code"
                aria-describedby="draft-note"
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                value={draft ?? task.starter}
                onChange={(event) => saveDraft(task.id, event.target.value)}
                className="min-h-80 resize-y rounded-lg border-0 bg-muted/40 p-4 font-mono text-[13px] leading-7 shadow-none focus-visible:ring-2"
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p id="draft-note" className="text-[11px] text-muted-foreground">
                  Черновик сохраняется в этом браузере.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={draft === undefined}
                  onClick={() => resetDraft(task.id)}
                >
                  Сбросить код
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t p-4">
              <Button
                variant={revealed ? "outline" : "default"}
                aria-expanded={revealed}
                aria-controls="task-solution"
                onClick={() => setRevealed(!revealed)}
              >
                {revealed ? "Скрыть разбор" : "Посмотреть разбор"}
              </Button>
              <Button
                variant={reviewed ? "secondary" : "outline"}
                aria-pressed={reviewed}
                onClick={() => toggleReviewed(task.id)}
              >
                {reviewed ? "Вернуть к практике" : "Отметить разобранной"}
              </Button>
            </div>
          </Card>
          <p className="text-xs leading-6 text-muted-foreground">
            Код здесь не запускается и автоматически не проверяется. Сравните свой подход с разбором
            и оцените результат самостоятельно.
          </p>
          {revealed && (
            <section id="task-solution" className="space-y-4 rounded-2xl border bg-card p-5">
              <h2 className="text-lg font-semibold">Один из вариантов решения</h2>
              <CodeBlock code={task.solution} label="Решение" />
              <p className="text-sm leading-7 text-muted-foreground">{task.explanation}</p>
              <p className="text-xs leading-6 text-muted-foreground">
                Это не единственный допустимый подход. Сравните ограничения, поведение и сложность
                алгоритма.
              </p>
            </section>
          )}
          <p role="status" className="text-xs text-muted-foreground">
            {reviewed ? "Вы отметили задачу разобранной." : "Задача ещё не отмечена разобранной."}
          </p>
          {next && (
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link to={`/tasks/${next.id}`} />}
            >
              Следующая задача
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
