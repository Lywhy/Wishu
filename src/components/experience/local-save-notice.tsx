import { useLocalSaveStatus } from "@/stores/local-save-status"
import { Button } from "@/components/ui/button"

export function LocalSaveNotice({
  area,
  errorsOnly = false,
}: {
  area: string
  errorsOnly?: boolean
}) {
  const status = useLocalSaveStatus((state) => state.areas[area])
  if (errorsOnly && !status?.error) return null
  return (
    <div className="min-h-6 text-xs leading-5 text-muted-foreground">
      <output className={status?.error ? "text-destructive" : undefined}>
        {status?.error ?? (status?.savedAt ? "Сохранено в этом браузере" : "")}
      </output>
      {status?.error && status.retry && (
        <Button variant="outline" size="sm" className="ml-2" onClick={status.retry}>
          Повторить сохранение
        </Button>
      )}
    </div>
  )
}
