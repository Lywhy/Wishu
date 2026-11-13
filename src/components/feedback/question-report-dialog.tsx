import { useId, useRef, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Bug } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { FeedbackSelect } from "@/components/feedback/feedback-topic-fields"
import { FeedbackScreenshots } from "@/components/feedback/feedback-screenshots"
import { FeedbackDelivery } from "@/components/feedback/feedback-delivery"
import { useFeedbackDrafts } from "@/stores/feedback-drafts"
import { bugDetails, bugReasons, type BugReason, type FeedbackInput } from "@/lib/platform-feedback"
import type { FeedbackScreenshot } from "@/lib/feedback-attachments"
import { useFeedbackAttachments } from "@/stores/feedback-attachments"

export function QuestionReportDialog({
  questionId,
  title,
  section,
  subsection,
  path,
}: {
  questionId: string
  title: string
  section: string
  subsection: string
  path: string
}) {
  const id = useId()
  const [session, setSession] = useState(0)
  const [open, setOpen] = useState(false)
  const [prepared, setPrepared] = useState<FeedbackInput | null>(null)
  const [error, setError] = useState("")
  const uploadEpoch = useRef(0)
  const allScreenshots = useFeedbackAttachments((state) => state.items)
  const screenshots = allScreenshots[`question:${questionId}`] ?? []
  function setScreenshots(images: FeedbackScreenshot[]) {
    if (session === uploadEpoch.current)
      useFeedbackAttachments.getState().set(`question:${questionId}`, images)
  }
  const [busy, setBusy] = useState(false)
  const fragment = useRef("")
  const details = useRef<HTMLTextAreaElement>(null)
  const draft = useFeedbackDrafts((state) => state.questionBugs?.[questionId])
  function changeOpen(value: boolean) {
    if (!value) {
      uploadEpoch.current += 1
      useFeedbackDrafts.getState().resetQuestionBug(questionId)
      useFeedbackAttachments.getState().set("question:" + questionId, [])
      fragment.current = ""
      setPrepared(null)
      setError("")
      setBusy(false)
      setSession((previous) => previous + 1)
    }
    setOpen(value)
  }
  function capture() {
    const selection = window.getSelection()
    const answer = document.querySelector("[data-question-answer]")
    fragment.current =
      selection &&
      !selection.isCollapsed &&
      answer?.contains(selection.anchorNode) &&
      answer.contains(selection.focusNode)
        ? selection.toString().trim().slice(0, 1500)
        : ""
  }
  function start() {
    const store = useFeedbackDrafts.getState()
    store.startQuestionBug(
      questionId,
      path,
      `Вопрос: ${title}\nРаздел: ${section} / ${subsection}\nID вопроса: ${questionId}`,
    )
    const previous = useFeedbackDrafts.getState().questionBugs?.[questionId]
    if (fragment.current || !previous?.reason)
      store.updateQuestionBug(questionId, {
        reason: previous?.reason ?? "answer",
        ...(fragment.current ? { fragment: fragment.current } : {}),
      })
    setPrepared(null)
    setError("")
  }
  function update(
    patch: Partial<Pick<NonNullable<typeof draft>, "details" | "reason" | "fragment">>,
  ) {
    useFeedbackDrafts.getState().updateQuestionBug(questionId, patch)
    setError("")
  }
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!draft || busy) return
    const problem =
      draft.details.trim().length < 10
        ? "Опишите проблему: не менее 10 символов."
        : bugDetails(draft).length > 5000
          ? "Сократите описание или фрагмент: всего до 5000 символов."
          : ""
    if (problem) {
      setError(problem)
      details.current?.focus()
      return
    }
    setPrepared({
      id: draft.id,
      kind: "bug",
      page: "questions",
      mode: "improvement",
      path: draft.path,
      details: bugDetails(draft),
      items: [],
    })
  }
  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label="Сообщить о проблеме в вопросе"
            title="Сообщить о проблеме в вопросе"
          />
        }
        onPointerDown={capture}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") capture()
        }}
        onClick={start}
      >
        <Bug aria-hidden="true" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {prepared ? "Передать обращение автору" : "Что не так с вопросом?"}
          </DialogTitle>
          <DialogDescription>
            {title}. Раздел и ссылка добавлены автоматически.{" "}
            {prepared
              ? "Проверьте сообщение перед передачей."
              : "Можно выделить фрагмент ответа перед открытием формы."}
          </DialogDescription>
        </DialogHeader>
        {prepared ? (
          <div className="space-y-4">
            <FeedbackDelivery value={prepared} screenshots={screenshots} />
            <Button variant="ghost" onClick={() => setPrepared(null)}>
              Изменить сообщение
            </Button>
          </div>
        ) : (
          draft && (
            <form noValidate onSubmit={prepare} className="space-y-5">
              <FeedbackSelect
                id={`${id}-reason`}
                label="Тип проблемы"
                value={draft.reason ?? "answer"}
                options={bugReasons}
                onChange={(value) => update({ reason: value as BugReason })}
              />
              {draft.fragment && (
                <div className="space-y-3 rounded-xl border bg-muted/30 p-3">
                  <p className="text-xs font-medium">Выделенный фрагмент</p>
                  <blockquote className="max-h-32 overflow-y-auto border-l-2 border-primary/30 pl-3 text-sm leading-6 whitespace-pre-wrap">
                    {draft.fragment}
                  </blockquote>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => update({ fragment: "" })}
                  >
                    Убрать фрагмент
                  </Button>
                </div>
              )}
              <div className="space-y-3">
                <label htmlFor={`${id}-details`} className="block text-sm font-medium">
                  Что нужно исправить
                </label>
                <Textarea
                  ref={details}
                  id={`${id}-details`}
                  value={draft.details}
                  maxLength={3000}
                  className="min-h-28"
                  aria-invalid={!!error}
                  aria-describedby={error ? `${id}-error` : `${id}-hint`}
                  placeholder="Например: в примере указан неверный результат. Здесь должно получиться…"
                  onChange={(event) => update({ details: event.target.value })}
                />
                <p id={`${id}-hint`} className="text-xs text-muted-foreground">
                  Достаточно короткого описания. Черновик сохраняется в этом браузере.
                </p>
                {error && (
                  <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
                    {error}
                  </p>
                )}
              </div>
              <FeedbackScreenshots
                key={session}
                value={screenshots}
                onChange={setScreenshots}
                onBusyChange={(value) => {
                  if (session === uploadEpoch.current) setBusy(value)
                }}
              />
              <div className="flex flex-wrap gap-2 border-t pt-4">
                <Button type="submit" disabled={busy}>
                  Подготовить обращение
                </Button>
                <Button
                  nativeButton={false}
                  disabled={busy}
                  variant="ghost"
                  render={
                    <Link
                      to={`/feedback?question=${encodeURIComponent(questionId)}`}
                      state={{ feedbackOrigin: path }}
                    />
                  }
                >
                  Полная форма
                </Button>
              </div>
            </form>
          )
        )}
      </DialogContent>
    </Dialog>
  )
}
