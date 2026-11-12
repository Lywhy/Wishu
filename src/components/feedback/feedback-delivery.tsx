import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  downloadFeedback,
  feedbackMessage,
  githubIssueForFeedback,
  type FeedbackInput,
  type FeedbackReceipt,
} from "@/lib/platform-feedback"
import { downloadFeedbackReport, type FeedbackScreenshot } from "@/lib/feedback-attachments"
import type { QuestionCatalog } from "@/data/question-catalog"

export function FeedbackDelivery({
  value,
  catalog,
  screenshots = [],
}: {
  value: FeedbackInput | FeedbackReceipt
  catalog?: QuestionCatalog | null
  screenshots?: FeedbackScreenshot[]
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle")
  const message = feedbackMessage(value, catalog)
  const github = githubIssueForFeedback(value, catalog)
  useEffect(() => {
    if (status !== "copied") return
    const timer = window.setTimeout(() => setStatus("idle"), 3000)
    return () => window.clearTimeout(timer)
  }, [status])
  async function copy() {
    try {
      await navigator.clipboard.writeText(`${message.title}\n\n${message.body}`)
      setStatus("copied")
    } catch {
      setStatus("manual")
    }
  }
  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-xl border bg-muted/30 p-4">
        <h3 className="text-sm font-semibold break-words">{message.title}</h3>
        <Textarea
          aria-label="Готовый текст обращения"
          readOnly
          value={message.body}
          className="max-h-80 min-h-40 resize-y bg-background text-sm leading-6"
          onFocus={(event) => event.currentTarget.select()}
        />
      </div>
      {github?.attachmentRequired && (
        <p className="text-xs leading-5 text-muted-foreground">
          Текст не помещается в ссылку. Скопируйте его через «Другие способы» и вставьте на GitHub
          целиком.
        </p>
      )}
      {screenshots.length > 0 && (
        <div className="space-y-2 rounded-xl border p-3">
          <p className="text-sm font-medium">Скриншоты: {screenshots.length}</p>
          <div className="flex gap-2 overflow-x-auto">
            {screenshots.map((image) => (
              <img
                key={image.id}
                src={image.dataUrl}
                alt={image.name}
                className="h-20 w-28 shrink-0 rounded border object-contain"
              />
            ))}
          </div>
          <p className="text-xs leading-5 text-muted-foreground">
            На GitHub прикрепите изображения отдельно. Или скачайте единый отчёт со скриншотами
            через «Другие способы». Копирование, JSON и локальное сохранение содержат только текст.
          </p>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {github ? (
          <Button
            nativeButton={false}
            render={
              <a
                href={github.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Передать через GitHub в новой вкладке"
              />
            }
          >
            Передать через GitHub
          </Button>
        ) : (
          <Button onClick={() => void copy()}>
            {status === "copied" ? "Текст скопирован" : "Скопировать обращение"}
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Другие способы
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-60">
            <DropdownMenuItem onClick={() => void copy()}>Скопировать текст</DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadFeedback(value, catalog)}>
              Скачать JSON (текст)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                downloadFeedbackReport(value.id, message.title, message.body, screenshots)
              }
            >
              Скачать отчёт{screenshots.length ? " со скриншотами" : ""}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <output className="block text-xs leading-5 text-muted-foreground">
        {status === "manual"
          ? "Копирование недоступно. Выделите текст выше и скопируйте вручную."
          : status === "copied"
            ? "Скопировано. Передайте сообщение автору."
            : github
              ? "Проверьте текст на GitHub и подтвердите публикацию. Открытие ссылки ещё не отправляет обращение."
              : "GitHub автора не настроен. Передайте скопированный текст или скачанный отчёт автору."}
      </output>
    </div>
  )
}
