export type Difficulty = "Базовый" | "Средний" | "Продвинутый"

export interface Question {
  id: string
  title: string
  topic: string
  difficulty: Difficulty
  popular: boolean
  summary: string
  answer: string[]
  code?: string
  takeaway: string
  moduleId: string
}

export interface PracticeTask {
  id: string
  number: string
  title: string
  topic: string
  difficulty: Difficulty
  duration: string
  description: string
  requirements: string[]
  example: string
  starter: string
  solution: string
  explanation: string
  moduleId: string
}

export const practiceTasks: PracticeTask[] = [
  {
    id: "unique-values",
    number: "001",
    title: "Уникальные значения массива",
    topic: "JavaScript",
    difficulty: "Базовый",
    duration: "10 мин",
    description:
      "Напишите функцию unique, которая возвращает новый массив без повторяющихся значений и сохраняет порядок первого появления элементов.",
    requirements: [
      "На вход подаётся массив чисел.",
      "Исходный массив не должен изменяться.",
      "Пустой массив должен возвращать пустой массив.",
    ],
    example: "unique([1, 2, 2, 3, 1]) // [1, 2, 3]\nunique([]) // []",
    starter: "function unique(numbers) {\n  // Ваше решение\n}\n",
    solution: "function unique(numbers) {\n  return [...new Set(numbers)]\n}",
    explanation:
      "Set хранит уникальные значения в порядке добавления. Spread создаёт новый массив. Ожидаемая сложность по времени - O(n), дополнительная память - O(n).",
    moduleId: "javascript",
  },
  {
    id: "group-by",
    number: "002",
    title: "Группировка объектов",
    topic: "JavaScript",
    difficulty: "Средний",
    duration: "20 мин",
    description:
      "Реализуйте groupBy: функция принимает массив объектов и имя поля, а возвращает группы элементов по строковому значению этого поля.",
    requirements: [
      "Значение поля группировки всегда строка.",
      "Сохраните порядок элементов внутри группы.",
      "Обработайте ключи вроде __proto__ без изменения прототипа.",
      "Не изменяйте входные данные.",
    ],
    example:
      'groupBy([{ team: "a", id: 1 }, { team: "a", id: 2 }], "team")\n// { a: [{ team: "a", id: 1 }, { team: "a", id: 2 }] }',
    starter: "function groupBy(items, key) {\n  // Ваше решение\n}\n",
    solution:
      "function groupBy(items, key) {\n  const groups = Object.create(null)\n  for (const item of items) {\n    const value = item[key]\n    ;(groups[value] ??= []).push(item)\n  }\n  return groups\n}",
    explanation:
      "Объект без прототипа безопасно хранит строковые ключи, включая __proto__. Один проход даёт O(n) по времени и O(n) по дополнительной памяти для групп.",
    moduleId: "javascript",
  },
  {
    id: "debounce",
    number: "003",
    title: "Своя функция debounce",
    topic: "JavaScript",
    difficulty: "Продвинутый",
    duration: "25 мин",
    description:
      "Напишите debounce(fn, delay). Возвращённая функция должна вызывать fn только после паузы delay с последнего обращения.",
    requirements: [
      "Сохраняйте аргументы последнего вызова.",
      "Сохраняйте контекст this.",
      "Предыдущий таймер нужно отменять.",
      "Не вызывайте fn немедленно.",
    ],
    example:
      'const search = debounce(console.log, 300)\nsearch("r")\nsearch("react")\n// После паузы выведется только "react"',
    starter: "function debounce(fn, delay) {\n  // Ваше решение\n}\n",
    solution:
      "function debounce(fn, delay) {\n  let timer\n  return function (...args) {\n    clearTimeout(timer)\n    timer = setTimeout(() => fn.apply(this, args), delay)\n  }\n}",
    explanation:
      "Замыкание хранит таймер между вызовами. Обычная функция сохраняет this вызывающего кода, а стрелочная функция таймера использует этот контекст. Новый вызов отменяет предыдущую отложенную операцию.",
    moduleId: "javascript",
  },
  {
    id: "typed-pick",
    number: "004",
    title: "Типобезопасный pick",
    topic: "TypeScript",
    difficulty: "Средний",
    duration: "20 мин",
    description:
      "Реализуйте функцию pick, которая выбирает указанные поля объекта. TypeScript должен запрещать несуществующие ключи и точно описывать возвращаемые поля.",
    requirements: [
      "Используйте generics и keyof.",
      "Результат должен иметь тип Pick<T, K>.",
      "Не используйте any.",
      "Возвращайте новый объект.",
    ],
    example: 'pick({ name: "Аня", age: 25 }, ["name"])\n// { name: "Аня" }',
    starter:
      "function pick<T extends object, K extends keyof T>(\n  object: T,\n  keys: K[],\n): Pick<T, K> {\n  // Ваше решение\n}\n",
    solution:
      "function pick<T extends object, K extends keyof T>(\n  object: T,\n  keys: K[],\n): Pick<T, K> {\n  const result = {} as Pick<T, K>\n  for (const key of keys) {\n    result[key] = object[key]\n  }\n  return result\n}",
    explanation:
      "K ограничен ключами T, поэтому недопустимые поля отсеиваются при проверке типов. Pick сохраняет типы выбранных свойств. Утверждение типа используется только для создаваемого по частям объекта.",
    moduleId: "typescript",
  },
  {
    id: "react-counter",
    number: "005",
    title: "Счётчик с шагом",
    topic: "React",
    difficulty: "Базовый",
    duration: "15 мин",
    description:
      "Создайте компонент Counter с пропсом step. Кнопки увеличивают и уменьшают значение на заданный шаг, а отдельная кнопка сбрасывает его в ноль.",
    requirements: [
      "По умолчанию step равен 1.",
      "Начальное значение - 0.",
      "Используйте функциональное обновление состояния.",
      "Кнопки должны иметь понятные текстовые подписи.",
    ],
    example: "<Counter step={2} />\n// 0 → Увеличить → 2 → Уменьшить → 0",
    starter:
      'import { useState } from "react"\n\nexport function Counter({ step = 1 }) {\n  // Ваше решение\n}\n',
    solution:
      'import { useState } from "react"\n\nexport function Counter({ step = 1 }) {\n  const [count, setCount] = useState(0)\n  return (\n    <div>\n      <p>{count}</p>\n      <button onClick={() => setCount(c => c - step)}>Уменьшить</button>\n      <button onClick={() => setCount(c => c + step)}>Увеличить</button>\n      <button onClick={() => setCount(0)}>Сбросить</button>\n    </div>\n  )\n}',
    explanation:
      "Функциональное обновление вычисляет следующее значение из актуального предыдущего. Изменение пропса step влияет на следующие нажатия и не сбрасывает текущее состояние.",
    moduleId: "react",
  },
  {
    id: "event-delegation",
    number: "006",
    title: "Делегирование событий",
    topic: "Web",
    difficulty: "Средний",
    duration: "15 мин",
    description:
      "Назначьте один обработчик на список. При клике на кнопку внутри списка нужно получить её data-id, даже если пользователь нажал на вложенный элемент кнопки.",
    requirements: [
      "Не назначайте обработчик каждой кнопке.",
      "Проверьте, что найденная кнопка принадлежит списку.",
      "Игнорируйте клики вне кнопок.",
      "Используйте closest и проверку типа event.target.",
    ],
    example:
      '<ul id="list">\n  <li><button data-id="42"><span>Выбрать</span></button></li>\n</ul>\n// Клик по span → id "42"',
    starter:
      'const list = document.querySelector("#list")\n\nlist?.addEventListener("click", (event) => {\n  // Ваше решение\n})\n',
    solution:
      'const list = document.querySelector("#list")\n\nlist?.addEventListener("click", (event) => {\n  if (!(event.target instanceof Element)) return\n  const button = event.target.closest("button[data-id]")\n  if (!button || !list.contains(button)) return\n  console.log(button.getAttribute("data-id"))\n})',
    explanation:
      "Событие всплывает от вложенного элемента к списку. closest находит кнопку среди предков, а contains ограничивает обработку текущим контейнером.",
    moduleId: "browser",
  },
]
