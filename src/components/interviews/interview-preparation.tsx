import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { SearchField } from "@/components/experience/search-field"
import { questionApi } from "@/lib/question-api"
import type { QuestionCatalog } from "@/data/question-catalog"
import type { InterviewRecord, InterviewPreparationPlan } from "@/data/interviews"
import { practiceTasks } from "@/data/interview-content"
import { useInterviewTracker, useInterviewStorage } from "@/stores/interviews"

const emptyPlan: InterviewPreparationPlan = { sectionIds: [], questionIds: [], taskIds: [] }
export function InterviewPreparation({ record }: { record: InterviewRecord }) {
  const [catalog, setCatalog] = useState<QuestionCatalog | null>(null)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState("topics")
  const storageError = useInterviewStorage((state) => state.error)
  const plan = record.preparation ?? emptyPlan
  const route = useLocation()
  const returnTo = route.pathname + route.search
  useEffect(() => {
    let active = true
    questionApi
      .catalog()
      .then((value) => {
        if (active) setCatalog(value)
      })
      .catch(() => {
        if (active) setFailed(true)
      })
    return () => {
      active = false
    }
  }, [attempt])
  function change(key: keyof InterviewPreparationPlan, ids: string[]) {
    useInterviewTracker.getState().setPreparation(record.id, { ...plan, [key]: [...new Set(ids)] })
  }
  function toggle(key: "questionIds" | "taskIds", id: string) {
    change(
      key,
      plan[key].includes(id) ? plan[key].filter((value) => value !== id) : [...plan[key], id],
    )
  }
  const sections = catalog?.sections.filter((section) => !section.inDevelopment) ?? []
  const normalized = query.trim().toLocaleLowerCase("ru")
  const questions =
    catalog?.questions.filter(
      (item) =>
        (!plan.sectionIds.length ||
          catalog.sections.some(
            (section) =>
              plan.sectionIds.includes(section.id) &&
              section.subsections.some((sub) => sub.questionIds.includes(item.id)),
          )) &&
        `${item.title} ${item.topic}`.toLocaleLowerCase("ru").includes(normalized),
    ) ?? []
  const tasks = practiceTasks.filter((task) =>
    `${task.title} ${task.topic}`.toLocaleLowerCase("ru").includes(normalized),
  )
  const attached = [
    ...plan.questionIds.map((id) => ({
      key: "questionIds" as const,
      id,
      title: catalog?.questions.find((item) => item.id === id)?.title ?? id,
      to: "/questions/" + encodeURIComponent(id),
      kind: "Вопрос",
    })),
    ...plan.taskIds.map((id) => ({
      key: "taskIds" as const,
      id,
      title: practiceTasks.find((item) => item.id === id)?.title ?? id,
      to: "/tasks/" + encodeURIComponent(id),
      kind: "Задача",
    })),
  ]
  return (
    <section
      className="space-y-4 rounded-xl bg-muted/30 p-4"
      aria-label="План подготовки к собеседованию"
    >
      <div>
        <h2 className="text-sm font-semibold">Подготовка к собеседованию</h2>
        <p className="mt-1 text-xs leading-6 text-muted-foreground">
          Выберите темы и прикрепите материал для повторения перед встречей.
        </p>
      </div>
      {!!plan.sectionIds.length && (
        <div className="flex flex-wrap gap-2">
          {plan.sectionIds.map((id) => (
            <Button
              key={id}
              nativeButton={false}
              size="sm"
              variant="outline"
              render={
                <Link to={`/questions/sections/${encodeURIComponent(id)}`} state={{ returnTo }} />
              }
            >
              {sections.find((item) => item.id === id)?.title ?? id}
            </Button>
          ))}
        </div>
      )}
      {!!attached.length && (
        <ul className="max-h-64 space-y-2 overflow-auto">
          {attached.map((item) => (
            <li
              key={item.key + ":" + item.id}
              className="flex items-center gap-2 rounded-lg bg-card p-2"
            >
              <Link
                className="min-w-0 flex-1 rounded px-1 text-xs leading-5 outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                to={item.to}
                state={{ returnTo }}
              >
                <span className="block text-[10px] text-muted-foreground">{item.kind}</span>
                {item.title}
              </Link>
              <Button
                size="sm"
                variant="ghost"
                aria-label={"Убрать из плана: " + item.title}
                onClick={() => toggle(item.key, item.id)}
              >
                Убрать
              </Button>
            </li>
          ))}
        </ul>
      )}
      <Tabs
        value={tab}
        onValueChange={(value) => {
          if (typeof value === "string") {
            setTab(value)
            setQuery("")
          }
        }}
      >
        <TabsList aria-label="Материалы подготовки">
          <TabsTrigger value="topics">Темы ({plan.sectionIds.length})</TabsTrigger>
          <TabsTrigger value="questions">Вопросы ({plan.questionIds.length})</TabsTrigger>
          <TabsTrigger value="tasks">Задачи ({plan.taskIds.length})</TabsTrigger>
        </TabsList>
        {failed && (
          <div className="space-y-2 text-xs text-destructive">
            <p>Не удалось загрузить каталог вопросов. Прикреплённые материалы сохранены.</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setFailed(false)
                setAttempt((value) => value + 1)
              }}
            >
              Повторить загрузку
            </Button>
          </div>
        )}
        {!catalog && !failed && (
          <output className="text-xs text-muted-foreground">Загружаем темы и вопросы…</output>
        )}
        <TabsContent value="topics">
          <ToggleGroup
            multiple
            aria-label="Темы для подготовки"
            variant="outline"
            className="w-full flex-wrap justify-start"
            value={plan.sectionIds}
            onValueChange={(values) =>
              change(
                "sectionIds",
                values.filter((value) => typeof value === "string"),
              )
            }
          >
            {sections.map((section) => (
              <ToggleGroupItem key={section.id} value={section.id}>
                {section.title}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </TabsContent>
        <TabsContent value="questions" className="space-y-3">
          <SearchField
            value={query}
            onValueChange={setQuery}
            label="Найти вопрос для собеседования"
            placeholder="Название вопроса или технология"
          />
          <p className="text-[11px] text-muted-foreground">
            {plan.sectionIds.length ? "Поиск в выбранных темах." : "Поиск во всём каталоге."}{" "}
            Найдено: {questions.length}. Показаны первые 10.
          </p>
          <ul className="space-y-2">
            {questions.slice(0, 10).map((item) => (
              <li key={item.id} className="flex items-center gap-2 text-xs">
                <span className="min-w-0 flex-1 leading-5">{item.title}</span>
                <Button
                  size="sm"
                  variant={plan.questionIds.includes(item.id) ? "secondary" : "outline"}
                  onClick={() => toggle("questionIds", item.id)}
                >
                  {plan.questionIds.includes(item.id) ? "Убрать" : "Добавить"}
                </Button>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-3">
          <SearchField
            value={query}
            onValueChange={setQuery}
            label="Найти задачу для собеседования"
            placeholder="Название задачи или технология"
          />
          <ul className="max-h-72 space-y-2 overflow-auto">
            {tasks.map((item) => (
              <li key={item.id} className="flex items-center gap-2 text-xs">
                <span className="min-w-0 flex-1 leading-5">
                  {item.title}
                  <span className="block text-muted-foreground">{item.topic}</span>
                </span>
                <Button
                  size="sm"
                  variant={plan.taskIds.includes(item.id) ? "secondary" : "outline"}
                  onClick={() => toggle("taskIds", item.id)}
                >
                  {plan.taskIds.includes(item.id) ? "Убрать" : "Добавить"}
                </Button>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
      <div className="min-h-6 text-xs text-muted-foreground">
        <output className={storageError ? "text-destructive" : undefined}>
          {storageError ?? "План сохранён в этом браузере"}
        </output>
        {storageError && (
          <Button
            size="sm"
            variant="outline"
            className="mt-2"
            onClick={() => useInterviewTracker.getState().retryStorage()}
          >
            Повторить сохранение
          </Button>
        )}
      </div>
    </section>
  )
}
