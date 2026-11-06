import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { usePracticeProgress } from "@/stores/practice-progress"
import { useShortSession } from "@/stores/short-session"
import { practiceTasks } from "@/data/interview-content"
export function StudySessionPage() {
  const { questions } = useQuestionCatalog(),
    statuses = usePracticeProgress((s) => s.questionStatuses),
    solved = usePracticeProgress((s) => s.solvedTaskIds)
  const ids = useShortSession((s) => s.questionIds),
    done = useShortSession((s) => s.done),
    taskId = useShortSession((s) => s.taskId),
    active = useShortSession((s) => s.active)
  const items = ids.flatMap((id) => {
      const q = questions.find((q) => q.id === id)
      return q ? [q] : []
    }),
    task = practiceTasks.find((t) => t.id === taskId)
  const next = items.find((q) => !done.includes(q.id)),
    taskDone = !!task && solved.includes(task.id),
    complete = !!items.length && !next && (!task || taskDone)
  function start() {
    const ordered = [...questions].sort(
      (a, b) =>
        (statuses[a.id] === "repeat" ? 0 : !statuses[a.id] ? 1 : 2) -
        (statuses[b.id] === "repeat" ? 0 : !statuses[b.id] ? 1 : 2),
    )
    const task = practiceTasks.find((t) => !solved.includes(t.id)) ?? practiceTasks[0]
    useShortSession.getState().start(
      ordered.slice(0, 5).map((q) => q.id),
      task?.id ?? null,
    )
  }
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-semibold">Короткая подготовка</h1>
      <p className="text-sm leading-7 text-muted-foreground">
        Пять вопросов и одна задача. Сначала вопросы для повторения, затем новые. Общий прогресс
        сохраняется независимо от сессии.
      </p>
      {!ids.length ? (
        <Button onClick={start}>Начать сессию</Button>
      ) : (
        <>
          <Card className="gap-4 p-5 shadow-none">
            <h2 className="text-xl font-semibold">
              {complete ? "Сессия завершена" : active ? "Ваша подборка" : "Итоги сессии"}
            </h2>
            <p className="text-sm">
              Разобрано {done.length} из {items.length} вопросов. Задача:{" "}
              {taskDone ? "решена" : "ещё не решена"}.
            </p>
            {(!active || complete) && (
              <div className="text-sm leading-7">
                <p>
                  Изучил:{" "}
                  {items.filter((q) => done.includes(q.id) && statuses[q.id] === "learned").length}
                </p>
                <p>
                  Вернуться к повторению:{" "}
                  {items.filter((q) => done.includes(q.id) && statuses[q.id] === "repeat").length}
                </p>
                <p>
                  Пропущено:{" "}
                  {items.filter((q) => done.includes(q.id) && statuses[q.id] === "skipped").length}
                </p>
              </div>
            )}
            {active && next && (
              <Button
                nativeButton={false}
                render={
                  <Link
                    to={`/questions/${next.id}`}
                    state={{
                      questionSession: {
                        questionIds: ids,
                        returnTo: "/session",
                        title: "Короткая подготовка",
                      },
                    }}
                  />
                }
              >
                Продолжить вопросы
              </Button>
            )}
            {task && (
              <Button
                nativeButton={false}
                variant="outline"
                render={<Link to={`/tasks/${task.id}`} />}
              >
                {taskDone ? "Посмотреть задачу" : "Перейти к задаче"}
              </Button>
            )}
            {active && !complete ? (
              <Button variant="ghost" onClick={() => useShortSession.getState().finish()}>
                Закончить и посмотреть итоги
              </Button>
            ) : (
              <Button onClick={start}>Новая сессия</Button>
            )}
          </Card>
          <ol className="space-y-2">
            {items.map((q, i) => (
              <li key={q.id}>
                <Link
                  className="block rounded-lg border bg-card p-4 text-sm hover:bg-muted"
                  to={`/questions/${q.id}`}
                  state={{
                    questionSession: {
                      questionIds: ids,
                      returnTo: "/session",
                      title: "Короткая подготовка",
                    },
                  }}
                >
                  {i + 1}. {q.title}
                  {done.includes(q.id) ? " · Разобрано" : ""}
                </Link>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  )
}
export function SessionBanner() {
  const active = useShortSession((s) => s.active),
    done = useShortSession((s) => s.done.length),
    total = useShortSession((s) => s.questionIds.length)
  return active ? (
    <Link
      className="mb-4 block rounded-lg border bg-primary/5 p-3 text-xs text-primary"
      to="/session"
    >
      Короткая подготовка · {done}/{total} вопросов · Вернуться к сессии
    </Link>
  ) : null
}
