import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { useQuestionExperience } from "@/stores/question-experience"
import { usePracticeProgress } from "@/stores/practice-progress"
import type { QuestionSession } from "@/data/question-session"

export function QuestionPracticeActions({
  questionIds,
  title,
  prominent = false,
}: {
  questionIds: string[]
  title: string
  prominent?: boolean
}) {
  const { questions, findQuestionLocation } = useQuestionCatalog()
  const currentLocation = useLocation()
  const lastId = useQuestionExperience((state) => state.lastQuestionId)
  const lastBySection = useQuestionExperience((state) => state.lastBySection)
  const lastBySubsection = useQuestionExperience((state) => state.lastBySubsection)
  const lastSession = useQuestionExperience((state) => state.lastSession)
  const statuses = usePracticeProgress((state) => state.questionStatuses)
  const byId = new Map(questions.map((question) => [question.id, question]))
  const available = questionIds.flatMap((id) => {
    const question = byId.get(id)
    return question ? [question] : []
  })
  const firstLocation = available[0] ? findQuestionLocation(available[0].id) : undefined
  const sameSubsection =
    firstLocation &&
    available.every((question) => firstLocation.subsection.questionIds.includes(question.id))
  const sectionIds = new Set(
    firstLocation?.section.subsections.flatMap((subsection) => subsection.questionIds),
  )
  const sameSection = firstLocation && available.every((question) => sectionIds.has(question.id))
  const scopedLastId = firstLocation
    ? sameSubsection
      ? lastBySubsection[`${firstLocation.section.id}/${firstLocation.subsection.id}`]
      : sameSection
        ? lastBySection[firstLocation.section.id]
        : undefined
    : undefined
  const recent =
    available.find((question) => question.id === lastId) ??
    available.find((question) => question.id === scopedLastId)
  const next = recent ?? available.find((question) => !statuses[question.id]) ?? available[0]
  if (!next) return null
  const location = findQuestionLocation(next.id)
  const repeatIds = questionIds.filter((id) => statuses[id] === "repeat")
  const sessionTitle =
    firstLocation && sameSubsection
      ? `${firstLocation.section.title} / ${firstLocation.subsection.title}`
      : firstLocation && sameSection
        ? firstLocation.section.title
        : title
  const session: QuestionSession = {
    questionIds,
    returnTo: currentLocation.pathname + currentLocation.search,
    title: sessionTitle,
  }
  const availableIds = new Set(available.map((question) => question.id))
  const continuation =
    recent && recent.id === lastId && lastSession?.questionIds.includes(recent.id)
      ? {
          ...lastSession,
          questionIds: lastSession.questionIds.filter((id) => availableIds.has(id)),
        }
      : session
  const actions = (
    <>
      <Button
        nativeButton={false}
        className="h-10"
        render={<Link to={`/questions/${next.id}`} state={{ questionSession: continuation }} />}
      >
        {recent ? "Продолжить" : "Начать подготовку"}
      </Button>
      {repeatIds.length > 0 && (
        <Button
          nativeButton={false}
          variant="outline"
          className="h-10"
          render={
            <Link
              to={`/questions/${repeatIds[0]}`}
              state={{
                questionSession: {
                  ...session,
                  questionIds: repeatIds,
                  title: `Повторение: ${session.title}`,
                },
              }}
            />
          }
        >
          Повторить отмеченные ({repeatIds.length})
        </Button>
      )}
    </>
  )

  if (!prominent) return <div className="mt-5 flex flex-col gap-2">{actions}</div>
  return (
    <Card className="gap-0 rounded-xl p-4 shadow-none">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0 flex-1 basis-56">
          <p className="text-xs font-medium text-primary">
            {recent ? "Продолжить подготовку" : "Начните с первого вопроса"}
          </p>
          <p className="mt-1.5 line-clamp-2 text-sm font-semibold">{next.title}</p>
          {location && (
            <p className="mt-1 text-xs text-muted-foreground">
              {location.section.title} / {location.subsection.title}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">{actions}</div>
      </div>
    </Card>
  )
}
