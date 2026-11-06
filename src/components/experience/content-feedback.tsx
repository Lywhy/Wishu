import { useId, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { questionApi } from "@/lib/question-api"
const reasons = [
  { value: "answer", label: "Ошибка в ответе" },
  { value: "condition", label: "Непонятное условие" },
  { value: "test", label: "Некорректный тест" },
  { value: "other", label: "Другое" },
]
export function ContentFeedback({ contentKey }: { contentKey: string }) {
  const formId = useId()
  const [open, setOpen] = useState(false),
    [reason, setReason] = useState("answer"),
    [text, setText] = useState(""),
    [state, setState] = useState<"idle" | "sending" | "sent">("idle"),
    [error, setError] = useState("")
  const [id, setId] = useState(() => crypto.randomUUID())
  async function send() {
    setState("sending")
    setError("")
    try {
      await questionApi.session()
      const abort = new AbortController()
      const timer = setTimeout(() => abort.abort(), 15000)
      try {
        const response = await fetch(
          (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "") + "/questions/feedback",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            signal: abort.signal,
            body: JSON.stringify({ id, contentKey, reason, details: text.trim() }),
          },
        )
        if (!response.ok)
          throw new Error("Не удалось отправить отчёт. Текст сохранён в форме, попробуйте ещё раз.")
        const saved = await response.json().catch(() => null)
        if (!saved || saved.saved !== true || saved.id !== id)
          throw new Error("Сервер не подтвердил сохранение отчёта. Повторите отправку.")
        setState("sent")
      } finally {
        clearTimeout(timer)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось отправить отчёт")
      setState("idle")
    }
  }
  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        Нашли неточность?
      </Button>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (state !== "sending") setOpen(value)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Сообщить о неточности</DialogTitle>
            <DialogDescription>
              Отчёт по материалу {contentKey}. Не добавляйте личные данные. Отправка выполняется на
              сервер Wishu.
            </DialogDescription>
          </DialogHeader>
          {state === "sent" ? (
            <output className="text-sm text-emerald-700 dark:text-emerald-400">
              Отчёт сохранён на сервере. Спасибо!
            </output>
          ) : (
            <>
              <label htmlFor={`${formId}-reason`} className="text-sm">
                Причина
                <Select
                  disabled={state === "sending"}
                  value={reason}
                  items={reasons}
                  onValueChange={(v) => {
                    if (v) {
                      setReason(v)
                      setId(crypto.randomUUID())
                    }
                  }}
                >
                  <SelectTrigger
                    id={`${formId}-reason`}
                    className="mt-2 w-full"
                    aria-label="Причина сообщения"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reasons.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <label htmlFor={`${formId}-description`} className="text-sm">
                Описание
                <Textarea
                  id={`${formId}-description`}
                  className="mt-2 min-h-32"
                  disabled={state === "sending"}
                  value={text}
                  maxLength={5000}
                  onChange={(e) => {
                    setText(e.target.value)
                    setId(crypto.randomUUID())
                  }}
                />
              </label>
              <p className="text-xs text-muted-foreground">
                Не менее 5 символов. {text.length}/5000
              </p>
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <DialogFooter>
                <Button
                  disabled={text.trim().length < 5 || state === "sending"}
                  onClick={() => void send()}
                >
                  {state === "sending" ? "Отправляем…" : "Отправить отчёт"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
