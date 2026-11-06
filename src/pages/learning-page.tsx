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
      const next =
        steps.find((step) => step.id === lastSteps[section.id]) ??
        steps.find((step) => !stepCompleted(section.id, step, completed))
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
        <Card className="mb-5 gap-3 rounded-xl bg-primary/5 p-5 shadow-none ring-primary/15 sm:flex-row sm:items-center sm:justify-between">
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
      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-xl border bg-card p-4">
        <SearchField
          className="flex-1 basis-60"
          label="Поиск модулей обучения"
          placeholder="Найти модуль…"
          value={query}
          onValueChange={setQuery}
        />
        <Button
          variant={savedOnly ? "secondary" : "outline"}
          aria-pressed={savedOnly}
          onClick={() => setSavedOnly((value) => !value)}
        >
          Мой план
        </Button>
      </div>
      <output className="sr-only" aria-live="polite" aria-atomic="true">
        Найдено модулей: {visible.length}
      </output>
      <nav aria-label="Группы обучения" className="mb-6 flex flex-wrap gap-2">
        {groups
          .filter((group) => visible.some((section) => section.group === group.id))
          .map((group) => (
            <a
              key={group.id}
              href={"#" + group.id}
              className="rounded-lg border bg-card px-3 py-2 text-xs outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            >
              {group.title}
            </a>
          ))}
      </nav>
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
                {sections.map((section) => {
                  const steps = courseSteps(section, questions),
                    disabled = section.inDevelopment || !steps.length
                  const done = steps.filter((step) =>
                    stepCompleted(section.id, step, completed),
                  ).length
                  const next =
                    steps.find((step) => step.id === lastSteps[section.id]) ??
                    steps.find((step) => !stepCompleted(section.id, step, completed)) ??
                    steps[0]
                  return (
                    <Card
                      key={section.id}
                      className={`gap-4 rounded-xl p-5 shadow-none ${disabled ? "bg-muted/30" : "transition-[background-color,box-shadow] duration-200 hover:bg-muted/40 hover:ring-primary/25"}`}
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
                          <div className="flex items-center justify-between gap-2">
                            <Button
                              nativeButton={false}
                              size="sm"
                              render={<Link to={`/learn/${section.id}/${next.id}`} />}
                            >
                              {done === steps.length
                                ? "Повторить"
                                : done
                                  ? "Продолжить"
                                  : "Начать обучение"}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              aria-pressed={saved.includes(section.id)}
                              onClick={() => toggle(section.id)}
                            >
                              {saved.includes(section.id) ? "В плане" : "В план"}
                            </Button>
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
        <div className="space-y-4 py-12 text-center text-sm text-muted-foreground">
          <p>Модули не найдены. Измените поиск или отключите «Мой план».</p>
          <Button
            variant="outline"
            onClick={() => {
              setParams({}, { replace: true })
            }}
          >
            Сбросить фильтры
          </Button>
        </div>
      )}
    </>
  )
}
