import { useId, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  interviewStages,
  isInterviewStage,
  safeInterviewUrl,
  type InterviewDraft,
  type InterviewRecord,
  type InterviewMeeting,
} from "@/data/interviews"
import { useInterviewTracker } from "@/stores/interviews"
export function InterviewEditor({
  record,
  onClose,
  onSaved,
}: {
  record?: InterviewRecord
  onClose: () => void
  onSaved: (id: string) => void
}) {
  const id = useId(),
    [error, setError] = useState("")
  const [draft, setDraft] = useState<InterviewDraft>(() => ({
    company: record?.company ?? "",
    role: record?.role ?? "",
    vacancyUrl: record?.vacancyUrl ?? "",
    contact: record?.contact ?? "",
    salary: record?.salary ?? "",
    notes: record?.notes ?? "",
    stage: record?.stage ?? "applied",
  }))
  const field = (key: Exclude<keyof InterviewDraft, "stage">, value: string) =>
    setDraft((current) => ({ ...current, [key]: value }))
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {record ? "Редактировать собеседование" : "Новое собеседование"}
          </DialogTitle>
          <DialogDescription>
            Обязательны компания и вакансия. Встречи можно добавить после сохранения.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (!draft.company.trim() || !draft.role.trim()) {
              setError("Укажите компанию и вакансию.")
              return
            }
            if (draft.vacancyUrl && !safeInterviewUrl(draft.vacancyUrl)) {
              setError("Укажите ссылку на вакансию с http:// или https://.")
              return
            }
            const saved = useInterviewTracker.getState().save(
              {
                ...draft,
                company: draft.company.trim(),
                role: draft.role.trim(),
                vacancyUrl: draft.vacancyUrl.trim(),
                contact: draft.contact.trim(),
                salary: draft.salary.trim(),
                notes: draft.notes.trim(),
              },
              record?.id,
            )
            onSaved(saved)
          }}
          className="space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={id + "-company"} className="text-sm font-medium">
                Компания *
              </label>
              <Input
                id={id + "-company"}
                required
                maxLength={120}
                value={draft.company}
                onChange={(e) => field("company", e.target.value)}
                placeholder="Название компании"
                className="mt-2"
              />
            </div>
            <div>
              <label htmlFor={id + "-role"} className="text-sm font-medium">
                Вакансия *
              </label>
              <Input
                id={id + "-role"}
                required
                maxLength={160}
                value={draft.role}
                onChange={(e) => field("role", e.target.value)}
                placeholder="Frontend-разработчик"
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor={id + "-stage"} className="text-sm font-medium">
              Текущий этап
            </label>
            <Select
              value={draft.stage}
              items={interviewStages.map((item) => ({ value: item.value, label: item.label }))}
              onValueChange={(value) => {
                if (value && isInterviewStage(value))
                  setDraft((current) => ({ ...current, stage: value }))
              }}
            >
              <SelectTrigger id={id + "-stage"} className="mt-2 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {interviewStages.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor={id + "-url"} className="text-sm font-medium">
              Ссылка на вакансию
            </label>
            <Input
              id={id + "-url"}
              type="url"
              maxLength={2000}
              value={draft.vacancyUrl}
              onChange={(e) => field("vacancyUrl", e.target.value)}
              placeholder="https://…"
              className="mt-2"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={id + "-contact"} className="text-sm font-medium">
                Контакт рекрутера
              </label>
              <Input
                id={id + "-contact"}
                maxLength={300}
                value={draft.contact}
                onChange={(e) => field("contact", e.target.value)}
                placeholder="Имя, почта или Telegram"
                className="mt-2"
              />
            </div>
            <div>
              <label htmlFor={id + "-salary"} className="text-sm font-medium">
                Зарплатные ожидания
              </label>
              <Input
                id={id + "-salary"}
                maxLength={120}
                value={draft.salary}
                onChange={(e) => field("salary", e.target.value)}
                placeholder="Сумма, валюта, условия"
                className="mt-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor={id + "-notes"} className="text-sm font-medium">
              Заметки по вакансии
            </label>
            <Textarea
              id={id + "-notes"}
              maxLength={10000}
              value={draft.notes}
              onChange={(e) => field("notes", e.target.value)}
              placeholder="Что важно уточнить, требования и впечатления…"
              className="mt-2 min-h-28"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit">
              {record ? "Сохранить изменения" : "Добавить собеседование"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
function localDateValue(iso?: string) {
  if (!iso) return ""
  const date = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
export function MeetingEditor({
  record,
  meeting,
  onClose,
}: {
  record: InterviewRecord
  meeting?: InterviewMeeting
  onClose: () => void
}) {
  const id = useId(),
    [title, setTitle] = useState(meeting?.title ?? ""),
    [at, setAt] = useState(() => localDateValue(meeting?.at)),
    [url, setUrl] = useState(meeting?.url ?? ""),
    [notes, setNotes] = useState(meeting?.notes ?? ""),
    [error, setError] = useState("")
  return (
    <Dialog
      open
      onOpenChange={(value) => {
        if (!value) onClose()
      }}
    >
      <DialogContent className="max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{meeting ? "Изменить встречу" : "Запланировать встречу"}</DialogTitle>
          <DialogDescription>
            {record.company} · {record.role}. Время указывается в часовом поясе браузера.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            const date = new Date(at)
            if (!title.trim() || !Number.isFinite(date.getTime())) {
              setError("Укажите название, дату и время встречи.")
              return
            }
            if (url && !safeInterviewUrl(url)) {
              setError("Ссылка на встречу должна начинаться с http:// или https://.")
              return
            }
            useInterviewTracker.getState().meeting(
              record.id,
              {
                title: title.trim(),
                at: date.toISOString(),
                url: url.trim(),
                notes: notes.trim(),
              },
              meeting?.id,
            )
            onClose()
          }}
        >
          <div>
            <label htmlFor={id + "-title"} className="text-sm font-medium">
              Название встречи *
            </label>
            <Input
              id={id + "-title"}
              required
              maxLength={160}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Техническое интервью"
              className="mt-2"
            />
          </div>
          <div>
            <label htmlFor={id + "-at"} className="text-sm font-medium">
              Дата и время *
            </label>
            <Input
              id={id + "-at"}
              type="datetime-local"
              required
              value={at}
              onChange={(e) => setAt(e.target.value)}
              className="mt-2 dark:scheme-dark"
            />
          </div>
          <div>
            <label htmlFor={id + "-url"} className="text-sm font-medium">
              Ссылка на встречу
            </label>
            <Input
              id={id + "-url"}
              type="url"
              maxLength={2000}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://…"
              className="mt-2"
            />
          </div>
          <div>
            <label htmlFor={id + "-notes"} className="text-sm font-medium">
              Подготовка и результаты
            </label>
            <Textarea
              id={id + "-notes"}
              maxLength={10000}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Что подготовить или какие вопросы обсуждали…"
              className="mt-2"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit">{meeting ? "Сохранить встречу" : "Добавить встречу"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
