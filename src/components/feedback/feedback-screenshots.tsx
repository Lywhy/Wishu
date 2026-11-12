import { useId, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { readScreenshot, type FeedbackScreenshot } from "@/lib/feedback-attachments"

export function FeedbackScreenshots({
  value,
  onChange,
  onBusyChange,
}: {
  value: FeedbackScreenshot[]
  onChange: (value: FeedbackScreenshot[]) => void
  onBusyChange: (busy: boolean) => void
}) {
  const id = useId()
  const pending = useRef(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  async function add(files: File[]) {
    if (pending.current || !files.length) return
    if (value.length + files.length > 3) {
      setError("Можно приложить до 3 скриншотов.")
      return
    }
    pending.current = true
    setBusy(true)
    onBusyChange(true)
    setError("")
    try {
      const results = await Promise.allSettled(files.map(readScreenshot))
      const accepted = results.flatMap((result) =>
        result.status === "fulfilled" ? [result.value] : [],
      )
      const failed = results.find((result) => result.status === "rejected")
      if (accepted.length) onChange([...value, ...accepted])
      if (failed?.status === "rejected")
        setError(
          failed.reason instanceof Error
            ? failed.reason.message
            : "Не удалось добавить изображение.",
        )
    } finally {
      pending.current = false
      setBusy(false)
      onBusyChange(false)
    }
  }
  return (
    <div
      className="space-y-3"
      onPaste={(event) => {
        const images = Array.from(event.clipboardData.files).filter((file) =>
          file.type.startsWith("image/"),
        )
        if (images.length) {
          event.preventDefault()
          void add(images)
        }
      }}
    >
      <label htmlFor={id} className="block text-sm font-medium">
        Скриншоты <span className="font-normal text-muted-foreground">(необязательно)</span>
      </label>
      <Input
        id={id}
        type="file"
        accept="image/png,image/jpeg"
        multiple
        disabled={busy || value.length >= 3}
        aria-describedby={`${id}-hint${error ? ` ${id}-error` : ""}`}
        aria-invalid={!!error}
        onChange={(event) => {
          const files = Array.from(event.target.files ?? [])
          event.target.value = ""
          void add(files)
        }}
      />
      <p id={`${id}-hint`} className="text-xs leading-5 text-muted-foreground">
        До 3 файлов PNG/JPEG по 3 МБ. Можно вставить изображение из буфера, когда фокус в этом
        блоке. Изображения хранятся только до перезагрузки страницы.
      </p>
      {busy && (
        <output className="block text-xs text-muted-foreground">Добавляем изображения…</output>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
      {value.length > 0 && (
        <ul className="grid gap-3 sm:grid-cols-3">
          {value.map((image) => (
            <li key={image.id} className="min-w-0 space-y-2 rounded-lg border p-2">
              <img
                src={image.dataUrl}
                alt={`Скриншот: ${image.name}`}
                className="h-24 w-full rounded object-contain"
              />
              <p className="truncate text-xs" title={image.name}>
                {image.name}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={busy}
                aria-label={`Убрать ${image.name}`}
                onClick={() => onChange(value.filter((item) => item.id !== image.id))}
              >
                Убрать
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
