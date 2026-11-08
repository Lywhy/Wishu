import { useContext, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { PageHeading } from "@/components/catalog/page-heading"
import { PageState } from "@/components/catalog/page-state"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { LearningMarkdown } from "@/components/learning/learning-markdown"
import { CodeBlock } from "@/components/practice/practice-elements"
import { codeLanguageFor } from "@/lib/syntax-highlighter"
import { AddQuestionContext, useQuestionCatalog } from "@/lib/question-catalog-context"
import { questionApi, type CreateQuestionInput } from "@/lib/question-api"

const fields = [
  {
    key: "title",
    label: "Вопрос",
    min: 5,
    max: 200,
    required: true,
    hint: "Сформулируйте вопрос так, как его задают на собеседовании.",
  },
  {
    key: "summary",
    label: "Описание для карточки",
    min: 5,
    max: 500,
    required: true,
    hint: "Кратко обозначьте, какие знания проверяет вопрос.",
  },
  {
    key: "shortAnswer",
    label: "Короткий ответ",
    min: 10,
    max: 5000,
    required: true,
    hint: "Главная выжимка, с которой можно начать ответ на собеседовании.",
  },
  {
    key: "details",
    label: "Разбор",
    max: 20000,
    hint: "Markdown: заголовки, списки, **важное**, таблицы и блоки кода.",
  },
  {
    key: "code",
    label: "Пример кода",
    max: 20000,
    hint: "Без Markdown-ограждений. Добавьте комментарии, объясняющие результат.",
  },
  {
    key: "pitfall",
    label: "Типичная ошибка",
    max: 3000,
    hint: "Необязательно. На что стоит обратить внимание при ответе.",
  },
  {
    key: "takeaway",
    label: "Главная мысль",
    min: 5,
    max: 2000,
    required: true,
    hint: "Что нужно запомнить после разбора.",
  },
] as const

export function QuestionCreatePage() {
  const { questionSections } = useQuestionCatalog()
  const addQuestion = useContext(AddQuestionContext)
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const prefix = useId()
  const sending = useRef(false)
  const available = questionSections.filter(
    (section) => !section.inDevelopment && section.subsections.length,
  )
  const [value, setValue] = useState<CreateQuestionInput>(() => {
    const section = available.find((item) => item.id === params.get("section")) ?? available[0]
    const subsection =
      section?.subsections.find((item) => item.id === params.get("subsection")) ??
      section?.subsections[0]
    return {
      requestId: crypto.randomUUID(),
      sectionId: section?.id ?? "",
      subsectionId: subsection?.id ?? "",
      title: "",
      summary: "",
      difficulty: "Базовый",
      popular: false,
      shortAnswer: "",
      details: "",
      code: "",
      pitfall: "",
      takeaway: "",
    }
  })
  const [busy, setBusy] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [discardOpen, setDiscardOpen] = useState(false)
  const [error, setError] = useState("")
  const section = available.find((item) => item.id === value.sectionId)
  const topic = section?.title ?? "JavaScript"
  const update = <K extends keyof CreateQuestionInput>(key: K, next: CreateQuestionInput[K]) => {
    setValue((current) => ({ ...current, [key]: next }))
    setError("")
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending.current || !addQuestion) return
    setAttempted(true)
    const invalid = fields.find(
      (field) =>
        "required" in field && field.required && value[field.key].trim().length < field.min,
    )
    if (invalid && "min" in invalid) {
      document.getElementById(prefix + "-" + invalid.key)?.focus()
      setError(
        "Заполните поле «" +
          invalid.label +
          "»: минимум " +
          invalid.min +
          " символов без пробелов по краям.",
      )
      return
    }
    sending.current = true
    setBusy(true)
    setError("")
    try {
      const question = await questionApi.create(value)
      addQuestion(question)
      navigate("/questions/" + encodeURIComponent(question.id), { replace: true })
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Не удалось сохранить вопрос. Попробуйте ещё раз.",
      )
    } finally {
      sending.current = false
      setBusy(false)
    }
  }
  return (
    <>
      <QuestionBreadcrumbs
        items={[{ label: "Вопросы", to: "/questions" }, { label: "Новый вопрос" }]}
      />
      <PageHeading
        title="Добавить вопрос"
        description="Выберите тему и подготовьте ответ с примерами. После сохранения вопрос появится в общем каталоге платформы."
      />
      {!available.length ? (
        <PageState
          heading="h2"
          kind="unavailable"
          title="Подразделы пока недоступны"
          description="Пока нет доступных подразделов для добавления вопросов."
        />
      ) : (
        <form
          onSubmit={submit}
          aria-busy={busy}
          onInvalidCapture={() => setAttempted(true)}
          className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <fieldset
            disabled={busy}
            className="min-w-0 space-y-6 rounded-xl border bg-card p-5 sm:p-6"
          >
            <legend className="sr-only">Содержание вопроса</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor={prefix + "-section"} className="text-sm font-medium">
                  Раздел
                </label>
                <Select
                  value={value.sectionId}
                  onValueChange={(id) => {
                    const next = available.find((item) => item.id === id)
                    if (next)
                      setValue((current) => ({
                        ...current,
                        sectionId: next.id,
                        subsectionId: next.subsections[0].id,
                      }))
                  }}
                >
                  <SelectTrigger id={prefix + "-section"} className="w-full">
                    <SelectValue>{section?.title}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {available.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor={prefix + "-subsection"} className="text-sm font-medium">
                  Подраздел
                </label>
                <Select
                  value={value.subsectionId}
                  onValueChange={(id) => {
                    if (id) update("subsectionId", id)
                  }}
                >
                  <SelectTrigger id={prefix + "-subsection"} className="w-full">
                    <SelectValue>
                      {section?.subsections.find((item) => item.id === value.subsectionId)?.title}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {section?.subsections.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor={prefix + "-difficulty"} className="text-sm font-medium">
                  Сложность
                </label>
                <Select
                  value={value.difficulty}
                  onValueChange={(next) => {
                    if (next) update("difficulty", next as CreateQuestionInput["difficulty"])
                  }}
                >
                  <SelectTrigger id={prefix + "-difficulty"} className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(["Базовый", "Средний", "Продвинутый"] as const).map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3 sm:pt-6">
                <Switch
                  id={prefix + "-popular"}
                  checked={value.popular}
                  onCheckedChange={(checked) => update("popular", checked)}
                />
                <label htmlFor={prefix + "-popular"} className="text-sm">
                  Популярный вопрос
                </label>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              * Обязательные поля. В ответах поддерживается Markdown.
            </p>
            {fields.map((field) => {
              const id = prefix + "-" + field.key
              const required = "required" in field && field.required
              const fieldError =
                attempted &&
                required &&
                "min" in field &&
                value[field.key].trim().length < field.min
                  ? `Укажите не менее ${field.min} символов без пробелов по краям.`
                  : ""
              const common = {
                id,
                value: value[field.key],
                required,
                maxLength: field.max,
                minLength: "min" in field ? field.min : undefined,
                "aria-describedby": id + "-hint" + (fieldError ? " " + id + "-error" : ""),
                "aria-invalid": !!fieldError,
                onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                  update(field.key, event.target.value),
              }
              return (
                <div key={field.key} className="space-y-2">
                  <label htmlFor={id} className="text-sm font-medium">
                    {field.label}
                    {required ? " *" : ""}
                  </label>
                  {field.key === "title" ? (
                    <Input {...common} />
                  ) : (
                    <Textarea
                      {...common}
                      rows={field.key === "details" || field.key === "code" ? 7 : 3}
                      className={field.key === "code" ? "font-mono text-sm" : ""}
                    />
                  )}
                  <p id={id + "-hint"} className="text-xs leading-5 text-muted-foreground">
                    {field.hint}
                  </p>
                  {fieldError && (
                    <p id={id + "-error"} className="text-xs leading-6 text-destructive">
                      {fieldError}
                    </p>
                  )}
                </div>
              )
            })}
            {error && (
              <p
                role="alert"
                className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
              >
                {error}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3 border-t pt-5">
              <Button type="submit" disabled={busy}>
                {busy ? "Сохраняем…" : "Сохранить вопрос"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={() => {
                  if (fields.some((field) => value[field.key].trim())) setDiscardOpen(true)
                  else navigate("/questions")
                }}
              >
                Отмена
              </Button>
            </div>
          </fieldset>
          <aside
            className="min-w-0 rounded-xl border bg-card p-5 sm:p-6 xl:sticky xl:top-24 xl:max-h-[calc(100dvh-7.5rem)] xl:overflow-y-auto xl:overscroll-contain"
            aria-label="Предпросмотр вопроса"
          >
            <p className="mb-5 text-xs font-medium tracking-wide text-muted-foreground">
              ПРЕДПРОСМОТР
            </p>
            <h2 className="mb-6 text-2xl font-semibold wrap-anywhere">
              {value.title.trim() || "Название вопроса"}
            </h2>
            {!value.shortAnswer.trim() && !value.details.trim() && (
              <p className="text-sm text-muted-foreground">
                Здесь появится оформленный ответ. Используйте списки, выделение важного и примеры.
              </p>
            )}
            <div className="space-y-6">
              <LearningMarkdown
                topic={topic}
                content={[
                  ...(value.shortAnswer.trim() ? ["## Короткий ответ", value.shortAnswer] : []),
                  ...(value.details.trim() ? ["## Разбор", value.details] : []),
                ].join("\n\n")}
              />
              {value.code.trim() && (
                <section className="space-y-3">
                  <h3 className="font-semibold">Пример</h3>
                  <CodeBlock code={value.code} language={codeLanguageFor(topic, value.code)} />
                </section>
              )}
              {value.pitfall.trim() && (
                <LearningMarkdown
                  topic={topic}
                  content={"## Типичная ошибка\n\n" + value.pitfall}
                />
              )}
              {value.takeaway.trim() && (
                <LearningMarkdown topic={topic} content={"## Главная мысль\n\n" + value.takeaway} />
              )}
            </div>
          </aside>
        </form>
      )}
      <Dialog open={discardOpen} onOpenChange={setDiscardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Уйти без сохранения вопроса?</DialogTitle>
            <DialogDescription>
              Введённое содержимое будет потеряно. Можно вернуться к редактированию и сохранить
              вопрос.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDiscardOpen(false)}>
              Продолжить редактирование
            </Button>
            <Button variant="destructive" onClick={() => navigate("/questions")}>
              Уйти без сохранения
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <p className="mt-6 text-xs text-muted-foreground">
        Вернуться к{" "}
        <Link className="text-primary underline underline-offset-4" to="/questions">
          каталогу вопросов
        </Link>
        .
      </p>
    </>
  )
}
