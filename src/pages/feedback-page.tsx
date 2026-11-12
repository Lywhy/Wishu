import { useEffect, useId, useRef, useState, type FormEvent } from "react"
import { Link, useLocation } from "react-router-dom"
import { PageHeading } from "@/components/catalog/page-heading"
import { AnimatedBlock } from "@/components/catalog/catalog-primitives"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { LocalSaveNotice } from "@/components/experience/local-save-notice"
import { FeedbackSelect, FeedbackTopicFields } from "@/components/feedback/feedback-topic-fields"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { QuestionCatalog } from "@/data/question-catalog"
import { questionApi } from "@/lib/question-api"
import {
  feedbackPageForPath,
  feedbackPages,
  githubIssueForFeedback,
  feedbackMessage,
  normalizeFeedbackPath,
  bugDetails,
  parseTopics,
  bugReasons,
  type BugReason,
  type BugPage,
  type FeedbackInput,
  type FeedbackPage,
  type FeedbackReceipt,
} from "@/lib/platform-feedback"
import { FeedbackDelivery } from "@/components/feedback/feedback-delivery"
import { FeedbackScreenshots } from "@/components/feedback/feedback-screenshots"
import { useFeedbackAttachments } from "@/stores/feedback-attachments"
import type { FeedbackScreenshot } from "@/lib/feedback-attachments"
import { validateFeedback, type FeedbackErrors } from "@/lib/feedback-validation"
import { useFeedbackDrafts } from "@/stores/feedback-drafts"

export function FeedbackPageView() {
  const route = useLocation()
  return <FeedbackForm key={route.search} />
}

function FeedbackForm() {
  const formId = useId()
  const route = useLocation()
  const origin = typeof route.state?.feedbackOrigin === "string" ? route.state.feedbackOrigin : ""
  const initialPage = feedbackPageForPath(origin)
  const [page, setPage] = useState<FeedbackPage>(
    initialPage === "other" ? "questions" : initialPage,
  )
  const [kind, setKind] = useState<"bug" | "suggestion">("bug")
  const [catalog, setCatalog] = useState<QuestionCatalog | null>(null)
  const [catalogError, setCatalogError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const [receipt, setReceipt] = useState<FeedbackReceipt | null>(null)
  const [prepared, setPrepared] = useState<FeedbackInput | null>(null)
  const [validated, setValidated] = useState(false)
  const [attachmentsBusy, setAttachmentsBusy] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const submitting = useRef(false)
  const successHeading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (prepared || receipt) successHeading.current?.focus()
  }, [prepared, receipt])
  const drafts = useFeedbackDrafts()
  const questionId = new URLSearchParams(route.search).get("question")
  const questionBug = questionId ? drafts.questionBugs?.[questionId] : undefined
  const bug = questionBug ?? drafts.bug
  function updateBug(
    patch: Partial<
      Pick<typeof bug, "page" | "path" | "details" | "steps" | "expected" | "reason" | "fragment">
    >,
  ) {
    if (questionId && questionBug) drafts.updateQuestionBug(questionId, patch)
    else drafts.updateBug(patch)
  }
  const suggestion = drafts.suggestions[page]
  const content = kind === "suggestion" && suggestion.mode === "content" && page !== "interviews"
  const attachmentKey =
    kind === "bug" ? (questionBug ? "question:" + questionId : "bug") : "suggestion:" + page
  const allAttachments = useFeedbackAttachments((state) => state.items)
  const screenshots = allAttachments[attachmentKey] ?? []
  function setScreenshots(images: FeedbackScreenshot[]) {
    useFeedbackAttachments.getState().set(attachmentKey, images)
  }
  const fieldErrors: FeedbackErrors = validated
    ? validateFeedback(kind, bug, suggestion, content, catalog)
    : { topics: {} }
  const outgoing = receipt ?? prepared
  const github = outgoing ? githubIssueForFeedback(outgoing, catalog) : null
  const message = outgoing ? feedbackMessage(outgoing, catalog) : null
  useEffect(() => {
    let active = true
    questionApi
      .catalog()
      .then((value) => {
        if (active) {
          setCatalog(value)
          setCatalogError(false)
        }
      })
      .catch(() => {
        if (active) setCatalogError(true)
      })
    return () => {
      active = false
    }
  }, [attempt])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || attachmentsBusy) return
    setValidated(true)
    const issues = validateFeedback(kind, bug, suggestion, content, catalog)
    if (issues.details || issues.path || issues.form || Object.keys(issues.topics).length) {
      setError(issues.form ?? "")
      window.requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      )
      return
    }
    const input: FeedbackInput =
      kind === "bug"
        ? {
            id: bug.id,
            page: bug.page,
            kind,
            mode: "improvement",
            path: normalizeFeedbackPath(bug.path),
            details: bugDetails(bug),
            items: [],
          }
        : {
            id: suggestion.id,
            kind,
            page,
            mode: content ? "content" : "improvement",
            path: "",
            details: suggestion.details.trim(),
            items: content
              ? suggestion.items.map((item) => ({
                  groupId: item.groupId,
                  sectionId: item.sectionId,
                  sectionTitle: item.sectionTitle,
                  subsectionId: item.subsectionId,
                  subsectionTitle: item.subsectionTitle,
                  topics: parseTopics(item.topics),
                }))
              : [],
          }
    if (new TextEncoder().encode(JSON.stringify(input)).length > 90000) {
      setError("Обращение слишком большое. Разделите список на несколько обращений.")
      return
    }
    setPrepared(input)
    setReceipt(null)
    setError("")
  }
  async function saveLocally() {
    if (!prepared || submitting.current || receipt) return
    const input = prepared
    submitting.current = true
    setSending(true)
    setError("")
    try {
      const saved = await questionApi.platformFeedback(input)
      if (saved.saved !== true || saved.id !== input.id)
        throw new Error("Сервер не подтвердил сохранение. Повторите отправку.")
      setReceipt(saved)
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Не удалось сохранить обращение. Черновик сохранён.",
      )
    } finally {
      submitting.current = false
      setSending(false)
    }
  }
  function newRequest() {
    setScreenshots([])
    setValidated(false)
    if (kind === "bug" && questionId && questionBug) drafts.resetQuestionBug(questionId)
    else drafts.reset(kind, page)
    setReceipt(null)
    setPrepared(null)
    setError("")
  }
  return (
    <div className="mx-auto max-w-5xl min-w-0">
      <QuestionBreadcrumbs
        items={[{ label: "Главная", to: "/learn" }, { label: "Баги и предложения" }]}
      />
      <PageHeading
        title="Помогите улучшить Wishu"
        description="Опишите проблему или идею - мы подготовим сообщение, которое удобно передать автору."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <AnimatedBlock className="min-w-0">
          {outgoing && message ? (
            <Card className="gap-5 p-5 shadow-none sm:p-6">
              <div>
                <h2
                  ref={successHeading}
                  tabIndex={-1}
                  className="text-lg font-semibold outline-none"
                >
                  {receipt ? "Обращение сохранено локально" : "Осталось передать автору"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {github
                    ? "Откройте готовое обращение на GitHub и подтвердите публикацию. Можно добавить скриншот прямо там."
                    : "Скопируйте готовый текст и отправьте автору привычным способом. Сохранять его на локальном сервере не обязательно."}
                </p>
              </div>
              <FeedbackDelivery value={outgoing} catalog={catalog} screenshots={screenshots} />
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  disabled={sending}
                  onClick={() => {
                    setPrepared(null)
                    setReceipt(null)
                    setError("")
                  }}
                >
                  Изменить
                </Button>
                <Button variant="ghost" disabled={sending} onClick={newRequest}>
                  Новое обращение
                </Button>
              </div>
              <Collapsible className="border-t pt-4">
                <CollapsibleTrigger className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                  Сохранить копию в этой установке
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 pt-3">
                  <p className="text-xs leading-5 text-muted-foreground">
                    Локальное сохранение не передаёт обращение автору. Его можно использовать для
                    резервной копии.
                  </p>
                  {receipt ? (
                    <output className="block text-sm">Копия сохранена. Номер: {receipt.id}</output>
                  ) : (
                    <Button variant="outline" disabled={sending} onClick={() => void saveLocally()}>
                      {sending ? "Сохраняем…" : "Сохранить локально"}
                    </Button>
                  )}
                  {error && (
                    <p role="alert" className="text-sm text-destructive">
                      {error} Текст по-прежнему можно скопировать или скачать.
                    </p>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ) : (
            <Card className="gap-5 p-4 shadow-none sm:p-6">
              <Tabs
                value={kind}
                onValueChange={(value) => {
                  if (!sending && (value === "bug" || value === "suggestion")) {
                    setValidated(false)
                    setKind(value)
                    setError("")
                  }
                }}
                className="gap-5"
              >
                <TabsList className="h-11! w-full">
                  <TabsTrigger value="bug" disabled={sending}>
                    Сообщить о баге
                  </TabsTrigger>
                  <TabsTrigger value="suggestion" disabled={sending}>
                    Предложить улучшение
                  </TabsTrigger>
                </TabsList>
                <form
                  ref={formRef}
                  noValidate
                  onSubmit={submit}
                  className="space-y-5"
                  aria-busy={sending || attachmentsBusy}
                >
                  <TabsContent value="bug" className="space-y-5">
                    <FeedbackSelect
                      id={formId + "-reason"}
                      label="Тип проблемы"
                      value={bug.reason ?? "other"}
                      options={bugReasons}
                      onChange={(value) => updateBug({ reason: value as BugReason })}
                    />
                    {bug.fragment && (
                      <div className="space-y-3 rounded-xl border bg-muted/30 p-3">
                        <p className="text-xs font-medium">Выделенный фрагмент</p>
                        <blockquote className="max-h-32 overflow-y-auto border-l-2 border-primary/30 pl-3 text-sm whitespace-pre-wrap">
                          {bug.fragment}
                        </blockquote>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => updateBug({ fragment: "" })}
                        >
                          Убрать фрагмент
                        </Button>
                      </div>
                    )}
                    {questionBug?.context && (
                      <div className="space-y-3 rounded-xl border bg-muted/30 p-4">
                        <p className="block text-sm font-medium">Сообщение об этом вопросе</p>
                        <p className="text-sm leading-6 break-words whitespace-pre-line text-muted-foreground">
                          {questionBug.context}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Вопрос и раздел уже подставлены. Ниже напишите, что нужно исправить.
                        </p>
                        <Button
                          nativeButton={false}
                          variant="link"
                          size="sm"
                          render={
                            <Link to={"/questions/" + encodeURIComponent(questionId ?? "")} />
                          }
                        >
                          Вернуться к вопросу
                        </Button>
                      </div>
                    )}
                    <FeedbackSelect
                      id={`${formId}-bug-page`}
                      label="Где возникла проблема"
                      value={bug.page}
                      options={[...feedbackPages, { value: "other", label: "Другая страница" }]}
                      disabled={sending}
                      onChange={(value) =>
                        updateBug({
                          page: value as BugPage,
                          path: value === "other" ? "" : value === "learn" ? "/learn" : `/${value}`,
                        })
                      }
                    />
                    <div className="space-y-3">
                      <label htmlFor={`${formId}-path`} className="block text-sm font-medium">
                        Ссылка на страницу{" "}
                        <span className="font-normal text-muted-foreground">(необязательно)</span>
                      </label>
                      <Input
                        id={`${formId}-path`}
                        value={bug.path}
                        aria-invalid={!!fieldErrors.path}
                        aria-describedby={fieldErrors.path ? formId + "-path-error" : undefined}
                        maxLength={2000}
                        disabled={sending}
                        placeholder="Вставьте адрес из браузера или путь страницы"
                        onChange={(e) => updateBug({ path: e.target.value })}
                        onBlur={() => updateBug({ path: normalizeFeedbackPath(bug.path) })}
                      />
                      {fieldErrors.path && (
                        <p
                          id={formId + "-path-error"}
                          role="alert"
                          className="text-xs text-destructive"
                        >
                          {fieldErrors.path}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Адрес сервера и параметры ссылки не попадут в обращение.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <label
                        htmlFor={`${formId}-bug-details`}
                        className="block text-sm font-medium"
                      >
                        Что не работает
                      </label>
                      <Textarea
                        id={`${formId}-bug-details`}
                        value={bug.details}
                        required
                        minLength={10}
                        maxLength={3000}
                        disabled={sending}
                        className="min-h-32"
                        placeholder="Например: после проверки задачи результат не появился, кнопка осталась недоступной."
                        aria-invalid={!!fieldErrors.details}
                        aria-describedby={`${formId}-bug-hint${fieldErrors.details ? ` ${formId}-bug-error` : ""}`}
                        onChange={(e) => updateBug({ details: e.target.value })}
                      />
                      {fieldErrors.details && (
                        <p
                          id={formId + "-bug-error"}
                          role="alert"
                          className="text-xs text-destructive"
                        >
                          {fieldErrors.details}
                        </p>
                      )}
                      <p id={`${formId}-bug-hint`} className="text-xs text-muted-foreground">
                        Достаточно короткого описания. {bug.details.length}/3000
                      </p>
                    </div>
                    <Collapsible>
                      <CollapsibleTrigger className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                        Добавить детали для воспроизведения (необязательно)
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-4 pt-4">
                        <div className="space-y-3">
                          <label htmlFor={`${formId}-steps`} className="block text-sm font-medium">
                            Как повторить
                          </label>
                          <Textarea
                            id={`${formId}-steps`}
                            value={bug.steps ?? ""}
                            maxLength={1000}
                            placeholder={
                              "1. Открыл задачу\n2. Вставил решение\n3. Нажал «Проверить»"
                            }
                            onChange={(event) => updateBug({ steps: event.target.value })}
                          />
                        </div>
                        <div className="space-y-3">
                          <label
                            htmlFor={`${formId}-expected`}
                            className="block text-sm font-medium"
                          >
                            Как должно было сработать
                          </label>
                          <Textarea
                            id={`${formId}-expected`}
                            value={bug.expected ?? ""}
                            maxLength={600}
                            placeholder="Ожидал увидеть результаты тестов и сообщение об успешном решении."
                            onChange={(event) => updateBug({ expected: event.target.value })}
                          />
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </TabsContent>
                  <TabsContent value="suggestion" className="space-y-5">
                    <FeedbackSelect
                      id={`${formId}-page`}
                      label="К какой странице относится идея"
                      value={page}
                      options={feedbackPages}
                      disabled={sending}
                      onChange={(value) => {
                        setValidated(false)
                        setPage(value as FeedbackPage)
                        setError("")
                      }}
                    />
                    {page !== "interviews" && (
                      <FeedbackSelect
                        id={`${formId}-mode`}
                        label="Тип предложения"
                        value={suggestion.mode}
                        disabled={sending}
                        options={[
                          { value: "content", label: "Дополнить материалы" },
                          { value: "improvement", label: "Улучшить страницу" },
                        ]}
                        onChange={(value) =>
                          drafts.updateSuggestion(page, {
                            mode: value as "content" | "improvement",
                          })
                        }
                      />
                    )}
                    {content && (
                      <>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {page === "questions"
                            ? "Предложите темы новых вопросов. Готовые ответы писать не обязательно."
                            : page === "learn"
                              ? "Какие темы стоит раскрыть в лекциях и закрепить практикой?"
                              : "Каких задач и навыков для практики не хватает?"}
                        </p>
                        {catalog ? (
                          <div className="space-y-4">
                            {suggestion.items.map((item, index) => (
                              <FeedbackTopicFields
                                key={item.key}
                                item={item}
                                errors={fieldErrors.topics[item.key]}
                                index={index}
                                catalog={catalog}
                                disabled={sending}
                                canRemove={suggestion.items.length > 1}
                                onChange={(patch) =>
                                  drafts.updateSuggestion(page, {
                                    items: suggestion.items.map((current) =>
                                      current.key === item.key ? { ...current, ...patch } : current,
                                    ),
                                  })
                                }
                                onRemove={() =>
                                  drafts.updateSuggestion(page, {
                                    items: suggestion.items.filter(
                                      (current) => current.key !== item.key,
                                    ),
                                  })
                                }
                              />
                            ))}
                          </div>
                        ) : catalogError ? (
                          <div className="space-y-3 rounded-xl border p-4">
                            <p role="alert" className="text-sm">
                              Не удалось загрузить группы и разделы. Введённые темы остаются в
                              черновике.
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setCatalogError(false)
                                setAttempt((n) => n + 1)
                              }}
                            >
                              Повторить загрузку
                            </Button>
                          </div>
                        ) : (
                          <output className="block text-sm text-muted-foreground">
                            Загружаем группы и разделы…
                          </output>
                        )}
                        <Button
                          type="button"
                          variant="outline"
                          disabled={sending || !catalog || suggestion.items.length >= 10}
                          onClick={() => drafts.addTopic(page)}
                        >
                          Добавить ещё раздел
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          Разделов: {suggestion.items.length}/10
                        </p>
                      </>
                    )}
                    <div className="space-y-3">
                      <label
                        htmlFor={`${formId}-suggestion-details`}
                        className="block text-sm font-medium"
                      >
                        {content ? "Комментарий для автора (необязательно)" : "Что стоит улучшить"}
                      </label>
                      <Textarea
                        id={`${formId}-suggestion-details`}
                        aria-invalid={!!fieldErrors.details}
                        aria-describedby={
                          fieldErrors.details ? formId + "-suggestion-error" : undefined
                        }
                        value={suggestion.details}
                        required={!content}
                        minLength={content ? undefined : 10}
                        maxLength={5000}
                        disabled={sending}
                        className="min-h-32"
                        placeholder={
                          content
                            ? "Например, нужны базовые примеры и типичные ошибки на собеседованиях."
                            : "Опишите неудобство, желаемое изменение и чем оно поможет."
                        }
                        onChange={(e) => drafts.updateSuggestion(page, { details: e.target.value })}
                      />
                    </div>
                    {fieldErrors.details && (
                      <p
                        id={formId + "-suggestion-error"}
                        role="alert"
                        className="text-xs text-destructive"
                      >
                        {fieldErrors.details}
                      </p>
                    )}
                  </TabsContent>
                  <FeedbackScreenshots
                    value={screenshots}
                    onChange={setScreenshots}
                    onBusyChange={setAttachmentsBusy}
                  />
                  <div className="space-y-3 border-t pt-5">
                    {error && (
                      <div className="space-y-3">
                        <p role="alert" className="text-sm text-destructive">
                          {error}
                        </p>
                      </div>
                    )}
                    <Button
                      type="submit"
                      disabled={sending || attachmentsBusy || (content && !catalog)}
                      className="w-full sm:w-auto"
                    >
                      Подготовить обращение
                    </Button>
                    <p className="text-xs leading-5 text-muted-foreground">
                      На следующем шаге - готовый текст и способы передачи. Черновик останется в
                      браузере. Не добавляйте пароли и личные данные.
                    </p>
                  </div>
                </form>
              </Tabs>
              <LocalSaveNotice area="feedback-drafts" errorsOnly />
            </Card>
          )}
        </AnimatedBlock>
        <AnimatedBlock introDelay={0.12} className="space-y-4 lg:sticky lg:top-24">
          <Card className="gap-3 p-5 shadow-none">
            <h2 className="text-sm font-semibold">От описания до исправления</h2>
            <p className="text-xs leading-6 text-muted-foreground">
              Опишите проблему или идею, проверьте готовый текст и передайте автору через GitHub или
              сообщением. Для бага особенно полезны шаги повторения и скриншот.
            </p>
          </Card>
          <p className="px-1 text-xs leading-6 text-muted-foreground">
            Черновики хранятся в этом браузере. Для каждой страницы предложений сохраняется свой
            список тем.
          </p>
        </AnimatedBlock>
      </div>
    </div>
  )
}
