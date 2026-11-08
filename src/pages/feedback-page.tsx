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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { QuestionCatalog } from "@/data/question-catalog"
import { questionApi } from "@/lib/question-api"
import {
  downloadFeedback,
  feedbackPageForPath,
  feedbackPages,
  githubIssueForFeedback,
  parseTopics,
  type BugPage,
  type FeedbackInput,
  type FeedbackPage,
  type FeedbackReceipt,
} from "@/lib/platform-feedback"
import { useFeedbackDrafts } from "@/stores/feedback-drafts"

export function FeedbackPageView() {
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
  const [failedInput, setFailedInput] = useState<FeedbackInput | null>(null)
  const [receipt, setReceipt] = useState<FeedbackReceipt | null>(null)
  const submitting = useRef(false)
  const successHeading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (receipt) successHeading.current?.focus()
  }, [receipt])
  const drafts = useFeedbackDrafts()
  const suggestion = drafts.suggestions[page]
  const content = kind === "suggestion" && suggestion.mode === "content" && page !== "interviews"
  const github = receipt ? githubIssueForFeedback(receipt) : null
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

  function validate(): string | null {
    if (kind === "bug") {
      if (drafts.bug.details.trim().length < 10)
        return "Опишите проблему подробнее: не менее 10 символов."
      if (drafts.bug.path && (!drafts.bug.path.startsWith("/") || /[?#\s]/.test(drafts.bug.path)))
        return "Укажите путь страницы, например /questions, без параметров и личных данных."
    } else if (!content && suggestion.details.trim().length < 10)
      return "Опишите, что стоит улучшить: не менее 10 символов."
    if (!content) return null
    if (!catalog) return "Дождитесь загрузки каталога или повторите её."
    const targets = new Set<string>()
    for (const [index, item] of suggestion.items.entries()) {
      const prefix = `Раздел ${index + 1}: `
      const section = catalog.sections.find(
        (s) => s.id === item.sectionId && s.group === item.groupId,
      )
      if (
        !catalog.groups.some((g) => g.id === item.groupId) ||
        (!section && item.sectionId !== "__new")
      )
        return prefix + "выберите группу и раздел."
      if (item.sectionId === "__new" && !item.sectionTitle.trim())
        return prefix + "укажите название нового раздела."
      if (item.subsectionId === "__new" && !item.subsectionTitle.trim())
        return prefix + "укажите название нового подраздела."
      if (
        !["__any", "__new"].includes(item.subsectionId) &&
        !section?.subsections.some((s) => s.id === item.subsectionId)
      )
        return prefix + "выберите существующий подраздел."
      const topics = parseTopics(item.topics)
      if (!topics.length || topics.length > 50 || topics.some((t) => t.length > 200))
        return prefix + "добавьте от 1 до 50 тем, до 200 символов в каждой."
      const target = JSON.stringify([
        item.groupId,
        section?.title ?? item.sectionTitle.trim().toLocaleLowerCase("ru"),
        item.subsectionId === "__new"
          ? item.subsectionTitle.trim().toLocaleLowerCase("ru")
          : item.subsectionId,
      ])
      if (targets.has(target)) return prefix + "этот раздел уже есть. Перенесите темы в один блок."
      targets.add(target)
    }
    return null
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    const problem = validate()
    if (problem) {
      setError(problem)
      return
    }
    const input: FeedbackInput =
      kind === "bug"
        ? {
            ...drafts.bug,
            kind,
            mode: "improvement",
            path: drafts.bug.path.trim(),
            details: drafts.bug.details.trim(),
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
    setFailedInput(null)
    submitting.current = true
    setSending(true)
    setError("")
    try {
      const saved = await questionApi.platformFeedback(input)
      if (saved.saved !== true || saved.id !== input.id)
        throw new Error("Сервер не подтвердил сохранение. Повторите отправку.")
      setReceipt(saved)
    } catch (e) {
      setFailedInput(input)
      setError(
        e instanceof Error ? e.message : "Не удалось сохранить обращение. Черновик сохранён.",
      )
    } finally {
      submitting.current = false
      setSending(false)
    }
  }
  function newRequest() {
    drafts.reset(kind, page)
    setReceipt(null)
    setFailedInput(null)
    setError("")
  }
  return (
    <div className="mx-auto max-w-5xl min-w-0">
      <QuestionBreadcrumbs
        items={[{ label: "Главная", to: "/learn" }, { label: "Баги и предложения" }]}
      />
      <PageHeading
        title="Помогите улучшить Wishu"
        description="Сообщите о проблеме или предложите материалы, которых не хватает для подготовки."
      />
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <AnimatedBlock className="min-w-0">
          {receipt ? (
            <Card className="gap-5 p-5 shadow-none sm:p-6">
              <div>
                <h2
                  ref={successHeading}
                  tabIndex={-1}
                  className="text-lg font-semibold outline-none"
                >
                  Обращение сохранено
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Оно находится на сервере этой установки Wishu. Для передачи автору откройте GitHub
                  issue или скачайте JSON.
                </p>
              </div>
              <p className="text-xs break-all text-muted-foreground">Номер: {receipt.id}</p>
              {github?.attachmentRequired && (
                <p className="text-sm leading-6">
                  Обращение большое. Скачайте JSON и приложите файл к issue, чтобы передать все
                  темы.
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {github && (
                  <Button
                    nativeButton={false}
                    render={
                      <a
                        href={github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Открыть issue на GitHub в новой вкладке"
                      />
                    }
                  >
                    Открыть issue на GitHub
                  </Button>
                )}
                <Button variant="outline" onClick={() => downloadFeedback(receipt)}>
                  Скачать JSON
                </Button>
                <Button variant="ghost" onClick={newRequest}>
                  Новое обращение
                </Button>
              </div>
              {!github && (
                <p className="text-xs leading-5 text-muted-foreground">
                  В этой установке не настроен адрес GitHub для обращений. Передайте автору
                  скачанный файл удобным способом.
                </p>
              )}
              <p className="text-xs leading-5 text-muted-foreground">
                Открытие ссылки ещё не публикует issue. Проверьте текст на GitHub и подтвердите
                отправку.
              </p>
            </Card>
          ) : (
            <Card className="gap-5 p-4 shadow-none sm:p-6">
              <Tabs
                value={kind}
                onValueChange={(value) => {
                  if (!sending && (value === "bug" || value === "suggestion")) {
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
                <form onSubmit={(e) => void submit(e)} className="space-y-5" aria-busy={sending}>
                  <TabsContent value="bug" className="space-y-5">
                    <FeedbackSelect
                      id={`${formId}-bug-page`}
                      label="Где возникла проблема"
                      value={drafts.bug.page}
                      options={[...feedbackPages, { value: "other", label: "Другая страница" }]}
                      disabled={sending}
                      onChange={(value) =>
                        drafts.updateBug({
                          page: value as BugPage,
                          path: value === "other" ? "" : value === "learn" ? "/learn" : `/${value}`,
                        })
                      }
                    />
                    <div className="space-y-2">
                      <label htmlFor={`${formId}-path`} className="text-sm font-medium">
                        Путь страницы{" "}
                        <span className="font-normal text-muted-foreground">(необязательно)</span>
                      </label>
                      <Input
                        id={`${formId}-path`}
                        value={drafts.bug.path}
                        maxLength={500}
                        disabled={sending}
                        placeholder="/questions/sections/react"
                        onChange={(e) => drafts.updateBug({ path: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor={`${formId}-bug-details`} className="text-sm font-medium">
                        Описание проблемы
                      </label>
                      <Textarea
                        id={`${formId}-bug-details`}
                        value={drafts.bug.details}
                        required
                        minLength={10}
                        maxLength={5000}
                        disabled={sending}
                        className="min-h-44"
                        placeholder={"Что вы делали?\nЧто произошло?\nКакого результата ожидали?"}
                        onChange={(e) => drafts.updateBug({ details: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">
                        Не менее 10 символов. {drafts.bug.details.length}/5000
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="suggestion" className="space-y-5">
                    <FeedbackSelect
                      id={`${formId}-page`}
                      label="Что дополним"
                      value={page}
                      options={feedbackPages}
                      disabled={sending}
                      onChange={(value) => {
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
                    <div className="space-y-2">
                      <label
                        htmlFor={`${formId}-suggestion-details`}
                        className="text-sm font-medium"
                      >
                        {content ? "Комментарий для автора (необязательно)" : "Что стоит улучшить"}
                      </label>
                      <Textarea
                        id={`${formId}-suggestion-details`}
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
                  </TabsContent>
                  <div className="space-y-3 border-t pt-5">
                    {error && (
                      <div className="space-y-3">
                        <p role="alert" className="text-sm text-destructive">
                          {error}
                        </p>
                        {failedInput && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => downloadFeedback(failedInput)}
                          >
                            Скачать неотправленное обращение
                          </Button>
                        )}
                      </div>
                    )}
                    <Button
                      type="submit"
                      disabled={sending || (content && !catalog)}
                      className="w-full sm:w-auto"
                    >
                      {sending ? "Сохраняем…" : "Сохранить обращение"}
                    </Button>
                    <p className="text-xs leading-5 text-muted-foreground">
                      Сначала сохраняем на сервере этой установки. Затем можно передать автору через
                      GitHub или JSON. Не добавляйте пароли и личные данные.
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
            <h2 className="text-sm font-semibold">Общая база растёт вместе с вами</h2>
            <p className="text-xs leading-6 text-muted-foreground">
              Автор проверит темы, объединит пересечения и подготовит материалы. После включения в
              репозиторий они будут доступны другим пользователям.
            </p>
            <p className="text-xs leading-6 text-muted-foreground">
              Это предложение для общей базы. Личный вопрос можно добавить отдельно со своим
              ответом.
            </p>
            <Button nativeButton={false} variant="outline" render={<Link to="/questions/new" />}>
              Добавить свой вопрос
            </Button>
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
