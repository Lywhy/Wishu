import { JavaScriptPreparationGuide } from "@/components/questions/javascript-preparation"
import { PageHeading } from "@/components/catalog/page-heading"
import { PageState } from "@/components/catalog/page-state"
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
      <PageHeading
        title={section.title}
        description={section.description + " Выберите подраздел для повторения."}
        mark={<CategoryMark mark={section.mark} color={section.color} />}
        questionHeading
        headingProps={{ tabIndex: -1 }}
      />
      {section.id === "javascript" && <JavaScriptPreparationGuide />}
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section aria-label="Подразделы" className="grid min-w-0 gap-4 sm:grid-cols-2">
          {section.subsections.map((subsection, index) => (
            <Link
              key={subsection.id}
              to={rememberedQuestionList(subsectionPath(section.id, subsection.id))}
              className="group block min-w-0 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Card className="h-full min-w-0 gap-0 rounded-xl p-5 shadow-none transition-[background-color,border-color] duration-200 group-hover:border-primary/25 group-hover:bg-muted/30 motion-reduce:transition-none">
                <span className="mb-2 font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-base leading-6 font-semibold wrap-anywhere group-hover:text-primary">
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
        <aside className="space-y-5 lg:sticky lg:top-24">
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
    <PageState
      title="Страница не найдена"
      description="Такого раздела, подраздела или вопроса нет. Выберите тему в каталоге."
    >
      <Button nativeButton={false} render={<Link to="/questions" />}>
        К разделам вопросов
      </Button>
    </PageState>
  )
}
