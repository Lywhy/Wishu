import { ResultDifferences } from "@/components/experience/result-differences"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TaskCheckResult } from "@/lib/task-checker"

function Value({ label, value }: { label: string; value?: string }) {
  return (
    <div className="min-w-0">
      <h4 className="mb-2 text-xs font-medium text-muted-foreground">{label}</h4>
      <pre className="max-h-64 overflow-auto rounded-md bg-muted/50 p-3 font-mono text-xs leading-5 wrap-anywhere whitespace-pre-wrap">
        {value ?? "Нет результата"}
      </pre>
    </div>
  )
}

export function TaskTestResults({
  checking,
  checks,
  solved,
  testCount = 5,
  onCancel,
}: {
  checking: boolean
  checks: TaskCheckResult[] | null
  onCancel?: () => void
  testCount?: number
  solved: boolean
}) {
  const [failuresOnly, setFailuresOnly] = useState(false)
  const [tab, setTab] = useState<"tests" | "console">("tests")
  const cases = checks?.filter((result) => result.level) ?? []
  const logs =
    checks?.flatMap((result, index) =>
      (result.logs ?? []).map((line) => `[${index + 1}. ${result.name}] ${line}`),
    ) ?? []
  return (
    <section aria-label="Проверка решения" className="border-t">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b p-3">
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={tab === "tests" ? "secondary" : "ghost"}
            aria-pressed={tab === "tests"}
            onClick={() => setTab("tests")}
          >
            Тесты{" "}
            {cases.length
              ? `${cases.filter((result) => result.passed).length}/${cases.length}`
              : ""}
          </Button>
          <Button
            size="sm"
            variant={tab === "console" ? "secondary" : "ghost"}
            aria-pressed={tab === "console"}
            onClick={() => setTab("console")}
          >
            Консоль {logs.length ? `(${logs.length})` : ""}
          </Button>
        </div>
        <output className="text-xs text-muted-foreground">
          {checking
            ? "Проверяем решение…"
            : checks
              ? solved
                ? "Все тесты пройдены"
                : "Найдены ошибки"
              : "Ожидает проверки"}
        </output>
      </div>
      {!checking && checks && tab === "tests" && (
        <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
          <span className="text-xs text-muted-foreground">
            Ошибок: {checks.filter((result) => !result.passed).length}
          </span>
          <Button
            size="sm"
            variant={failuresOnly ? "secondary" : "ghost"}
            aria-pressed={failuresOnly}
            onClick={() => setFailuresOnly((value) => !value)}
          >
            Только ошибки
          </Button>
        </div>
      )}
      {checking && onCancel && (
        <div className="border-b px-3 py-2">
          <Button size="sm" variant="outline" onClick={onCancel}>
            Отменить проверку
          </Button>
        </div>
      )}
      <div className="max-h-[32rem] overflow-y-auto p-3">
        {checking ? (
          <p className="p-3 text-sm text-muted-foreground">
            {testCount === 1
              ? "Проверяем задание по материалу…"
              : "Выполняем 5 сценариев: 2 базовых, 2 средних и 1 сложный…"}
          </p>
        ) : tab === "console" ? (
          <pre className="min-h-24 font-mono text-xs leading-6 wrap-anywhere whitespace-pre-wrap">
            {logs.length
              ? logs.join("\n")
              : checks
                ? "Консоль пуста: в этой проверке сообщений нет."
                : "Вывод console.log, info, warn, error и debug появится здесь после проверки. Лимит - 80 записей на тест."}
          </pre>
        ) : checks ? (
          <div className="space-y-2">
            {failuresOnly && solved && (
              <p className="p-3 text-sm text-emerald-700 dark:text-emerald-400">
                Ошибок нет. Все тесты пройдены.
              </p>
            )}
            {checks
              .filter((result) => !failuresOnly || !result.passed)
              .map((result, index) => (
                <details key={index} className="group rounded-lg border" open={!result.passed}>
                  <summary className="flex cursor-pointer flex-wrap items-center gap-2 p-3 text-xs focus-visible:outline-2 focus-visible:outline-ring">
                    <span className="mr-auto font-medium">{result.name}</span>
                    {result.level && <Badge variant="secondary">{result.level}</Badge>}
                    <span
                      className={
                        result.passed
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-destructive"
                      }
                    >
                      {result.passed ? "Пройден" : "Ошибка"}
                    </span>
                    <span className="text-muted-foreground group-open:hidden">Раскрыть</span>
                  </summary>
                  <div className="space-y-3 border-t p-3">
                    {result.message && (
                      <p className="text-xs leading-6 wrap-anywhere whitespace-pre-wrap text-destructive">
                        {result.message}
                      </p>
                    )}
                    {result.input !== undefined && (
                      <>
                        <Value label="Входные данные / действия" value={result.input} />
                        {!result.passed && <ResultDifferences expected={result.expected} actual={result.actual} />}
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Value label="Ожидаемый результат" value={result.expected} />
                          <Value label="Ваш результат" value={result.actual} />
                        </div>
                      </>
                    )}
                    {!!result.logs?.length && (
                      <Value label="Консоль этого теста" value={result.logs.join("\n")} />
                    )}
                  </div>
                </details>
              ))}
          </div>
        ) : (
          <p className="p-3 text-xs leading-6 text-muted-foreground">
            Нажмите «Проверить». Здесь появятся входные данные, ожидаемые и фактические результаты.
            Параметры случайных сценариев генерируются заново при каждом запуске.
          </p>
        )}
      </div>
    </section>
  )
}
