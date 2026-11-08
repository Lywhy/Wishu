import { ShareCollection } from "@/components/experience/share-collection"
import { Fragment } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  AnimatedCard as Card,
  CatalogHeader,
  TaskStatusBadge,
} from "@/components/catalog/catalog-primitives"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { CatalogControls, EmptyResults } from "@/components/catalog/catalog-controls"
import { DifficultyBadge, ProgressAside } from "@/components/practice/practice-elements"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { practiceTasks } from "@/data/interview-content"
import { useCatalogFilters } from "@/hooks/use-catalog-filters"
import { usePracticeProgress } from "@/stores/practice-progress"
import { useTaskExperience } from "@/stores/task-experience"

export function TasksPage() {
  const filter = useCatalogFilters()
  const route = useLocation()
  const reviewed = usePracticeProgress((state) => state.solvedTaskIds)
  const drafts = usePracticeProgress((state) => state.drafts)
  const lastId = useTaskExperience((state) => state.lastTaskId)
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
  const requestedPage = Number(new URLSearchParams(route.search).get("page") ?? "1")
  const totalPages = Math.max(1, Math.ceil(items.length / 8))
  const page = Math.min(
    totalPages,
    Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1,
  )
  const visibleItems = items.slice((page - 1) * 8, page * 8)
  const pageLink = (value: number) => {
    const params = new URLSearchParams(route.search)
    if (value === 1) params.delete("page")
    else params.set("page", String(value))
    return "/tasks" + (params.size ? "?" + params.toString() : "")
  }
  const resume =
    practiceTasks.find((task) => task.id === lastId && !reviewed.includes(task.id)) ??
    practiceTasks.find((task) => Object.hasOwn(drafts, task.id) && !reviewed.includes(task.id)) ??
    practiceTasks.find((task) => !reviewed.includes(task.id))
  const taskList = { ids: items.map((task) => task.id), returnTo: route.pathname + route.search }
  const active =
    Boolean(filter.query) ||
    filter.status !== "all" ||
    filter.difficulty !== "Любой уровень" ||
    filter.topic !== "Все темы"
  return (
    <>
      <QuestionBreadcrumbs
        items={[{ label: "Подготовка к собеседованию", to: "/learn" }, { label: "Задачи" }]}
      />
      <CatalogHeader
        actions={<ShareCollection key={route.search} />}
        title="Задачи для собеседований"
        description="Выберите задачу, проверьте решение на тестах и разберите результат. Черновик сохранится автоматически."
        eyebrow="Практика и проверка"
      />
      {practiceTasks.length > 0 && practiceTasks.every((task) => reviewed.includes(task.id)) && (
        <Card className="mb-5 space-y-3 p-5">
          <h2 className="font-semibold">Все задачи решены</h2>
          <p className="text-sm text-muted-foreground">
            Можно повторить решения или перейти к новой теме обучения.
          </p>
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link to="/tasks?status=reviewed" />}
          >
            Повторить задачи
          </Button>
          <Button nativeButton={false} render={<Link to="/learn" />}>
            Выбрать обучение
          </Button>
        </Card>
      )}
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-5">
          {resume && !active && (
            <Card className="gap-3 rounded-xl border-primary/20 bg-primary/5 p-5 shadow-none sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium text-primary">
                  {resume.id === lastId || Object.hasOwn(drafts, resume.id)
                    ? "Продолжить практику"
                    : "Начните с одной задачи"}
                </p>
                <p className="mt-1 text-sm font-semibold">{resume.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {resume.topic} · {resume.duration}
                </p>
              </div>
              <Button
                nativeButton={false}
                className="h-10"
                render={<Link to={`/tasks/${resume.id}`} />}
              >
                {Object.hasOwn(drafts, resume.id) ? "Продолжить решение" : "Открыть задачу"}
              </Button>
            </Card>
          )}
          <CatalogControls
            filter={filter}
            topics={[...new Set(practiceTasks.map((task) => task.topic))]}
            placeholder="Найти задачу или технологию"
            statuses={[
              { value: "all", label: "Все задачи" },
              { value: "new", label: "Не начаты" },
              { value: "draft", label: "В работе" },
              { value: "reviewed", label: "Решены" },
            ]}
          />
          <div className="flex min-h-9 items-center justify-between gap-3">
            <p aria-live="polite" aria-atomic="true" className="text-xs text-muted-foreground">
              Показано: {items.length ? (page - 1) * 8 + 1 : 0}-{Math.min(page * 8, items.length)}{" "}
              из {items.length}
            </p>
            {active && (
              <Button variant="ghost" className="h-9" onClick={filter.reset}>
                Сбросить фильтры
              </Button>
            )}
          </div>
          {items.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {visibleItems.map((task, index) => (
                <Link
                  key={task.id}
                  to={`/tasks/${task.id}`}
                  state={{ taskList }}
                  className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Card
                    introDelay={Math.min(index, 5) * 0.05}
                    className="h-full gap-3 rounded-xl p-5 shadow-none transition-[background-color,border-color,box-shadow] duration-200 group-hover:border-primary/25 group-hover:bg-muted/30 motion-reduce:transition-none"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <TaskStatusBadge
                        status={
                          reviewed.includes(task.id)
                            ? "solved"
                            : Object.hasOwn(drafts, task.id)
                              ? "draft"
                              : "new"
                        }
                      />
                      <DifficultyBadge level={task.difficulty} />
                    </div>
                    <h2 className="text-base leading-6 font-semibold group-hover:text-primary">
                      {task.title}
                    </h2>
                    <p className="line-clamp-2 flex-1 text-xs leading-6 text-muted-foreground">
                      {task.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3">
                      <span className="text-xs text-muted-foreground">
                        {task.topic} · #{task.number}
                      </span>

                      <span className="text-xs text-muted-foreground">Около {task.duration}</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyResults onReset={filter.reset} />
          )}
          {items.length > 0 && (
            <Pagination aria-label="Страницы задач" className="pt-2">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    size="sm"
                    disabled={page === 1}
                    render={page > 1 ? <Link to={pageLink(page - 1)} /> : undefined}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .filter(
                    (value) => value === 1 || value === totalPages || Math.abs(value - page) <= 1,
                  )
                  .map((value, index, pages) => (
                    <Fragment key={value}>
                      {index > 0 && value - pages[index - 1] > 1 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      <PaginationItem>
                        <PaginationLink
                          isActive={value === page}
                          size="icon"
                          aria-label={`Страница ${value}`}
                          render={<Link to={pageLink(value)} />}
                        >
                          {value}
                        </PaginationLink>
                      </PaginationItem>
                    </Fragment>
                  ))}
                <PaginationItem>
                  <PaginationNext
                    size="sm"
                    disabled={page === totalPages}
                    render={page < totalPages ? <Link to={pageLink(page + 1)} /> : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
        <aside className="space-y-4 lg:sticky lg:top-24">
          <ProgressAside
            title="Ваш прогресс"
            done={practiceTasks.filter((task) => reviewed.includes(task.id)).length}
            total={practiceTasks.length}
            caption="Задачи, для которых успешно пройдены все тесты."
          />
          <Card className="gap-3 rounded-xl p-4 shadow-none">
            <h2 className="text-sm font-semibold">Перед решением</h2>
            <ol className="list-decimal space-y-2 pl-4 text-xs leading-6 text-muted-foreground">
              <li>Уточните ограничения и крайние случаи.</li>
              <li>Сформулируйте подход до написания кода.</li>
              <li>Сравните результат и сложность с разбором.</li>
            </ol>
          </Card>
        </aside>
      </div>
    </>
  )
}
