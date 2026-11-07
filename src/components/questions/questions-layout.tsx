import { clearQuestionMarkUndo } from "@/lib/question-mark-actions"
import { CatalogLoading } from "@/components/catalog/catalog-loading"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import type { QuestionCatalog } from "@/data/question-catalog"
import { questionApi } from "@/lib/question-api"
import { AddQuestionContext, QuestionCatalogContext } from "@/lib/question-catalog-context"
import { usePracticeProgress } from "@/stores/practice-progress"
import { QuestionRouteHistory } from "@/components/questions/question-route-history"

let cachedCatalog: QuestionCatalog | undefined
let startup: Promise<QuestionCatalog> | undefined

async function loadQuestions(): Promise<QuestionCatalog> {
  if (startup) return startup
  startup = (async () => {
    await usePracticeProgress.getState().flushQuestionWrites()
    const catalog = cachedCatalog ?? (await questionApi.catalog())
    cachedCatalog = catalog
    const session = await questionApi.session()
    let progress = session.progress
    if (session.requiresImport) {
      const local = usePracticeProgress.getState()
      const validIds = new Set(catalog.questions.map((question) => question.id))
      const ids = new Set([...Object.keys(local.questionStatuses), ...local.savedQuestionIds])
      const entries = [...ids]
        .filter((id) => validIds.has(id))
        .map((questionId) => ({
          questionId,
          status: local.questionStatuses[questionId] ?? null,
          saved: local.savedQuestionIds.includes(questionId),
        }))
      progress = await questionApi.importProgress(entries, local.autoRevealAnswers)
    }
    usePracticeProgress.getState().hydrateQuestions(progress)
    return catalog
  })().finally(() => {
    startup = undefined
  })
  return startup
}

export function QuestionsLayout() {
  const [catalog, setCatalog] = useState<QuestionCatalog | null>(null)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const pending = usePracticeProgress((state) => state.pendingQuestionWrites)
  const saveError = usePracticeProgress((state) => state.questionSyncError)

  useEffect(() => {
    let active = true
    loadQuestions()
      .then((data) => {
        if (active) setCatalog(data)
      })
      .catch(() => {
        if (active) setFailed(true)
      })
    return () => {
      active = false
    }
  }, [attempt])

  if (failed)
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-semibold">Не удалось загрузить вопросы</h1>
        <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
          Проверьте подключение и попробуйте ещё раз.
        </p>
        <Button
          className="mt-6"
          onClick={() => {
            setFailed(false)
            setAttempt((value) => value + 1)
          }}
        >
          Повторить загрузку
        </Button>
      </section>
    )
  if (!catalog) return <CatalogLoading label="Загружаем разделы и ваш прогресс…" />
  return (
    <QuestionCatalogContext.Provider value={catalog}>
      <AddQuestionContext.Provider
        value={(question) => {
          setCatalog((current) => {
            if (!current || current.questions.some((item) => item.id === question.id))
              return current
            const next = {
              ...current,
              questions: [...current.questions, question],
              sections: current.sections.map((section) =>
                section.id !== question.sectionId
                  ? section
                  : {
                      ...section,
                      subsections: section.subsections.map((sub) =>
                        sub.id !== question.subsectionId
                          ? sub
                          : {
                              ...sub,
                              questionIds: [...sub.questionIds, question.id],
                            },
                      ),
                    },
              ),
            }
            cachedCatalog = next
            return next
          })
        }}
      >
        <QuestionRouteHistory />
        <div className="[overflow-anchor:none]">
          <Outlet />
        </div>
      </AddQuestionContext.Provider>
      <div
        className="pointer-events-none fixed top-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm"
        aria-live="polite"
      >
        {saveError ? (
          <p
            role="alert"
            className="rounded-xl border border-destructive/30 bg-background p-4 text-xs leading-6 text-destructive shadow-lg"
          >
            {saveError} Изменение не сохранено.
            <Button
              className="pointer-events-auto mt-3"
              size="sm"
              onClick={() => usePracticeProgress.getState().retryQuestionWrite()}
            >
              Повторить сохранение
            </Button>
            <Button
              className="pointer-events-auto mt-2"
              variant="ghost"
              size="sm"
              onClick={() => {
                usePracticeProgress.getState().discardQuestionWrite()
                clearQuestionMarkUndo()
              }}
            >
              Отменить несохранённое действие
            </Button>
          </p>
        ) : pending > 0 ? (
          <p className="rounded-xl border bg-background px-4 py-3 text-xs text-muted-foreground shadow-lg">
            Сохраняем изменения…
          </p>
        ) : null}
      </div>
    </QuestionCatalogContext.Provider>
  )
}
