import { JavaScriptPreparationGuide } from "@/components/questions/javascript-preparation"
import { CategoryMark } from "@/components/catalog/catalog-primitives"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { Link, useParams } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { QuestionStudyAside } from "@/components/questions/question-study"
import { StudyProgress } from "@/components/questions/study-progress"
import { subsectionPath } from "@/data/question-catalog"
import { rememberedQuestionList } from "@/stores/question-experience"

export function QuestionSectionPage() {
  const {
    questionSections,
    groups: learningGroups,
    getSectionQuestions,
    getSubsectionQuestions,
  } = useQuestionCatalog()
  const { sectionId } = useParams()
  const section = questionSections.find((item) => item.id === sectionId)
  if (!section || section.inDevelopment) return <MissingQuestionPage />
  const group = learningGroups.find((item) => item.id === section.group)
  return (
    <>
      <QuestionBreadcrumbs
        items={[
          { label: "Вопросы", to: "/questions" },
          { label: group?.title ?? "" },
          { label: section.title },
        ]}
      />
      <header className="mb-6">
        <CategoryMark mark={section.mark} color={section.color} className="mb-3" />
        <h1
          data-question-heading
          tabIndex={-1}
          className="text-3xl font-semibold tracking-tight outline-none sm:text-4xl"
        >
          {section.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          {section.description} Выберите подраздел для повторения.
        </p>
      </header>
      {section.id === "javascript" && <JavaScriptPreparationGuide />}
      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section aria-label="Подразделы" className="grid gap-3 sm:grid-cols-2">
          {section.subsections.map((subsection, index) => (
            <Link
              key={subsection.id}
              to={rememberedQuestionList(subsectionPath(section.id, subsection.id))}
              className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Card className="h-full gap-0 rounded-2xl p-4 shadow-none transition-shadow group-hover:shadow-md dark:group-hover:shadow-black/20">
                <span className="mb-2 font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-lg font-semibold group-hover:text-primary">
                  {subsection.title}
                </h2>
                <p className="mt-1.5 flex-1 text-xs leading-5 text-muted-foreground">
                  {subsection.description}
                </p>
                <div className="mt-3 border-t pt-3">
                  <StudyProgress
                    questionIds={getSubsectionQuestions(subsection).map((question) => question.id)}
                    compact
                  />
                </div>
              </Card>
            </Link>
          ))}
        </section>
        <aside className="space-y-5 lg:sticky lg:top-7">
          <QuestionStudyAside
            questionIds={getSectionQuestions(section).map((question) => question.id)}
            title={`Прогресс: ${section.title}`}
          />
        </aside>
      </div>
    </>
  )
}

export function MissingQuestionPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-semibold">Страница не найдена</h1>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        Такого раздела, подраздела или вопроса нет. Выберите тему в каталоге.
      </p>
      <Button nativeButton={false} className="mt-6" render={<Link to="/questions" />}>
        К разделам вопросов
      </Button>
    </section>
  )
}
