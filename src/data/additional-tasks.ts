import type { PracticeTask } from "./interview-content"

export const additionalTasks: PracticeTask[] = [
  {
    id: "array-chunk",
    number: "007",
    topic: "JavaScript",
    title: "Разбиение массива на части",
    description:
      "Реализуйте chunk(items, size), которая разбивает массив на последовательные группы заданного размера.",
    requirements: [
      "size - положительное целое число.",
      "Последняя группа может быть короче.",
      "Не меняйте исходный массив; для пустого массива верните [].",
    ],
    example: "chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]",
    starter: "function chunk(items, size) {\n  // Ваше решение\n}\n",
    solution:
      "function chunk(items, size) {\n  const result = []\n  for (let i = 0; i < items.length; i += size) {\n    result.push(items.slice(i, i + size))\n  }\n  return result\n}",
    explanation:
      "Сдвигайтесь на size и копируйте очередной срез. Каждый элемент попадёт ровно в одну группу. Время и дополнительная память - O(n).",
    difficulty: "Средний",
    duration: "15 мин",
    moduleId: "javascript",
  },
  {
    id: "flatten-array",
    number: "008",
    topic: "JavaScript",
    title: "Плоский массив",
    description:
      "Реализуйте flatten(items): превратите вложенные массивы чисел в один массив, сохраняя порядок.",
    requirements: [
      "Глубина вложенности произвольная, в пределах стека вызовов.",
      "Пустые вложенные массивы не добавляют элементов.",
      "Не меняйте входные массивы.",
    ],
    example: "flatten([1, [2, [3]], [], 4]) // [1, 2, 3, 4]",
    starter: "function flatten(items) {\n  // Ваше решение\n}\n",
    solution:
      "function flatten(items) {\n  const result = []\n  for (const item of items) {\n    if (Array.isArray(item)) result.push(...flatten(item))\n    else result.push(item)\n  }\n  return result\n}",
    explanation:
      "Обойдите элементы в исходном порядке. Для массива рекурсивно добавьте его содержимое, для числа добавьте само число. Нужна память под результат и стек вложенности.",
    difficulty: "Средний",
    duration: "15 мин",
    moduleId: "javascript",
  },
  {
    id: "partition-array",
    number: "009",
    topic: "JavaScript",
    title: "Разделение по предикату",
    description:
      "Напишите partition(items, predicate), возвращающую два массива: подходящие элементы и все остальные.",
    requirements: [
      "Вызовите predicate для каждого элемента ровно один раз.",
      "Сохраните порядок в каждой части.",
      "Не изменяйте исходный массив.",
    ],
    example: "partition([1, 2, 3, 4], n => n % 2 === 0) // [[2, 4], [1, 3]]",
    starter: "function partition(items, predicate) {\n  // Ваше решение\n}\n",
    solution:
      "function partition(items, predicate) {\n  const yes = [], no = []\n  for (const item of items) {\n    ;(predicate(item) ? yes : no).push(item)\n  }\n  return [yes, no]\n}",
    explanation:
      "Один проход распределяет элементы в два накопителя без сортировки. Время и память - O(n).",
    difficulty: "Средний",
    duration: "15 мин",
    moduleId: "javascript",
  },
  {
    id: "count-characters",
    number: "010",
    topic: "JavaScript",
    title: "Частота символов",
    description:
      "Реализуйте countCharacters(text), возвращающую объект с количеством каждого символа строки.",
    requirements: [
      "Учитывайте регистр и пробелы.",
      "Считайте Unicode code points: одиночный emoji - один символ.",
      "Для пустой строки верните пустой объект.",
    ],
    example: 'countCharacters("aba") // { a: 2, b: 1 }',
    starter: "function countCharacters(text) {\n  // Ваше решение\n}\n",
    solution:
      "function countCharacters(text) {\n  const result = {}\n  for (const char of text) result[char] = (result[char] ?? 0) + 1\n  return result\n}",
    explanation:
      "for...of обходит code points строки, в отличие от индексации по UTF-16 кодовым единицам. Составные emoji из нескольких code points считаются несколькими символами.",
    difficulty: "Средний",
    duration: "15 мин",
    moduleId: "javascript",
  },
  {
    id: "typed-get",
    number: "011",
    topic: "TypeScript",
    title: "Типобезопасный доступ к полю",
    description:
      "Реализуйте getProperty(object, key): тип результата должен совпадать с типом выбранного свойства.",
    requirements: [
      "Используйте generics и keyof.",
      "Запретите несуществующие ключи.",
      "Не используйте any и не изменяйте объект.",
    ],
    example: 'getProperty({ name: "Ann", age: 25 }, "age") // 25, тип number',
    starter:
      "function getProperty<T extends object, K extends keyof T>(object: T, key: K): T[K] {\n  // Ваше решение\n}\n",
    solution:
      "function getProperty<T extends object, K extends keyof T>(object: T, key: K): T[K] {\n  return object[key]\n}",
    explanation: "K связан с keyof T, а индексированный тип T[K] сохраняет тип конкретного поля.",
    difficulty: "Средний",
    duration: "15 мин",
    moduleId: "typescript",
  },
  {
    id: "typed-first",
    number: "012",
    topic: "TypeScript",
    title: "Первый элемент без потери типа",
    description:
      "Реализуйте first(items), возвращающую первый элемент либо undefined для пустого массива.",
    requirements: [
      "Принимайте readonly-массивы.",
      "Возвращаемый тип - T | undefined.",
      "Не используйте any и не меняйте массив.",
    ],
    example: "first([10, 20]) // 10\nfirst([]) // undefined",
    starter: "function first<T>(items: readonly T[]): T | undefined {\n  // Ваше решение\n}\n",
    solution: "function first<T>(items: readonly T[]): T | undefined {\n  return items[0]\n}",
    explanation:
      "Generic сохраняет тип элементов. Объединение с undefined заставляет вызывающий код обработать пустой массив.",
    difficulty: "Базовый",
    duration: "15 мин",
    moduleId: "typescript",
  },
  {
    id: "typed-result",
    number: "013",
    topic: "TypeScript",
    title: "Обёртка успешного результата",
    description:
      "Реализуйте success(value), возвращающую дискриминируемый результат { ok: true, value }.",
    requirements: [
      "Сохраните тип value через generic.",
      "Тип ok должен быть литералом true, а не boolean.",
      "Не используйте any.",
    ],
    example: "success(42) // { ok: true, value: 42 }",
    starter: "function success<T>(value: T): { ok: true; value: T } {\n  // Ваше решение\n}\n",
    solution:
      "function success<T>(value: T): { ok: true; value: T } {\n  return { ok: true, value }\n}",
    explanation:
      "Литерал true можно использовать как дискриминант объединения успешного и ошибочного результата. Generic не теряет тип полезной нагрузки.",
    difficulty: "Базовый",
    duration: "15 мин",
    moduleId: "typescript",
  },
  {
    id: "typed-merge",
    number: "014",
    topic: "TypeScript",
    title: "Объединение объектов с заменой полей",
    description:
      "Реализуйте mergeObjects(left, right): поля правого объекта должны заменять совпадающие поля левого, включая их типы.",
    requirements: [
      "Результат имеет тип Omit<A, keyof B> & B.",
      "Не меняйте входные объекты.",
      "Работайте с собственными перечисляемыми строковыми полями, без any.",
    ],
    example: 'mergeObjects({ id: 1, name: "Ann" }, { id: "new" }) // { id: "new", name: "Ann" }',
    starter:
      "function mergeObjects<A extends object, B extends object>(left: A, right: B): Omit<A, keyof B> & B {\n  // Ваше решение\n}\n",
    solution:
      "function mergeObjects<A extends object, B extends object>(left: A, right: B): Omit<A, keyof B> & B {\n  return { ...left, ...right } as Omit<A, keyof B> & B\n}",
    explanation:
      "Пересечение A & B ошибочно описывало бы конфликтующие типы одного ключа. Сначала Omit убирает заменяемые поля, затем добавляется B.",
    difficulty: "Средний",
    duration: "15 мин",
    moduleId: "typescript",
  },
  {
    id: "typed-pluck",
    number: "015",
    topic: "TypeScript",
    title: "Выбор поля из списка объектов",
    description:
      "Напишите pluck(items, key), возвращающую массив значений одного поля с сохранением типа.",
    requirements: [
      "Принимайте readonly-массив объектов.",
      "Результат - T[K][].",
      "Запретите несуществующие ключи; не используйте any и не меняйте вход.",
    ],
    example: 'pluck([{ id: 1 }, { id: 2 }], "id") // [1, 2]',
    starter:
      "function pluck<T extends object, K extends keyof T>(items: readonly T[], key: K): T[K][] {\n  // Ваше решение\n}\n",
    solution:
      "function pluck<T extends object, K extends keyof T>(items: readonly T[], key: K): T[K][] {\n  return items.map(item => item[key])\n}",
    explanation:
      "map создаёт новый массив. Индексированный тип связывает тип каждого результата с выбранным полем объекта.",
    difficulty: "Средний",
    duration: "15 мин",
    moduleId: "typescript",
  },
  {
    id: "typed-map-values",
    number: "016",
    topic: "TypeScript",
    title: "Типизированное преобразование значений",
    description:
      "Реализуйте mapValues(object, transform): сохраните ключи объекта, применив transform к каждому значению.",
    requirements: [
      "Вход имеет тип Record<string, T>, результат - Record<string, U>.",
      "Передавайте transform значение и строковый ключ.",
      "Не используйте any и не меняйте входной объект.",
    ],
    example: 'mapValues({ a: 1, b: 2 }, (value, key) => key + value) // { a: "a1", b: "b2" }',
    starter:
      "function mapValues<T, U>(object: Record<string, T>, transform: (value: T, key: string) => U): Record<string, U> {\n  // Ваше решение\n}\n",
    solution:
      "function mapValues<T, U>(object: Record<string, T>, transform: (value: T, key: string) => U): Record<string, U> {\n  const result: Record<string, U> = {}\n  for (const key of Object.keys(object)) {\n    Object.defineProperty(result, key, { value: transform(object[key], key), enumerable: true, writable: true, configurable: true })\n  }\n  return result\n}",
    explanation:
      "Раздельные параметры T и U позволяют менять тип значений. defineProperty безопасно создаёт собственное поле даже для ключа __proto__.",
    difficulty: "Продвинутый",
    duration: "15 мин",
    moduleId: "typescript",
  },
  {
    id: "react-toggle",
    number: "017",
    topic: "React",
    title: "Переключатель состояния",
    description:
      "Создайте Toggle: кнопка «Переключить» меняет состояние между «Выключено» и «Включено».",
    requirements: [
      "Используйте состояние React, без прямого изменения DOM.",
      "Отображайте текущее значение в одном элементе <output>.",
      "Сохраните указанные подписи кнопок: они используются в проверках.",
      "Начальное состояние - «Выключено».",
    ],
    example: "<Toggle /> // Выключено → Переключить → Включено",
    starter:
      'import { useState } from "react"\n\nexport function Toggle(props) {\n  // Ваше решение\n}\n',
    solution:
      'import { useState } from "react"\nexport function Toggle() {\n  const [enabled, setEnabled] = useState(false)\n  return <div><output>{enabled ? "Включено" : "Выключено"}</output><button onClick={() => setEnabled(value => !value)}>Переключить</button></div>\n}',
    explanation:
      "Функциональное обновление инвертирует актуальное состояние. Представление вычисляется из boolean при рендере.",
    difficulty: "Средний",
    duration: "20 мин",
    moduleId: "react",
  },
  {
    id: "react-tabs",
    number: "018",
    topic: "React",
    title: "Переключение вкладок",
    description:
      "Создайте Tabs с пропсом tabs: массивом { id, title, content }. Покажите кнопки вкладок и содержимое активной.",
    requirements: [
      "Используйте состояние React, без прямого изменения DOM.",
      "Отображайте текущее значение в одном элементе <output>.",
      "Сохраните указанные подписи кнопок: они используются в проверках.",
      "Начально активна первая вкладка.",
      'У каждой кнопки role="tab" и корректный aria-selected.',
      "Для пустого массива выведите «Нет вкладок» в output.",
    ],
    example: '<Tabs tabs={[{ id: "a", title: "Первая", content: "Текст A" }]} />',
    starter:
      'import { useState } from "react"\n\nexport function Tabs(props) {\n  // Ваше решение\n}\n',
    solution:
      'import { useState } from "react"\nexport function Tabs({ tabs }) {\n  const [active, setActive] = useState(tabs[0]?.id)\n  const selected = tabs.find(tab => tab.id === active) ?? tabs[0]\n  return <div><div role="tablist">{tabs.map(tab => <button key={tab.id} role="tab" aria-selected={tab.id === selected?.id} onClick={() => setActive(tab.id)}>{tab.title}</button>)}</div><output>{selected?.content ?? "Нет вкладок"}</output></div>\n}',
    explanation:
      "Храните идентификатор выбранной вкладки. Стабильный id подходит для key и поиска содержимого; aria-selected сообщает выбранное состояние.",
    difficulty: "Средний",
    duration: "20 мин",
    moduleId: "react",
  },
  {
    id: "react-disclosure",
    number: "019",
    topic: "React",
    title: "Раскрывающийся блок",
    description:
      "Создайте Disclosure с пропсом text и кнопкой «Подробнее». Кнопка показывает текст, затем скрывает его.",
    requirements: [
      "Используйте состояние React, без прямого изменения DOM.",
      "Отображайте текущее значение в одном элементе <output>.",
      "Сохраните указанные подписи кнопок: они используются в проверках.",
      "Начально output пустой.",
      "Кнопка имеет aria-expanded, соответствующий состоянию.",
    ],
    example: '<Disclosure text="Описание" /> // Подробнее → Описание',
    starter:
      'import { useState } from "react"\n\nexport function Disclosure(props) {\n  // Ваше решение\n}\n',
    solution:
      'import { useState } from "react"\nexport function Disclosure({ text }) {\n  const [open, setOpen] = useState(false)\n  return <div><button aria-expanded={open} onClick={() => setOpen(value => !value)}>Подробнее</button><output>{open ? text : ""}</output></div>\n}',
    explanation:
      "Boolean управляет содержимым и aria-expanded из одного источника. Пустой output оставляет понятную область результата.",
    difficulty: "Средний",
    duration: "20 мин",
    moduleId: "react",
  },
  {
    id: "react-pagination",
    number: "020",
    topic: "React",
    title: "Ограниченная пагинация",
    description:
      "Создайте Pager с пропсом totalPages (положительное целое). Кнопки «Назад» и «Вперёд» переключают номер страницы.",
    requirements: [
      "Используйте состояние React, без прямого изменения DOM.",
      "Отображайте текущее значение в одном элементе <output>.",
      "Сохраните указанные подписи кнопок: они используются в проверках.",
      "Начальная страница - 1.",
      "На границах соответствующая кнопка disabled.",
      "В output показывайте только текущий номер.",
    ],
    example: "<Pager totalPages={3} /> // 1 → Вперёд → 2",
    starter:
      'import { useState } from "react"\n\nexport function Pager(props) {\n  // Ваше решение\n}\n',
    solution:
      'import { useState } from "react"\nexport function Pager({ totalPages }) {\n  const [page, setPage] = useState(1)\n  return <div><button disabled={page === 1} onClick={() => setPage(value => Math.max(1, value - 1))}>Назад</button><output>{page}</output><button disabled={page === totalPages} onClick={() => setPage(value => Math.min(totalPages, value + 1))}>Вперёд</button></div>\n}',
    explanation:
      "Состояние содержит номер, а disabled вычисляется из границ. Ограничение в обновляющей функции дополнительно сохраняет допустимый диапазон.",
    difficulty: "Средний",
    duration: "20 мин",
    moduleId: "react",
  },
  {
    id: "react-remove-item",
    number: "021",
    topic: "React",
    title: "Удаление элемента списка",
    description:
      "Создайте RemovableList с пропсом initialItems: массивом { id, title }. У каждого элемента списка есть кнопка «Удалить {title}».",
    requirements: [
      "Используйте состояние React, без прямого изменения DOM.",
      "Отображайте текущее значение в одном элементе <output>.",
      "Сохраните указанные подписи кнопок: они используются в проверках.",
      "Храните собственный список в состоянии, не меняя initialItems.",
      "В output показывайте количество элементов.",
      "Названия элементов выводите внутри li; id уникальны.",
    ],
    example: '<RemovableList initialItems={[{ id: 1, title: "A" }]} /> // Удалить A → 0',
    starter:
      'import { useState } from "react"\n\nexport function RemovableList(props) {\n  // Ваше решение\n}\n',
    solution:
      'import { useState } from "react"\nexport function RemovableList({ initialItems }) {\n  const [items, setItems] = useState(initialItems)\n  return <div><output>{items.length}</output><ul>{items.map(item => <li key={item.id}>{item.title}<button onClick={() => setItems(current => current.filter(value => value.id !== item.id))}>Удалить {item.title}</button></li>)}</ul></div>\n}',
    explanation:
      "filter создаёт новый массив, поэтому пропс не мутируется. Удаление по id не зависит от положения элемента в списке.",
    difficulty: "Средний",
    duration: "20 мин",
    moduleId: "react",
  },
  {
    id: "react-rating",
    number: "022",
    topic: "React",
    title: "Выбор оценки",
    description: "Создайте Rating с пятью кнопками «1», «2», «3», «4», «5» и кнопкой «Сбросить».",
    requirements: [
      "Используйте состояние React, без прямого изменения DOM.",
      "Отображайте текущее значение в одном элементе <output>.",
      "Сохраните указанные подписи кнопок: они используются в проверках.",
      "Начальная оценка - 0.",
      "Нажатие выбирает оценку; только выбранная кнопка имеет aria-pressed=true.",
      "Сброс возвращает 0, все кнопки оценки становятся невыбранными.",
    ],
    example: "<Rating /> // 0 → 4 → 4 → Сбросить → 0",
    starter:
      'import { useState } from "react"\n\nexport function Rating(props) {\n  // Ваше решение\n}\n',
    solution:
      'import { useState } from "react"\nexport function Rating() {\n  const [rating, setRating] = useState(0)\n  return <div><output>{rating}</output>{[1, 2, 3, 4, 5].map(value => <button key={value} aria-pressed={rating === value} onClick={() => setRating(value)}>{value}</button>)}<button onClick={() => setRating(0)}>Сбросить</button></div>\n}',
    explanation:
      "Одного числового состояния достаточно и для текста результата, и для aria-pressed каждой кнопки. Повторный выбор не увеличивает оценку.",
    difficulty: "Средний",
    duration: "20 мин",
    moduleId: "react",
  },
]
