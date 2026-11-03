import { questions } from "@/data/interview-content"
import { learningModules } from "@/data/learning-modules"

export type QuestionStatus = "repeat" | "learned" | "skipped"

export interface QuestionSubsection {
  id: string
  title: string
  description: string
  questionIds: string[]
}

interface QuestionSectionDefinition {
  id: string
  title: string
  description: string
  subsections: QuestionSubsection[]
}

const definitions: QuestionSectionDefinition[] = [
  {
    id: "javascript",
    title: "JavaScript",
    description: "От устройства языка до асинхронного выполнения кода.",
    subsections: [
      {
        id: "fundamentals",
        title: "Основы языка",
        description: "Типы данных, сравнение значений и преобразования.",
        questionIds: ["equality", "variables", "null-undefined"],
      },
      {
        id: "functions",
        title: "Функции",
        description: "Лексическое окружение, замыкания и контекст.",
        questionIds: ["closures"],
      },
      {
        id: "objects",
        title: "Объекты и прототипы",
        description: "Свойства объектов и прототипное наследование.",
        questionIds: ["prototype-chain"],
      },
      {
        id: "asynchronous",
        title: "Асинхронность",
        description: "Промисы, очереди задач и event loop.",
        questionIds: ["event-loop"],
      },
    ],
  },
  {
    id: "typescript",
    title: "TypeScript",
    description: "Безопасность типов и выразительные контракты кода.",
    subsections: [
      {
        id: "types",
        title: "Основы системы типов",
        description: "any, unknown и сужение типов.",
        questionIds: ["unknown-any"],
      },
      {
        id: "generics",
        title: "Обобщения",
        description: "Generics и связи между типами.",
        questionIds: ["generics"],
      },
    ],
  },
  {
    id: "react",
    title: "React",
    description: "Компоненты, состояние и синхронизация с внешним миром.",
    subsections: [
      {
        id: "components",
        title: "Компоненты и рендеринг",
        description: "Идентичность компонентов и списки.",
        questionIds: ["react-keys"],
      },
      {
        id: "hooks",
        title: "Хуки и эффекты",
        description: "Жизненный цикл эффектов и освобождение ресурсов.",
        questionIds: ["effects"],
      },
    ],
  },
  {
    id: "html-css",
    title: "HTML и CSS",
    description: "Семантика и доступность веб-интерфейсов.",
    subsections: [
      {
        id: "semantics",
        title: "Семантика и доступность",
        description: "Правильные элементы и управление с клавиатуры.",
        questionIds: ["semantic-button"],
      },
    ],
  },
  {
    id: "browser",
    title: "Браузер и HTTP",
    description: "Сеть, кеширование и устройство веб-платформы.",
    subsections: [
      {
        id: "http",
        title: "HTTP и кеширование",
        description: "Заголовки, свежесть и актуальность ответов.",
        questionIds: ["http-cache"],
      },
    ],
  },
  {
    id: "nestjs",
    title: "NestJS",
    description: "Архитектура серверного приложения и зависимости.",
    subsections: [
      {
        id: "architecture",
        title: "Архитектура приложения",
        description: "Модули, контроллеры и сервисы.",
        questionIds: ["nestjs-dependencies"],
      },
    ],
  },
  {
    id: "postgresql",
    title: "PostgreSQL",
    description: "Хранение данных и эффективное выполнение запросов.",
    subsections: [
      {
        id: "indexes",
        title: "Индексы и запросы",
        description: "Стоимость поиска и план выполнения.",
        questionIds: ["postgresql-indexes"],
      },
    ],
  },
  {
    id: "git",
    title: "Git",
    description: "История проекта и совместная работа с изменениями.",
    subsections: [
      {
        id: "history",
        title: "Ветки и история",
        description: "Слияние и перенос коммитов.",
        questionIds: ["git-rebase"],
      },
    ],
  },
]

export const questionSections = definitions.map((section) => {
  const module = learningModules.find((item) => item.id === section.id)
  if (!module) throw new Error(`Learning module is missing for question section ${section.id}`)
  return { ...section, group: module.group, mark: module.mark, color: module.color }
})

export type QuestionSection = (typeof questionSections)[number]

export function getSubsectionQuestions(subsection: QuestionSubsection) {
  return subsection.questionIds.flatMap((id) => {
    const question = questions.find((item) => item.id === id)
    return question ? [question] : []
  })
}

export function getSectionQuestions(section: QuestionSection) {
  const ids = new Set(section.subsections.flatMap((subsection) => subsection.questionIds))
  return questions.filter((question) => ids.has(question.id))
}

export function findQuestionLocation(id: string) {
  for (const section of questionSections) {
    const subsection = section.subsections.find((item) => item.questionIds.includes(id))
    if (subsection) return { section, subsection }
  }
  return undefined
}

export const sectionPath = (sectionId: string) => `/questions/sections/${sectionId}`
export const subsectionPath = (sectionId: string, subsectionId: string) =>
  `${sectionPath(sectionId)}/${subsectionId}`
