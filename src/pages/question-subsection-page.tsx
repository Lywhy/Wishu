import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CatalogControls, EmptyResults } from "@/components/practice/catalog-controls"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { QuestionCard, QuestionStudyAside } from "@/components/questions/question-study"
import { sectionPath } from "@/data/question-catalog"
import { useCatalogFilters } from "@/hooks/use-catalog-filters"
import { usePracticeProgress } from "@/stores/practice-progress"
import { MissingQuestionPage } from "@/pages/question-section-page"

export function QuestionSubsectionPage() {
  const { questionSections, getSubsectionQuestions } = useQuestionCatalog()
  const { sectionId, subsectionId } = useParams()
  const filter = useCatalogFilters()
  const statuses = usePracticeProgress((state) => state.questionStatuses)
  const saved = usePracticeProgress((state) => state.savedQuestionIds)
  const section = questionSections.find((item) => item.id === sectionId)
  const subsection = section?.subsections.find((item) => item.id === subsectionId)
  if (!section || !subsection) return <MissingQuestionPage />
  const questions = getSubsectionQuestions(subsection)
  const visible = questions.filter(
    (question) =>
      (filter.difficulty === "Любой уровень" || question.difficulty === filter.difficulty) &&
      (filter.status !== "new" || !statuses[question.id]) &&
      (!["repeat", "learned", "skipped"].includes(filter.status) ||
        statuses[question.id] === filter.status) &&
      (filter.status !== "saved" || saved.includes(question.id)) &&
      `${question.title} ${question.summary}`
        .toLocaleLowerCase("ru")
        .includes(filter.query.trim().toLocaleLowerCase("ru")),
  )
  return (
    <>
      <QuestionBreadcrumbs
        items={[
          { label: "Вопросы", to: "/questions" },
          { label: section.title, to: sectionPath(section.id) },
          { label: subsection.title },
        ]}
      />
      <header className="mb-8">
        <p className="mb-3 text-xs font-medium text-primary">{section.title}</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{subsection.title}</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{subsection.description}</p>
      </header>
      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-5">
          <CatalogControls
            filter={filter}
            placeholder="Найти вопрос в подразделе"
            statuses={[
              { value: "all", label: "Все вопросы" },
              { value: "new", label: "Без отметки" },
              { value: "repeat", label: "Повторить" },
              { value: "learned", label: "Изучил" },
              { value: "skipped", label: "Пропустить" },
              { value: "saved", label: "Избранное" },
            ]}
          />
          <p className="text-xs text-muted-foreground">
            Показано: {visible.length} из {questions.length}
          </p>
          {visible.length ? (
            <div className="space-y-4">
              {visible.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          ) : (
            <EmptyResults onReset={filter.reset} />
          )}
        </div>
        <aside className="space-y-5 lg:sticky lg:top-7">
          <QuestionStudyAside
            questionIds={questions.map((question) => question.id)}
            title="Прогресс подраздела"
          />
          <Button
            nativeButton={false}
            variant="outline"
            className="w-full"
            render={<Link to={sectionPath(section.id)} />}
          >
            Все подразделы {section.title}
          </Button>
        </aside>
      </div>
    </>
  )
}
