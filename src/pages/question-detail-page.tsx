import { PageHeading } from "@/components/catalog/page-heading"
import {
  JavaScriptQuestionBadge,
  JavaScriptSelfCheck,
} from "@/components/questions/javascript-preparation"
import { isJavascriptCodeReading } from "@/data/javascript-preparation"
import { WorkspaceControls, PersonalNote, RelatedStudy } from "@/components/experience/study-tools"
import { UndoQuestionMark, QuestionShortcuts } from "@/components/experience/question-actions"
import { ContentFeedback } from "@/components/experience/content-feedback"
import { useWorkspace } from "@/stores/workspace"
import { QuestionReviewControls } from "@/components/questions/question-study"
import { useEffect, useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CodeBlock, DifficultyBadge, RelatedModule } from "@/components/practice/practice-elements"
import { QuestionPopularBadge } from "@/components/questions/question-popular"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { QuestionSidebar } from "@/components/questions/question-sidebar"
import { QuestionSectionPicker } from "@/components/questions/question-section-picker"
import { QuestionMobileNavigation } from "@/components/questions/question-mobile-navigation"
import { QuestionAnswer, QuestionStudyAside } from "@/components/questions/question-study"
import { sectionPath, subsectionPath } from "@/data/question-catalog"
import { resolveQuestionSession } from "@/data/question-session"
import { codeLanguageFor } from "@/lib/syntax-highlighter"
import { learningModules } from "@/data/learning-modules"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { usePracticeProgress } from "@/stores/practice-progress"
import { rememberedQuestionList, useQuestionExperience } from "@/stores/question-experience"
import { MissingQuestionPage } from "@/pages/question-section-page"

export function QuestionDetailPage() {
  const { questions, questionSections } = useQuestionCatalog()
  const { questionId } = useParams()
  const focus = useWorkspace((s) => s.focus)
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
      <WorkspaceControls>
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
          <div className="min-w-40 flex-1 sm:flex-none">
            <QuestionSectionPicker sectionId={section.id} />
          </div>
          {focus && (
            <div className="w-56">
              <QuestionReviewControls questionId={question.id} compact />
            </div>
          )}
        </div>
      </WorkspaceControls>
      <div
        className={`grid items-start gap-6 ${focus ? "lg:grid-cols-1" : "lg:grid-cols-[minmax(0,1fr)_280px]"}`}
      >
        <article className="min-w-0 space-y-6">
          <PageHeading
            title={question.title}
            description={question.summary}
            meta={
              <>
                <Badge variant="secondary">{question.topic}</Badge>
                <DifficultyBadge level={question.difficulty} />
                <JavaScriptQuestionBadge question={question} />
                {question.popular && <QuestionPopularBadge />}
                <span className="ml-auto text-xs text-muted-foreground">
                  Вопрос {index + 1} из {siblings.length}
                </span>
              </>
            }
            questionHeading
            headingProps={{ tabIndex: -1 }}
            className="mb-0 sm:mb-0"
          />
          {isJavascriptCodeReading(question) && question.code && (
            <section aria-label="Код для самостоятельного разбора" className="space-y-3">
              <CodeBlock
                code={question.code}
                language={codeLanguageFor(question.topic, question.code)}
                label="Определите результат без запуска кода"
              />
              <p className="text-xs leading-6 text-muted-foreground">
                Сначала назовите результат и объясните его по шагам. Затем раскройте ответ и
                сравните рассуждение.
              </p>
            </section>
          )}
          <QuestionMobileNavigation
            key={`navigation:${question.id}`}
            questions={siblings}
            title={session.title}
            session={session}
            currentTitle={question.title}
            questionId={question.id}
          />
          <Card className="gap-4 rounded-xl p-4 shadow-none sm:p-6">
            <div>
              <h2 className="text-base font-semibold">Ответ и разбор</h2>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                Сформулируйте ответ, затем сравните с разбором.
              </p>
            </div>
            <QuestionAnswer question={question} />
          </Card>
          <p className="sr-only">{note}</p>
          <UndoQuestionMark />
          <div hidden={focus} className="space-y-4">
            <QuestionShortcuts
              id={question.id}
              previous={siblings[index - 1] ? "/questions/" + siblings[index - 1].id : undefined}
              next={siblings[index + 1] ? "/questions/" + siblings[index + 1].id : undefined}
              onReveal={() => document.dispatchEvent(new Event("wishu-toggle-answer"))}
            />
            <JavaScriptSelfCheck question={question} />
            <PersonalNote contentKey={"question:" + question.id} />
            <RelatedStudy moduleId={section.id} from={"/questions/" + question.id} />
            <ContentFeedback
              key={`feedback:${question.id}`}
              contentKey={"question:" + question.id}
            />
          </div>
        </article>
        <aside className={focus ? "hidden" : "hidden space-y-4 lg:sticky lg:top-24 lg:block"}>
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
