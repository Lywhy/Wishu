import { useState } from "react"
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { useLearningPlan } from "@/stores/learning-plan"
import { useLearningProgress } from "@/stores/learning-progress"
import { courseSteps, stepCompleted } from "@/data/learning-course"
import { cn } from "@/lib/utils"
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
  return (
    <>
      <QuestionBreadcrumbs items={[{ label: "Обучение" }]} />
      <header className="mb-7">
        <p className="mb-2 text-xs font-medium text-primary">Теория, которая становится навыком</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Обучение по шагам</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Выберите направление. Изучайте короткие лекции, закрепляйте материал задачами и сохраняйте
          свой прогресс.
        </p>
      </header>
      <div className="mb-8 flex flex-wrap items-center gap-3">
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
                    <Card key={section.id} className="gap-4 rounded-xl p-5 shadow-none">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={cn(
                            "flex size-12 shrink-0 items-center justify-center rounded-xl border border-current/25 font-mono text-lg font-semibold",
                            section.color,
                          )}
                        >
                          {section.mark}
                        </span>
                        {disabled ? (
                          <Badge variant="secondary">В разработке</Badge>
                        ) : done === steps.length ? (
                          <Badge variant="secondary">Пройдено</Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            {done} / {steps.length} этапов
                          </span>
                        )}
                      </div>
                      {disabled ? (
                        <h3 className="text-lg font-semibold">{section.title}</h3>
                      ) : (
                        <Link
                          className="text-lg font-semibold outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                          to={`/learn/${section.id}/${next.id}`}
                        >
                          {section.title}
                        </Link>
                      )}
                      <p className="flex-1 text-xs leading-6 text-muted-foreground">
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
        <p className="py-12 text-center text-sm text-muted-foreground">
          Модули не найдены. Измените поиск или отключите «Мой план».
        </p>
      )}
    </>
  )
}
