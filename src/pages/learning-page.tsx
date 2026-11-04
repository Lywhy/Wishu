import { useState } from "react"
import { Link } from "react-router-dom"
import {
  AnimatedCard as Card,
  CatalogHeader,
  CategoryMark,
  CompletedBadge,
} from "@/components/catalog/catalog-primitives"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { useLearningPlan } from "@/stores/learning-plan"
import { useLearningProgress } from "@/stores/learning-progress"
import { courseSteps, stepCompleted } from "@/data/learning-course"
export function LearningPage() {
  const { questionSections, groups, questions } = useQuestionCatalog()
  const [query, setQuery] = useState("")
  const [savedOnly, setSavedOnly] = useState(false)
  const saved = useLearningPlan((state) => state.savedModuleIds)
  const toggle = useLearningPlan((state) => state.toggleModule)
  const completed = useLearningProgress((state) => state.completed)
  const visible = questionSections.filter(
    (section) =>
      (!savedOnly || saved.includes(section.id)) &&
      `${section.title} ${section.description}`
        .toLocaleLowerCase("ru")
        .includes(query.trim().toLocaleLowerCase("ru")),
  )
  const resume = questionSections.flatMap((section) => {
    if (section.inDevelopment) return []
    const steps = courseSteps(section, questions)
    const next = steps.find((step) => !stepCompleted(section.id, step, completed))
    return next && steps.some((step) => stepCompleted(section.id, step, completed))
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
        <Input
          className="h-10 flex-1 basis-60"
          aria-label="Поиск модулей обучения"
          placeholder="Найти модуль…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button
          variant={savedOnly ? "secondary" : "outline"}
          aria-pressed={savedOnly}
          onClick={() => setSavedOnly((value) => !value)}
        >
          Мой план
        </Button>
      </div>
      <div className="space-y-9">
        {groups.map((group) => {
          const sections = visible.filter((section) => section.group === group.id)
          if (!sections.length) return null
          return (
            <section key={group.id} aria-labelledby={group.id}>
              <h2 id={group.id} className="text-xl font-semibold">
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
                    steps.find((step) => !stepCompleted(section.id, step, completed)) ?? steps[0]
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
                              {done ? "Продолжить" : "Начать обучение"}
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
              setQuery("")
              setSavedOnly(false)
            }}
          >
            Сбросить фильтры
          </Button>
        </div>
      )}
    </>
  )
}
