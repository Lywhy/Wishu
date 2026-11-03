import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { useCatalogFilters } from "@/hooks/use-catalog-filters"

export function CatalogControls({
  topics = [],
  filter,
  placeholder,
  statuses,
}: {
  topics?: string[]
  filter: ReturnType<typeof useCatalogFilters>
  placeholder: string
  statuses: { value: string; label: string }[]
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px_170px]">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={filter.query}
            onChange={(event) => filter.update("q", event.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="h-10 rounded-lg bg-background pl-10"
          />
        </div>
        <Select
          value={filter.difficulty}
          items={["Любой уровень", "Базовый", "Средний", "Продвинутый"].map((level) => ({
            value: level,
            label: level,
          }))}
          onValueChange={(value) => {
            if (typeof value === "string") filter.update("level", value)
          }}
        >
          <SelectTrigger
            aria-label="Уровень сложности"
            className="w-full bg-background data-[size=default]:h-10"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start" alignItemWithTrigger={false}>
            {["Любой уровень", "Базовый", "Средний", "Продвинутый"].map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filter.status}
          items={statuses}
          onValueChange={(value) => {
            if (typeof value === "string") filter.update("status", value)
          }}
        >
          <SelectTrigger
            aria-label="Статус"
            className="w-full bg-background data-[size=default]:h-10"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start" alignItemWithTrigger={false}>
            {statuses.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {topics.length > 0 && (
        <div aria-label="Темы" className="flex flex-wrap gap-2">
          {["Все темы", ...topics].map((topic) => (
            <Button
              key={topic}
              variant={filter.topic === topic ? "secondary" : "ghost"}
              size="sm"
              aria-pressed={filter.topic === topic}
              onClick={() => filter.update("topic", topic)}
              className="text-xs"
            >
              {topic}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export function EmptyResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed px-6 py-16 text-center">
      <h2 className="font-semibold">Ничего не нашлось</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Измените запрос или сбросьте фильтры, чтобы увидеть весь каталог.
      </p>
      <Button variant="outline" className="mt-5" onClick={onReset}>
        Сбросить фильтры
      </Button>
    </div>
  )
}
