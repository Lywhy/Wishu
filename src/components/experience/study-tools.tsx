import { Toggle } from "@/components/ui/toggle"
import { Disclosure } from "@/components/experience/disclosure"
import { useEffect, useId, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useWorkspace } from "@/stores/workspace"
import { CodeBlock } from "@/components/practice/practice-elements"
import type { PracticeTask } from "@/data/interview-content"
import { codeLanguageFor } from "@/lib/syntax-highlighter"
export function WorkspaceControls({
  split = false,
  children,
}: {
  split?: boolean
  children?: ReactNode
}) {
  const focus = useWorkspace((state) => state.focus)
  const setFocus = useWorkspace((state) => state.setFocus)
  useEffect(() => {
    if (!focus) return
    const exit = (event: KeyboardEvent) => {
      if (
        event.key !== "Escape" ||
        event.defaultPrevented ||
        document.querySelector('[role="dialog"]')
      )
        return
      setFocus(false)
    }
    window.addEventListener("keydown", exit)
    return () => window.removeEventListener("keydown", exit)
  }, [focus, setFocus])
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-muted/30 px-4 py-3">
      {children}
      <Toggle
        className="h-10"
        variant="outline"
        pressed={focus}
        onPressedChange={setFocus}
        title={focus ? "Выйти из режима фокуса (Esc)" : "Скрыть дополнительные блоки"}
      >
        {focus ? "Обычный режим" : "Сосредоточиться"}
      </Toggle>
      {split && !focus && (
        <p className="hidden text-xs text-muted-foreground xl:block">
          Перетащите границу между условием и решением.
        </p>
      )}
    </div>
  )
}
export function PersonalNote({ contentKey }: { contentKey: string }) {
  const noteId = useId()
  const text = useWorkspace((s) => s.notes[contentKey] ?? ""),
    save = useWorkspace((s) => s.note)
  return (
    <Disclosure
      className="rounded-xl bg-muted/25"
      title={<> Моя заметка{text ? " · есть запись" : ""} </>}
    >
      <label htmlFor={noteId} className="mt-4 block text-xs text-muted-foreground">
        Только в этом браузере
        <Textarea
          id={noteId}
          value={text}
          maxLength={10000}
          onChange={(e) => save(contentKey, e.target.value)}
          className="mt-2 min-h-28"
          placeholder="Свой пример, ссылка или вопрос к материалу…"
        />
      </label>
      <p className="mt-2 text-xs text-muted-foreground">
        {typeof window !== "undefined" &&
          (() => {
            try {
              if (!text)
                return "Введите заметку - она сохранится автоматически, если хранилище доступно"
              return JSON.parse(localStorage.getItem("wishu-workspace") ?? "{}").state?.notes?.[
                contentKey
              ] === text
                ? "Заметка сохранена"
                : "При недоступном хранилище запись останется только до закрытия страницы"
            } catch {
              return "Хранилище недоступно. Скопируйте заметку перед закрытием"
            }
          })()}
      </p>
    </Disclosure>
  )
}
export function DraftStatus({
  storageKey,
  draftKey,
  code,
  hasDraft,
}: {
  storageKey: string
  draftKey: string
  code: string
  hasDraft: boolean
}) {
  let text = "Начальная заготовка"
  if (hasDraft) {
    try {
      text =
        JSON.parse(localStorage.getItem(storageKey) ?? "{}").state?.drafts?.[draftKey] === code
          ? "Черновик сохранён в этом браузере"
          : "Черновик не сохранён. Скопируйте код перед закрытием"
    } catch {
      text = "Хранилище недоступно. Скопируйте код перед закрытием"
    }
  }
  return hasDraft ? (
    <output className="block px-4 py-2 text-xs text-muted-foreground">{text}</output>
  ) : null
}
const emptyAttempts: import("@/stores/workspace").Attempt[] = []
export function AttemptHistory({
  contentKey,
  code,
  onRestore,
}: {
  contentKey: string
  code: string
  onRestore: (code: string) => void
}) {
  const list = useWorkspace((s) => s.attempts[contentKey] ?? emptyAttempts)
  const [selected, setSelected] = useState<string | null>(null)
  const attempt = list.find((item) => item.id === selected)
  return (
    <>
      <Disclosure
        className="rounded-xl border bg-card"
        title={<> История попыток ({list.length}) </>}
      >
        <p className="mt-2 text-xs text-muted-foreground">
          Последние 15 проверок, только в этом браузере.
        </p>
        <div className="mt-3 space-y-2">
          {list.map((item) => (
            <Button
              key={item.id}
              variant="outline"
              size="sm"
              className="h-auto w-full justify-start py-2 whitespace-normal"
              onClick={() => setSelected(item.id)}
            >
              {new Date(item.at).toLocaleString("ru-RU")} ·{" "}
              {item.passed === null ? "Снимок кода" : item.passed ? "Принято" : "Есть ошибки"}
            </Button>
          ))}
          {!list.length && (
            <p className="text-xs text-muted-foreground">Попытки появятся после проверки.</p>
          )}
        </div>
      </Disclosure>
      <Dialog
        open={!!attempt}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Сравнение попыток</DialogTitle>
            <DialogDescription>
              {attempt?.summary}. При восстановлении текущий код останется в истории.
            </DialogDescription>
          </DialogHeader>
          <div className="grid min-w-0 gap-3 md:grid-cols-2">
            <CodeBlock code={code} label="Текущий код" />
            <CodeBlock code={attempt?.code ?? ""} label="Выбранная попытка" />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                if (attempt) {
                  useWorkspace.getState().attempt(contentKey, {
                    code,
                    passed: null,
                    summary: "Снимок перед восстановлением",
                  })
                  onRestore(attempt.code)
                  setSelected(null)
                }
              }}
            >
              Восстановить эту попытку
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
export function TaskHints({ task }: { task: PracticeTask }) {
  const [level, setLevel] = useState(0),
    [confirm, setConfirm] = useState(false),
    [solution, setSolution] = useState(false)
  return (
    <div className="space-y-4">
      <p className="text-sm leading-7 text-muted-foreground">
        Можно открыть направление мысли, затем подход. Полное решение доступно отдельно.
      </p>
      {level >= 1 && (
        <div className="rounded-lg border bg-muted/20 p-4">
          <h3 className="mb-2 text-sm font-semibold">1. На что обратить внимание</h3>
          <p className="text-sm leading-7">{task.requirements[0]}</p>
        </div>
      )}
      {level >= 2 && (
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 text-sm font-semibold">2. Подход</h3>
          <p className="text-sm leading-7">{task.explanation}</p>
        </div>
      )}
      {level < 2 && (
        <Button variant="outline" onClick={() => setLevel((value) => value + 1)}>
          {level ? "Следующая подсказка" : "Открыть первую подсказку"}
        </Button>
      )}
      <Button variant="ghost" onClick={() => setConfirm(true)}>
        Показать полное решение
      </Button>
      {solution && (
        <CodeBlock
          code={task.solution}
          language={codeLanguageFor(task.topic, task.solution)}
          label="Один из вариантов решения"
        />
      )}
      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Открыть готовое решение?</DialogTitle>
            <DialogDescription>
              Попробуйте подсказки, если хотите ещё поработать самостоятельно. Просмотр разбора не
              отмечает задачу решённой.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setLevel(Math.max(1, level))
                setConfirm(false)
              }}
            >
              Вернуться к подсказкам
            </Button>
            <Button
              onClick={() => {
                setSolution(true)
                setConfirm(false)
              }}
            >
              Открыть решение
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
const topicByModule: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  react: "React",
  browser: "Браузер",
  "html-css": "HTML",
  vue: "Vue",
  nextjs: "Next.js",
  nodejs: "Node.js",
  nestjs: "NestJS",
  java: "Java",
  seo: "SEO",
  "frontend-tools": "Frontend инструменты",
  git: "Git",
  docker: "Docker",
  sql: "SQL",
  postgresql: "PostgreSQL",
  redis: "Redis",
}
export function RelatedStudy({ moduleId, from }: { moduleId: string; from: string }) {
  const topic = topicByModule[moduleId] ?? moduleId
  const practiceTopic = moduleId === "browser" ? "Web" : topic
  return (
    <div className="flex flex-wrap gap-3 rounded-xl border bg-muted/20 p-4 text-xs">
      <Link
        className="text-primary underline underline-offset-4"
        to={`/learn/${moduleId}`}
        state={{ returnTo: from }}
      >
        Теория по теме
      </Link>
      <Link
        className="text-primary underline underline-offset-4"
        to={`/questions?q=${encodeURIComponent(topic)}`}
        state={{ returnTo: from }}
      >
        Вопросы по теме
      </Link>
      <Link
        className="text-primary underline underline-offset-4"
        to={`/tasks?topic=${encodeURIComponent(practiceTopic)}`}
        state={{ returnTo: from }}
      >
        Практика по теме
      </Link>
    </div>
  )
}
