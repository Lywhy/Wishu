import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { ProgressTrack } from "@/components/ui/progress"
import { usePracticeProgress } from "@/stores/practice-progress"

export function StudyProgress({
  questionIds,
  compact = false,
}: {
  questionIds: string[]
  compact?: boolean
}) {
  const statuses = usePracticeProgress((state) => state.questionStatuses)
  const ids = [...new Set(questionIds)]
  const repeat = ids.filter((id) => statuses[id] === "repeat").length
  const learned = ids.filter((id) => statuses[id] === "learned").length
  const skipped = ids.filter((id) => statuses[id] === "skipped").length
  const marked = repeat + learned + skipped
  const total = ids.length
  const description = `Повторить: ${repeat}. Изучил: ${learned}. Пропустить: ${skipped}. Без отметки: ${total - marked}. Всего: ${total}.`

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="text-muted-foreground">{compact ? "Изучено" : "Отмечено вопросов"}</span>
        <span className="tabular-nums">
          {compact ? learned : marked} из {total}
        </span>
      </div>
      <ProgressPrimitive.Root
        value={marked}
        max={total || 1}
        aria-label="Прогресс изучения вопросов"
        aria-valuetext={description}
      >
        <ProgressTrack className="h-2">
          <div aria-hidden="true" className="flex h-full w-full">
            {[
              { count: repeat, color: "bg-amber-500" },
              { count: learned, color: "bg-emerald-500" },
              { count: skipped, color: "bg-violet-500" },
              { count: total ? total - marked : 1, color: "bg-muted" },
            ].map(({ count, color }) => (
              <span
                key={color}
                className={`h-full transition-[width] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-reduce:transition-none ${color}`}
                style={{ width: `${(count / (total || 1)) * 100}%` }}
              />
            ))}
          </div>
        </ProgressTrack>
      </ProgressPrimitive.Root>
      {!compact && (
        <div className="grid gap-2 text-[11px] text-muted-foreground">
          {[
            { label: "Повторить", count: repeat, color: "bg-amber-500" },
            { label: "Изучил", count: learned, color: "bg-emerald-500" },
            { label: "Пропустить", count: skipped, color: "bg-violet-500" },
          ].map(({ label, count, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span aria-hidden="true" className={`size-2 rounded-full ${color}`} />
              <span>{label}</span>
              <span className="ml-auto tabular-nums">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
