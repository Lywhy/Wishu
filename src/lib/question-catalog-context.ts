import { createContext, useContext } from "react"
import {
  findQuestionLocation,
  getSectionQuestions,
  getSubsectionQuestions,
  type QuestionCatalog,
  type QuestionSection,
  type QuestionSubsection,
} from "@/data/question-catalog"

export const QuestionCatalogContext = createContext<QuestionCatalog | null>(null)

export function useQuestionCatalog() {
  const catalog = useContext(QuestionCatalogContext)
  if (!catalog) throw new Error("Question catalog must be loaded before rendering question pages")
  return {
    questions: catalog.questions,
    questionSections: catalog.sections,
    groups: catalog.groups,
    getSectionQuestions: (section: QuestionSection) =>
      getSectionQuestions(section, catalog.questions),
    getSubsectionQuestions: (subsection: QuestionSubsection) =>
      getSubsectionQuestions(subsection, catalog.questions),
    findQuestionLocation: (id: string) => findQuestionLocation(id, catalog.sections),
  }
}
