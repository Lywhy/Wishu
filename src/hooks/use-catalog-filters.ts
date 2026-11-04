import { useSearchParams } from "react-router-dom"

export function useCatalogFilters() {
  const [params, setParams] = useSearchParams()
  const query = params.get("q") ?? ""
  const topic = params.get("topic") ?? "Все темы"
  const difficulty = params.get("level") ?? "Любой уровень"
  const status = params.get("status") ?? "all"
  const popular = params.get("popular") === "1"
  function update(key: string, value: string) {
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        if (key !== "page") next.delete("page")
        if (!value || ["Все темы", "Любой уровень", "all"].includes(value)) next.delete(key)
        else next.set(key, value)
        return next
      },
      { replace: true },
    )
  }
  return {
    query,
    topic,
    difficulty,
    status,
    popular,
    update,
    reset: () => setParams({}, { replace: true }),
  }
}
