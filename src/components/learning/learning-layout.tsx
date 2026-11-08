import { AnimatedBlock } from "@/components/catalog/catalog-primitives"
import { PageState } from "@/components/catalog/page-state"
import { CatalogLoading } from "@/components/catalog/catalog-loading"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { questionApi } from "@/lib/question-api"
import { QuestionCatalogContext } from "@/lib/question-catalog-context"
import type { QuestionCatalog } from "@/data/question-catalog"
import { Button } from "@/components/ui/button"
export function LearningLayout() {
  const [catalog, setCatalog] = useState<QuestionCatalog | null>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let active = true
    questionApi
      .catalog()
      .then((value) => {
        if (active) setCatalog(value)
      })
      .catch(() => {
        if (active) setError(true)
      })
    return () => {
      active = false
    }
  }, [attempt])
  if (error)
    return (
      <PageState
        kind="error"
        title="Не удалось загрузить обучение"
        description="Проверьте подключение и попробуйте ещё раз."
      >
        <Button
          onClick={() => {
            setError(false)
            setAttempt((value) => value + 1)
          }}
        >
          Повторить загрузку
        </Button>
      </PageState>
    )
  if (!catalog) return <CatalogLoading label="Загружаем модули обучения…" />
  return (
    <QuestionCatalogContext.Provider value={catalog}>
      <AnimatedBlock className="min-w-0">
        <Outlet />
      </AnimatedBlock>
    </QuestionCatalogContext.Provider>
  )
}
