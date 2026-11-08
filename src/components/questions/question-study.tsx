import { Disclosure } from "@/components/experience/disclosure"
import { LectureOutline } from "@/components/experience/lecture-outline"
import { QuestionSaveNotice } from "@/components/experience/question-save-notice"
import { LearningMarkdown } from "@/components/learning/learning-markdown"
import { CodeBlock, DifficultyBadge } from "@/components/practice/practice-elements"
import { JavaScriptQuestionBadge } from "@/components/questions/javascript-preparation"
import {
  QuestionFavoriteBadge,
  QuestionFavoriteButton,
} from "@/components/questions/question-favorite"
import { QuestionPopularBadge } from "@/components/questions/question-popular"
import { QuestionPracticeActions } from "@/components/questions/question-practice-actions"
import { StudyProgress } from "@/components/questions/study-progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { Question } from "@/data/interview-content"
import type { QuestionStatus } from "@/data/question-catalog"
import type { QuestionSession } from "@/data/question-session"
import { javascriptAnswerMarkdown } from "@/lib/javascript-answer-markdown"
import { changeQuestionMark } from "@/lib/question-mark-actions"
import { codeLanguageFor } from "@/lib/syntax-highlighter"
import { cn } from "@/lib/utils"
import { usePracticeProgress } from "@/stores/practice-progress"
import { Check, RotateCcw, SkipForward } from "lucide-react"
import { useEffect, useId, useState } from "react"
import { Link } from "react-router-dom"

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

export function QuestionReviewControls({
  questionId,
  compact = false,
}: {
  questionId: string
  compact?: boolean
}) {
  return (
    <div className="min-w-0" aria-label="Действия с вопросом">
      {!compact && (
        <p className="mb-2 px-1 text-xs font-medium text-muted-foreground">Ваша отметка</p>
      )}
      <div
        className={cn(
          "grid grid-cols-4 items-center gap-1 overflow-hidden rounded-xl border border-border/70 bg-muted/40 p-1",
          compact && "h-10",
        )}
      >
        <QuestionStatusControls questionId={questionId} compact={compact} />
        <QuestionFavoriteButton questionId={questionId} compact={compact} />
      </div>
      <QuestionSaveNotice />
    </div>
  )
}

export function QuestionStatusControls({
  questionId,
  compact = false,
}: {
  questionId: string
  compact?: boolean
}) {
  const saving = usePracticeProgress((state) => state.pendingQuestionWrites > 0)
  const current = usePracticeProgress((state) => state.questionStatuses[questionId])
  return (
    <ToggleGroup
      aria-label="Отметка изучения вопроса"
      spacing={1}
      className="col-span-3 grid w-full min-w-0 grid-cols-subgrid gap-1"
      value={current ? [current] : []}
      disabled={saving}
      onValueChange={(values) =>
        changeQuestionMark(
          questionId,
          statuses.find((status) => status.value === values[0])?.value ?? null,
        )
      }
    >
      {statuses.map(({ value, label, icon: Icon, selected }) => (
        <Tooltip key={value}>
          <TooltipTrigger
            aria-label={label}
            render={
              <ToggleGroupItem
                value={value}
                className={cn(
                  "h-10 w-full min-w-0 rounded-lg p-0 text-muted-foreground hover:bg-background hover:text-foreground focus-visible:ring-inset",
                  compact && "h-7 rounded-md",
                  current === value && selected,
                  {
                    repeat: "aria-pressed:bg-amber-100 dark:aria-pressed:bg-amber-500/20",
                    learned: "aria-pressed:bg-emerald-100 dark:aria-pressed:bg-emerald-500/20",
                    skipped: "aria-pressed:bg-violet-100 dark:aria-pressed:bg-violet-500/20",
                  }[value],
                )}
              />
            }
          >
            <Icon className="size-4" aria-hidden="true" />
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </ToggleGroup>
  )
}

export function QuestionAnswer({
  question,
  interviewMode = false,
}: {
  question: Question
  interviewMode?: boolean
}) {
  const autoReveal = usePracticeProgress((state) => state.autoRevealAnswers)
  const defaultOpen = !interviewMode && autoReveal
  return (
    <AnswerDisclosure
      key={`${question.id}-${defaultOpen}`}
      question={question}
      defaultOpen={defaultOpen}
      allowPreference={!interviewMode}
    />
  )
}

function AnswerDisclosure({
  question,
  defaultOpen,
  allowPreference,
}: {
  question: Question
  defaultOpen: boolean
  allowPreference: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  useEffect(() => {
    const toggle = () => setOpen((value) => !value)
    document.addEventListener("wishu-toggle-answer", toggle)
    return () => document.removeEventListener("wishu-toggle-answer", toggle)
  }, [])
  const id = useId()
  const content =
    question.topic === "JavaScript"
      ? javascriptAnswerMarkdown(question)
      : [
          "### Короткий ответ",
          question.answer[0] ?? "",
          ...(question.answer.length > 1 ? ["### Подробности", ...question.answer.slice(1)] : []),
        ].join("\n\n")
  const prefix = "answer-" + id.replaceAll(":", "")
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full min-w-0 space-y-4">
      <div className="flex min-h-10 flex-wrap items-center justify-between gap-3">
        <CollapsibleTrigger render={<Button variant="outline" className="h-10" />}>
          {open ? "Скрыть ответ" : "Показать ответ"}
        </CollapsibleTrigger>
        {allowPreference && <AnswerPreference />}
      </div>
      <CollapsibleContent
        keepMounted
        className="w-full min-w-0 space-y-6 border-t border-border/60 pt-5 transition-opacity duration-350 ease-[cubic-bezier(0.22,0.61,0.36,1)] data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none"
      >
        <LectureOutline content={content} prefix={prefix} compact />
        <div className="w-full min-w-0">
          <LearningMarkdown
            content={content}
            variant="answer"
            anchorPrefix={prefix}
            topic={question.topic}
          />
        </div>
        {question.topic !== "JavaScript" && question.code && (
          <CodeBlock
            code={question.code}
            language={codeLanguageFor(question.topic, question.code)}
          />
        )}
        {question.topic !== "JavaScript" && question.pitfall && (
          <section
            aria-labelledby={`${id}-pitfall`}
            className="rounded-r-lg border-l-2 border-amber-400/40 bg-amber-500/5 p-4"
          >
            <h3 id={`${id}-pitfall`} className="text-sm font-semibold">
              Частая ошибка
            </h3>
            <div className="mt-2 w-full min-w-0">
              <LearningMarkdown content={question.pitfall} topic={question.topic} />
            </div>
          </section>
        )}
        {question.topic !== "JavaScript" && (
          <section aria-labelledby={`${id}-takeaway`} className="rounded-lg bg-muted/30 p-4">
            <h3 id={`${id}-takeaway`} className="text-sm font-semibold">
              Главная мысль
            </h3>
            <div className="mt-2 w-full min-w-0">
              <LearningMarkdown content={question.takeaway} topic={question.topic} />
            </div>
          </section>
        )}
      </CollapsibleContent>
    </Collapsible>
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
      <Card className="gap-3 rounded-xl p-5 shadow-none transition-[background-color,border-color,box-shadow] duration-200 group-hover:border-primary/25 group-hover:bg-muted/30 motion-reduce:transition-none">
        {context && <p className="text-xs text-muted-foreground">{context}</p>}
        <h2 className="text-[15px] leading-6 font-semibold group-hover:text-primary">
          {question.title}
        </h2>
        <div className="flex min-h-5 flex-wrap items-center gap-1.5">
          <DifficultyBadge level={question.difficulty} />
          <JavaScriptQuestionBadge question={question} />
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
      <Disclosure
        className="mt-2 border-0 bg-transparent text-xs text-muted-foreground"
        title={<> Как работают отметки </>}
      >
        <p className="mt-2 leading-6">
          Неотмеченные вопросы остаются серыми. Повторное нажатие на выбранную отметку снимает её.
          Отметки сохраняются автоматически.
        </p>
      </Disclosure>
    </Card>
  )
}
