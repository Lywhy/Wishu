import { PageState } from "@/components/catalog/page-state"
import { PersonalNote } from "@/components/experience/study-tools"
import { InterviewDebrief } from "@/components/interviews/interview-debrief"
import { InterviewPreparation } from "@/components/interviews/interview-preparation"
import { Toggle } from "@/components/ui/toggle"
import { Disclosure } from "@/components/experience/disclosure"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { AnimatedCard as Card, CatalogHeader } from "@/components/catalog/catalog-primitives"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { SearchField } from "@/components/experience/search-field"
import { InterviewEditor, MeetingEditor } from "@/components/interviews/interview-editors"
import { useInterviewTracker, useInterviewStorage } from "@/stores/interviews"
import {
  interviewStages,
  isInterviewStage,
  isClosedStage,
  stageDetails,
  nextInterviewMeeting,
  safeInterviewUrl,
  formatInterviewDate,
  type InterviewRecord,
  type InterviewMeeting,
} from "@/data/interviews"
function StageBadge({ record }: { record: InterviewRecord }) {
  const stage = stageDetails(record.stage)
  return (
    <Badge variant="outline" className={stage.color}>
      {stage.label}
    </Badge>
  )
}
export function InterviewsPage() {
  const records = useInterviewTracker((state) => state.records),
    storageError = useInterviewStorage((state) => state.error)
  const [deleting, setDeleting] = useState<InterviewRecord | null>(null)
  const [params, setParams] = useSearchParams(),
    [now, setNow] = useState(() => Date.now())
  const [editor, setEditor] = useState<{ record?: InterviewRecord } | null>(null),
    [meeting, setMeeting] = useState<{
      record: InterviewRecord
      meeting?: InterviewMeeting
    } | null>(null)
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000)
    return () => clearInterval(timer)
  }, [])
  const query = params.get("q") ?? "",
    stageParam = params.get("stage") ?? "all",
    stage = isInterviewStage(stageParam) ? stageParam : "all",
    scope =
      params.get("scope") === "archived"
        ? "archived"
        : params.get("scope") === "all"
          ? "all"
          : "current",
    upcoming = params.get("upcoming") === "1",
    sort = ["meeting", "updated", "company"].includes(params.get("sort") ?? "")
      ? params.get("sort")!
      : "meeting"
  const selected = records.find((item) => item.id === params.get("entry"))
  const update = (key: string, value: string) =>
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        if (
          !value ||
          (value === "all" && key === "stage") ||
          (value === "current" && key === "scope")
        )
          next.delete(key)
        else next.set(key, value)
        return next
      },
      { replace: true },
    )
  const select = (id: string | null) => update("entry", id ?? "")
  const reset = () =>
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        for (const key of ["q", "stage", "scope", "upcoming", "sort"]) next.delete(key)
        return next
      },
      { replace: true },
    )
  const week = now + 7 * 24 * 60 * 60 * 1000,
    live = records.filter((item) => !item.archived)
  const visible = records
    .filter((item) => {
      const next = nextInterviewMeeting(item, now)
      return (
        (scope === "all" || (scope === "archived" ? item.archived : !item.archived)) &&
        (stage === "all" || item.stage === stage) &&
        (!upcoming || (!!next && new Date(next.at).getTime() <= week)) &&
        `${item.company} ${item.role} ${item.contact} ${item.notes}`
          .toLocaleLowerCase("ru")
          .includes(query.trim().toLocaleLowerCase("ru"))
      )
    })
    .sort((a, b) =>
      sort === "company"
        ? a.company.localeCompare(b.company, "ru")
        : sort === "updated"
          ? b.updatedAt.localeCompare(a.updatedAt)
          : (nextInterviewMeeting(a, now)
              ? new Date(nextInterviewMeeting(a, now)!.at).getTime()
              : Infinity) -
              (nextInterviewMeeting(b, now)
                ? new Date(nextInterviewMeeting(b, now)!.at).getTime()
                : Infinity) || b.updatedAt.localeCompare(a.updatedAt),
    )
  const futureMeetings = live
    .flatMap((record) =>
      record.meetings
        .filter(
          (item) =>
            !item.done && new Date(item.at).getTime() >= now && new Date(item.at).getTime() <= week,
        )
        .map((value) => ({ record, meeting: value })),
    )
    .sort((a, b) => a.meeting.at.localeCompare(b.meeting.at))
  const active = !!query || stage !== "all" || scope !== "current" || upcoming
  function backup() {
    const blob = new Blob(
      [JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), records }, null, 2)],
      { type: "application/json" },
    )
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `wishu-interviews-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  function edit(record: InterviewRecord) {
    select(null)
    setEditor({ record })
  }
  function changeStage(record: InterviewRecord, value: string | null) {
    if (!value || !isInterviewStage(value)) return
    useInterviewTracker.getState().save(
      {
        company: record.company,
        role: record.role,
        vacancyUrl: record.vacancyUrl,
        contact: record.contact,
        salary: record.salary,
        notes: record.notes,
        stage: value,
      },
      record.id,
    )
  }
  return (
    <>
      <QuestionBreadcrumbs items={[{ label: "Собеседования" }]} />
      <CatalogHeader
        eyebrow="Поиск работы без потерянных деталей"
        title="Собеседования"
        description="Компании, этапы отбора и встречи в одном месте. Сохраняйте договорённости и возвращайтесь к подготовке."
        actions={
          <>
            <Button variant="outline" disabled={!records.length} onClick={backup}>
              Резервная копия
            </Button>
            <Button onClick={() => setEditor({})}>Добавить собеседование</Button>
          </>
        }
      />
      <div className="mb-6 rounded-lg bg-muted/30 px-4 py-3 text-xs leading-6 text-muted-foreground">
        Записи хранятся только в этом браузере. Для переноса или сохранения вне браузера скачайте
        резервную копию. Напоминания и синхронизация с календарём пока не подключены.
      </div>
      {params.get("entry") && !selected && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4 text-sm">
          <p>Запись не найдена в этом браузере.</p>
          <Button size="sm" variant="outline" onClick={() => select(null)}>
            К списку
          </Button>
        </div>
      )}
      {storageError && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm"
        >
          {storageError}
          <Button
            size="sm"
            variant="outline"
            className="ml-3"
            onClick={() => useInterviewTracker.getState().retryStorage()}
          >
            Повторить сохранение
          </Button>
        </p>
      )}
      <div className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          { label: "В работе", value: live.filter((item) => !isClosedStage(item.stage)).length },
          { label: "Встречи за 7 дней", value: futureMeetings.length },
          { label: "Офферы", value: live.filter((item) => item.stage === "offer").length },
          { label: "В архиве", value: records.filter((item) => item.archived).length },
        ].map((item) => (
          <Card key={item.label} className="gap-2 rounded-xl p-4 shadow-none">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-2xl font-semibold tabular-nums">{item.value}</p>
          </Card>
        ))}
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <section className="min-w-0 space-y-4" aria-label="Список собеседований">
          <div className="space-y-3 rounded-xl bg-card p-4 ring-1 ring-border/60">
            <SearchField
              value={query}
              onValueChange={(value) => update("q", value)}
              label="Поиск собеседований"
              placeholder="Компания, вакансия или рекрутер…"
            />
            <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <Select
                value={stage}
                items={[
                  { value: "all", label: "Все этапы" },
                  ...interviewStages.map((item) => ({ value: item.value, label: item.label })),
                ]}
                onValueChange={(value) => {
                  if (value) update("stage", value)
                }}
              >
                <SelectTrigger aria-label="Этап отбора" className="h-10 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все этапы</SelectItem>
                  {interviewStages.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={scope}
                items={[
                  { value: "current", label: "Не в архиве" },
                  { value: "archived", label: "Архив" },
                  { value: "all", label: "Все записи" },
                ]}
                onValueChange={(value) => {
                  if (value) update("scope", value)
                }}
              >
                <SelectTrigger aria-label="Список и архив" className="h-10 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Не в архиве</SelectItem>
                  <SelectItem value="archived">Архив</SelectItem>
                  <SelectItem value="all">Все записи</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={sort}
                items={[
                  { value: "meeting", label: "Ближайшая встреча" },
                  { value: "updated", label: "Последние изменения" },
                  { value: "company", label: "По компании" },
                ]}
                onValueChange={(value) => {
                  if (value) update("sort", value)
                }}
              >
                <SelectTrigger aria-label="Порядок собеседований" className="h-10 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Ближайшая встреча</SelectItem>
                  <SelectItem value="updated">Последние изменения</SelectItem>
                  <SelectItem value="company">По компании</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <Toggle
                size="sm"
                variant="outline"
                pressed={upcoming}
                onPressedChange={(pressed) => update("upcoming", pressed ? "1" : "")}
              >
                Встреча в ближайшие 7 дней
              </Toggle>
              {active && (
                <Button size="sm" variant="ghost" onClick={reset}>
                  Сбросить фильтры
                </Button>
              )}
            </div>
          </div>
          <output
            className="block text-xs text-muted-foreground"
            aria-live="polite"
            aria-atomic="true"
          >
            Показано {visible.length} из {records.length}
          </output>
          {visible.length ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {visible.map((record) => {
                const next = nextInterviewMeeting(record, now),
                  missed = record.meetings.filter(
                    (item) => !item.done && new Date(item.at).getTime() < now,
                  ).length
                return (
                  <Card key={record.id} className="min-w-0 gap-4 rounded-xl p-5 shadow-none">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <StageBadge record={record} />
                      {record.archived && <Badge variant="secondary">В архиве</Badge>}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        <Button
                          variant="ghost"
                          type="button"
                          className="h-auto justify-start rounded p-0 text-left text-base font-semibold whitespace-normal outline-none hover:bg-transparent hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                          onClick={() => select(record.id)}
                        >
                          {record.company}
                        </Button>
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{record.role}</p>
                    </div>
                    <div className="flex-1 space-y-2 text-xs leading-6">
                      {next ? (
                        <p>
                          <span className="font-medium">Ближайшая встреча:</span>
                          <br />
                          {formatInterviewDate(next.at)}
                          <br />
                          <span className="text-muted-foreground">{next.title}</span>
                        </p>
                      ) : (
                        <p className="text-muted-foreground">Следующая встреча пока не назначена</p>
                      )}
                      {!!missed && (
                        <p className="text-amber-800 dark:text-amber-300">
                          Прошедших встреч без отметки: {missed}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3">
                      <Button size="sm" variant="outline" onClick={() => select(record.id)}>
                        Подробнее
                      </Button>
                      <span className="text-[11px] text-muted-foreground">
                        Обновлено {new Date(record.updatedAt).toLocaleDateString("ru-RU")}
                      </span>
                    </div>
                  </Card>
                )
              })}
            </div>
          ) : (
            <PageState
              heading="h2"
              title={
                records.length ? "Ничего не найдено" : "Первое собеседование начинается с записи"
              }
              description={
                records.length
                  ? "Измените поиск, этап или откройте архив."
                  : "Добавьте компанию и вакансию. Затем назначьте встречи и фиксируйте результаты."
              }
            >
              {records.length ? (
                <Button variant="outline" onClick={reset}>
                  Сбросить фильтры
                </Button>
              ) : (
                <Button onClick={() => setEditor({})}>Добавить собеседование</Button>
              )}
            </PageState>
          )}
        </section>
        <aside className="space-y-4 lg:sticky lg:top-24">
          <Card className="gap-3 rounded-xl p-4 shadow-none">
            <h2 className="text-sm font-semibold">Ближайшие встречи</h2>
            <p className="text-xs leading-6 text-muted-foreground">
              Следующие 7 дней. Время - в часовом поясе браузера.
            </p>
            {futureMeetings.length ? (
              <ol className="space-y-3">
                {futureMeetings.slice(0, 5).map(({ record, meeting: item }) => (
                  <li key={item.id}>
                    <Button
                      variant="ghost"
                      type="button"
                      className="block h-auto w-full min-w-0 justify-start rounded-lg border border-border/70 p-3 text-left whitespace-normal outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                      onClick={() => select(record.id)}
                    >
                      <span className="block text-xs font-medium text-primary">
                        {formatInterviewDate(item.at)}
                      </span>
                      <span className="mt-1 block text-sm font-medium">{record.company}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">{item.title}</span>
                    </Button>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="rounded-lg bg-muted/40 p-3 text-xs leading-6 text-muted-foreground">
                На ближайшую неделю встреч нет. Добавьте дату в карточке компании.
              </p>
            )}
          </Card>
        </aside>
      </div>
      <Sheet
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) select(null)
        }}
      >
        <SheetContent className="w-[min(96vw,40rem)]">
          {selected && (
            <>
              <SheetTitle>{selected.company}</SheetTitle>
              <SheetDescription>{selected.role}</SheetDescription>
              <div className="flex flex-wrap gap-2">
                <StageBadge record={selected} />
                {selected.archived && <Badge variant="secondary">В архиве</Badge>}
                <Button size="sm" variant="outline" onClick={() => edit(selected)}>
                  Редактировать
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    useInterviewTracker.getState().archive(selected.id, !selected.archived)
                  }
                >
                  {selected.archived ? "Вернуть из архива" : "В архив"}
                </Button>
                <Button size="sm" variant="destructive" onClick={() => setDeleting(selected)}>
                  Удалить
                </Button>
              </div>
              <label className="text-xs text-muted-foreground" htmlFor="interview-detail-stage">
                Изменить этап
              </label>
              <Select
                value={selected.stage}
                items={interviewStages.map((item) => ({ value: item.value, label: item.label }))}
                onValueChange={(value) => changeStage(selected, value)}
              >
                <SelectTrigger id="interview-detail-stage" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {interviewStages.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <dl className="space-y-3 rounded-lg border p-4 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Контакт</dt>
                  <dd className="mt-1 wrap-anywhere whitespace-pre-wrap">
                    {selected.contact || "Не указан"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Зарплатные ожидания</dt>
                  <dd className="mt-1 whitespace-pre-wrap">{selected.salary || "Не указаны"}</dd>
                </div>
                {safeInterviewUrl(selected.vacancyUrl) && (
                  <div>
                    <dt className="text-xs text-muted-foreground">Вакансия</dt>
                    <dd className="mt-1">
                      <a
                        className="text-primary underline underline-offset-4"
                        href={safeInterviewUrl(selected.vacancyUrl)!}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Открыть описание вакансии
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
              <InterviewPreparation key={selected.id} record={selected} />
              <InterviewDebrief key={"debrief:" + selected.id} record={selected} />
              <PersonalNote contentKey={"interview:" + selected.id} />
              {selected.notes && (
                <section className="space-y-2">
                  <h2 className="text-sm font-semibold">Заметки</h2>
                  <p className="text-sm leading-7 wrap-anywhere whitespace-pre-wrap">
                    {selected.notes}
                  </p>
                </section>
              )}
              <section className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold">Встречи и результаты</h2>
                  <Button size="sm" onClick={() => setMeeting({ record: selected })}>
                    Добавить встречу
                  </Button>
                </div>
                {selected.meetings.length ? (
                  <ol className="space-y-3">
                    {[...selected.meetings]
                      .sort((a, b) => b.at.localeCompare(a.at))
                      .map((item) => (
                        <li key={item.id} className="space-y-3 rounded-lg border p-4">
                          <div className="flex flex-wrap justify-between gap-2">
                            <h3 className="text-sm font-medium">{item.title}</h3>
                            <Badge variant="secondary">
                              {item.done
                                ? "Завершена"
                                : new Date(item.at).getTime() < now
                                  ? "Нужен итог"
                                  : "Запланирована"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {formatInterviewDate(item.at)}
                          </p>
                          {safeInterviewUrl(item.url) && (
                            <a
                              className="block text-xs text-primary underline underline-offset-4"
                              href={safeInterviewUrl(item.url)!}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Ссылка на встречу
                            </a>
                          )}
                          {item.notes && (
                            <p className="text-sm leading-7 wrap-anywhere whitespace-pre-wrap">
                              {item.notes}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setMeeting({ record: selected, meeting: item })}
                            >
                              Изменить
                            </Button>
                            <Toggle
                              size="sm"
                              pressed={item.done}
                              onPressedChange={() =>
                                useInterviewTracker
                                  .getState()
                                  .completeMeeting(selected.id, item.id, !item.done)
                              }
                            >
                              {item.done ? "Снять отметку" : "Встреча прошла"}
                            </Toggle>
                          </div>
                        </li>
                      ))}
                  </ol>
                ) : (
                  <p className="rounded-lg border border-dashed p-4 text-xs leading-6 text-muted-foreground">
                    Встреч пока нет. Добавьте знакомство с HR или техническое интервью.
                  </p>
                )}
              </section>
              <Disclosure className="rounded-lg border" title={<> История этапов </>}>
                <ol className="mt-4 space-y-3">
                  {[...selected.history].reverse().map((item, index) => (
                    <li key={index} className="text-xs leading-6">
                      <span className="font-medium">{stageDetails(item.stage).label}</span>
                      <br />
                      <span className="text-muted-foreground">{formatInterviewDate(item.at)}</span>
                    </li>
                  ))}
                </ol>
              </Disclosure>
            </>
          )}
        </SheetContent>
      </Sheet>
      <Dialog
        open={!!deleting}
        onOpenChange={(open) => {
          if (!open) setDeleting(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить собеседование?</DialogTitle>
            <DialogDescription>
              Запись «{deleting?.company} · {deleting?.role}», все её встречи, заметки и история
              этапов будут удалены из этого браузера. Отменить удаление нельзя. Для сохранения
              истории можно использовать архив.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>
              Отмена
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!deleting) return
                select(null)
                useInterviewTracker.getState().remove(deleting.id)
                setDeleting(null)
              }}
            >
              Удалить собеседование
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {editor && (
        <InterviewEditor
          key={editor.record?.id ?? "new"}
          record={editor.record}
          onClose={() => setEditor(null)}
          onSaved={(id) => {
            setEditor(null)
            select(id)
          }}
        />
      )}
      {meeting && (
        <MeetingEditor
          key={meeting.meeting?.id ?? "new"}
          record={meeting.record}
          meeting={meeting.meeting}
          onClose={() => setMeeting(null)}
        />
      )}
    </>
  )
}
