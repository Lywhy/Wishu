import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { QuestionAnswer } from "@/components/questions/question-study"
import { DifficultyBadge } from "@/components/practice/practice-elements"
import { LocalSaveNotice } from "@/components/experience/local-save-notice"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { useMockInterview } from "@/stores/mock-interview"
import { usePracticeProgress } from "@/stores/practice-progress"
import type { QuestionStatus } from "@/data/question-catalog"

export function MockInterviewPage() {
  const { questions, questionSections, getSectionQuestions } = useQuestionCatalog()
  const session = useMockInterview()
  const pending = usePracticeProgress((state) => state.pendingQuestionWrites)
  const error = usePracticeProgress((state) => state.questionSyncError)
  const [sections, setSections] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState("all")
  const [count, setCount] = useState("10")
  const available = questionSections.filter((section) => !section.inDevelopment)
  const allowed = new Set(
    available
      .filter((section) => !sections.length || sections.includes(section.id))
      .flatMap((section) => getSectionQuestions(section).map((question) => question.id)),
  )
  const pool = questions.filter(
    (question) =>
      allowed.has(question.id) && (difficulty === "all" || question.difficulty === difficulty),
  )
  const items = session.ids.flatMap((id) => {
    const question = questions.find((item) => item.id === id)
    return question ? [question] : []
  })
  const question = questions.find((item) => item.id === session.ids[session.index])
  function start() {
    const ids = pool.map((item) => item.id)
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[ids[i], ids[j]] = [ids[j], ids[i]]
    }
    session.start(ids.slice(0, Number(count)))
  }
  function rate(status: QuestionStatus) {
    if (!question) return
    session.rate(question.id, status)
    usePracticeProgress.getState().setQuestionStatus(question.id, status)
  }
  const labels = { learned: "Знаю", repeat: "Повторить", skipped: "Пропущено" }
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-xs text-primary">Практика ответа вслух</p>
        <h1 className="text-3xl font-semibold">Пробное собеседование</h1>
        <p className="text-sm leading-7 text-muted-foreground">
          Без таймера. Ответьте самостоятельно, раскройте объяснение и оцените свой ответ.
        </p>
      </header>
      {session.phase === "setup" ? (
        <Card className="gap-5 p-5 shadow-none">
          <fieldset>
            <legend className="mb-3 text-sm font-medium">Темы · без выбора используются все</legend>
            <ToggleGroup
              multiple
              aria-label="Темы пробного собеседования"
              variant="outline"
              className="w-full flex-wrap justify-start"
              value={sections}
              onValueChange={(values) =>
                setSections(values.filter((value) => typeof value === "string"))
              }
            >
              {available.map((section) => (
                <ToggleGroupItem key={section.id} value={section.id}>
                  {section.title}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </fieldset>
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              value={difficulty}
              onValueChange={(value) => {
                if (typeof value === "string") setDifficulty(value)
              }}
              items={[
                { value: "all", label: "Любая сложность" },
                ...["Базовый", "Средний", "Продвинутый"].map((value) => ({ value, label: value })),
              ]}
            >
              <SelectTrigger aria-label="Сложность вопросов" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Любая сложность</SelectItem>
                {["Базовый", "Средний", "Продвинутый"].map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={count}
              onValueChange={(value) => {
                if (typeof value === "string") setCount(value)
              }}
              items={["5", "10", "15", "20"].map((value) => ({
                value,
                label: value + " вопросов",
              }))}
            >
              <SelectTrigger aria-label="Количество вопросов" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["5", "10", "15", "20"].map((value) => (
                  <SelectItem key={value} value={value}>
                    {value} вопросов
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground">
            Подходит вопросов: {pool.length}. В подборке будет{" "}
            {Math.min(pool.length, Number(count))}.
          </p>
          <Button disabled={!pool.length || pending > 0} onClick={start}>
            Начать собеседование
          </Button>
        </Card>
      ) : session.phase === "active" ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Вопрос {session.index + 1} из {session.ids.length}
            </p>
            <Button variant="ghost" onClick={session.finish} disabled={pending > 0}>
              Завершить и посмотреть разбор
            </Button>
          </div>
          <Progress
            value={
              session.ids.length
                ? (100 * Object.keys(session.ratings).length) / session.ids.length
                : 0
            }
            aria-label="Оценённые ответы"
          />
          {question ? (
            <Card className="gap-5 p-5 shadow-none">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{question.topic}</span>
                <DifficultyBadge level={question.difficulty} />
              </div>
              <h2 className="text-xl font-semibold">{question.title}</h2>
              <p className="text-sm leading-7 text-muted-foreground">{question.summary}</p>
              <QuestionAnswer key={question.id} question={question} interviewMode />
              <div className="space-y-3 border-t pt-4">
                <p className="text-sm font-medium">Как вы ответили?</p>
                <ToggleGroup
                  aria-label="Самооценка ответа"
                  variant="outline"
                  className="flex-wrap"
                  value={session.ratings[question.id] ? [session.ratings[question.id]] : []}
                  disabled={pending > 0}
                  onValueChange={(values) => {
                    const value = values[0]
                    if (value === "learned" || value === "repeat" || value === "skipped")
                      rate(value)
                  }}
                >
                  <ToggleGroupItem value="learned">Знаю ответ</ToggleGroupItem>
                  <ToggleGroupItem value="repeat">Нужно повторить</ToggleGroupItem>
                  <ToggleGroupItem value="skipped">Пропустить</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </Card>
          ) : (
            <Card className="p-5">
              <p>Вопрос больше недоступен. Его можно пропустить.</p>
            </Card>
          )}
          <nav className="flex gap-3" aria-label="Вопросы собеседования">
            <Button
              className="flex-1"
              variant="outline"
              disabled={session.index === 0}
              onClick={() => session.move(session.index - 1)}
            >
              Предыдущий
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              disabled={pending > 0 || !!error}
              onClick={() =>
                session.index === session.ids.length - 1
                  ? session.finish()
                  : session.move(session.index + 1)
              }
            >
              {session.index === session.ids.length - 1 ? "К итогам" : "Следующий"}
            </Button>
          </nav>
        </>
      ) : (
        <Card className="gap-5 p-5 shadow-none">
          <h2 className="text-xl font-semibold">Разбор собеседования</h2>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Знаю", items.filter((item) => session.ratings[item.id] === "learned").length],
              ["Повторить", items.filter((item) => session.ratings[item.id] === "repeat").length],
              ["Пропущено", items.filter((item) => session.ratings[item.id] === "skipped").length],
              ["Без оценки", items.filter((item) => !session.ratings[item.id]).length],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-muted/30 p-3">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-xl font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs leading-6 text-muted-foreground">
            Самооценка сохранена в этой вкладке и браузере. Отметки вопросов отправляются на сервер;
            при ошибке воспользуйтесь повторным сохранением.
          </p>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  className="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm hover:bg-muted"
                  to={`/questions/${item.id}`}
                  state={{ returnTo: "/mock-interview" }}
                >
                  <span>{item.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {session.ratings[item.id] ? labels[session.ratings[item.id]] : "Без оценки"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            <Button onClick={session.configure}>Новая подборка</Button>
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link to="/questions?status=repeat" />}
            >
              Перейти к повторению
            </Button>
          </div>
        </Card>
      )}
      <LocalSaveNotice area="mock-interview" />
      <LocalSaveNotice area="review-schedule" errorsOnly />
    </div>
  )
}
