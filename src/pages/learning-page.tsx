import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import {
  Bookmark,
  BookOpen,
  Braces,
  Check,
  ChevronRight,
  Circle,
  Lightbulb,
  ListChecks,
  Search,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ModuleCard } from "@/components/learning/module-card"
import { learningGroups, learningModules, type LearningModule } from "@/data/learning-modules"
import { cn } from "@/lib/utils"
import { useLearningPlan } from "@/stores/learning-plan"

export function LearningPage() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState("")
  const [onlySaved, setOnlySaved] = useState(false)
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(
    () => learningModules.find((module) => module.id === searchParams.get("module")) ?? null,
  )
  const savedModuleIds = useLearningPlan((state) => state.savedModuleIds)
  const toggleModule = useLearningPlan((state) => state.toggleModule)
  const savedModules = learningModules.filter((module) => savedModuleIds.includes(module.id))
  const totalTopics = learningModules.reduce((count, module) => count + module.topics.length, 0)
  const visibleModules = learningModules.filter((module) => {
    const searchText =
      `${module.title} ${module.category} ${module.group} ${module.description} ${module.topics.join(" ")}`.toLocaleLowerCase(
        "ru",
      )
    return (
      (!onlySaved || savedModuleIds.includes(module.id)) &&
      searchText.includes(query.trim().toLocaleLowerCase("ru"))
    )
  })

  function resetFilters() {
    setQuery("")
    setOnlySaved(false)
  }

  return (
    <>
      <div className="mb-7 flex items-center gap-2 text-xs text-muted-foreground">
        <BookOpen className="size-3.5" aria-hidden="true" />
        Ваша база знаний
        <ChevronRight className="size-3" aria-hidden="true" />
        <span className="text-foreground">Обучение</span>
      </div>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Маленькие шаги. Большие знания.
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Разбирайтесь в темах, закрепляйте практикой и готовьтесь к следующему собеседованию.
          </p>
        </div>
      </div>

      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0 space-y-9">
          <section
            aria-labelledby="start-title"
            className="relative overflow-hidden rounded-2xl border border-orange-200/70 bg-orange-50/70 p-6 sm:p-8 dark:border-orange-900/40 dark:bg-orange-950/25"
          >
            <div className="relative z-10 max-w-md md:max-w-[60%]">
              <span className="mb-4 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest text-primary uppercase">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Хорошее место для старта
              </span>
              <h2
                id="start-title"
                className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl"
              >
                Уверенность начинается
                <br className="hidden sm:block" /> с понимания основ.
              </h2>
              <p className="mt-3 max-w-sm text-[13px] leading-6 text-stone-600 dark:text-stone-300">
                Не заучивайте ответы. Поймите, как всё устроено: одна тема, понятное объяснение и
                немного практики.
              </p>
              <Button
                onClick={() => setSelectedModule(learningModules[0] ?? null)}
                className="mt-6 h-10 gap-3 rounded-lg px-4"
              >
                Начать с JavaScript
              </Button>
              <div className="mt-4 flex gap-4 text-[11px] text-stone-500 dark:text-stone-400">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="size-3" aria-hidden="true" />5 тем
                </span>
                <span className="flex items-center gap-1.5">
                  <Braces className="size-3" aria-hidden="true" />8 практических задач
                </span>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute top-1/2 right-8 hidden w-[27%] -translate-y-1/2 md:block"
            >
              <div className="absolute -inset-8 rounded-full bg-orange-200/30 blur-2xl dark:bg-orange-800/10" />
              <div className="relative rotate-6 rounded-2xl border border-orange-200/80 bg-white p-5 shadow-xl shadow-orange-900/5 dark:border-orange-900/60 dark:bg-card">
                <div className="mb-5 flex gap-1">
                  <span className="size-1.5 rounded-full bg-stone-200 dark:bg-stone-600" />
                  <span className="size-1.5 rounded-full bg-stone-200 dark:bg-stone-600" />
                  <span className="size-1.5 rounded-full bg-stone-200 dark:bg-stone-600" />
                </div>
                <span className="text-6xl font-semibold tracking-tighter text-amber-500">
                  JS<span className="text-primary">.</span>
                </span>
                <div className="mt-5 space-y-2">
                  <div className="h-1.5 w-3/4 rounded bg-stone-100 dark:bg-stone-800" />
                  <div className="h-1.5 w-full rounded bg-orange-100 dark:bg-orange-900/40" />
                  <div className="h-1.5 w-1/2 rounded bg-stone-100 dark:bg-stone-800" />
                </div>
              </div>
              <div className="absolute -right-3 -bottom-4 flex -rotate-6 items-center gap-2 rounded-lg border bg-background px-3 py-2 text-[11px] shadow-sm">
                <span className="flex size-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                  <Check className="size-3" />
                </span>
                Понять, а не запомнить
              </div>
            </div>
          </section>

          <section aria-labelledby="catalog-title">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <h2 id="catalog-title" className="text-xl font-semibold tracking-tight">
                  Модули обучения
                </h2>
                <Badge variant="secondary" className="rounded-md font-normal">
                  {learningModules.length}
                </Badge>
              </div>
              <Button
                variant={onlySaved ? "secondary" : "ghost"}
                onClick={() => setOnlySaved(!onlySaved)}
                aria-pressed={onlySaved}
                className="-mr-2 gap-2 text-xs"
              >
                Мой план
                {savedModules.length > 0 && (
                  <span className="text-muted-foreground">{savedModules.length}</span>
                )}
              </Button>
            </div>
            <div className="relative mb-5">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                aria-label="Поиск модулей"
                placeholder="Что хотите изучить?"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-11 rounded-xl bg-background pr-24 pl-10 shadow-none"
              />
              {query && (
                <Button
                  onClick={() => setQuery("")}
                  variant="ghost"
                  size="sm"
                  aria-label="Очистить поиск"
                  className="absolute top-1/2 right-2 -translate-y-1/2"
                >
                  Очистить
                </Button>
              )}
            </div>
            <p className="sr-only">Найдено модулей: {visibleModules.length}</p>
            {visibleModules.length ? (
              <div className="space-y-9">
                {learningGroups.map((group) => {
                  const modules = visibleModules.filter((module) => module.group === group.id)
                  if (!modules.length) return null
                  return (
                    <section key={group.id} aria-labelledby={"group-" + group.id}>
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b pb-4">
                        <div>
                          <h3
                            id={"group-" + group.id}
                            className="text-lg font-semibold tracking-tight"
                          >
                            {group.title}
                          </h3>
                          <p className="mt-1.5 text-xs leading-6 text-muted-foreground">
                            {group.description}
                          </p>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {modules.map((module) => (
                          <ModuleCard
                            key={module.id}
                            module={module}
                            saved={savedModuleIds.includes(module.id)}
                            onOpen={() => setSelectedModule(module)}
                            onSave={() => toggleModule(module.id)}
                          />
                        ))}
                      </div>
                    </section>
                  )
                })}
              </div>
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
                <Search className="mb-4 size-6 text-muted-foreground" aria-hidden="true" />
                <h3 className="font-medium">
                  {onlySaved && !savedModules.length ? "Ваш план пока пуст" : "Ничего не нашлось"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {onlySaved && !savedModules.length
                    ? "Добавляйте модули кнопкой «В план» на карточке."
                    : "Попробуйте изменить поисковый запрос."}
                </p>
                <Button variant="outline" className="mt-5" onClick={resetFilters}>
                  Показать все модули
                </Button>
              </div>
            )}
          </section>
          <div className="flex items-start gap-3 rounded-xl border border-dashed px-5 py-4 text-xs leading-6 text-muted-foreground">
            <Lightbulb className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
            <p>
              <span className="font-medium text-foreground">Лучше понемногу, но регулярно.</span>{" "}
              Выберите одну тему и уделите ей 20 минут. Уверенность складывается из небольших шагов.
            </p>
          </div>
        </div>

        <aside aria-label="Учебный план" className="space-y-5 lg:sticky lg:top-7">
          <Card className="gap-0 rounded-2xl py-0 shadow-none">
            <CardHeader className="gap-4 p-5 pb-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Ваш учебный план</CardTitle>
                <ListChecks className="size-4 text-muted-foreground" aria-hidden="true" />
              </div>
              <p className="text-xs leading-6 text-muted-foreground">
                Соберите свой маршрут к уверенному собеседованию.
              </p>
            </CardHeader>
            <CardContent className="p-5 pt-4">
              <div className="mb-2 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Модулей в плане</span>
                <span className="font-medium tabular-nums">
                  {savedModules.length} из {learningModules.length}
                </span>
              </div>
              <Progress
                aria-label="Модулей добавлено в план"
                value={savedModules.length}
                max={learningModules.length}
              />
              <Separator className="my-5" />
              {savedModules.length ? (
                <ol className="space-y-4">
                  {savedModules.map((module, index) => (
                    <li key={module.id} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[10px] font-medium text-primary dark:bg-orange-500/10">
                        {index + 1}
                      </span>
                      <button
                        onClick={() => setSelectedModule(module)}
                        className="rounded text-left text-xs leading-5 font-medium outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {module.title}
                      </button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleModule(module.id)}
                        aria-label={`Убрать «${module.title}» из плана`}
                        className="ml-auto shrink-0"
                      >
                        Убрать
                      </Button>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="rounded-xl bg-muted/50 px-4 py-5 text-center">
                  <Bookmark
                    className="mx-auto mb-3 size-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <p className="text-xs font-medium">Что изучим первым?</p>
                  <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                    Нажмите «В план» у модуля,
                    <br />
                    чтобы добавить его в свой план.
                  </p>
                </div>
              )}
              <p className="mt-4 text-[10px] leading-5 text-muted-foreground">
                План сохраняется в этом браузере.
              </p>
            </CardContent>
          </Card>

          <Card className="gap-0 rounded-2xl py-0 shadow-none">
            <CardHeader className="p-5 pb-4">
              <CardTitle className="text-sm font-semibold">Как устроено обучение</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <ol className="space-y-5">
                {[
                  { title: "Разберитесь в теме", text: "Коротко и по существу.", icon: BookOpen },
                  {
                    title: "Попробуйте на практике",
                    text: "Закрепите понимание задачами.",
                    icon: Braces,
                  },
                  { title: "Проверьте себя", text: "Вернитесь к вопросам по теме.", icon: Check },
                ].map(({ title, text, icon: Icon }, index) => (
                  <li key={title} className="relative flex gap-3">
                    {index < 2 && (
                      <span
                        aria-hidden="true"
                        className="absolute top-7 -bottom-5 left-3.5 border-l border-dashed"
                      />
                    )}
                    <span className="relative flex size-7 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground">
                      <Icon className="size-3" aria-hidden="true" />
                    </span>
                    <div className="pt-0.5">
                      <p className="text-xs font-medium">{title}</p>
                      <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <div className="rounded-2xl border border-orange-200/60 bg-orange-50/50 p-5 dark:border-orange-900/40 dark:bg-orange-950/25">
            <span className="flex items-center gap-2 text-xs font-medium text-primary">
              <Circle className="size-3 fill-current" aria-hidden="true" />
              Всё начинается с любопытства
            </span>
            <p className="mt-3 text-xs leading-6 text-stone-600 dark:text-stone-300">
              В каталоге {learningModules.length} модулей и {totalTopics} тем. Выберите то, что
              интересно сейчас - строгого порядка нет.
            </p>
            <button
              onClick={() => {
                resetFilters()
                document
                  .getElementById("catalog-title")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className="mt-4 inline-flex items-center gap-1 rounded text-xs font-medium text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Выбрать тему
            </button>
          </div>
        </aside>
      </div>

      <Dialog
        open={selectedModule !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedModule(null)
        }}
      >
        <DialogContent className="max-h-[85dvh] overflow-y-auto p-6 sm:max-w-lg">
          {selectedModule && (
            <>
              <span
                aria-hidden="true"
                className={cn(
                  "mb-1 flex size-12 items-center justify-center rounded-xl font-mono text-xl font-bold",
                  selectedModule.color,
                )}
              >
                {selectedModule.mark}
              </span>
              <DialogHeader>
                <DialogTitle className="pr-4 text-xl leading-7">{selectedModule.title}</DialogTitle>
                <DialogDescription className="leading-6">
                  {selectedModule.description}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{selectedModule.level}</Badge>
                <Badge variant="outline">{selectedModule.duration}</Badge>
                <Badge variant="outline">Практических задач: {selectedModule.tasks}</Badge>
              </div>
              <Separator />
              <div>
                <h3 className="mb-4 text-sm font-semibold">Что разберём</h3>
                <ol className="space-y-3">
                  {selectedModule.topics.map((topic, index) => (
                    <li key={topic} className="flex items-center gap-3 text-sm">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-[11px] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {topic}
                    </li>
                  ))}
                </ol>
              </div>
              <p className="rounded-lg bg-muted/60 p-3 text-xs leading-5 text-muted-foreground">
                Сейчас доступна программа модуля. Учебные материалы и практические задачи появятся
                позже.
              </p>
              <Button
                onClick={() => toggleModule(selectedModule.id)}
                variant={savedModuleIds.includes(selectedModule.id) ? "secondary" : "default"}
                className="h-10 w-full"
              >
                {savedModuleIds.includes(selectedModule.id)
                  ? "Убрать из моего плана"
                  : "Добавить в мой план"}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
