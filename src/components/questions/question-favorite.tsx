import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePracticeProgress } from "@/stores/practice-progress"

export function QuestionFavoriteButton({ questionId }: { questionId: string }) {
  const saved = usePracticeProgress((state) => state.savedQuestionIds.includes(questionId))
  const saving = usePracticeProgress((state) => state.pendingQuestionWrites > 0)
  const toggleSaved = usePracticeProgress((state) => state.toggleSaved)
  const label = saved ? "Убрать из избранного" : "Добавить в избранное"

  return (
    <Button
      variant="outline"
      size="icon"
      title={label}
      aria-label={label}
      aria-pressed={saved}
      disabled={saving}
      onClick={() => toggleSaved(questionId)}
      className={cn(
        "size-8",
        saved &&
          "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-500/10 dark:text-blue-300",
      )}
    >
      <Star className={cn("size-4", saved && "fill-current")} aria-hidden="true" />
    </Button>
  )
}

export function QuestionFavoriteBadge() {
  return (
    <Badge
      variant="outline"
      className="border-blue-200 bg-blue-50 text-[11px] font-normal text-blue-800 dark:border-blue-900 dark:bg-blue-500/10 dark:text-blue-300"
    >
      В избранном
    </Badge>
  )
}
