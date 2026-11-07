import { Disclosure } from "@/components/experience/disclosure"
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
  const saveError = usePracticeProgress((state) => state.questionSyncError)
  useEffect(() => subscribeQuestionMarkUndo(() => setUndo(getQuestionMarkUndo())), [])
  useEffect(() => {
    if (!undo) return
    const timer = setTimeout(() => setUndo(null), Math.max(0, undo.until - Date.now()))
    return () => clearTimeout(timer)
  }, [undo])
  if (!undo) return null
  return (
    <div className="fixed right-4 bottom-4 left-4 z-40 flex items-center justify-between gap-3 rounded-xl border bg-popover p-3 text-xs text-popover-foreground shadow-lg sm:right-auto sm:left-6 sm:w-96">
      <div className="min-w-0 flex-1">
        <output className="block font-medium">
          {saving
            ? "Сохраняем отметку…"
            : saveError
              ? "Отметка не сохранена"
              : undo.next === "repeat"
                ? "Добавлено в повторение"
                : undo.next === "learned"
                  ? "Отмечено изученным"
                  : undo.next === "skipped"
                    ? "Вопрос пропущен"
                    : "Отметка снята"}
        </output>
        <p className="mt-1 truncate text-muted-foreground">
          {questions.find((question) => question.id === undo.id)?.title ?? "Вопрос"}
        </p>
      </div>
      <Button
        size="sm"
        variant="outline"
        disabled={saving || !!saveError}
        onClick={() => {
          usePracticeProgress
            .getState()
            .setQuestionStatus(undo.id, undo.previous, undo.wasDone, undo.reviewBefore)
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
    <Disclosure className="mt-3 text-xs text-muted-foreground" title={<> Горячие клавиши </>}>
      <p className="mt-2 leading-6">
        Пробел - показать ответ; ←/→ - вопросы; 1 - повторить, 2 - изучил, 3 - пропустить. При вводе
        текста команды не действуют.
      </p>
    </Disclosure>
  )
}
