import { EmptyResults } from "@/components/catalog/catalog-controls"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Link, useSearchParams } from "react-router-dom"
import {
  AnimatedCard as Card,
  CatalogHeader,
  CategoryMark,
  CompletedBadge,
} from "@/components/catalog/catalog-primitives"
import { Button } from "@/components/ui/button"
import { SearchField } from "@/components/experience/search-field"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { useLearningPlan } from "@/stores/learning-plan"
import { useLearningProgress } from "@/stores/learning-progress"
import { courseSteps, stepCompleted } from "@/data/learning-course"
export function LearningPage() {
  const { questionSections, groups, questions } = useQuestionCatalog()
  const [params, setParams] = useSearchParams()
  const query = params.get("q") ?? ""
  const savedOnly = params.get("saved") === "1"
  const selectedGroup = groups.find((group) => group.id === params.get("group"))?.id ?? "all"
  const setGroup = (value: string) =>
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        if (value === "all") next.delete("group")
        else next.set("group", value)
        return next
      },
      { replace: true },
    )
  const setQuery = (value: string) =>
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        if (value) next.set("q", value)
        else next.delete("q")
        return next
      },
      { replace: true },
    )
  const setSavedOnly = (value: boolean | ((previous: boolean) => boolean)) =>
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        const enabled = typeof value === "function" ? value(current.get("saved") === "1") : value
        if (enabled) next.set("saved", "1")
        else next.delete("saved")
        return next
      },
      { replace: true },
    )
  const saved = useLearningPlan((state) => state.savedModuleIds)
  const toggle = useLearningPlan((state) => state.toggleModule)
  const lastSteps = useLearningProgress((state) => state.lastStepBySection)
  const lastSection = useLearningProgress((state) => state.lastSectionId)
  const completed = useLearningProgress((state) => state.completed)
  const visible = questionSections.filter(
    (section) =>
      (selectedGroup === "all" || section.group === selectedGroup) &&
      (!savedOnly || saved.includes(section.id)) &&
      `${section.title} ${section.description}`
        .toLocaleLowerCase("ru")
        .includes(query.trim().toLocaleLowerCase("ru")),
  )
  const resume = [...questionSections]
    .sort((a, b) => Number(b.id === lastSection) - Number(a.id === lastSection))
    .flatMap((section) => {
      if (section.inDevelopment) return []
      const steps = courseSteps(section, questions)
      const remembered = steps.find((step) => step.id === lastSteps[section.id])
      const next =
        (remembered && !stepCompleted(section.id, remembered, completed)
          ? remembered
          : undefined) ?? steps.find((step) => !stepCompleted(section.id, step, completed))
      return next &&
        (lastSteps[section.id] || steps.some((step) => stepCompleted(section.id, step, completed)))
        ? [{ section, next }]
        : []
    })[0]
  return (
    <>
      <QuestionBreadcrumbs items={[{ label: "Обучение" }]} />
      <CatalogHeader
        title="Обучение по шагам"
        description="Выберите направление. Изучайте короткие лекции, закрепляйте материал задачами и сохраняйте свой прогресс."
        eyebrow="Теория и закрепление"
      />
      {resume && (
        <Card className="mb-5 gap-3 rounded-xl border-primary/20 bg-primary/5 p-5 shadow-none sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-primary">Продолжить обучение</p>
            <p className="mt-1 text-sm font-semibold">
              {resume.section.title} · {resume.next.title}
            </p>
          </div>
          <Button
            nativeButton={false}
            className="h-10"
            render={<Link to={`/learn/${resume.section.id}/${resume.next.id}`} />}
          >
            Продолжить
          </Button>
        </Card>
      )}
      <div className="mb-8 space-y-4 rounded-xl bg-card p-4 ring-1 ring-border/60">
        <div className="flex flex-wrap items-center gap-3">
          <SearchField
            className="flex-1 basis-60"
            label="Поиск модулей обучения"
            placeholder="Найти модуль…"
            value={query}
            onValueChange={setQuery}
          />
          <Toggle
            variant="outline"
            pressed={savedOnly}
            onPressedChange={setSavedOnly}
            className="h-10"
          >
            Мой план
          </Toggle>
        </div>
        <ToggleGroup
          aria-label="Группы обучения"
          value={[selectedGroup]}
          onValueChange={(values) => setGroup(values[0] ?? "all")}
          className="w-full flex-wrap justify-start"
          size="sm"
        >
          {[{ id: "all", title: "Все группы" }, ...groups].map((group) => (
            <ToggleGroupItem
              key={group.id}
              value={group.id}
              className="aria-pressed:bg-primary/10 aria-pressed:text-primary"
            >
              {group.title}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <output className="sr-only" aria-live="polite" aria-atomic="true">
        Найдено модулей: {visible.length}
      </output>
      <div className="space-y-9">
        {groups.map((group) => {
          const sections = visible.filter((section) => section.group === group.id)
          if (!sections.length) return null
          return (
            <section key={group.id} aria-labelledby={group.id}>
              <h2 id={group.id} className="scroll-mt-6 text-xl font-semibold">
                {group.title}
              </h2>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">{group.description}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {sections.map((section, index) => {
                  const steps = courseSteps(section, questions),
                    disabled = section.inDevelopment || !steps.length
                  const done = steps.filter((step) =>
                    stepCompleted(section.id, step, completed),
                  ).length
                  const remembered = steps.find((step) => step.id === lastSteps[section.id])
                  const next =
                    (remembered && !stepCompleted(section.id, remembered, completed)
                      ? remembered
                      : undefined) ??
                    steps.find((step) => !stepCompleted(section.id, step, completed)) ??
                    steps[0]
                  return (
                    <Card
                      key={section.id}
                      introDelay={Math.min(index, 5) * 0.05}
                      className={`gap-4 rounded-xl p-5 shadow-none ${disabled ? "bg-muted/30" : "transition-[background-color,border-color,box-shadow] duration-200 hover:border-primary/25 hover:bg-muted/30 motion-reduce:transition-none"}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <CategoryMark mark={section.mark} color={section.color} />
                        {disabled ? (
                          <Badge variant="secondary">В разработке</Badge>
                        ) : done === steps.length ? (
                          <CompletedBadge>Пройдено</CompletedBadge>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            {done} / {steps.length} этапов
                          </span>
                        )}
                      </div>
                      {disabled ? (
                        <h3 className="text-base font-semibold">{section.title}</h3>
                      ) : (
                        <Link
                          className="text-base font-semibold outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                          to={`/learn/${section.id}/${next.id}`}
                        >
                          {section.title}
                        </Link>
                      )}
                      <p className="line-clamp-2 flex-1 text-xs leading-6 text-muted-foreground">
                        {section.description}
                      </p>
                      {!disabled && (
                        <>
                          <Progress
                            value={(100 * done) / steps.length}
                            aria-label={`Прогресс ${section.title}`}
                          />
                          <p className="min-h-10 text-xs leading-5 text-muted-foreground">
                            {done === steps.length ? (
                              "Все этапы завершены. Можно повторить материал."
                            ) : (
                              <>
                                Дальше:{" "}
                                <span className="font-medium text-foreground">{next.title}</span>
                              </>
                            )}
                          </p>
                          <div className="flex items-center justify-between gap-2">
                            <Button
                              nativeButton={false}
                              className="h-10"
                              size="sm"
                              render={<Link to={`/learn/${section.id}/${next.id}`} />}
                            >
                              {done === steps.length
                                ? "Повторить"
                                : done || lastSteps[section.id]
                                  ? "Продолжить"
                                  : "Начать обучение"}
                            </Button>
                            <Toggle
                              size="sm"
                              pressed={saved.includes(section.id)}
                              onPressedChange={() => toggle(section.id)}
                            >
                              {saved.includes(section.id) ? "В плане" : "В план"}
                            </Toggle>
                          </div>
                        </>
                      )}
                    </Card>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
      {!visible.length && (
        <EmptyResults
          title="Модули не найдены"
          description="Измените поиск, выберите другую группу или отключите «Мой план»."
          onReset={() => setParams({}, { replace: true })}
        />
      )}
    </>
  )
}
