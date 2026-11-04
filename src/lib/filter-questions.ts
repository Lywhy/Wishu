import type { Question } from "@/data/interview-content"
import type { QuestionStatus } from "@/data/question-catalog"

export function matchesQuestionFilters(
  question: Question,
  filter: { difficulty: string; status: string; popular: boolean },
  statuses: Record<string, QuestionStatus>,
  saved: string[],
) {
  return (
    (filter.difficulty === "Любой уровень" || question.difficulty === filter.difficulty) &&
    (!filter.popular || question.popular) &&
    (filter.status !== "new" || !statuses[question.id]) &&
    (!["repeat", "learned", "skipped"].includes(filter.status) ||
      statuses[question.id] === filter.status) &&
    (filter.status !== "saved" || saved.includes(question.id))
  )
}

export const questionFilterStatuses = [
  { value: "all", label: "Все вопросы" },
  { value: "new", label: "Без отметки" },
  { value: "repeat", label: "Повторить" },
  { value: "learned", label: "Изучил" },
  { value: "skipped", label: "Пропустить" },
  { value: "saved", label: "Избранное" },
]

export function questionEmptyState(
  questions: Question[],
  filter: { status: string; popular: boolean },
  statuses: Record<string, QuestionStatus>,
  saved: string[],
) {
  if (filter.status === "saved" && !questions.some((question) => saved.includes(question.id)))
    return {
      title: "В избранном пока пусто",
      description:
        "Добавьте вопрос в избранное на его странице, чтобы быстро вернуться к нему позже.",
    }
  if (
    filter.status === "repeat" &&
    !questions.some((question) => statuses[question.id] === "repeat")
  )
    return {
      title: "Пока нечего повторять",
      description: "Отметьте сложный вопрос кнопкой «Повторить» - он появится в этой подборке.",
    }
  if (filter.popular && !questions.some((question) => question.popular))
    return {
      title: "Популярные вопросы пока не отмечены",
      description: "Снимите фильтр популярности, чтобы увидеть остальные вопросы.",
    }
  if (
    filter.status === "new" &&
    questions.length > 0 &&
    questions.every((question) => statuses[question.id])
  )
    return {
      title: "Все вопросы уже отмечены",
      description: "Выберите другой статус или сбросьте фильтры, чтобы продолжить подготовку.",
    }
  return {}
}
