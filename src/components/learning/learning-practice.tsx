import { lazy, Suspense, useEffect, useRef, useState } from "react"
import type { PracticeTask } from "@/data/interview-content"
import type { TaskCheckResult } from "@/lib/task-checker"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TaskEditorBoundary } from "@/components/practice/task-editor-boundary"
import { TaskTestResults } from "@/components/practice/task-test-results"
import { CodeBlock } from "@/components/practice/practice-elements"
import { codeLanguageFor } from "@/lib/syntax-highlighter"
import { useLearningProgress } from "@/stores/learning-progress"
const Editor = lazy(() => import("@/components/practice/task-code-editor"))
export function LearningPractice({
  task,
  progressKey,
  index,
}: {
  task: PracticeTask
  progressKey: string
  index: number
}) {
  const draft = useLearningProgress((state) => state.drafts[progressKey])
  const done = useLearningProgress((state) => state.completed.includes(progressKey))
  const save = useLearningProgress((state) => state.saveDraft)
  const mark = useLearningProgress((state) => state.setCompleted)
  const [checking, setChecking] = useState(false)
  const [checks, setChecks] = useState<TaskCheckResult[] | null>(null)
  const controller = useRef<AbortController | null>(null)
  useEffect(() => () => controller.current?.abort(), [])
  const code = draft ?? task.starter
  const edit = (value: string) => {
    if (value === code) return
    controller.current?.abort()
    setChecking(false)
    setChecks(null)
    save(progressKey, value)
    mark(progressKey, false)
  }
  async function verify() {
    controller.current?.abort()
    const current = new AbortController()
    controller.current = current
    setChecking(true)
    setChecks(null)
    try {
      const { checkTask } = await import("@/lib/task-checker")
      if (current.signal.aborted) return
      const results = await checkTask(task.id, code, current.signal, { lesson: true })
      if (current.signal.aborted) return
      setChecks(results)
      mark(progressKey, results.length === 1 && results.every((result) => result.passed))
    } catch (error) {
      if (!current.signal.aborted) {
        mark(progressKey, false)
        setChecks([
          {
            name: "Проверка задания",
            passed: false,
            message: error instanceof Error ? error.message : "Не удалось проверить решение",
          },
        ])
      }
    } finally {
      if (!current.signal.aborted) setChecking(false)
    }
  }
  return (
    <Card className="min-w-0 gap-0 overflow-hidden rounded-xl py-0 shadow-none">
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold">
            {index + 1}. {task.title}
          </h3>
          {done && <Badge variant="secondary">Пройдено</Badge>}
        </div>
        <p className="text-sm leading-7">{task.description}</p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
          {task.requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <CodeBlock
          code={task.example}
          language={codeLanguageFor(task.topic, task.example)}
          label="Пример"
        />
      </div>
      <div className="flex items-center justify-between gap-3 border-y px-4 py-3">
        <h4 className="text-sm font-semibold">Ваше решение</h4>
        {done ? (
          <output className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            Задание принято
          </output>
        ) : (
          <Button size="sm" disabled={checking} onClick={() => void verify()}>
            {checking ? "Проверяем…" : "Проверить"}
          </Button>
        )}
      </div>
      <TaskEditorBoundary value={code} onChange={edit}>
        <Suspense
          fallback={<div className="p-8 text-sm text-muted-foreground">Загружаем редактор…</div>}
        >
          <Editor
            taskId={"learning-" + progressKey}
            topic={task.topic}
            value={code}
            onChange={edit}
          />
        </Suspense>
      </TaskEditorBoundary>
      <TaskTestResults checking={checking} checks={checks} solved={done} testCount={1} />
    </Card>
  )
}
