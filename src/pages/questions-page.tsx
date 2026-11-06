import { Link, useLocation } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import {
  AnimatedCard as Card,
  CatalogHeader,
  CategoryMark,
} from "@/components/catalog/catalog-primitives"
import { Button } from "@/components/ui/button"
import { CatalogControls, EmptyResults } from "@/components/practice/catalog-controls"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { QuestionCard, QuestionStudyAside } from "@/components/questions/question-study"
import { QuestionPracticeActions } from "@/components/questions/question-practice-actions"
import { StudyProgress } from "@/components/questions/study-progress"
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
import { cn } from "@/lib/utils"

export function QuestionsPage() {
  const { questions, questionSections, groups, getSectionQuestions, findQuestionLocation } =
    useQuestionCatalog()
  const statuses = usePracticeProgress((state) => state.questionStatuses)
  const saved = usePracticeProgress((state) => state.savedQuestionIds)
  const rawFilter = useCatalogFilters()
  const filter = { ...rawFilter, popular: false }
  const route = useLocation()
  const query = filter.query.trim().toLocaleLowerCase("ru")
  const searching =
    Boolean(query) || filter.difficulty !== "Любой уровень" || filter.status !== "all"
  const sections = questionSections.filter((section) =>
    `${section.title} ${section.description} ${section.group} ${section.subsections.map((sub) => sub.title).join(" ")}`
      .toLocaleLowerCase("ru")
      .includes(query),
  )
  const matches = searching
    ? questions.flatMap((question) => {
        const location = findQuestionLocation(question.id)
        if (!location || location.section.inDevelopment) return []
        const text =
          `${question.title} ${question.summary} ${question.topic} ${location.section.title} ${location.subsection.title}`.toLocaleLowerCase(
            "ru",
          )
        return text.includes(query) && matchesQuestionFilters(question, filter, statuses, saved)
          ? [{ question, location }]
          : []
      })
    : []
  const mode =
    filter.status === "repeat"
      ? "Повторение"
      : filter.status === "saved"
        ? "Избранное"
        : "Результаты поиска"
  const session: QuestionSession = {
    questionIds: matches.map(({ question }) => question.id),
    returnTo: route.pathname + route.search,
    title: mode,
  }
  const repeatCount = questions.filter((question) => statuses[question.id] === "repeat").length
  const savedCount = questions.filter((question) => saved.includes(question.id)).length
  const emptyState = questionEmptyState(questions, filter, statuses, saved)
  return (
    <>
      <QuestionBreadcrumbs
        items={[{ label: "Подготовка к собеседованию", to: "/learn" }, { label: "Вопросы" }]}
      />
      <CatalogHeader
        title="Вопросы для собеседований"
        description="Продолжайте подготовку или найдите нужный вопрос во всём каталоге."
        eyebrow="Подготовка и повторение"
        questionHeading
      />
      <div className="mb-6 flex justify-end">
        <Button nativeButton={false} render={<Link to="/questions/new" />}>
          Добавить вопрос
        </Button>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-5">
          {!searching && (
            <QuestionPracticeActions
              questionIds={questions.map((question) => question.id)}
              title="Все вопросы"
              prominent
            />
          )}
          <div className="flex flex-wrap gap-2" aria-label="Быстрые подборки">
            <Button
              nativeButton={false}
              variant={filter.status === "repeat" ? "secondary" : "outline"}
              className="h-10"
              render={<Link to="/questions?status=repeat" />}
            >
              Повторить ({repeatCount})
            </Button>
            <Button
              nativeButton={false}
              variant={filter.status === "saved" ? "secondary" : "outline"}
              className="h-10"
              render={<Link to="/questions?status=saved" />}
            >
              Избранное ({savedCount})
            </Button>
            {searching && (
              <Button
                nativeButton={false}
                variant="ghost"
                className="h-10"
                render={<Link to="/questions" />}
              >
                Каталог разделов
              </Button>
            )}
          </div>
          <CatalogControls
            filter={filter}
            placeholder="Найти вопрос, раздел или подраздел"
            statuses={questionFilterStatuses}
          />
          {searching && (
            <section aria-label="Результаты поиска" className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold">{mode}</h2>
                <p aria-live="polite" aria-atomic="true" className="text-xs text-muted-foreground">
                  Найдено вопросов: {matches.length}
                </p>
              </div>
              {matches.length ? (
                matches.map(({ question, location }) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    session={session}
                    context={`${location.section.title} / ${location.subsection.title}`}
                  />
                ))
              ) : (
                <EmptyResults onReset={filter.reset} {...emptyState} />
              )}
            </section>
          )}
          {(!searching || (query && sections.length > 0)) && (
            <div className="space-y-6">
              {searching && <h2 className="text-lg font-semibold">Разделы и подразделы</h2>}
              {groups.map((group) => {
                const groupSections = sections.filter((section) => section.group === group.id)
                if (!groupSections.length) return null
                return (
                  <section key={group.id} aria-labelledby={`questions-group-${group.id}`}>
                    <div className="mb-3 border-b pb-3">
                      <h2
                        id={`questions-group-${group.id}`}
                        className="text-lg font-semibold tracking-tight"
                      >
                        {group.title}
                      </h2>
                      <p className="mt-1 text-xs leading-6 text-muted-foreground">
                        {group.description}
                      </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {groupSections.map((section) => {
                        const content = (
                          <Card
                            className={cn(
                              "h-full gap-0 rounded-xl p-5 shadow-none",
                              section.inDevelopment
                                ? "bg-muted/30"
                                : "transition-[background-color,box-shadow] duration-200 group-hover:bg-muted/40 group-hover:ring-primary/25",
                            )}
                          >
                            <CategoryMark
                              mark={section.mark}
                              color={section.color}
                              className="mb-3"
                            />
                            <h3 className="text-base font-semibold group-hover:text-primary">
                              {section.title}
                            </h3>
                            <p className="mt-1.5 line-clamp-2 text-xs leading-6 text-muted-foreground">
                              {section.description}
                            </p>
                            <div className="mt-3 border-t pt-3">
                              {section.inDevelopment ? (
                                <Badge
                                  variant="outline"
                                  className="border-dashed text-muted-foreground"
                                >
                                  В разработке
                                </Badge>
                              ) : (
                                <StudyProgress
                                  questionIds={getSectionQuestions(section).map(
                                    (question) => question.id,
                                  )}
                                  compact
                                />
                              )}
                            </div>
                          </Card>
                        )
                        return section.inDevelopment ? (
                          <div
                            key={section.id}
                            aria-disabled="true"
                            className="h-full cursor-not-allowed rounded-xl"
                          >
                            {content}
                          </div>
                        ) : (
                          <Link
                            key={section.id}
                            to={sectionPath(section.id)}
                            className="group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {content}
                          </Link>
                        )
                      })}
                    </div>
                  </section>
                )
              })}
            </div>
          )}
        </div>
        <aside className="space-y-4 lg:sticky lg:top-6">
          <QuestionStudyAside
            questionIds={questions.map((question) => question.id)}
            title="Общий прогресс"
            actions={false}
          />
        </aside>
      </div>
    </>
  )
}
