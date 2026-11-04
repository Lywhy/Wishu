import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import type { QuestionCatalog } from "@/data/question-catalog"
import { questionApi } from "@/lib/question-api"
import { QuestionCatalogContext } from "@/lib/question-catalog-context"
import { usePracticeProgress } from "@/stores/practice-progress"

let startup: Promise<QuestionCatalog> | undefined

async function loadQuestions(): Promise<QuestionCatalog> {
  if (startup) return startup
  startup = (async () => {
    await usePracticeProgress.getState().flushQuestionWrites()
    const catalog = await questionApi.catalog()
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
  if (!catalog)
    return (
      <div
        aria-live="polite"
        className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground"
      >
        Загружаем разделы и ваш прогресс…
      </div>
    )
  return (
    <QuestionCatalogContext.Provider value={catalog}>
      <div className="[overflow-anchor:none]">
        <Outlet />
      </div>
      <div className="pointer-events-none fixed right-4 bottom-4 z-50 w-[calc(100%-2rem)] max-w-sm">
        {saveError ? (
          <p
            role="alert"
            className="rounded-xl border border-destructive/30 bg-background p-4 text-xs leading-6 text-destructive shadow-lg"
          >
            {saveError} Изменение не сохранено. Повторите действие; если сессия истекла, обновите
            страницу.
          </p>
        ) : pending > 0 ? (
          <p
            className="rounded-xl border bg-background px-4 py-3 text-xs text-muted-foreground shadow-lg"
          >
            Сохраняем изменения…
          </p>
        ) : null}
      </div>
    </QuestionCatalogContext.Provider>
  )
}
