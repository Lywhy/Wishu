import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DifficultyBadge, RelatedModule } from "@/components/practice/practice-elements"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { QuestionNavigation } from "@/components/questions/question-navigation"
import {
  AnswerPreference,
  QuestionAnswer,
  QuestionStatusControls,
  QuestionStudyAside,
} from "@/components/questions/question-study"
import { questions } from "@/data/interview-content"
import {
  findQuestionLocation,
  getSubsectionQuestions,
  sectionPath,
  subsectionPath,
} from "@/data/question-catalog"
import { usePracticeProgress } from "@/stores/practice-progress"
import { MissingQuestionPage } from "@/pages/question-section-page"

export function QuestionDetailPage() {
  const { questionId } = useParams()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [questionId])
  const question = questions.find((item) => item.id === questionId)
  const location = question ? findQuestionLocation(question.id) : undefined
  const saved = usePracticeProgress((state) =>
    question ? state.savedQuestionIds.includes(question.id) : false,
  )
  const toggleSaved = usePracticeProgress((state) => state.toggleSaved)
  const status = usePracticeProgress((state) =>
    question ? state.questionStatuses[question.id] : undefined,
  )
  if (!question || !location) return <MissingQuestionPage />
  const { section, subsection } = location
  const siblings = getSubsectionQuestions(subsection)
  const currentIndex = siblings.findIndex((item) => item.id === question.id)
  const previous = siblings[currentIndex - 1]
  const next = siblings[currentIndex + 1]
  const back = subsectionPath(section.id, subsection.id)

  return (
    <>
      <QuestionBreadcrumbs
        items={[
          { label: "Вопросы", to: "/questions" },
          { label: section.title, to: sectionPath(section.id) },
          { label: subsection.title, to: back },
          { label: "Вопрос" },
        ]}
      />
      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="min-w-0 space-y-6">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge variant="secondary">{question.topic}</Badge>
              <DifficultyBadge level={question.difficulty} />
            </div>
            <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
              {question.title}
            </h1>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{question.summary}</p>
          </div>
          <AnswerPreference />
          <Card className="gap-5 rounded-2xl p-5 shadow-none sm:p-7">
            <div>
              <h2 className="text-base font-semibold">Как бы вы это объяснили?</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Сформулируйте ответ своими словами и приведите пример. Затем сравните с объяснением.
              </p>
            </div>
            <QuestionAnswer question={question} />
          </Card>
          <div className="space-y-3">
            <QuestionStatusControls questionId={question.id} />
            <p role="status" className="text-xs text-muted-foreground">
              {status === "repeat"
                ? "Вопрос отмечен для повторения."
                : status === "learned"
                  ? "Вопрос отмечен изученным."
                  : status === "skipped"
                    ? "Вопрос отмечен пропущенным."
                    : "Выберите отметку после знакомства с вопросом."}
            </p>
          </div>
          <nav
            aria-label="Переключение вопросов"
            className="flex flex-wrap items-center justify-between gap-3 border-t pt-5"
          >
            {previous ? (
              <Button
                nativeButton={false}
                variant="outline"
                render={<Link to={"/questions/" + previous.id} />}
              >
                Предыдущий
              </Button>
            ) : (
              <Button variant="outline" disabled>
                Предыдущий
              </Button>
            )}
            <span className="text-xs text-muted-foreground" aria-live="polite">
              Вопрос {currentIndex + 1} из {siblings.length}
            </span>
            {next ? (
              <Button
                nativeButton={false}
                variant="outline"
                render={<Link to={"/questions/" + next.id} />}
              >
                Следующий
              </Button>
            ) : (
              <Button variant="outline" disabled>
                Следующий
              </Button>
            )}
          </nav>
          <Link
            to={back}
            className="inline-block rounded text-xs text-muted-foreground outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
          >
            Все вопросы подраздела
          </Link>
        </article>
        <aside className="space-y-5 lg:sticky lg:top-7">
          <QuestionNavigation questions={siblings} title={subsection.title} />
          <QuestionStudyAside
            questionIds={siblings.map((item) => item.id)}
            title="Прогресс подраздела"
          />
          <Button
            variant="outline"
            className="w-full"
            aria-pressed={saved}
            onClick={() => toggleSaved(question.id)}
          >
            {saved ? "Убрать из избранного" : "Добавить в избранное"}
          </Button>
          <RelatedModule moduleId={question.moduleId} />
        </aside>
      </div>
    </>
  )
}
