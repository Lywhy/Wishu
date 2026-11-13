import { useEffect, useId, useRef, useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFileUpload, type FileWithPreview } from "@/hooks/use-file-upload"
import { readScreenshot, type FeedbackScreenshot } from "@/lib/feedback-attachments"
import { cn } from "@/lib/utils"

// ReUI Compact File Upload, adapted to Wishu's in-memory screenshots and report export.
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
  const alive = useRef(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  useEffect(() => {
    alive.current = true
    return () => {
      alive.current = false
    }
  }, [])
  const [{ isDragging, errors }, actions] = useFileUpload({
    accept: "image/png,image/jpeg",
    multiple: true,
    maxFiles: 3,
    maxSize: 3 * 1024 * 1024,
    initialFiles: value.map((image) => ({
      id: image.id,
      name: image.name,
      url: image.dataUrl,
      size: 0,
      type: image.dataUrl.startsWith("data:image/png") ? "image/png" : "image/jpeg",
    })),
    onFilesAdded: (entries) => {
      void readFiles(entries)
    },
  })
  async function readFiles(entries: FileWithPreview[]) {
    if (pending.current || !entries.length) return
    pending.current = true
    setBusy(true)
    onBusyChange(true)
    setError("")
    try {
      const results = await Promise.allSettled(
        entries.map(async (entry) => {
          if (!(entry.file instanceof File)) throw new Error("Не удалось прочитать файл.")
          return { ...(await readScreenshot(entry.file)), id: entry.id }
        }),
      )
      if (!alive.current) return
      const accepted = results.flatMap((result) =>
        result.status === "fulfilled" ? [result.value] : [],
      )
      if (accepted.length) onChange([...value, ...accepted])
      results.forEach((result, index) => {
        if (result.status === "rejected") actions.removeFile(entries[index].id)
      })
      const failure = results.find((result) => result.status === "rejected")
      if (failure?.status === "rejected")
        setError(
          failure.reason instanceof Error
            ? failure.reason.message
            : "Не удалось добавить изображение.",
        )
    } finally {
      pending.current = false
      if (alive.current) {
        setBusy(false)
        onBusyChange(false)
      }
    }
  }
  const disabled = busy || value.length >= 3
  return (
    <div
      className="space-y-3"
      onPaste={(event) => {
        const images = Array.from(event.clipboardData.files).filter((file) =>
          file.type.startsWith("image/"),
        )
        if (images.length) {
          event.preventDefault()
          if (!disabled) actions.addFiles(images)
        }
      }}
    >
      <p id={`${id}-label`} className="text-sm font-medium">
        Скриншоты <span className="font-normal text-muted-foreground">(необязательно)</span>
      </p>
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center transition-colors duration-200 motion-reduce:transition-none",
          isDragging ? "border-primary bg-primary/10" : "border-border bg-muted/20",
          disabled && "opacity-60",
        )}
        onDragEnter={actions.handleDragEnter}
        onDragLeave={actions.handleDragLeave}
        onDragOver={actions.handleDragOver}
        onDrop={actions.handleDrop}
      >
        <Upload className="size-6 text-muted-foreground" aria-hidden="true" />
        <p className="text-sm font-medium">
          {isDragging ? "Отпустите изображения здесь" : "Перетащите скриншоты сюда"}
        </p>
        <p className="text-xs text-muted-foreground">PNG/JPEG, до 3 файлов по 3 МБ</p>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={actions.openFileDialog}
        >
          Выбрать файлы
        </Button>
        <input
          {...actions.getInputProps({
            disabled,
            "aria-labelledby": `${id}-label`,
            "aria-describedby": `${id}-hint`,
          })}
          className="sr-only"
          tabIndex={-1}
        />
      </div>
      <p id={`${id}-hint`} className="text-xs leading-5 text-muted-foreground">
        Также можно вставить изображение из буфера. Скриншоты остаются только в памяти до
        перезагрузки страницы.
      </p>
      {busy && (
        <output className="block text-xs text-muted-foreground">Добавляем изображения…</output>
      )}
      {(error || errors.length > 0) && (
        <p role="alert" className="text-xs text-destructive">
          {error || errors.join(" ")}
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
                onClick={() => {
                  actions.removeFile(image.id)
                  setError("")
                  onChange(value.filter((item) => item.id !== image.id))
                }}
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
