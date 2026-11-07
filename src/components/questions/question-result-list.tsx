import { useQuestionExperience } from "@/stores/question-experience"
import { Button } from "@/components/ui/button"
import { QuestionCard } from "@/components/questions/question-study"
import type { Question } from "@/data/interview-content"
import type { QuestionSession } from "@/data/question-session"

export function QuestionResultList({
  items,
  session,
}: {
  items: { question: Question; context: string }[]
  session: QuestionSession
}) {
  const limit = useQuestionExperience((state) => state.resultLimits[session.returnTo] ?? 24)
  const setLimit = () =>
    useQuestionExperience.getState().setResultLimit(session.returnTo, limit + 24)
  return (
    <>
      {items.slice(0, limit).map(({ question, context }) => (
        <QuestionCard key={question.id} question={question} context={context} session={session} />
      ))}
      {items.length > limit && (
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="text-xs text-muted-foreground">
            Показано {Math.min(limit, items.length)} из {items.length}
          </p>
          <Button variant="outline" onClick={setLimit}>
            Показать ещё 24
          </Button>
        </div>
      )}
    </>
  )
}
