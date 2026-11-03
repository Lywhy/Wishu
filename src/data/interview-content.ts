export type Difficulty = "Базовый" | "Средний" | "Продвинутый"

export interface Question {
  id: string
  title: string
  topic: string
  difficulty: Difficulty
  summary: string
  answer: string[]
  code?: string
  takeaway: string
  moduleId: string
}

export const questions: Question[] = [
  {
    id: "closures",
    title: "Что такое замыкание и когда оно полезно?",
    topic: "JavaScript",
    difficulty: "Базовый",
    summary: "Область видимости, лексическое окружение и доступ к внешним переменным.",
    answer: [
      "Замыкание — это сочетание функции и её лексического окружения. Функция сохраняет доступ к переменным из места, где она была создана, даже если внешняя функция уже завершилась.",
      "В примере каждый вызов createCounter создаёт отдельную переменную count. Возвращённая функция продолжает обращаться к ней. Замыкания используют для приватного состояния, фабрик функций и обработчиков событий.",
    ],
    code: "function createCounter() {\n  let count = 0\n  return () => ++count\n}\n\nconst next = createCounter()\nnext() // 1\nnext() // 2",
    takeaway: "Функция запоминает окружение создания, а не окружение вызова.",
    moduleId: "javascript",
  },
  {
    id: "event-loop",
    title: "В каком порядке выполняются задачи в event loop?",
    topic: "JavaScript",
    difficulty: "Средний",
    summary: "Стек вызовов, микрозадачи и таймеры.",
    answer: [
      "Синхронный код выполняется в стеке вызовов. Когда стек освобождается, среда выполняет очередь микрозадач, включая обработчики Promise и queueMicrotask. Только после этого может начаться следующая задача, например callback таймера.",
      "Поэтому в примере порядок вывода: 1, 3, 2. Нулевая задержка таймера не означает немедленный запуск. Микрозадачи, добавленные другими микрозадачами, тоже выполняются до следующей задачи.",
    ],
    code: "setTimeout(() => console.log(2), 0)\nPromise.resolve().then(() => console.log(3))\nconsole.log(1)\n// 1, 3, 2",
    takeaway: "Сначала синхронный код, затем микрозадачи, затем следующая задача.",
    moduleId: "javascript",
  },
  {
    id: "equality",
    title: "Чем отличаются == и ===?",
    topic: "JavaScript",
    difficulty: "Базовый",
    summary: "Строгое сравнение и неявное преобразование типов.",
    answer: [
      "Оператор === сравнивает значения без приведения типов. Если типы различаются, результат обычно false. Оператор == допускает приведение типов по правилам абстрактного равенства.",
      "Для предсказуемого сравнения обычно используют ===. При этом NaN не равен самому себе, а объекты сравниваются по ссылке. Object.is отличается от === поведением для NaN и знакового нуля.",
    ],
    code: '0 == "0"   // true\n0 === "0"  // false\n{} === {}  // false\nObject.is(NaN, NaN) // true',
    takeaway: "Уточняйте, сравниваете ли вы примитивы или ссылки на объекты.",
    moduleId: "javascript",
  },
  {
    id: "unknown-any",
    title: "Когда использовать unknown вместо any?",
    topic: "TypeScript",
    difficulty: "Базовый",
    summary: "Безопасная работа со значениями неизвестного типа.",
    answer: [
      "any отключает многие проверки типов для значения. unknown тоже может содержать значение любого типа, но требует проверки или сужения перед использованием.",
      "unknown подходит для внешних данных и границ системы. Проверка typeof, пользовательский type guard или схема валидации позволяет безопасно получить конкретный тип.",
    ],
    code: 'function format(value: unknown) {\n  if (typeof value === "string") {\n    return value.trim()\n  }\n  return ""\n}',
    takeaway: "unknown требует доказать тип перед выполнением операции.",
    moduleId: "typescript",
  },
  {
    id: "generics",
    title: "Какую задачу решают generics?",
    topic: "TypeScript",
    difficulty: "Средний",
    summary: "Сохранение связи между входными и выходными типами.",
    answer: [
      "Обобщения позволяют описывать алгоритм независимо от конкретного типа, сохраняя связь между его аргументами и результатом. В отличие от any, информация о типе не теряется.",
      "В примере тип результата зависит от типа элементов массива. Пустой массив вернёт undefined, поэтому это отражено в возвращаемом типе.",
    ],
    code: "function first<T>(items: T[]): T | undefined {\n  return items[0]\n}\n\nconst value = first([1, 2, 3]) // number | undefined",
    takeaway: "Generic полезен, когда между несколькими типами есть связь.",
    moduleId: "typescript",
  },
  {
    id: "react-keys",
    title: "Зачем React нужен key в списках?",
    topic: "React",
    difficulty: "Базовый",
    summary: "Идентичность элементов и сохранение состояния.",
    answer: [
      "key помогает React сопоставлять элементы между рендерами. Стабильный ключ позволяет сохранить состояние нужного компонента при перемещении элементов списка.",
      "Обычно ключом служит идентификатор из данных. Индекс может привести к ошибкам состояния, если элементы вставляются, удаляются или меняют порядок. key должен быть уникальным среди соседних элементов, а не во всём приложении.",
    ],
    code: "items.map((item) => (\n  <ProductCard key={item.id} product={item} />\n))",
    takeaway: "Ключ описывает идентичность элемента, а не его позицию.",
    moduleId: "react",
  },
  {
    id: "effects",
    title: "Для чего нужен useEffect и его cleanup?",
    topic: "React",
    difficulty: "Средний",
    summary: "Синхронизация с внешними системами и освобождение ресурсов.",
    answer: [
      "useEffect синхронизирует компонент с внешней системой: подпиской, таймером, сетевым соединением или браузерным API. Эффект не нужен для значения, которое можно вычислить во время рендера.",
      "Функция cleanup убирает предыдущую подписку перед повторным запуском эффекта с изменившимися зависимостями и при размонтировании. В StrictMode во время разработки React дополнительно проверяет корректность setup и cleanup.",
    ],
    code: 'useEffect(() => {\n  const onResize = () => updateWidth(window.innerWidth)\n  window.addEventListener("resize", onResize)\n  return () => window.removeEventListener("resize", onResize)\n}, [])',
    takeaway: "Каждому созданному ресурсу должно соответствовать освобождение.",
    moduleId: "react",
  },
  {
    id: "http-cache",
    title: "Чем Cache-Control отличается от ETag?",
    topic: "Web",
    difficulty: "Средний",
    summary: "Свежесть кеша и условные HTTP-запросы.",
    answer: [
      "Cache-Control задаёт политику кеширования, например срок свежести и правила повторного использования ответа. ETag — идентификатор версии ресурса для проверки, изменилось ли содержимое.",
      "Клиент может отправить ETag в If-None-Match. Если представление не изменилось, сервер возвращает 304 без тела. no-cache разрешает хранить ответ, но требует проверки перед использованием; no-store запрещает его хранение кешем.",
    ],
    takeaway: "Свежесть и проверка актуальности — разные задачи, которые дополняют друг друга.",
    moduleId: "browser",
  },
  {
    id: "git-rebase",
    title: "Когда выбирать merge, а когда rebase?",
    topic: "Инструменты",
    difficulty: "Средний",
    summary: "История изменений и совместная работа с ветками.",
    answer: [
      "Merge объединяет истории веток и может создавать коммит слияния. Rebase переносит коммиты поверх новой базы, создавая для них новые идентификаторы.",
      "Rebase удобен для подготовки своей локальной ветки к интеграции. Переписывание опубликованной истории требует договорённости с командой: другие разработчики уже могли построить на ней свои изменения.",
    ],
    takeaway: "Перед rebase важно понять, кто ещё использует историю этой ветки.",
    moduleId: "git",
  },
  {
    id: "nestjs-dependencies",
    title: "Как NestJS связывает контроллеры и сервисы?",
    topic: "NestJS",
    difficulty: "Базовый",
    summary: "Модули, провайдеры и внедрение зависимостей.",
    answer: [
      "Контроллер принимает HTTP-запрос и передаёт работу сервису. Сервис регистрируется как провайдер в модуле, а контейнер NestJS создаёт и передаёт его экземпляр через конструктор.",
      "Чтобы использовать провайдер в другом модуле, его экспортируют из исходного модуля, а исходный модуль импортируют в потребляющий. Такой подход помогает разделять обязанности и заменять зависимости при тестировании.",
    ],
    takeaway:
      "Контроллер отвечает за HTTP, сервис — за логику, модуль — за доступность зависимостей.",
    moduleId: "nestjs",
  },
  {
    id: "postgresql-indexes",
    title: "Зачем нужны индексы и почему они не всегда ускоряют запрос?",
    topic: "PostgreSQL",
    difficulty: "Средний",
    summary: "Поиск данных, селективность и стоимость обновления индекса.",
    answer: [
      "Индекс — дополнительная структура данных, которая может помочь найти строки без просмотра всей таблицы. Например, B-tree подходит для многих сравнений и диапазонов по индексированным полям.",
      "Планировщик оценивает стоимость выполнения. Если запрос возвращает большую часть таблицы, последовательное сканирование может быть дешевле. Индексы занимают место и требуют обновления при изменении данных, поэтому добавлять их нужно под реальные запросы.",
    ],
    code: "CREATE INDEX users_email_idx ON users (email);",
    takeaway:
      "Пользу индекса оценивают по запросу и плану выполнения, а не только по наличию индекса.",
    moduleId: "postgresql",
  },
  {
    id: "prototype-chain",
    title: "Как работает цепочка прототипов?",
    topic: "JavaScript",
    difficulty: "Средний",
    summary: "Поиск свойств объекта и наследование через прототип.",
    answer: [
      "При чтении свойства JavaScript сначала проверяет сам объект. Если свойства нет, поиск продолжается в его прототипе и далее по цепочке, пока свойство не будет найдено или цепочка не завершится на null.",
      "Object.create позволяет создать объект с заданным прототипом. Унаследованное свойство доступно при чтении, но не считается собственным: для проверки собственных свойств можно использовать Object.hasOwn.",
    ],
    code: 'const parent = { role: "user" }\nconst child = Object.create(parent)\nchild.role // "user"\nObject.hasOwn(child, "role") // false',
    takeaway: "Доступность свойства и наличие собственного свойства — не одно и то же.",
    moduleId: "javascript",
  },
  {
    id: "semantic-button",
    title: "Почему для действия лучше использовать button, а не div?",
    topic: "Web",
    difficulty: "Базовый",
    summary: "Семантика, фокус и клавиатурное управление.",
    answer: [
      "Элемент button сообщает браузеру и вспомогательным технологиям, что он выполняет действие. Он поддерживает фокус и активацию с клавиатуры без самостоятельной реализации этого поведения.",
      "Для перехода по адресу используют ссылку, а для действия — кнопку. У кнопки внутри формы при необходимости задают type=button, чтобы она не отправляла форму. Добавление только обработчика клика к div не обеспечивает поведение настоящей кнопки.",
    ],
    code: '<button type="button">Сохранить</button>',
    takeaway: "Нативная семантика даёт доступное поведение по умолчанию.",
    moduleId: "html-css",
  },
  {
    id: "variables",
    title: "Чем отличаются var, let и const?",
    topic: "JavaScript",
    difficulty: "Базовый",
    summary: "Область видимости, переопределение и инициализация переменных.",
    answer: [
      "var имеет область видимости функции или скрипта, а let и const — блочную область видимости. Объявления var обрабатываются до выполнения кода, и до присваивания значение переменной равно undefined. Для let и const доступ до инициализации приводит к ошибке из-за временной мёртвой зоны.",
      "let позволяет переназначать переменную. const требует инициализации при объявлении и запрещает переназначение привязки. При этом const не делает объект неизменяемым: его свойства можно изменять.",
    ],
    code: 'const user = { name: "Аня" }\nuser.name = "Оля" // допустимо\n\nlet count = 0\ncount = count + 1',
    takeaway: "const защищает привязку переменной, а не содержимое объекта.",
    moduleId: "javascript",
  },
  {
    id: "null-undefined",
    title: "В чём разница между null и undefined?",
    topic: "JavaScript",
    difficulty: "Базовый",
    summary: "Два способа представить отсутствие значения.",
    answer: [
      "undefined часто означает, что значение ещё не задано: например, у объявленной без инициализации переменной, отсутствующего свойства или функции без явного результата. null обычно задают намеренно, чтобы обозначить отсутствие значения.",
      "Это разные примитивные значения. Их строгое сравнение даёт false, а нестрогое — true. Проверка typeof null возвращает object по историческим причинам; null при этом не является объектом.",
    ],
    code: 'null === undefined // false\nnull == undefined // true\ntypeof undefined // "undefined"\ntypeof null // "object"',
    takeaway:
      "Отсутствие значения имеет смысл в контексте данных: договаривайтесь, что обозначают null и undefined.",
    moduleId: "javascript",
  },
]

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
      "Set хранит уникальные значения в порядке добавления. Spread создаёт новый массив. Ожидаемая сложность по времени — O(n), дополнительная память — O(n).",
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
      "Начальное значение — 0.",
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
