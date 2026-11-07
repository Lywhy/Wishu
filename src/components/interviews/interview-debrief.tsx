import { useId, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Disclosure } from "@/components/experience/disclosure"
import { useInterviewTracker, useInterviewStorage } from "@/stores/interviews"
import { useWorkspace } from "@/stores/workspace"
import type { InterviewRecord } from "@/data/interviews"

export function InterviewDebrief({ record }: { record: InterviewRecord }) {
  const id = useId()
  const route = useLocation()
  const storageError = useInterviewStorage((state) => state.error)
  const returnTo = route.pathname + route.search
  const questionIds = record.preparation?.questionIds ?? []
  const [draft, setDraft] = useState(
    () => record.debrief ?? { asked: "", difficulties: "", conclusions: "", nextSteps: "" },
  )
  const [saved, setSaved] = useState(false)
  const [added, setAdded] = useState(false)
  const error = useInterviewTracker(
    (state) => state.records.find((item) => item.id === record.id) === undefined,
  )
  const fields = [
    {
      key: "asked" as const,
      label: "Что спрашивали",
      placeholder: "Вопросы и практические задания",
    },
    {
      key: "difficulties" as const,
      label: "Что вызвало сложности",
      placeholder: "Темы и моменты, к которым стоит вернуться",
    },
    {
      key: "conclusions" as const,
      label: "Выводы",
      placeholder: "Что получилось и что изменить в следующей встрече",
    },
    {
      key: "nextSteps" as const,
      label: "План повторения",
      placeholder: "Конкретные шаги подготовки",
    },
  ]
  return (
    <Disclosure title="Разбор после собеседования">
      <div className="space-y-4 pt-3">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="mb-2 block text-sm font-medium" htmlFor={id + field.key}>
              {field.label}
            </label>
            <Textarea
              id={id + field.key}
              value={draft[field.key]}
              placeholder={field.placeholder}
              maxLength={12000}
              onChange={(event) => {
                setDraft((value) => ({ ...value, [field.key]: event.target.value }))
                setSaved(false)
                setAdded(false)
              }}
            />
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          <Button
            disabled={error}
            onClick={() => {
              useInterviewTracker.getState().setDebrief(record.id, draft)
              setSaved(true)
            }}
          >
            Сохранить разбор
          </Button>
          <Button
            variant="outline"
            disabled={!draft.nextSteps.trim()}
            onClick={() => {
              useInterviewTracker.getState().setDebrief(record.id, draft)
              const workspace = useWorkspace.getState()
              const key = "interview:" + record.id
              const previous = workspace.notes[key] ?? ""
              const plan = draft.nextSteps.trim()
              workspace.note(
                key,
                previous.includes(plan)
                  ? previous
                  : [previous, "План после собеседования:\n" + plan].filter(Boolean).join("\n\n"),
              )
              setAdded(true)
              setSaved(true)
            }}
          >
            Перенести план в заметку подготовки
          </Button>
        </div>
        {!!questionIds.length && (
          <Button
            nativeButton={false}
            variant="outline"
            render={
              <Link
                to={"/questions/" + questionIds[0]}
                state={{
                  returnTo,
                  questionSession: {
                    questionIds,
                    returnTo,
                    title: "Повторение после собеседования: " + record.company,
                  },
                }}
              />
            }
          >
            Повторить прикреплённые вопросы ({questionIds.length})
          </Button>
        )}
        <output className="block min-h-5 text-xs text-muted-foreground">
          {storageError
            ? "Не удалось сохранить разбор в браузере. Повторите сохранение."
            : added
              ? "План перенесён в заметку подготовки этой записи. Прикрепить материалы можно в блоке выше."
              : saved
                ? "Разбор сохранён в записи"
                : ""}
        </output>
      </div>
    </Disclosure>
  )
}
