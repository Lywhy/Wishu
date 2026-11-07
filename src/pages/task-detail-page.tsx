import { Toggle } from "@/components/ui/toggle"
import { LocalSaveNotice } from "@/components/experience/local-save-notice"
import { useWorkspace } from "@/stores/workspace"
import { TaskWorkspace } from "@/components/practice/task-workspace"
import {
  WorkspaceControls,
  PersonalNote,
  DraftStatus,
  AttemptHistory,
  TaskHints,
  RelatedStudy,
} from "@/components/experience/study-tools"
import { ContentFeedback } from "@/components/experience/content-feedback"
import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CodeBlock, DifficultyBadge } from "@/components/practice/practice-elements"
import { TaskEditorBoundary } from "@/components/practice/task-editor-boundary"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { practiceTasks, type PracticeTask } from "@/data/interview-content"
import { usePracticeProgress } from "@/stores/practice-progress"
import { useTaskExperience } from "@/stores/task-experience"
import { ComingSoonPage } from "@/components/app-layout"
import { codeLanguageFor } from "@/lib/syntax-highlighter"

import { TaskTestResults } from "@/components/practice/task-test-results"
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet"

import type { TaskCheckResult } from "@/lib/task-checker"

const TaskCodeEditor = lazy(() => import("@/components/practice/task-code-editor"))

function readTaskList(state: unknown) {
  if (!state || typeof state !== "object" || !("taskList" in state)) return
  const list = state.taskList
  if (
    !list ||
    typeof list !== "object" ||
    !("ids" in list) ||
    !Array.isArray(list.ids) ||
    !list.ids.every((id) => typeof id === "string") ||
    !("returnTo" in list) ||
    typeof list.returnTo !== "string" ||
    !/^\/tasks(?:\?|$)/.test(list.returnTo)
  )
    return
  return { ids: [...new Set(list.ids)], returnTo: list.returnTo }
}

export function TaskDetailPage() {
  const { taskId } = useParams()
  const task = practiceTasks.find((item) => item.id === taskId)
  return task ? (
    <TaskView key={task.id} task={task} />
  ) : (
    <ComingSoonPage title="Задача не найдена" description="Выберите другую задачу в каталоге." />
  )
}

function TaskView({ task }: { task: PracticeTask }) {
  const route = useLocation()
  const [expandedPane, setExpandedPane] = useState<"editor" | "results" | null>(null)
  useEffect(() => {
    if (!expandedPane) return
    const exit = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        !event.defaultPrevented &&
        !document.querySelector('[role="dialog"]')
      )
        setExpandedPane(null)
    }
    window.addEventListener("keydown", exit)
    return () => window.removeEventListener("keydown", exit)
  }, [expandedPane])
  const [solutionOpen, setSolutionOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [checking, setChecking] = useState(false)
  const [checks, setChecks] = useState<TaskCheckResult[] | null>(() => {
    const cached = useTaskExperience.getState().checkRuns[task.id]
    const currentCode = usePracticeProgress.getState().drafts[task.id] ?? task.starter
    return cached?.code === currentCode ? cached.results : null
  })
  const controller = useRef<AbortController | null>(null)
  useEffect(() => () => controller.current?.abort(), [])
  const draft = usePracticeProgress((state) => state.drafts[task.id])
  const saveDraft = usePracticeProgress((state) => state.saveDraft)
  const resetDraft = usePracticeProgress((state) => state.resetDraft)
  const solved = usePracticeProgress((state) => state.solvedTaskIds.includes(task.id))
  const setSolved = usePracticeProgress((state) => state.setTaskSolved)
  useEffect(() => {
    useTaskExperience.getState().rememberTask(task.id)
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [task.id])
  const list = readTaskList(route.state)
  const selected = list?.ids.flatMap((id) => {
    const item = practiceTasks.find((task) => task.id === id)
    return item ? [item] : []
  })
  const siblings = selected?.some((item) => item.id === task.id) ? selected : practiceTasks
  const index = siblings.findIndex((item) => item.id === task.id)
  const previous = siblings[index - 1]
  const next = siblings[index + 1]
  const code = draft ?? task.starter
  const updateCode = (value: string) => {
    if (value === code) return
    controller.current?.abort()
    useTaskExperience.getState().clearCheck(task.id)
    setChecking(false)
    setChecks(null)
    setSolved(task.id, false)
    if (value === task.starter) resetDraft(task.id)
    else saveDraft(task.id, value)
  }
  async function verify() {
    controller.current?.abort()
    useTaskExperience.getState().clearCheck(task.id)
    const current = new AbortController()
    controller.current = current
    setChecking(true)
    setChecks(null)
    try {
      const { checkTask } = await import("@/lib/task-checker")
      if (current.signal.aborted) return
      const results = await checkTask(task.id, code, current.signal)
      if (current.signal.aborted) return
      const cases = results.filter((result) => result.level)
      const passed = cases.length === 5 && results.every((result) => result.passed)
      useWorkspace.getState().attempt(task.id, {
        code,
        passed,
        summary:
          results.filter((result) => result.passed).length +
          "/" +
          results.length +
          " проверок пройдено",
      })
      useTaskExperience.getState().cacheCheck(task.id, code, results)
      setChecks(results)
      setSolved(task.id, passed)
    } catch (error) {
      if (!current.signal.aborted) {
        useWorkspace.getState().attempt(task.id, {
          code,
          passed: false,
          summary: error instanceof Error ? error.message : "Ошибка проверки",
        })
        setChecks([
          {
            name: "Проверка решения",
            passed: false,
            message: error instanceof Error ? error.message : "Не удалось проверить код.",
          },
        ])
        setSolved(task.id, false)
      }
    } finally {
      if (!current.signal.aborted) setChecking(false)
    }
  }
  return (
    <>
      <QuestionBreadcrumbs
        items={[{ label: "Задачи", to: list?.returnTo ?? "/tasks" }, { label: task.title }]}
      />
      <header className="mb-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{task.topic}</Badge>
          <DifficultyBadge level={task.difficulty} />
          {solved && (
            <Badge
              variant="outline"
              className="border-emerald-300 text-emerald-700 dark:text-emerald-300"
            >
              Решена
            </Badge>
          )}
          <span className="text-xs text-muted-foreground">Около {task.duration}</span>
          <span className="ml-auto text-xs text-muted-foreground">
            Задача {index + 1} из {siblings.length}
          </span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{task.title}</h1>
        <Button
          nativeButton={false}
          variant="outline"
          size="sm"
          className="mt-4 xl:hidden"
          render={<a href="#task-editor" aria-label="К редактору решения" />}
        >
          К редактору решения
        </Button>
      </header>
      <WorkspaceControls split={expandedPane === null} />
      <TaskWorkspace
        expanded={expandedPane !== null}
        condition={
          <div className="min-w-0 space-y-4">
            <Card className="gap-4 rounded-xl p-4 shadow-none sm:p-5">
              <div className="flex items-center justify-between gap-3 border-b pb-3">
                <h2 className="text-sm font-semibold">Условие задачи</h2>
                <Button variant="outline" size="sm" onClick={() => setSolutionOpen(true)}>
                  Подсказки и разбор
                </Button>
              </div>
              <section id="task-condition" className="space-y-5">
                <div>
                  <h2 className="text-base font-semibold">Условие</h2>
                  <p className="mt-2 text-sm leading-7">{task.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Требования и крайние случаи</h3>
                  <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
                    {task.requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <CodeBlock
                  code={task.example}
                  language={codeLanguageFor(task.topic, task.example)}
                  label="Входные данные и ожидаемый результат"
                />
              </section>
            </Card>
            <nav aria-label="Другие задачи" className="flex items-center justify-between gap-3">
              {previous ? (
                <Button
                  nativeButton={false}
                  variant="outline"
                  className="h-10 flex-1"
                  render={<Link to={`/tasks/${previous.id}`} state={{ taskList: list }} />}
                >
                  Предыдущая
                </Button>
              ) : (
                <Button variant="outline" className="h-10 flex-1" disabled>
                  Предыдущая
                </Button>
              )}
              {next ? (
                <Button
                  nativeButton={false}
                  variant="outline"
                  className="h-10 flex-1"
                  render={<Link to={`/tasks/${next.id}`} state={{ taskList: list }} />}
                >
                  Следующая
                </Button>
              ) : (
                <Button variant="outline" className="h-10 flex-1" disabled>
                  Следующая
                </Button>
              )}
            </nav>
          </div>
        }
      >
        <div id="task-editor" tabIndex={-1} className="min-w-0 scroll-mt-5 space-y-3 outline-none">
          <Card className="gap-0 overflow-hidden rounded-xl py-0 shadow-none">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
              <div className="flex items-center gap-3">
                <h2 className="text-sm font-semibold">Ваше решение</h2>
                <span className="font-mono text-xs text-muted-foreground">
                  {task.topic === "React"
                    ? "JSX"
                    : task.topic === "TypeScript"
                      ? "TypeScript"
                      : "JavaScript"}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <Toggle
                  className="h-10"
                  pressed={expandedPane === "editor"}
                  onPressedChange={(pressed) => setExpandedPane(pressed ? "editor" : null)}
                >
                  {expandedPane === "editor" ? "Свернуть редактор" : "Развернуть редактор"}
                </Toggle>
                {solved ? (
                  <output className="flex h-8 items-center text-sm font-medium text-emerald-700 dark:text-emerald-400">
                    Задача решена
                  </output>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="h-10"
                      disabled={code === task.starter || checking}
                      onClick={() => setResetOpen(true)}
                    >
                      Сбросить код
                    </Button>
                    <Button
                      className="h-10 min-w-28"
                      disabled={checking}
                      onClick={() => void verify()}
                    >
                      {checking ? "Проверяем…" : "Проверить"}
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div hidden={expandedPane === "results"}>
              <DraftStatus
                storageKey="wishu-practice"
                draftKey={task.id}
                code={code}
                hasDraft={draft !== undefined}
              />
              <TaskEditorBoundary value={code} onChange={updateCode}>
                <Suspense
                  fallback={
                    <div className="flex min-h-96 items-center justify-center text-sm text-muted-foreground">
                      Загружаем редактор…
                    </div>
                  }
                >
                  <TaskCodeEditor
                    taskId={task.id}
                    topic={task.topic}
                    value={code}
                    onChange={updateCode}
                    expanded={expandedPane === "editor"}
                  />
                </Suspense>
              </TaskEditorBoundary>
            </div>
            <TaskTestResults
              storageKey={task.id}
              expanded={expandedPane === "results"}
              onToggleExpand={() =>
                setExpandedPane((value) => (value === "results" ? null : "results"))
              }
              checking={checking}
              checks={checks}
              solved={solved}
              onCancel={() => {
                controller.current?.abort()
                useTaskExperience.getState().clearCheck(task.id)
                setChecking(false)
                setChecks(null)
              }}
            />
          </Card>
        </div>
      </TaskWorkspace>
      <Sheet open={solutionOpen} onOpenChange={setSolutionOpen}>
        <SheetContent className="w-[min(96vw,48rem)]">
          <SheetTitle>Подсказки и разбор: {task.title}</SheetTitle>
          <SheetDescription>От направления мысли к полному решению.</SheetDescription>
          <TaskHints task={task} />
        </SheetContent>
      </Sheet>
      <div className="mt-6 space-y-4">
        <LocalSaveNotice area="practice" />
        <LocalSaveNotice area="task-view" errorsOnly />
        <AttemptHistory contentKey={task.id} code={code} onRestore={updateCode} />
        <PersonalNote contentKey={"task:" + task.id} />
        <RelatedStudy moduleId={task.moduleId} from={"/tasks/" + task.id} />
        <ContentFeedback contentKey={"task:" + task.id} />
      </div>
      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Вернуть начальную заготовку?</DialogTitle>
            <DialogDescription>
              Текущий черновик этой задачи будет удалён. Скопируйте решение перед сбросом, если
              хотите его сохранить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetOpen(false)}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                updateCode(task.starter)
                setResetOpen(false)
              }}
            >
              Сбросить код
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
