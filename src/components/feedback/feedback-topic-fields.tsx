import type { TopicFieldErrors } from "@/lib/feedback-validation"
import { useId } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { QuestionCatalog } from "@/data/question-catalog"
import { parseTopics, type TopicDraft } from "@/lib/platform-feedback"

export function FeedbackSelect({
  id,
  label,
  value,
  options,
  onChange,
  disabled,
  placeholder = "Выберите",
  error,
}: {
  id: string
  label: string
  value: string
  options: readonly { value: string; label: string }[]
  onChange: (value: string) => void
  disabled?: boolean
  placeholder?: string
  error?: string
}) {
  return (
    <div className="min-w-0 space-y-3">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <Select
        value={value || null}
        items={options}
        disabled={disabled}
        onValueChange={(v) => {
          if (v !== null) onChange(v)
        }}
      >
        <SelectTrigger
          id={id}
          className="w-full"
          aria-invalid={!!error}
          aria-describedby={error ? id + "-error" : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p id={id + "-error"} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function FeedbackTopicFields({
  item,
  index,
  catalog,
  disabled,
  canRemove,
  errors = {},
  onChange,
  onRemove,
}: {
  item: TopicDraft
  index: number
  catalog: QuestionCatalog
  disabled: boolean
  canRemove: boolean
  errors?: TopicFieldErrors
  onChange: (patch: Partial<TopicDraft>) => void
  onRemove: () => void
}) {
  const id = useId()
  const sections = catalog.sections.filter((s) => s.group === item.groupId)
  const section = sections.find((s) => s.id === item.sectionId)
  const topics = parseTopics(item.topics)
  return (
    <fieldset
      disabled={disabled}
      className="min-w-0 space-y-5 rounded-xl border border-border/80 bg-background/60 p-4 sm:p-5"
    >
      <legend className="px-2 text-sm font-semibold">Раздел {index + 1}</legend>
      <div className="grid gap-4 sm:grid-cols-2">
        <FeedbackSelect
          id={`${id}-group`}
          error={errors.groupId}
          label="Группа"
          value={item.groupId}
          disabled={disabled}
          options={catalog.groups.map((g) => ({ value: g.id, label: g.title }))}
          onChange={(groupId) =>
            onChange({
              groupId,
              sectionId: "",
              sectionTitle: "",
              subsectionId: "__any",
              subsectionTitle: "",
            })
          }
        />
        <FeedbackSelect
          id={`${id}-section`}
          error={errors.sectionId}
          label="Раздел"
          value={item.sectionId}
          disabled={disabled || !item.groupId}
          options={[
            ...sections.map((s) => ({ value: s.id, label: s.title })),
            { value: "__new", label: "Предложить новый раздел" },
          ]}
          onChange={(sectionId) =>
            onChange({ sectionId, sectionTitle: "", subsectionId: "__any", subsectionTitle: "" })
          }
        />
      </div>
      {item.sectionId === "__new" && (
        <div className="space-y-3">
          <label htmlFor={`${id}-section-title`} className="block text-sm font-medium">
            Название нового раздела
          </label>
          <Input
            id={`${id}-section-title`}
            aria-invalid={!!errors.sectionTitle}
            aria-describedby={errors.sectionTitle ? `${id}-section-title-error` : undefined}
            value={item.sectionTitle}
            required
            maxLength={160}
            placeholder="Например, Web accessibility"
            onChange={(e) => onChange({ sectionTitle: e.target.value })}
          />
          {errors.sectionTitle && (
            <p id={`${id}-section-title-error`} role="alert" className="text-xs text-destructive">
              {errors.sectionTitle}
            </p>
          )}
        </div>
      )}
      <FeedbackSelect
        id={`${id}-subsection`}
        error={errors.subsectionId}
        label="Подраздел"
        value={item.subsectionId}
        disabled={disabled || !item.sectionId}
        options={[
          { value: "__any", label: "На усмотрение автора" },
          ...(section?.subsections.map((s) => ({ value: s.id, label: s.title })) ?? []),
          { value: "__new", label: "Предложить новый подраздел" },
        ]}
        onChange={(subsectionId) => onChange({ subsectionId, subsectionTitle: "" })}
      />
      {item.subsectionId === "__new" && (
        <div className="space-y-3">
          <label htmlFor={`${id}-subsection-title`} className="block text-sm font-medium">
            Название нового подраздела
          </label>
          <Input
            id={`${id}-subsection-title`}
            aria-invalid={!!errors.subsectionTitle}
            aria-describedby={errors.subsectionTitle ? `${id}-subsection-title-error` : undefined}
            value={item.subsectionTitle}
            required
            maxLength={160}
            placeholder="Например, Работа с формами"
            onChange={(e) => onChange({ subsectionTitle: e.target.value })}
          />
          {errors.subsectionTitle && (
            <p
              id={`${id}-subsection-title-error`}
              role="alert"
              className="text-xs text-destructive"
            >
              {errors.subsectionTitle}
            </p>
          )}
        </div>
      )}
      <div className="space-y-3">
        <label htmlFor={`${id}-topics`} className="block text-sm font-medium">
          Темы, которые стоит добавить
        </label>
        <Textarea
          id={`${id}-topics`}
          aria-invalid={!!errors.topics}
          aria-describedby={`${id}-hint${errors.topics ? ` ${id}-topics-error` : ""}`}
          value={item.topics}
          required
          maxLength={10000}
          className="min-h-28"
          placeholder="useState, обновление состояния, работа с формами"
          onChange={(e) => onChange({ topics: e.target.value })}
        />
        {errors.topics && (
          <p id={`${id}-topics-error`} role="alert" className="text-xs text-destructive">
            {errors.topics}
          </p>
        )}
        <p id={`${id}-hint`} className="text-xs leading-5 text-muted-foreground">
          Разделяйте темы запятой или переносом строки. До 50 тем, каждая - до 200 символов. Повторы
          объединяются.
        </p>
        {topics.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5" aria-label="Распознанные темы">
            {topics.slice(0, 6).map((topic) => (
              <Badge
                key={topic.toLocaleLowerCase("ru")}
                variant="secondary"
                className="max-w-full truncate"
              >
                {topic}
              </Badge>
            ))}
            <span className="text-xs text-muted-foreground">Всего: {topics.length}</span>
          </div>
        )}
      </div>
      {canRemove && (
        <Button type="button" size="sm" variant="ghost" onClick={onRemove} disabled={disabled}>
          Убрать раздел {index + 1}
        </Button>
      )}
    </fieldset>
  )
}
