import { PageHeading } from "@/components/catalog/page-heading"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useLocation, useParams } from "react-router-dom"
import { CatalogControls, EmptyResults } from "@/components/catalog/catalog-controls"
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
      <PageHeading
        title={subsection.title}
        description={subsection.description}
        meta={<p className="text-xs font-medium text-primary">{section.title}</p>}
        questionHeading
        headingProps={{ tabIndex: -1 }}
        actions={
          <Button
            nativeButton={false}
            variant="outline"
            render={
              <Link
                to={
                  "/questions/new?section=" +
                  encodeURIComponent(section.id) +
                  "&subsection=" +
                  encodeURIComponent(subsection.id)
                }
              />
            }
          >
            Добавить вопрос
          </Button>
        }
      />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-3">
          {!!questions.length &&
            questions.every((question) => statuses[question.id] === "learned") && (
              <div className="space-y-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                <h2 className="font-semibold">Подраздел изучен</h2>
                <p className="text-sm">Можно повторить вопросы или выбрать следующую тему.</p>
                <Button
                  nativeButton={false}
                  variant="outline"
                  render={<Link to={sectionPath(section.id)} />}
                >
                  Выбрать следующую тему
                </Button>
              </div>
            )}
          <CatalogControls
            filter={filter}
            placeholder="Найти вопрос в подразделе"
            statuses={questionFilterStatuses}
            showPopular
          />
          <p aria-live="polite" aria-atomic="true" className="text-xs text-muted-foreground">
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
        <aside className="space-y-4 lg:sticky lg:top-24">
          <QuestionStudyAside
            questionIds={questions.map((question) => question.id)}
            title="Прогресс подраздела"
          />
        </aside>
      </div>
    </>
  )
}
