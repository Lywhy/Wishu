import { useEffect, useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { DifficultyBadge, RelatedModule } from "@/components/practice/practice-elements"
import { QuestionPopularBadge } from "@/components/questions/question-popular"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { QuestionSidebar } from "@/components/questions/question-sidebar"
import { QuestionSectionPicker } from "@/components/questions/question-section-picker"
import { QuestionMobileNavigation } from "@/components/questions/question-mobile-navigation"
import { QuestionAnswer, QuestionStudyAside } from "@/components/questions/question-study"
import { sectionPath, subsectionPath } from "@/data/question-catalog"
import { resolveQuestionSession } from "@/data/question-session"
import { learningModules } from "@/data/learning-modules"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { usePracticeProgress } from "@/stores/practice-progress"
import { rememberedQuestionList, useQuestionExperience } from "@/stores/question-experience"
import { MissingQuestionPage } from "@/pages/question-section-page"

export function QuestionDetailPage() {
  const { questions, questionSections } = useQuestionCatalog()
  const { questionId } = useParams()
  const route = useLocation()
  const study = useMemo(() => {
    const resolved = resolveQuestionSession(questionId, questions, questionSections, route.state)
    if (!resolved || resolved.fromSession) return resolved
    return {
      ...resolved,
      session: { ...resolved.session, returnTo: rememberedQuestionList(resolved.session.returnTo) },
    }
  }, [questionId, questions, questionSections, route.state])
  const status = usePracticeProgress((state) =>
    questionId ? state.questionStatuses[questionId] : undefined,
  )
  useEffect(() => {
    if (study)
      useQuestionExperience
        .getState()
        .rememberQuestion(
          study.location.section.id,
          study.location.subsection.id,
          study.question.id,
          study.session,
        )
  }, [study])
  if (!study) return <MissingQuestionPage />
  const {
    question,
    location: { section, subsection },
    siblings,
    session,
    fromSession,
  } = study
  // Freeze the selected list: changing a mark must not remove the current question or advance it.
  const index = siblings.findIndex((item) => item.id === question.id)
  const subsectionList = subsectionPath(section.id, subsection.id)
  const back =
    session.returnTo.split("?")[0] === subsectionList
      ? session.returnTo
      : rememberedQuestionList(subsectionList)
  const rootBack = session.returnTo.split("?")[0] === "/questions" ? session.returnTo : "/questions"
  const note =
    status === "repeat"
      ? "Вопрос отмечен для повторения."
      : status === "learned"
        ? "Вопрос отмечен изученным."
        : status === "skipped"
          ? "Вопрос отмечен пропущенным."
          : ""
  return (
    <>
      <QuestionBreadcrumbs
        items={[
          { label: "Вопросы", to: rootBack },
          { label: section.title, to: sectionPath(section.id) },
          { label: subsection.title, to: back },
          { label: "Вопрос" },
        ]}
      />
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="text-xs text-muted-foreground">Раздел вопросов</span>
        <QuestionSectionPicker sectionId={section.id} />
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="min-w-0 space-y-5">
          <header>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{question.topic}</Badge>
              <DifficultyBadge level={question.difficulty} />
              {question.popular && <QuestionPopularBadge />}
              <span className="ml-auto text-xs text-muted-foreground">
                Вопрос {index + 1} из {siblings.length}
              </span>
            </div>
            <h1
              data-question-heading
              tabIndex={-1}
              className="text-2xl leading-tight font-semibold tracking-tight outline-none sm:text-3xl"
            >
              {question.title}
            </h1>
            <p className="mt-3 max-w-[70ch] text-sm leading-7 text-muted-foreground">
              {question.summary}
            </p>
          </header>
          <QuestionMobileNavigation
            key={question.id}
            questions={siblings}
            title={session.title}
            session={session}
            currentTitle={question.title}
            questionId={question.id}
          />
          <Card className="gap-4 rounded-xl p-4 shadow-none sm:p-6">
            <div>
              <h2 className="text-base font-semibold">Как бы вы это объяснили?</h2>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                Сначала ответьте самостоятельно, затем сравните с объяснением.
              </p>
            </div>
            <QuestionAnswer question={question} />
          </Card>
          <p className="sr-only">{note}</p>
        </article>
        <aside className="hidden space-y-4 lg:sticky lg:top-6 lg:block">
          <QuestionSidebar
            questions={siblings}
            title={session.title}
            session={session}
            questionId={question.id}
          />
          <QuestionStudyAside
            questionIds={siblings.map((item) => item.id)}
            title={fromSession ? "Прогресс подборки" : "Прогресс подраздела"}
            actions={false}
          />
          {learningModules.some((module) => module.id === question.moduleId) && (
            <RelatedModule moduleId={question.moduleId} />
          )}
        </aside>
      </div>
    </>
  )
}
