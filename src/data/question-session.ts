import type { Question } from "@/data/interview-content"
import {
  findQuestionLocation,
  getSubsectionQuestions,
  subsectionPath,
  type QuestionSection,
} from "@/data/question-catalog"

export interface QuestionSession {
  questionIds: string[]
  returnTo: string
  title: string
}

export function readQuestionSession(state: unknown): QuestionSession | undefined {
  if (!state || typeof state !== "object" || !("questionSession" in state)) return
  const session = state.questionSession
  if (!session || typeof session !== "object") return
  if (
    !("questionIds" in session) ||
    !Array.isArray(session.questionIds) ||
    !session.questionIds.every((id) => typeof id === "string") ||
    !("returnTo" in session) ||
    typeof session.returnTo !== "string" ||
    !/^\/(?:questions(?:\?|\/sections\/|$)|session(?:\?|$))/.test(session.returnTo) ||
    !("title" in session) ||
    typeof session.title !== "string"
  )
    return
  return {
    questionIds: [...new Set(session.questionIds)],
    returnTo: session.returnTo,
    title: session.title,
  }
}
export function resolveQuestionSession(
  questionId: string | undefined,
  questions: Question[],
  sections: QuestionSection[],
  state: unknown,
) {
  const byId = new Map(questions.map((question) => [question.id, question]))
  const question = questionId ? byId.get(questionId) : undefined
  const location = question ? findQuestionLocation(question.id, sections) : undefined
  if (!question || !location || location.section.inDevelopment) return
  const source = readQuestionSession(state)
  const enabledIds = new Set(
    sections
      .filter((section) => !section.inDevelopment)
      .flatMap((section) => section.subsections.flatMap((subsection) => subsection.questionIds)),
  )
  const selected =
    source?.questionIds.flatMap((id) => {
      const item = byId.get(id)
      return item && enabledIds.has(id) ? [item] : []
    }) ?? []
  const fromSession = selected.some((item) => item.id === question.id)
  const siblings = fromSession ? selected : getSubsectionQuestions(location.subsection, questions)
  const session: QuestionSession =
    fromSession && source
      ? { ...source, questionIds: siblings.map((item) => item.id) }
      : {
          questionIds: siblings.map((item) => item.id),
          returnTo: subsectionPath(location.section.id, location.subsection.id),
          title: `${location.section.title} / ${location.subsection.title}`,
        }
  return { question, location, siblings, session, fromSession }
}
