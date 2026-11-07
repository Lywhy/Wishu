import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { questionApi } from "@/lib/question-api"
import type { QuestionCatalog } from "@/data/question-catalog"
import { practiceTasks } from "@/data/interview-content"
import { courseSteps } from "@/data/learning-course"

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [catalog, setCatalog] = useState<QuestionCatalog | null>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.repeat || event.isComposing) return
      if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === "k") {
        if (!open && document.querySelector('[role="dialog"]')) return
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", key)
    return () => window.removeEventListener("keydown", key)
  }, [open])
  useEffect(() => {
    if (!open) return
    let active = true
    questionApi
      .catalog()
      .then((value) => {
        if (active) {
          setCatalog(value)
          setError(false)
        }
      })
      .catch(() => {
        if (active) setError(true)
      })
    return () => {
      active = false
    }
  }, [open, attempt])
  const lectures = useMemo(
    () =>
      catalog?.sections
        .filter((section) => !section.inDevelopment)
        .flatMap((section) =>
          courseSteps(section, catalog.questions)
            .filter((step) => step.kind === "lecture")
            .map((step) => ({
              id: section.id + ":" + step.id,
              title: step.title,
              topic: section.title,
              to: `/learn/${section.id}/${step.id}`,
            })),
        ) ?? [],
    [catalog],
  )
  const enabledIds = useMemo(
    () =>
      new Set(
        catalog?.sections
          .filter((section) => !section.inDevelopment)
          .flatMap((section) => section.subsections.flatMap((sub) => sub.questionIds)) ?? [],
      ),
    [catalog],
  )
  const text = query.trim().toLocaleLowerCase("ru")
  const foundQuestions =
    text.length >= 2
      ? (catalog?.questions
          .filter(
            (item) =>
              enabledIds.has(item.id) &&
              `${item.title} ${item.summary} ${item.topic}`.toLocaleLowerCase("ru").includes(text),
          )
          .slice(0, 8) ?? [])
      : []
  const foundTasks =
    text.length >= 2
      ? practiceTasks
          .filter((item) =>
            `${item.title} ${item.topic} ${item.description}`
              .toLocaleLowerCase("ru")
              .includes(text),
          )
          .slice(0, 6)
      : []
  const foundLectures =
    text.length >= 2
      ? lectures
          .filter((item) => `${item.title} ${item.topic}`.toLocaleLowerCase("ru").includes(text))
          .slice(0, 6)
      : []
  const pages = [
    { title: "Обучение", to: "/learn" },
    { title: "Вопросы", to: "/questions" },
    { title: "Задачи", to: "/tasks" },
    { title: "Собеседования", to: "/interviews" },
    { title: "Короткая подготовка", to: "/session" },
    { title: "Пробное собеседование", to: "/mock-interview" },
    { title: "Повторить сегодня", to: "/questions?status=due" },
  ].filter((item) => !text || item.title.toLocaleLowerCase("ru").includes(text))
  function go(to: string) {
    setOpen(false)
    setQuery("")
    navigate(to)
  }
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        aria-label="Поиск по платформе"
        title="Поиск · Ctrl / ⌘ + K"
        onClick={() => setOpen(true)}
      >
        <Search aria-hidden="true" />
      </Button>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value)
          if (!value) setQuery("")
        }}
      >
        <DialogContent className="gap-3 p-3 sm:max-w-2xl" showCloseButton={false}>
          <DialogTitle className="sr-only">Поиск по платформе</DialogTitle>
          <DialogDescription className="sr-only">
            Вопросы, задачи и лекции. Используйте стрелки и Enter для перехода.
          </DialogDescription>
          <Command shouldFilter={false}>
            <CommandInput
              aria-label="Найти вопрос, задачу или лекцию"
              placeholder="Поиск по вопросам, задачам и лекциям…"
              value={query}
              onValueChange={setQuery}
            />
            <CommandList className="max-h-[60dvh]">
              <CommandEmpty>
                {text.length < 2
                  ? "Введите минимум два символа для поиска материала."
                  : "Ничего не найдено. Попробуйте другие слова."}
              </CommandEmpty>
              {!!pages.length && (
                <CommandGroup heading="Страницы">
                  {pages.map((item) => (
                    <CommandItem key={item.to} value={item.to} onSelect={() => go(item.to)}>
                      {item.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {!!foundQuestions.length && (
                <CommandGroup heading="Вопросы">
                  {foundQuestions.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={"question:" + item.id}
                      onSelect={() => go("/questions/" + item.id)}
                    >
                      <span>
                        {item.title}
                        <span className="ml-2 text-xs text-muted-foreground">{item.topic}</span>
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {!!foundTasks.length && (
                <CommandGroup heading="Задачи">
                  {foundTasks.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={"task:" + item.id}
                      onSelect={() => go("/tasks/" + item.id)}
                    >
                      {item.title}
                      <span className="text-xs text-muted-foreground">{item.topic}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              {!!foundLectures.length && (
                <CommandGroup heading="Лекции">
                  {foundLectures.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={"lecture:" + item.id}
                      onSelect={() => go(item.to)}
                    >
                      {item.title}
                      <span className="text-xs text-muted-foreground">{item.topic}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs text-muted-foreground">
            <span>↑ ↓ - выбор · Enter - открыть · Esc - закрыть</span>
            <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
              Закрыть
            </Button>
          </div>
          {!catalog && !error && (
            <output className="text-xs text-muted-foreground">
              Загружаем вопросы и лекции… Задачи уже доступны.
            </output>
          )}
          {error && (
            <div className="flex items-center gap-2 text-xs text-destructive">
              <span>Не удалось загрузить вопросы и лекции.</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setError(false)
                  setAttempt((value) => value + 1)
                }}
              >
                Повторить
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
