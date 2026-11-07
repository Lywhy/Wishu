import { usePracticeProgress } from "@/stores/practice-progress"

export function QuestionSaveNotice() {
  const pending = usePracticeProgress((state) => state.pendingQuestionWrites)
  const error = usePracticeProgress((state) => state.questionSyncError)
  const savedAt = usePracticeProgress((state) => state.questionSavedAt)
  return (
    <output className="sr-only">
      {pending ? "Сохраняем…" : error ? "Не сохранено" : savedAt ? "Сохранено" : ""}
    </output>
  )
}
