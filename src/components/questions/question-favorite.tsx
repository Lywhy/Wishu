import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { usePracticeProgress } from "@/stores/practice-progress"

export function QuestionFavoriteButton({
  questionId,
  compact = false,
}: {
  questionId: string
  compact?: boolean
}) {
  const saved = usePracticeProgress((state) => state.savedQuestionIds.includes(questionId))
  const saving = usePracticeProgress((state) => state.pendingQuestionWrites > 0)
  const toggleSaved = usePracticeProgress((state) => state.toggleSaved)
  const label = saved ? "Убрать из избранного" : "Добавить в избранное"

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Toggle
            aria-label={label}
            pressed={saved}
            disabled={saving}
            onPressedChange={() => toggleSaved(questionId)}
            className={cn(
              "size-10 shrink-0 rounded-lg p-0 text-muted-foreground hover:bg-background hover:text-foreground focus-visible:ring-inset",
              compact && "size-7 min-w-7 rounded-md",
              saved &&
                "border-blue-200 text-blue-800 aria-pressed:bg-blue-50 dark:border-blue-900 dark:text-blue-300 dark:aria-pressed:bg-blue-500/10",
            )}
          />
        }
      >
        <Star className={cn("size-4", saved && "fill-current")} aria-hidden="true" />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
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
