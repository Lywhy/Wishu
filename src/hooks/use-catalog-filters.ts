import { useSearchParams } from "react-router-dom"

export function useCatalogFilters() {
  const [params, setParams] = useSearchParams()
  const query = params.get("q") ?? ""
  const topic = params.get("topic") ?? "Все темы"
  const difficulty = params.get("level") ?? "Любой уровень"
  const status = params.get("status") ?? "all"
  function update(key: string, value: string) {
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        if (!value || ["Все темы", "Любой уровень", "all"].includes(value)) next.delete(key)
        else next.set(key, value)
        return next
      },
      { replace: true },
    )
  }
  return { query, topic, difficulty, status, update, reset: () => setParams({}, { replace: true }) }
}
