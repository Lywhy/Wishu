import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CatalogControls, EmptyResults } from "@/components/practice/catalog-controls"
import { DifficultyBadge, ProgressAside } from "@/components/practice/practice-elements"
import { practiceTasks } from "@/data/interview-content"
import { useCatalogFilters } from "@/hooks/use-catalog-filters"
import { usePracticeProgress } from "@/stores/practice-progress"

export function TasksPage() {
  const filter = useCatalogFilters()
  const reviewed = usePracticeProgress((state) => state.reviewedTaskIds)
  const drafts = usePracticeProgress((state) => state.drafts)
  const items = practiceTasks.filter(
    (task) =>
      (filter.topic === "Все темы" || task.topic === filter.topic) &&
      (filter.difficulty === "Любой уровень" || task.difficulty === filter.difficulty) &&
      (filter.status !== "reviewed" || reviewed.includes(task.id)) &&
      (filter.status !== "new" ||
        (!reviewed.includes(task.id) && !Object.hasOwn(drafts, task.id))) &&
      (filter.status !== "draft" ||
        (Object.hasOwn(drafts, task.id) && !reviewed.includes(task.id))) &&
      `${task.title} ${task.description} ${task.topic}`
        .toLocaleLowerCase("ru")
        .includes(filter.query.trim().toLocaleLowerCase("ru")),
  )
  const next = practiceTasks.find((task) => !reviewed.includes(task.id)) ?? practiceTasks[0]
  return (
    <>
      <p className="mb-7 text-xs text-muted-foreground">
        Подготовка к собеседованию{" "}
        <span className="mx-2" aria-hidden="true">
          /
        </span>{" "}
        <span className="text-foreground" aria-current="page">
          Задачи
        </span>
      </p>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            От понимания — к практике.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Небольшие задачи с собеседований. Продумайте решение, напишите код и сравните свой
            подход с разбором.
          </p>
        </div>
        <Badge variant="outline" className="bg-background px-3 py-1.5 font-normal">
          {practiceTasks.length} задач
        </Badge>
      </div>
      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-5">
          <CatalogControls
            filter={filter}
            topics={[...new Set(practiceTasks.map((task) => task.topic))]}
            placeholder="Найти задачу или тему"
            statuses={[
              { value: "all", label: "Все задачи" },
              { value: "new", label: "Не начаты" },
              { value: "draft", label: "Есть черновик" },
              { value: "reviewed", label: "Разобраны" },
            ]}
          />
          <p className="text-xs text-muted-foreground">
            Показано: {items.length} из {practiceTasks.length}
          </p>
          {items.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((task) => (
                <Card key={task.id} className="flex h-full gap-0 rounded-2xl p-5 shadow-none">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      Задача {task.number}
                    </span>
                    <DifficultyBadge level={task.difficulty} />
                  </div>
                  <h2 className="text-lg leading-7 font-semibold">
                    <Link
                      to={`/tasks/${task.id}`}
                      className="rounded outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {task.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-[13px] leading-6 text-muted-foreground">
                    {task.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{task.topic}</span>
                    <span>Около {task.duration}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                    <span className="text-xs text-muted-foreground">
                      {reviewed.includes(task.id)
                        ? "Разобрано"
                        : Object.hasOwn(drafts, task.id)
                          ? "Есть черновик"
                          : "Не начато"}
                    </span>
                    <Button
                      nativeButton={false}
                      size="sm"
                      variant="outline"
                      render={<Link to={`/tasks/${task.id}`} />}
                    >
                      {Object.hasOwn(drafts, task.id) ? "Продолжить" : "Открыть задачу"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyResults onReset={filter.reset} />
          )}
        </div>
        <aside className="space-y-5 lg:sticky lg:top-7">
          <ProgressAside
            title="Ваш путь в практике"
            done={practiceTasks.filter((task) => reviewed.includes(task.id)).length}
            total={practiceTasks.length}
            caption="Здесь считаются задачи, которые вы сами отметили разобранными."
          >
            {next && (
              <Button
                nativeButton={false}
                className="w-full"
                render={<Link to={`/tasks/${next.id}`} />}
              >
                Выбрать следующую
              </Button>
            )}
          </ProgressAside>
          <div className="rounded-2xl border border-dashed p-5">
            <h2 className="text-sm font-semibold">Не начинайте с кода</h2>
            <ol className="mt-3 space-y-3 text-xs leading-6 text-muted-foreground">
              <li>1. Уточните входные данные и ограничения.</li>
              <li>2. Проговорите подход и крайние случаи.</li>
              <li>3. Напишите решение и оцените сложность.</li>
            </ol>
          </div>
        </aside>
      </div>
    </>
  )
}
