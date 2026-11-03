import { useId, useState } from "react"
import { Check, RotateCcw, SkipForward } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { CodeBlock, DifficultyBadge } from "@/components/practice/practice-elements"
import { StudyProgress } from "@/components/questions/study-progress"
import type { Question } from "@/data/interview-content"
import type { QuestionStatus } from "@/data/question-catalog"
import { cn } from "@/lib/utils"
import { usePracticeProgress } from "@/stores/practice-progress"

const statuses = [
  {
    value: "repeat",
    label: "Повторить",
    icon: RotateCcw,
    selected:
      "border-amber-400 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  },
  {
    value: "learned",
    label: "Изучил",
    icon: Check,
    selected:
      "border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  {
    value: "skipped",
    label: "Пропустить",
    icon: SkipForward,
    selected:
      "border-violet-400 bg-violet-50 text-violet-800 dark:border-violet-800 dark:bg-violet-500/15 dark:text-violet-300",
  },
] satisfies { value: QuestionStatus; label: string; icon: typeof Check; selected: string }[]

export function AnswerPreference() {
  const id = useId()
  const checked = usePracticeProgress((state) => state.autoRevealAnswers)
  const setChecked = usePracticeProgress((state) => state.setAutoRevealAnswers)
  return (
    <div className="flex items-center justify-between gap-5 rounded-xl border bg-card px-4 py-3">
      <div>
        <label htmlFor={id} className="cursor-pointer text-xs font-medium">
          Раскрывать ответы сразу
        </label>
        <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
          Общая настройка для всех вопросов.
        </p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={setChecked} />
    </div>
  )
}

export function QuestionStatusControls({ questionId }: { questionId: string }) {
  const current = usePracticeProgress((state) => state.questionStatuses[questionId])
  const setStatus = usePracticeProgress((state) => state.setQuestionStatus)
  return (
    <div role="group" aria-label="Отметка изучения вопроса" className="flex flex-wrap gap-2">
      {statuses.map(({ value, label, icon: Icon, selected }) => (
        <Button
          key={value}
          variant="outline"
          size="sm"
          aria-pressed={current === value}
          onClick={() => setStatus(questionId, current === value ? null : value)}
          className={cn("gap-1.5 text-xs", current === value && selected)}
        >
          <Icon className="size-3.5" aria-hidden="true" />
          {label}
        </Button>
      ))}
    </div>
  )
}

export function QuestionAnswer({ question }: { question: Question }) {
  const defaultOpen = usePracticeProgress((state) => state.autoRevealAnswers)
  return (
    <AnswerDisclosure
      key={`${question.id}-${defaultOpen}`}
      question={question}
      defaultOpen={defaultOpen}
    />
  )
}

function AnswerDisclosure({ question, defaultOpen }: { question: Question; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        size="sm"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        {open ? "Скрыть ответ" : "Показать ответ"}
      </Button>
      <div id={id} hidden={!open} className="space-y-4 border-t pt-4">
        {question.answer.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-7 text-muted-foreground">
            {paragraph}
          </p>
        ))}
        {question.code && <CodeBlock code={question.code} />}
        <div className="rounded-xl bg-orange-50 p-4 dark:bg-orange-500/10">
          <p className="text-xs font-semibold text-primary">Главная мысль</p>
          <p className="mt-2 text-sm leading-7">{question.takeaway}</p>
        </div>
      </div>
    </div>
  )
}

export function QuestionCard({ question }: { question: Question }) {
  const saved = usePracticeProgress((state) => state.savedQuestionIds.includes(question.id))
  const toggleSaved = usePracticeProgress((state) => state.toggleSaved)
  const status = usePracticeProgress((state) => state.questionStatuses[question.id])
  return (
    <Card className="gap-0 rounded-xl p-5 shadow-none">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <DifficultyBadge level={question.difficulty} />
        <Button
          variant="ghost"
          size="sm"
          aria-pressed={saved}
          onClick={() => toggleSaved(question.id)}
          className="text-xs text-muted-foreground"
        >
          {saved ? "В избранном" : "В избранное"}
        </Button>
      </div>
      <Link
        to={"/questions/" + question.id}
        className="group block rounded outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <h2 className="text-base leading-7 font-semibold group-hover:text-primary">
          {question.title}
        </h2>
        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{question.summary}</p>
      </Link>
      <p
        className={cn(
          "mt-4 text-xs",
          status === "repeat"
            ? "text-amber-700 dark:text-amber-300"
            : status === "learned"
              ? "text-emerald-700 dark:text-emerald-300"
              : status === "skipped"
                ? "text-violet-700 dark:text-violet-300"
                : "text-muted-foreground",
        )}
      >
        {status === "repeat"
          ? "Повторить"
          : status === "learned"
            ? "Изучил"
            : status === "skipped"
              ? "Пропустить"
              : "Без отметки"}
      </p>
    </Card>
  )
}

export function QuestionStudyAside({
  questionIds,
  title = "Ваш прогресс",
}: {
  questionIds: string[]
  title?: string
}) {
  return (
    <Card className="gap-0 rounded-2xl p-5 shadow-none">
      <h2 className="mb-5 text-sm font-semibold">{title}</h2>
      <StudyProgress questionIds={questionIds} />
      <p className="mt-5 text-[11px] leading-6 text-muted-foreground">
        Неотмеченные вопросы остаются серыми. Повторное нажатие на выбранную отметку снимает её.
        Прогресс сохраняется в этом браузере.
      </p>
    </Card>
  )
}
