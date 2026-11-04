import { useLocation, useParams } from "react-router-dom"
import { CatalogControls, EmptyResults } from "@/components/practice/catalog-controls"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { QuestionCard, QuestionStudyAside } from "@/components/questions/question-study"
import { sectionPath } from "@/data/question-catalog"
import type { QuestionSession } from "@/data/question-session"
import { useCatalogFilters } from "@/hooks/use-catalog-filters"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import {
  matchesQuestionFilters,
  questionEmptyState,
  questionFilterStatuses,
} from "@/lib/filter-questions"
import { usePracticeProgress } from "@/stores/practice-progress"
import { MissingQuestionPage } from "@/pages/question-section-page"

export function QuestionSubsectionPage() {
  const { questionSections, getSubsectionQuestions } = useQuestionCatalog()
  const { sectionId, subsectionId } = useParams()
  const location = useLocation()
  const filter = useCatalogFilters()
  const statuses = usePracticeProgress((state) => state.questionStatuses)
  const saved = usePracticeProgress((state) => state.savedQuestionIds)
  const section = questionSections.find((item) => item.id === sectionId)
  const subsection = section?.subsections.find((item) => item.id === subsectionId)
  if (!section || section.inDevelopment || !subsection) return <MissingQuestionPage />
  const questions = getSubsectionQuestions(subsection)
  const visible = questions.filter(
    (question) =>
      matchesQuestionFilters(question, filter, statuses, saved) &&
      `${question.title} ${question.summary}`
        .toLocaleLowerCase("ru")
        .includes(filter.query.trim().toLocaleLowerCase("ru")),
  )
  const session: QuestionSession = {
    questionIds: visible.map((question) => question.id),
    returnTo: location.pathname + location.search,
    title: `${section.title} / ${subsection.title}`,
  }
  return (
    <>
      <QuestionBreadcrumbs
        items={[
          { label: "Вопросы", to: "/questions" },
          { label: section.title, to: sectionPath(section.id) },
          { label: subsection.title },
        ]}
      />
      <header className="mb-6">
        <p className="mb-2 text-xs font-medium text-primary">{section.title}</p>
        <h1
          data-question-heading
          tabIndex={-1}
          className="text-3xl font-semibold tracking-tight outline-none sm:text-4xl"
        >
          {subsection.title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{subsection.description}</p>
      </header>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-3">
          <CatalogControls
            filter={filter}
            placeholder="Найти вопрос в подразделе"
            statuses={questionFilterStatuses}
            showPopular
          />
          <p className="text-xs text-muted-foreground">
            Показано: {visible.length} из {questions.length}
          </p>
          {visible.length ? (
            <div className="space-y-3">
              {visible.map((question) => (
                <QuestionCard key={question.id} question={question} session={session} />
              ))}
            </div>
          ) : (
            <EmptyResults
              onReset={filter.reset}
              {...questionEmptyState(questions, filter, statuses, saved)}
            />
          )}
        </div>
        <aside className="space-y-4 lg:sticky lg:top-6">
          <QuestionStudyAside
            questionIds={questions.map((question) => question.id)}
            title="Прогресс подраздела"
          />
        </aside>
      </div>
    </>
  )
}
