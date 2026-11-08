import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { PageState } from "@/components/catalog/page-state"
import { SearchField } from "@/components/experience/search-field"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { useCatalogFilters } from "@/hooks/use-catalog-filters"

export function CatalogControls({
  topics = [],
  filter,
  placeholder,
  statuses,
  showPopular = false,
}: {
  topics?: string[]
  filter: ReturnType<typeof useCatalogFilters>
  placeholder: string
  statuses: { value: string; label: string }[]
  showPopular?: boolean
}) {
  const active = [
    ...(filter.query ? [{ key: "q", label: "Поиск: " + filter.query }] : []),
    ...(filter.difficulty !== "Любой уровень" ? [{ key: "level", label: filter.difficulty }] : []),
    ...(filter.status !== "all"
      ? [
          {
            key: "status",
            label: statuses.find((item) => item.value === filter.status)?.label ?? filter.status,
          },
        ]
      : []),
    ...(showPopular && filter.popular ? [{ key: "popular", label: "Популярные" }] : []),
    ...(topics.length && filter.topic !== "Все темы"
      ? [{ key: "topic", label: filter.topic }]
      : []),
  ]
  return (
    <div className="space-y-4 rounded-xl bg-card p-4 ring-1 ring-border/60">
      <div
        className={cn(
          "grid min-w-0 gap-3 sm:grid-cols-2",
          showPopular
            ? "xl:grid-cols-[minmax(9rem,1fr)_9rem_8.5rem_auto]"
            : "xl:grid-cols-[minmax(0,1fr)_10rem_9rem]",
        )}
      >
        <SearchField
          className="sm:col-span-2 xl:col-span-1"
          value={filter.query}
          onValueChange={(value) => filter.update("q", value)}
          label={placeholder}
          placeholder={placeholder}
        />
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
        {showPopular && (
          <Toggle
            variant="outline"
            className="h-10 sm:col-span-2 xl:col-span-1"
            pressed={filter.popular}
            onPressedChange={(pressed) => filter.update("popular", pressed ? "1" : "")}
          >
            Популярные
          </Toggle>
        )}
      </div>
      {showPopular &&
        (filter.query ||
          filter.difficulty !== "Любой уровень" ||
          filter.status !== "all" ||
          filter.popular) && (
          <div className="flex justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={filter.reset}>
              Сбросить фильтры
            </Button>
          </div>
        )}
      {!!active.length && (
        <div aria-label="Активные фильтры" className="flex flex-wrap gap-2">
          {active.map((item) => (
            <Button
              key={item.key}
              size="sm"
              variant="ghost"
              className="max-w-full rounded-md bg-muted/60 text-xs"
              aria-label={"Снять фильтр: " + item.label}
              onClick={() => filter.update(item.key, "")}
            >
              <span className="truncate">{item.label}</span>
              <span className="text-muted-foreground">· Снять</span>
            </Button>
          ))}
        </div>
      )}
      {topics.length > 0 && (
        <ToggleGroup
          aria-label="Темы задач"
          value={[filter.topic]}
          onValueChange={(values) => filter.update("topic", values[0] ?? "Все темы")}
          className="w-full flex-wrap justify-start"
          size="sm"
        >
          {["Все темы", ...topics].map((topic) => (
            <ToggleGroupItem
              key={topic}
              value={topic}
              className="aria-pressed:bg-primary/10 aria-pressed:text-primary"
            >
              {topic}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
    </div>
  )
}

export function EmptyResults({
  onReset,
  title = "Ничего не нашлось",
  description = "Измените запрос или сбросьте фильтры, чтобы увидеть весь каталог.",
}: {
  onReset: () => void
  title?: string
  description?: string
}) {
  return (
    <PageState heading="h2" title={title} description={description}>
      <Button variant="outline" onClick={onReset}>
        Сбросить фильтры
      </Button>
    </PageState>
  )
}
