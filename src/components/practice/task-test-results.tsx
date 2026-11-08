import { useRef, useState } from "react"
import { useTaskExperience } from "@/stores/task-experience"
import { ResultValue } from "@/components/experience/result-value"
import { ResultDifferences } from "@/components/experience/result-differences"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Toggle } from "@/components/ui/toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Skeleton } from "@/components/ui/skeleton"
import type { TaskCheckResult } from "@/lib/task-checker"

export function TaskTestResults({
  checking,
  checks,
  solved,
  testCount = 5,
  onCancel,
  expanded = false,
  onToggleExpand,
  storageKey,
}: {
  checking: boolean
  checks: TaskCheckResult[] | null
  solved: boolean
  testCount?: number
  onCancel?: () => void
  expanded?: boolean
  onToggleExpand?: () => void
  storageKey?: string
}) {
  const resultsRef = useRef<HTMLElement>(null)
  const [localTab, setLocalTab] = useState<"tests" | "console">("tests")
  const savedTab = useTaskExperience((state) =>
    storageKey ? state.resultTabs[storageKey] : undefined,
  )
  const [failuresOnly, setFailuresOnly] = useState(false)
  const cases = checks?.filter((result) => result.level) ?? []
  const logs =
    checks?.flatMap((result, index) =>
      (result.logs ?? []).map((line) => `[${index + 1}. ${result.name}] ${line}`),
    ) ?? []
  const failures = checks?.filter((result) => !result.passed).length ?? 0
  return (
    <section
      ref={resultsRef}
      aria-label="Проверка решения"
      className={expanded ? "min-h-[60dvh] border-t" : "border-t"}
    >
      <Tabs
        value={savedTab ?? localTab}
        onValueChange={(value) => {
          if (value !== "tests" && value !== "console") return
          if (storageKey) useTaskExperience.getState().setResultTab(storageKey, value)
          else setLocalTab(value)
        }}
        className="gap-0"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/20 px-4 py-3">
          <TabsList aria-label="Результаты проверки">
            <TabsTrigger value="tests">
              Тесты
              {cases.length
                ? ` ${cases.filter((result) => result.passed).length}/${cases.length}`
                : ""}
            </TabsTrigger>
            <TabsTrigger value="console">
              Консоль{logs.length ? ` (${logs.length})` : ""}
            </TabsTrigger>
          </TabsList>
          <div className="flex flex-wrap items-center gap-2">
            {onToggleExpand && (
              <Toggle
                size="sm"
                className="h-10"
                pressed={expanded}
                onPressedChange={onToggleExpand}
              >
                {expanded ? "Свернуть результаты" : "Развернуть результаты"}
              </Toggle>
            )}
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
        </div>
        {checking && (
          <div className="min-h-40 space-y-3 p-4">
            <p className="text-xs text-muted-foreground">
              {testCount === 1
                ? "Проверяем задание по материалу…"
                : "Выполняем 2 базовых, 2 средних и 1 сложный сценарий…"}
            </p>
            <Skeleton className="h-2 w-2/3" />
            {onCancel && (
              <Button size="sm" variant="outline" onClick={onCancel}>
                Отменить проверку
              </Button>
            )}
          </div>
        )}
        <TabsContent value="tests" className="m-0">
          {!checking && checks && (
            <>
              <div className="flex items-center justify-between gap-2 border-b px-4 py-2">
                <span className="text-xs text-muted-foreground">Ошибок: {failures}</span>
                <div className="flex flex-wrap justify-end gap-2">
                  {failures > 0 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const trigger = resultsRef.current?.querySelector<HTMLButtonElement>(
                          '[data-failed="true"] [data-slot="accordion-trigger"]',
                        )
                        if (!trigger) return
                        if (trigger.getAttribute("aria-expanded") !== "true") trigger.click()
                        trigger.focus({ preventScroll: true })
                        trigger.scrollIntoView({ block: "nearest", behavior: "auto" })
                      }}
                    >
                      К первой ошибке
                    </Button>
                  )}
                  <Toggle size="sm" pressed={failuresOnly} onPressedChange={setFailuresOnly}>
                    Только ошибки
                  </Toggle>
                </div>
              </div>
              <div
                className={
                  expanded
                    ? "max-h-[65dvh] overflow-y-auto overscroll-contain p-4"
                    : "max-h-[32rem] overflow-y-auto overscroll-contain p-4"
                }
              >
                {failuresOnly && !failures && (
                  <p className="text-sm text-emerald-700 dark:text-emerald-400">
                    Ошибок нет. Все тесты пройдены.
                  </p>
                )}
                <Accordion
                  multiple
                  defaultValue={checks.flatMap((result, index) =>
                    result.passed ? [] : [String(index)],
                  )}
                  className="gap-2"
                >
                  {checks
                    .map((result, index) => ({ result, id: String(index) }))
                    .filter(({ result }) => !failuresOnly || !result.passed)
                    .map(({ result, id }) => (
                      <AccordionItem
                        key={id}
                        value={id}
                        data-failed={!result.passed}
                        className="rounded-lg border border-border/60 px-3 not-last:border-b"
                      >
                        <AccordionTrigger className="items-center gap-2 py-3 hover:no-underline">
                          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-xs">
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
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3 border-t pt-3 pb-3">
                          {result.message && (
                            <p className="text-xs leading-6 wrap-anywhere whitespace-pre-wrap text-destructive">
                              {result.message}
                            </p>
                          )}
                          {result.input !== undefined && (
                            <>
                              <ResultValue label="Входные данные / действия" value={result.input} />
                              {!result.passed && (
                                <ResultDifferences
                                  expected={result.expected}
                                  actual={result.actual}
                                />
                              )}
                              <div className="grid gap-3 sm:grid-cols-2">
                                <ResultValue
                                  label="Ожидаемый результат"
                                  value={result.expected}
                                  compareWith={result.actual}
                                  highlight={!result.passed}
                                />
                                <ResultValue
                                  label="Ваш результат"
                                  value={result.actual}
                                  compareWith={result.expected}
                                  highlight={!result.passed}
                                />
                              </div>
                            </>
                          )}
                          {!!result.logs?.length && (
                            <ResultValue
                              label="Консоль этого теста"
                              value={result.logs.join("\n")}
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            </>
          )}
          {!checking && !checks && (
            <p className="flex min-h-40 items-center px-5 py-6 text-sm leading-7 text-muted-foreground">
              Нажмите «Проверить». Здесь появятся входные данные, ожидаемые и фактические
              результаты. Случайные параметры обновляются при каждой проверке.
            </p>
          )}
        </TabsContent>
        <TabsContent
          value="console"
          className={
            expanded
              ? "m-0 max-h-[65dvh] overflow-y-auto overscroll-contain p-4"
              : "m-0 max-h-[32rem] overflow-y-auto overscroll-contain p-4"
          }
        >
          <pre className="min-h-28 font-mono text-xs leading-6 wrap-anywhere whitespace-pre-wrap">
            {logs.length
              ? logs.join("\n")
              : checking
                ? "Ожидаем вывод проверки…"
                : checks
                  ? "Консоль пуста: сообщений в этой проверке нет."
                  : "Вывод console.log, info, warn, error и debug появится после проверки. Лимит - 80 записей на тест."}
          </pre>
        </TabsContent>
      </Tabs>
    </section>
  )
}
