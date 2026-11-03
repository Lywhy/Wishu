import type { Question } from "@/data/interview-content"

export type QuestionStatus = "repeat" | "learned" | "skipped"

export interface QuestionSubsection {
  id: string
  title: string
  description: string
  questionIds: string[]
}

export interface QuestionSection {
  id: string
  group: string
  title: string
  description: string
  moduleId: string
  mark: string
  color: string
  subsections: QuestionSubsection[]
}

export interface QuestionCatalog {
  groups: { id: string; title: string; description: string }[]
  sections: QuestionSection[]
  questions: Question[]
}

export function getSubsectionQuestions(subsection: QuestionSubsection, questions: Question[]) {
  return subsection.questionIds.flatMap((id) => {
    const question = questions.find((item) => item.id === id)
    return question ? [question] : []
  })
}

export function getSectionQuestions(section: QuestionSection, questions: Question[]) {
  const ids = new Set(section.subsections.flatMap((subsection) => subsection.questionIds))
  return questions.filter((question) => ids.has(question.id))
}

export function findQuestionLocation(id: string, sections: QuestionSection[]) {
  for (const section of sections) {
    const subsection = section.subsections.find((item) => item.questionIds.includes(id))
    if (subsection) return { section, subsection }
  }
  return undefined
}

export const sectionPath = (sectionId: string) => `/questions/sections/${sectionId}`
export const subsectionPath = (sectionId: string, subsectionId: string) =>
  `${sectionPath(sectionId)}/${subsectionId}`
