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
      <div className="space-y-4 py-16 text-center">
        <h1 className="text-xl font-semibold">Не удалось загрузить обучение</h1>
        <p className="text-sm text-muted-foreground">Проверьте подключение к серверу.</p>
        <Button
          onClick={() => {
            setError(false)
            setAttempt((value) => value + 1)
          }}
        >
          Повторить
        </Button>
      </div>
    )
  if (!catalog) return <CatalogLoading label="Загружаем модули обучения…" />
  return (
    <QuestionCatalogContext.Provider value={catalog}>
      <Outlet />
    </QuestionCatalogContext.Provider>
  )
}
