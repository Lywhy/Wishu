import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { QuestionSession } from "@/data/question-session"

interface ListVisit {
  search: string
  scrollY: number
}

interface QuestionExperience {
  lastQuestionId: string | null
  lastBySection: Record<string, string>
  lastBySubsection: Record<string, string>
  lastSession: QuestionSession | null
  listVisits: Record<string, ListVisit>
  rememberQuestion: (
    sectionId: string,
    subsectionId: string,
    questionId: string,
    session: QuestionSession,
  ) => void
  rememberList: (pathname: string, visit: ListVisit) => void
}

export const useQuestionExperience = create<QuestionExperience>()(
  persist(
    (set) => ({
      lastQuestionId: null,
      lastBySection: {},
      lastBySubsection: {},
      lastSession: null,
      listVisits: {},
      rememberQuestion: (sectionId, subsectionId, questionId, session) =>
        set((state) => ({
          lastQuestionId: questionId,
          lastBySection: { ...state.lastBySection, [sectionId]: questionId },
          lastBySubsection: {
            ...state.lastBySubsection,
            [`${sectionId}/${subsectionId}`]: questionId,
          },
          lastSession: session,
        })),
      rememberList: (pathname, visit) =>
        set((state) => ({ listVisits: { ...state.listVisits, [pathname]: visit } })),
    }),
    {
      name: "wishu-question-experience",
      partialize: ({
        lastQuestionId,
        lastBySection,
        lastBySubsection,
        lastSession,
        listVisits,
      }) => ({
        lastQuestionId,
        lastBySection,
        lastBySubsection,
        lastSession,
        listVisits,
      }),
    },
  ),
)

export function rememberedQuestionList(pathname: string) {
  return pathname + (useQuestionExperience.getState().listVisits[pathname]?.search ?? "")
}
