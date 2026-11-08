import { PageHeading } from "@/components/catalog/page-heading"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { LocalSaveNotice } from "@/components/experience/local-save-notice"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  AnimatedCard as Card,
  AnimatedBlock,
  AnimatedText,
} from "@/components/catalog/catalog-primitives"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { usePracticeProgress } from "@/stores/practice-progress"
import { useShortSession } from "@/stores/short-session"
import { practiceTasks } from "@/data/interview-content"

export function StudySessionPage() {
  const { questions } = useQuestionCatalog()
  const statuses = usePracticeProgress((state) => state.questionStatuses)
  const solved = usePracticeProgress((state) => state.solvedTaskIds)
  const pending = usePracticeProgress((state) => state.pendingQuestionWrites)
  const session = useShortSession()
  const items = session.questionIds.flatMap((id) => {
    const question = questions.find((item) => item.id === id)
    return question ? [question] : []
  })
  const task = practiceTasks.find((item) => item.id === session.taskId)
  const done = items.filter((item) => session.done.includes(item.id))
  const unreviewed = items.filter((item) => !session.done.includes(item.id))
  const repeat = done.filter((item) => statuses[item.id] === "repeat")
  const learned = done.filter((item) => statuses[item.id] === "learned")
  const skipped = done.filter((item) => statuses[item.id] === "skipped")
  const taskDone = !!task && solved.includes(task.id)
  const complete = items.length > 0 && !unreviewed.length && (!task || taskDone)
  const summary = !session.active || complete
  const next = unreviewed[0] ?? repeat[0] ?? skipped[0]
  const questionSession = {
    questionIds: items.map((item) => item.id),
    returnTo: "/questions/preparation",
    title: "Короткая подготовка",
  }
  function start() {
    const ordered = [...questions].sort(
      (a, b) =>
        (statuses[a.id] === "repeat" ? 0 : !statuses[a.id] ? 1 : 2) -
        (statuses[b.id] === "repeat" ? 0 : !statuses[b.id] ? 1 : 2),
    )
    const nextTask = practiceTasks.find((item) => !solved.includes(item.id))
    session.start(
      ordered.slice(0, 5).map((item) => item.id),
      nextTask?.id ?? null,
    )
  }
  return (
    <div className="mx-auto max-w-3xl min-w-0 space-y-6">
      <QuestionBreadcrumbs
        items={[{ label: "Вопросы", to: "/questions" }, { label: "Короткая подготовка" }]}
      />
      <PageHeading
        title="Короткая подготовка"
        description="До пяти вопросов и одна нерешённая задача. Прогресс сохраняется независимо от сессии."
        actions={
          <Button nativeButton={false} variant="outline" render={<Link to="/mock-interview" />}>
            Пробное собеседование
          </Button>
        }
      />
      <LocalSaveNotice area="short-session" />
      {!session.questionIds.length ? (
        <AnimatedBlock introDelay={0.14}>
          <Button onClick={start} disabled={!questions.length || pending > 0}>
            Начать сессию
          </Button>
        </AnimatedBlock>
      ) : (
        <>
          <Card introDelay={0.12} className="gap-5 p-5 shadow-none">
            <h2 className="text-xl font-semibold">
              <AnimatedText delay={0.16}>
                {summary ? "Итоги занятия" : "Ваша подборка"}
              </AnimatedText>
            </h2>
            <Progress
              value={items.length ? (100 * done.length) / items.length : 0}
              aria-label="Разобранные вопросы сессии"
            />
            <p className="text-sm">
              Разобрано {done.length} из {items.length} вопросов.{" "}
              {task
                ? `Задача ${taskDone ? "решена" : "ещё не решена"}.`
                : "Все задачи каталога решены, в этой сессии только вопросы."}
            </p>
            {summary && (
              <>
                <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ["Изучено", learned.length],
                    ["Повторить", repeat.length],
                    ["Пропущено", skipped.length],
                    ["Осталось", unreviewed.length],
                  ].map(([label, count]) => (
                    <div key={label} className="rounded-xl bg-muted/40 p-3">
                      <dt className="text-xs text-muted-foreground">{label}</dt>
                      <dd className="mt-1 text-xl font-semibold">{count}</dd>
                    </div>
                  ))}
                </dl>
                <section
                  className="space-y-3 rounded-xl border bg-primary/5 p-4"
                  aria-label="Следующий шаг"
                >
                  <h3 className="text-sm font-semibold">С чего продолжить</h3>
                  {next ? (
                    <>
                      <p className="text-sm leading-6">
                        {unreviewed.length
                          ? "Остались неразобранные вопросы."
                          : repeat.length
                            ? "Закрепите вопросы, отмеченные для повторения."
                            : "Вернитесь к пропущенным вопросам."}
                      </p>
                      <Button
                        nativeButton={false}
                        variant="outline"
                        className="h-auto min-h-10 whitespace-normal"
                        render={<Link to={`/questions/${next.id}`} state={{ questionSession }} />}
                      >
                        {next.title}
                      </Button>
                    </>
                  ) : task && !taskDone ? (
                    <p className="text-sm">Вопросы разобраны. Следующий шаг - решить задачу.</p>
                  ) : (
                    <p className="text-sm">Подборка разобрана. Можно начать новую сессию.</p>
                  )}
                  {!!repeat.length && (
                    <p className="text-xs text-muted-foreground">
                      На повторение: {repeat.map((item) => item.title).join("; ")}
                    </p>
                  )}
                </section>
              </>
            )}
            <div className="flex flex-wrap gap-2">
              {!summary && unreviewed[0] && (
                <Button
                  nativeButton={false}
                  render={
                    <Link to={`/questions/${unreviewed[0].id}`} state={{ questionSession }} />
                  }
                >
                  Продолжить вопросы
                </Button>
              )}
              {task && (
                <Button
                  nativeButton={false}
                  variant="outline"
                  render={
                    <Link to={`/tasks/${task.id}`} state={{ returnTo: "/questions/preparation" }} />
                  }
                >
                  {taskDone ? "Посмотреть задачу" : "Перейти к задаче"}
                </Button>
              )}
              {session.active && !complete ? (
                <Button variant="ghost" disabled={pending > 0} onClick={session.finish}>
                  Закончить и посмотреть итоги
                </Button>
              ) : (
                <Button disabled={pending > 0 || !questions.length} onClick={start}>
                  Новая сессия
                </Button>
              )}
            </div>
          </Card>
          <ol className="space-y-2">
            {items.map((question, index) => (
              <li key={question.id}>
                <AnimatedBlock introDelay={0.18 + Math.min(index, 5) * 0.06}>
                  <Link
                    to={`/questions/${question.id}`}
                    state={{ questionSession }}
                    className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 text-sm transition-colors duration-150 outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                  >
                    <span>
                      {index + 1}. {question.title}
                    </span>
                    {session.done.includes(question.id) && (
                      <Badge variant="secondary">
                        {statuses[question.id] === "learned"
                          ? "Изучено"
                          : statuses[question.id] === "repeat"
                            ? "Повторить"
                            : "Пропущено"}
                      </Badge>
                    )}
                  </Link>
                </AnimatedBlock>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  )
}
export function SessionBanner() {
  const active = useShortSession((state) => state.active)
  const ids = useShortSession((state) => state.questionIds)
  const done = useShortSession((state) => state.done)
  const taskId = useShortSession((state) => state.taskId)
  const solved = usePracticeProgress((state) => state.solvedTaskIds)
  if (!active) return null
  const count = ids.filter((id) => done.includes(id)).length
  const complete = count === ids.length && (!taskId || solved.includes(taskId))
  return (
    <Link
      className="mb-4 block rounded-lg border bg-primary/5 p-3 text-xs text-primary"
      to="/questions/preparation"
    >
      {complete
        ? "Занятие завершено · Посмотреть итоги"
        : `Короткая подготовка · ${count}/${ids.length} вопросов · Вернуться к сессии`}
    </Link>
  )
}
