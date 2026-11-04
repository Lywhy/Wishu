import { useId, useState } from "react"
import { Check, RotateCcw, SkipForward } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { CodeBlock, DifficultyBadge } from "@/components/practice/practice-elements"
import { QuestionPopularBadge } from "@/components/questions/question-popular"
import { QuestionFavoriteBadge } from "@/components/questions/question-favorite"
import { QuestionPracticeActions } from "@/components/questions/question-practice-actions"
import { StudyProgress } from "@/components/questions/study-progress"
import type { Question } from "@/data/interview-content"
import type { QuestionStatus } from "@/data/question-catalog"
import type { QuestionSession } from "@/data/question-session"
import { codeLanguageFor } from "@/lib/syntax-highlighter"
import { cn } from "@/lib/utils"
import { usePracticeProgress } from "@/stores/practice-progress"

const statuses = [
  {
    value: "repeat",
    label: "Повторить",
    icon: RotateCcw,
    selected:
      "border-amber-400 bg-amber-100 text-amber-900 dark:border-amber-800 dark:bg-amber-500/20 dark:text-amber-300",
  },
  {
    value: "learned",
    label: "Изучил",
    icon: Check,
    selected:
      "border-emerald-400 bg-emerald-100 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300",
  },
  {
    value: "skipped",
    label: "Пропустить",
    icon: SkipForward,
    selected:
      "border-violet-400 bg-violet-100 text-violet-900 dark:border-violet-800 dark:bg-violet-500/20 dark:text-violet-300",
  },
] satisfies { value: QuestionStatus; label: string; icon: typeof Check; selected: string }[]

export function AnswerPreference() {
  const id = useId()
  const saving = usePracticeProgress((state) => state.pendingQuestionWrites > 0)
  const checked = usePracticeProgress((state) => state.autoRevealAnswers)
  const setChecked = usePracticeProgress((state) => state.setAutoRevealAnswers)
  return (
    <div className="flex min-h-10 items-center gap-3">
      <label
        htmlFor={id}
        title="Общая настройка для всех вопросов"
        className="cursor-pointer text-xs text-muted-foreground"
      >
        Раскрывать ответы сразу
      </label>
      <Switch
        id={id}
        disabled={saving}
        checked={checked}
        onCheckedChange={setChecked}
        aria-describedby={`${id}-hint`}
      />
      <span id={`${id}-hint`} className="sr-only">
        Общая настройка для всех вопросов
      </span>
    </div>
  )
}

export function QuestionStatusControls({ questionId }: { questionId: string }) {
  const saving = usePracticeProgress((state) => state.pendingQuestionWrites > 0)
  const current = usePracticeProgress((state) => state.questionStatuses[questionId])
  const setStatus = usePracticeProgress((state) => state.setQuestionStatus)
  return (
    <div aria-label="Отметка изучения вопроса" className="flex flex-wrap gap-2">
      {statuses.map(({ value, label, icon: Icon, selected }) => (
        <Button
          key={value}
          variant="outline"
          size="icon"
          title={label}
          aria-label={label}
          aria-pressed={current === value}
          disabled={saving}
          onClick={() => setStatus(questionId, current === value ? null : value)}
          className={cn("size-8", current === value && selected)}
        >
          <Icon className="size-4" aria-hidden="true" />
        </Button>
      ))}
    </div>
  )
}

export function QuestionAnswer({ question }: { question: Question }) {
  const defaultOpen = usePracticeProgress((state) => state.autoRevealAnswers)
  return (
    <div className="relative">
      <div className="mb-2 sm:absolute sm:top-0 sm:right-0 sm:mb-0">
        <AnswerPreference />
      </div>
      <AnswerDisclosure
        key={`${question.id}-${defaultOpen}`}
        question={question}
        defaultOpen={defaultOpen}
      />
    </div>
  )
}

function AnswerDisclosure({ question, defaultOpen }: { question: Question; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className="space-y-4">
      <div className="flex min-h-10 items-center sm:pr-64">
        <Button
          variant="outline"
          className="h-10"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
        >
          {open ? "Скрыть ответ" : "Показать ответ"}
        </Button>
      </div>
      <div id={id} hidden={!open} className="space-y-6 border-t pt-5">
        <section aria-labelledby={`${id}-short`} className="space-y-2">
          <h3 id={`${id}-short`} className="text-sm font-semibold">
            Короткий ответ
          </h3>
          <p className="max-w-[70ch] text-base leading-8 text-foreground">{question.answer[0]}</p>
        </section>
        {question.answer.length > 1 && (
          <section aria-labelledby={`${id}-details`} className="space-y-3">
            <h3 id={`${id}-details`} className="text-sm font-semibold">
              Подробности
            </h3>
            {question.answer.slice(1).map((paragraph, index) => (
              <p
                key={`${question.id}-${index}`}
                className="max-w-[70ch] text-base leading-8 text-foreground"
              >
                {paragraph}
              </p>
            ))}
          </section>
        )}
        {question.code && (
          <CodeBlock
            code={question.code}
            language={codeLanguageFor(question.topic, question.code)}
          />
        )}
        {question.pitfall && (
          <section
            aria-labelledby={`${id}-pitfall`}
            className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-800/50 dark:bg-amber-500/5"
          >
            <h3 id={`${id}-pitfall`} className="text-sm font-semibold">
              Частая ошибка
            </h3>
            <p className="mt-2 max-w-[70ch] text-sm leading-7">{question.pitfall}</p>
          </section>
        )}
        <section aria-labelledby={`${id}-takeaway`} className="rounded-xl border bg-muted/40 p-4">
          <h3 id={`${id}-takeaway`} className="text-sm font-semibold">
            Главная мысль
          </h3>
          <p className="mt-2 max-w-[70ch] text-sm leading-7">{question.takeaway}</p>
        </section>
      </div>
    </div>
  )
}

export function QuestionCard({
  question,
  session,
  context,
}: {
  question: Question
  session: QuestionSession
  context?: string
}) {
  const saved = usePracticeProgress((state) => state.savedQuestionIds.includes(question.id))
  const status = usePracticeProgress((state) => state.questionStatuses[question.id])
  const currentStatus = statuses.find((item) => item.value === status)
  return (
    <Link
      to={`/questions/${question.id}`}
      state={{ questionSession: session }}
      className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="gap-2 rounded-xl p-4 shadow-none transition-colors group-hover:bg-muted/40">
        {context && <p className="text-xs text-muted-foreground">{context}</p>}
        <h2 className="text-[15px] leading-6 font-semibold group-hover:text-primary">
          {question.title}
        </h2>
        <div className="flex min-h-5 flex-wrap items-center gap-1.5">
          <DifficultyBadge level={question.difficulty} />
          {question.popular && <QuestionPopularBadge />}
          {currentStatus && (
            <Badge
              variant="outline"
              className={cn("text-[11px] font-normal", currentStatus.selected)}
            >
              {currentStatus.label}
            </Badge>
          )}
          {saved && <QuestionFavoriteBadge />}
        </div>
        <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">{question.summary}</p>
      </Card>
    </Link>
  )
}

export function QuestionStudyAside({
  questionIds,
  title = "Ваш прогресс",
  actions = true,
}: {
  questionIds: string[]
  title?: string
  actions?: boolean
}) {
  return (
    <Card className="gap-0 rounded-xl p-4 shadow-none">
      <h2 className="mb-4 text-sm font-semibold">{title}</h2>
      <StudyProgress questionIds={questionIds} />
      {actions && <QuestionPracticeActions questionIds={questionIds} title={title} />}
      <details className="mt-4 border-t pt-3 text-xs text-muted-foreground">
        <summary className="min-h-8 cursor-pointer rounded leading-8 outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Как работают отметки
        </summary>
        <p className="mt-2 leading-6">
          Неотмеченные вопросы остаются серыми. Повторное нажатие на выбранную отметку снимает её.
          Отметки сохраняются автоматически.
        </p>
      </details>
    </Card>
  )
}
