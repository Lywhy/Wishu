import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { QuestionNavigation } from "@/components/questions/question-navigation"
import { QuestionReviewControls } from "@/components/questions/question-study"
import type { Question } from "@/data/interview-content"
import type { QuestionSession } from "@/data/question-session"

export function QuestionSidebar({
  questions,
  title,
  session,
  questionId,
  onNavigate,
}: {
  questions: Question[]
  title: string
  session: QuestionSession
  questionId: string
  onNavigate?: () => void
}) {
  const index = questions.findIndex((question) => question.id === questionId)
  const previous = questions[index - 1]
  const next = questions[index + 1]
  const actions = <QuestionReviewControls questionId={questionId} />
  const footer = (
    <nav aria-label="Переключение вопросов" className="flex items-center justify-between gap-2">
      {previous ? (
        <Button
          nativeButton={false}
          variant="outline"
          size="icon"
          className="size-8"
          aria-label="Предыдущий вопрос"
          title="Предыдущий вопрос"
          render={
            <Link
              to={`/questions/${previous.id}`}
              state={{ questionSession: session }}
              onClick={onNavigate}
            />
          }
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          aria-label="Предыдущий вопрос"
          title="Предыдущий вопрос"
          disabled
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
      )}
      <span
        className="text-xs text-muted-foreground tabular-nums"
        aria-label={`Вопрос ${index + 1} из ${questions.length}`}
      >
        {index + 1} / {questions.length}
      </span>
      {next ? (
        <Button
          nativeButton={false}
          variant="outline"
          size="icon"
          className="size-8"
          aria-label="Следующий вопрос"
          title="Следующий вопрос"
          render={
            <Link
              to={`/questions/${next.id}`}
              state={{ questionSession: session }}
              onClick={onNavigate}
            />
          }
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          aria-label="Следующий вопрос"
          title="Следующий вопрос"
          disabled
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      )}
    </nav>
  )
  return (
    <QuestionNavigation
      questions={questions}
      title={title}
      session={session}
      onNavigate={onNavigate}
      actions={actions}
      footer={footer}
    />
  )
}
