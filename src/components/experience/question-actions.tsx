import {
  changeQuestionMark,
  getQuestionMarkUndo,
  subscribeQuestionMarkUndo,
  clearQuestionMarkUndo,
  type QuestionMarkUndo,
} from "@/lib/question-mark-actions"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { usePracticeProgress } from "@/stores/practice-progress"
import type { QuestionStatus } from "@/data/question-catalog"
export function UndoQuestionMark() {
  const { questions } = useQuestionCatalog()
  const [undo, setUndo] = useState<QuestionMarkUndo | null>(getQuestionMarkUndo)
  const saving = usePracticeProgress((s) => s.pendingQuestionWrites > 0)
  useEffect(() => subscribeQuestionMarkUndo(() => setUndo(getQuestionMarkUndo())), [])
  useEffect(() => {
    if (!undo) return
    const timer = setTimeout(() => setUndo(null), Math.max(0, undo.until - Date.now()))
    return () => clearTimeout(timer)
  }, [undo])
  if (!undo) return null
  return (
    <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border bg-card p-3 text-xs">
      <span className="min-w-0 flex-1">
        Последняя отметка:{" "}
        {questions.find((question) => question.id === undo.id)?.title ?? "вопрос"}
      </span>
      <Button
        size="sm"
        variant="outline"
        disabled={saving}
        onClick={() => {
          usePracticeProgress.getState().setQuestionStatus(undo.id, undo.previous, undo.wasDone)
          clearQuestionMarkUndo()
          setUndo(null)
        }}
      >
        Отменить
      </Button>
    </div>
  )
}
export function QuestionShortcuts({
  id,
  previous,
  next,
  onReveal,
}: {
  id: string
  previous?: string
  next?: string
  onReveal: () => void
}) {
  const navigate = useNavigate()
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey ||
        target.closest(
          "input,textarea,select,button,[contenteditable=true],[role=dialog],[role=combobox],[role=listbox],[role=menu],.monaco-editor",
        )
      )
        return
      if (event.key === " ") {
        event.preventDefault()
        onReveal()
      } else if (event.key === "ArrowLeft" && previous) {
        event.preventDefault()
        navigate(previous, { state: window.history.state?.usr })
      } else if (event.key === "ArrowRight" && next) {
        event.preventDefault()
        navigate(next, { state: window.history.state?.usr })
      } else if (
        ["1", "2", "3"].includes(event.key) &&
        !usePracticeProgress.getState().pendingQuestionWrites
      ) {
        event.preventDefault()
        changeQuestionMark(
          id,
          ({ "1": "repeat", "2": "learned", "3": "skipped" } as Record<string, QuestionStatus>)[
            event.key
          ],
        )
      }
    }
    window.addEventListener("keydown", key)
    return () => window.removeEventListener("keydown", key)
  }, [id, previous, next, onReveal, navigate])
  return (
    <details className="mt-3 text-xs text-muted-foreground">
      <summary className="cursor-pointer">Горячие клавиши</summary>
      <p className="mt-2 leading-6">
        Пробел - показать ответ; ←/→ - вопросы; 1 - повторить, 2 - изучил, 3 - пропустить. При вводе
        текста команды не действуют.
      </p>
    </details>
  )
}
