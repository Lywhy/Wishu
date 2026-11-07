import { Disclosure } from "@/components/experience/disclosure"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { practiceTasks, type Question } from "@/data/interview-content"
import {
  javascriptOptionalIds,
  javascriptPracticeTaskIds,
  javascriptQuestionTasks,
  isJavascriptCodeReading,
} from "@/data/javascript-preparation"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { usePracticeProgress } from "@/stores/practice-progress"

export function JavaScriptQuestionBadge({ question }: { question: Question }) {
  if (isJavascriptCodeReading(question))
    return (
      <Badge
        variant="outline"
        className="border-violet-500/30 bg-violet-500/10 text-[11px] text-violet-700 dark:text-violet-300"
      >
        Разбор кода
      </Badge>
    )
  if (question.topic === "JavaScript" && javascriptOptionalIds.has(question.id))
    return (
      <Badge variant="outline" className="border-border bg-muted text-[11px] text-muted-foreground">
        Дополнительно
      </Badge>
    )
  return null
}

export function JavaScriptPreparationGuide() {
  const { questions, questionSections } = useQuestionCatalog()
  const statuses = usePracticeProgress((state) => state.questionStatuses)
  const solved = usePracticeProgress((state) => state.solvedTaskIds)
  const section = questionSections.find((item) => item.id === "javascript")
  const reading = questions.filter(isJavascriptCodeReading)
  const next = reading.find((item) => statuses[item.id] !== "learned") ?? reading[0]
  const tasks = javascriptPracticeTaskIds.flatMap((id) => {
    const task = practiceTasks.find((item) => item.id === id)
    return task ? [task] : []
  })
  const nextTask = tasks.find((task) => !solved.includes(task.id)) ?? tasks[0]
  return (
    <Card className="mb-6 gap-5 rounded-xl p-5 shadow-none sm:p-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">От понимания к решению</h2>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          Сначала разберите функции, объекты и асинхронность, затем объясните незнакомый код и
          напишите решение самостоятельно. Отмечайте разобранные вопросы и закрепляйте знания
          практикой.
        </p>
      </div>
      <ol className="grid gap-4 md:grid-cols-3">
        <li className="flex flex-col items-start gap-3 rounded-lg border p-4">
          <h3 className="text-sm font-semibold">1. Основа языка</h3>
          <p className="flex-1 text-xs leading-6 text-muted-foreground">
            Типы и область видимости → функции и this → объекты и массивы → асинхронность. Модули,
            DOM и ошибки закрепите после основы.
          </p>
          <Button
            size="sm"
            variant="outline"
            nativeButton={false}
            render={<Link to="/questions/sections/javascript/fundamentals" />}
          >
            Начать с основ
          </Button>
        </li>
        <li className="flex flex-col items-start gap-3 rounded-lg border p-4">
          <h3 className="text-sm font-semibold">2. Объяснение кода</h3>
          <p className="flex-1 text-xs leading-6 text-muted-foreground">
            Предскажите результат до раскрытия ответа. Объясните механизм и предложите исправление.
          </p>
          <p className="text-xs text-muted-foreground">
            Разобрано {reading.filter((item) => statuses[item.id] === "learned").length} из{" "}
            {reading.length}
          </p>
          {next ? (
            <Button
              size="sm"
              variant="outline"
              nativeButton={false}
              render={<Link to={"/questions/" + next.id} />}
            >
              Продолжить разборы
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground">
              Разборы появятся после обновления каталога вопросов.
            </p>
          )}
        </li>
        <li className="flex flex-col items-start gap-3 rounded-lg border p-4">
          <h3 className="text-sm font-semibold">3. Самостоятельное решение</h3>
          <p className="flex-1 text-xs leading-6 text-muted-foreground">
            Напишите функцию, проверьте крайние случаи и объясните ограничения выбранного подхода.
          </p>
          <p className="text-xs text-muted-foreground">
            Решено {tasks.filter((task) => solved.includes(task.id)).length} из {tasks.length}
          </p>
          {nextTask && (
            <Button
              size="sm"
              variant="outline"
              nativeButton={false}
              render={<Link to={"/tasks/" + nextTask.id} />}
            >
              Перейти к практике
            </Button>
          )}
        </li>
      </ol>
      <Disclosure
        className="rounded-lg bg-muted/40"
        title={<> Практика по темам и дополнительные API </>}
      >
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Подборка практических задач">
          {tasks.map((task) => (
            <li key={task.id}>
              <Button
                size="sm"
                variant="outline"
                nativeButton={false}
                render={<Link to={"/tasks/" + task.id} />}
              >
                {task.title}
                {solved.includes(task.id) ? " · Решена" : ""}
              </Button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          WeakRef, FinalizationRegistry, SharedArrayBuffer и Temporal отмечены как дополнительные
          темы. Контекст выполнения и область видимости остаются частью основы, даже если находятся
          в продвинутом подразделе.
        </p>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          {section &&
            questions
              .filter(
                (question) =>
                  question.topic === "JavaScript" && javascriptOptionalIds.has(question.id),
              )
              .map((question) => (
                <li key={question.id}>
                  <Link
                    className="text-primary underline underline-offset-4"
                    to={"/questions/" + question.id}
                  >
                    {question.title}
                  </Link>
                </li>
              ))}
        </ul>
      </Disclosure>
    </Card>
  )
}

export function JavaScriptSelfCheck({ question }: { question: Question }) {
  if (question.topic !== "JavaScript") return null
  const tasks = (javascriptQuestionTasks[question.id] ?? []).flatMap((id) => {
    const task = practiceTasks.find((item) => item.id === id)
    return task ? [task] : []
  })
  return (
    <Disclosure className="rounded-xl border bg-card" title={<> Проверить, что я понял тему </>}>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
        <li>Могу объяснить механизм своими словами и привести пример без подсказки.</li>
        <li>Могу предсказать результат при изменении входных данных или порядка действий.</li>
        <li>Могу назвать крайний случай, типичную ошибку и способ её обнаружить.</li>
        <li>Могу объяснить, где этот подход полезен и какие у него ограничения.</li>
      </ul>
      {!!tasks.length && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tasks.map((task) => (
            <Button
              key={task.id}
              size="sm"
              variant="outline"
              nativeButton={false}
              render={<Link to={"/tasks/" + task.id} />}
            >
              {task.title}
            </Button>
          ))}
        </div>
      )}
    </Disclosure>
  )
}
