import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EmptyResults } from "@/components/practice/catalog-controls"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { QuestionStudyAside } from "@/components/questions/question-study"
import { StudyProgress } from "@/components/questions/study-progress"
import { sectionPath } from "@/data/question-catalog"
import { useCatalogFilters } from "@/hooks/use-catalog-filters"
import { cn } from "@/lib/utils"

export function QuestionsPage() {
  const {
    questions,
    questionSections,
    groups: learningGroups,
    getSectionQuestions,
  } = useQuestionCatalog()
  const filter = useCatalogFilters()
  const query = filter.query.trim().toLocaleLowerCase("ru")
  const sections = questionSections.filter((section) =>
    `${section.title} ${section.description} ${section.group} ${section.subsections.map((subsection) => subsection.title).join(" ")}`
      .toLocaleLowerCase("ru")
      .includes(query),
  )
  return (
    <>
      <QuestionBreadcrumbs
        items={[{ label: "Подготовка к собеседованию", to: "/learn" }, { label: "Вопросы" }]}
      />
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Вопросы для собеседований
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Выберите раздел, затем подраздел. Повторяйте знакомое и постепенно закрывайте пробелы в
          знаниях.
        </p>
      </header>
      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-7">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              aria-label="Поиск разделов"
              placeholder="Найти раздел или подраздел"
              value={filter.query}
              onChange={(event) => filter.update("q", event.target.value)}
              className="h-11 bg-background pr-24 pl-10"
            />
            {filter.query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-1/2 right-2 -translate-y-1/2"
                onClick={() => filter.update("q", "")}
              >
                Очистить
              </Button>
            )}
          </div>
          {sections.length ? (
            learningGroups.map((group) => {
              const groupSections = sections.filter((section) => section.group === group.id)
              if (!groupSections.length) return null
              return (
                <section key={group.id} aria-labelledby={`questions-group-${group.id}`}>
                  <div className="mb-4 border-b pb-4">
                    <h2
                      id={`questions-group-${group.id}`}
                      className="text-lg font-semibold tracking-tight"
                    >
                      {group.title}
                    </h2>
                    <p className="mt-1.5 text-xs leading-6 text-muted-foreground">
                      {group.description}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {groupSections.map((section) => (
                      <Link
                        key={section.id}
                        to={sectionPath(section.id)}
                        className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Card className="h-full gap-0 rounded-2xl p-5 shadow-none transition-shadow group-hover:shadow-md dark:group-hover:shadow-black/20">
                          <span
                            aria-hidden="true"
                            className={cn(
                              "mb-5 flex size-12 items-center justify-center rounded-xl font-mono text-xl font-bold",
                              section.color,
                            )}
                          >
                            {section.mark}
                          </span>
                          <h3 className="text-lg font-semibold group-hover:text-primary">
                            {section.title}
                          </h3>
                          <p className="mt-2 flex-1 text-[13px] leading-6 text-muted-foreground">
                            {section.description}
                          </p>
                          <div className="mt-5 border-t pt-4">
                            <StudyProgress
                              questionIds={getSectionQuestions(section).map(
                                (question) => question.id,
                              )}
                              compact
                            />
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              )
            })
          ) : (
            <EmptyResults onReset={filter.reset} />
          )}
        </div>
        <aside className="space-y-5 lg:sticky lg:top-7">
          <QuestionStudyAside
            questionIds={questions.map((question) => question.id)}
            title="Общий прогресс"
          />
          <div className="rounded-2xl border border-dashed p-5">
            <h2 className="text-sm font-semibold">Начните с одной темы</h2>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              Не обязательно идти по порядку. Выберите знакомый раздел и отметьте вопросы, к которым
              хотите вернуться.
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}
