export const learningGroups = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Язык, интерфейсы и всё, что происходит в браузере.",
  },
  { id: "backend", title: "Backend", description: "Серверная логика, API и работа с данными." },
  { id: "tools", title: "Инструменты", description: "Навыки для ежедневной работы над проектом." },
] as const

export interface LearningModule {
  id: string
  title: string
  description: string
  group: (typeof learningGroups)[number]["id"]
  category: string
  level: string
  duration: string
  tasks: number
  mark: string
  color: string
  topics: string[]
}

export const learningModules: LearningModule[] = [
  {
    id: "javascript",
    group: "frontend",
    title: "JavaScript: прочный фундамент",
    description: "Разберитесь, как работает язык - от типов данных до замыканий и асинхронности.",
    category: "JavaScript",
    level: "Базовый",
    duration: "3 часа",
    tasks: 8,
    mark: "JS",
    color: "bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-300",
    topics: [
      "Типы данных и приведение типов",
      "Область видимости и замыкания",
      "Объекты и прототипы",
      "Промисы и async/await",
      "Event loop",
    ],
  },
  {
    id: "typescript",
    group: "frontend",
    title: "TypeScript без догадок",
    description: "Научитесь описывать данные и находить ошибки ещё до запуска приложения.",
    category: "TypeScript",
    level: "Базовый",
    duration: "2 часа",
    tasks: 6,
    mark: "TS",
    color: "bg-sky-100 text-sky-800 dark:bg-sky-400/15 dark:text-sky-300",
    topics: [
      "Типы и интерфейсы",
      "Объединения и сужение типов",
      "Generics",
      "Utility types",
      "Типизация функций",
    ],
  },
  {
    id: "react",
    group: "frontend",
    title: "React: от компонентов к приложению",
    description: "Компоненты, состояние и хуки. Соберите цельную картину работы React.",
    category: "React",
    level: "Средний",
    duration: "4 часа",
    tasks: 7,
    mark: "⚛",
    color: "bg-cyan-50 text-cyan-800 dark:bg-cyan-400/15 dark:text-cyan-300",
    topics: [
      "Компоненты и props",
      "Состояние и рендеринг",
      "Эффекты и жизненный цикл",
      "Пользовательские хуки",
      "Производительность",
    ],
  },
  {
    id: "html-css",
    group: "frontend",
    title: "HTML и CSS: основа интерфейса",
    description: "Семантика, доступность и адаптивная вёрстка, которая работает на любом экране.",
    category: "Web",
    level: "Базовый",
    duration: "2 часа",
    tasks: 5,
    mark: "</>",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-400/15 dark:text-orange-300",
    topics: [
      "Семантическая разметка",
      "Flexbox и Grid",
      "Адаптивная вёрстка",
      "Каскад и специфичность",
      "Доступность интерфейса",
    ],
  },
  {
    id: "browser",
    group: "frontend",
    title: "Как работает браузер",
    description: "Проследите путь от адресной строки до страницы и разберитесь в основах HTTP.",
    category: "Web",
    level: "Средний",
    duration: "2 часа",
    tasks: 4,
    mark: "www",
    color: "bg-violet-100 text-violet-800 dark:bg-violet-400/15 dark:text-violet-300",
    topics: [
      "HTTP и HTTPS",
      "DOM и события",
      "Рендеринг страницы",
      "Кеширование",
      "Хранение данных в браузере",
    ],
  },
  {
    id: "git",
    group: "tools",
    title: "Git для командной работы",
    description:
      "Ветки, понятные коммиты и конфликты. Всё, что нужно для уверенной работы в команде.",
    category: "Инструменты",
    level: "Базовый",
    duration: "1 час",
    tasks: 4,
    mark: "git",
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300",
    topics: [
      "Коммиты и история изменений",
      "Ветки и слияние",
      "Разрешение конфликтов",
      "Rebase и cherry-pick",
      "Работа с pull request",
    ],
  },
  {
    id: "nestjs",
    group: "backend",
    title: "NestJS: основа серверного приложения",
    description: "Разберитесь в модулях, контроллерах и сервисах. Спроектируйте понятный API.",
    category: "NestJS",
    level: "Базовый",
    duration: "3 часа",
    tasks: 5,
    mark: "N",
    color: "bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-300",
    topics: [
      "Модули и зависимости",
      "Контроллеры и маршруты",
      "Сервисы и внедрение зависимостей",
      "DTO и валидация",
      "Обработка ошибок",
    ],
  },
  {
    id: "postgresql",
    group: "backend",
    title: "PostgreSQL: данные и запросы",
    description: "От таблиц и связей до SQL-запросов, транзакций и индексов.",
    category: "PostgreSQL",
    level: "Базовый",
    duration: "3 часа",
    tasks: 6,
    mark: "SQL",
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-400/15 dark:text-indigo-300",
    topics: [
      "Таблицы и типы данных",
      "Связи и ограничения",
      "SELECT и JOIN",
      "Транзакции",
      "Индексы и план запроса",
    ],
  },
]
