import type { PracticeTask } from "./interview-content"

export const javascriptInterviewTasks: PracticeTask[] = [
  {
    id: "js-throttle",
    number: "023",
    title: "Throttle без отложенного вызова",
    description:
      "Реализуйте throttle(fn, wait): первый вызов проходит сразу, следующие подавляются до истечения wait миллисекунд с последнего разрешённого вызова.",
    requirements: [
      "wait - положительное целое число. Время определяйте через Date.now().",
      "Вызов на границе wait разрешён. Подавленные вызовы не сдвигают границу.",
      "Не планируйте отложенный вызов: здесь только leading, без trailing.",
      "Передавайте исходные this и все аргументы, возвращайте результат fn. Для подавленного вызова верните undefined.",
      "Экземпляры независимы. Если fn бросает ошибку, она выходит наружу, а интервал всё равно отсчитывается от этого вызова.",
    ],
    example:
      "const limited = throttle((x) => x * 2, 100)\nlimited(3) // 6\nlimited(4) // undefined, если ещё не прошло 100 мс",
    starter: "function throttle(fn, wait) {\n  // Ваше решение\n}\n",
    solution:
      "function throttle(fn, wait) {\n  let previous = -Infinity\n  return function (...args) {\n    const now = Date.now()\n    if (now - previous < wait) return undefined\n    previous = now\n    return fn.apply(this, args)\n  }\n}",
    explanation:
      "Замыкание хранит время разрешённого вызова. Обновляйте его до fn, чтобы исключение не отменяло интервал. Подавленный вызов не меняет previous. Это явно ограниченная версия throttle: отложенного выполнения последнего обращения нет.",
    difficulty: "Средний",
    duration: "20 мин",
    topic: "JavaScript",
    moduleId: "javascript",
  },
  {
    id: "js-simple-bind",
    number: "024",
    title: "Привязка контекста и аргументов",
    description:
      "Напишите simpleBind(fn, context, ...preset), возвращающую функцию с закреплённым контекстом и начальными аргументами.",
    requirements: [
      "При вызове объединяйте preset и новые аргументы в исходном порядке.",
      "Закреплённый context не меняется даже при вызове обёртки через call с другим this.",
      "Возвращайте результат fn без преобразований; исключения должны распространяться.",
      "Не изменяйте context и массивы аргументов. Для строгой функции сохраняйте null и undefined как this.",
      "Реализуйте через call, apply или Reflect.apply, без нативного bind. Поддержка new, name, length и конструктора не требуется: это не полный полифил.",
    ],
    example:
      "function sum(a, b) { return this.base + a + b }\nconst add = simpleBind(sum, { base: 10 }, 2)\nadd(3) // 15",
    starter: "function simpleBind(fn, context, ...preset) {\n  // Ваше решение\n}\n",
    solution:
      "function simpleBind(fn, context, ...preset) {\n  return function (...args) {\n    return Reflect.apply(fn, context, [...preset, ...args])\n  }\n}",
    explanation:
      "Замыкание сохраняет функцию, контекст и начальные аргументы. this обёртки не участвует в вызове исходной функции. Нативный bind дополнительно поддерживает конструирование и специальные свойства, поэтому эту реализацию нельзя выдавать за полный полифил.",
    difficulty: "Средний",
    duration: "20 мин",
    topic: "JavaScript",
    moduleId: "javascript",
  },
  {
    id: "js-promise-all",
    number: "025",
    title: "Своя агрегация Promise.all",
    description:
      "Реализуйте promiseAll(values) для массива значений, промисов и thenable-объектов.",
    requirements: [
      "Верните Promise с массивом результатов в порядке входа, независимо от порядка завершения.",
      "Для пустого массива верните Promise с []. Входной массив не изменяется.",
      "Поддержите обычные значения и thenable через Promise.resolve.",
      "Первое отклонение завершает агрегат с исходной причиной, не дожидаясь зависшего соседа. Оставшиеся операции не отменяются.",
      "Каждое входное значение обрабатывается один раз. Не используйте Promise.all, allSettled или таймеры для координации; произвольный iterable и подклассы Promise не требуются.",
    ],
    example: "await promiseAll([Promise.resolve(1), 2]) // [1, 2]\nawait promiseAll([]) // []",
    starter: "function promiseAll(values) {\n  // Ваше решение\n}\n",
    solution:
      "function promiseAll(values) {\n  return new Promise((resolve, reject) => {\n    const result = new Array(values.length)\n    let remaining = values.length\n    if (!remaining) { resolve(result); return }\n    for (let i = 0; i < values.length; i++) {\n      Promise.resolve(values[i]).then((value) => {\n        result[i] = value\n        if (--remaining === 0) resolve(result)\n      }, reject)\n    }\n  })\n}",
    explanation:
      "Сохраняйте индекс входа для каждого результата и счётчик незавершённых элементов. Promise.resolve ассимилирует thenable. reject принимает исходную причину; завершённый агрегат игнорирует последующие попытки изменить своё состояние.",
    difficulty: "Продвинутый",
    duration: "30 мин",
    topic: "JavaScript",
    moduleId: "javascript",
  },
  {
    id: "js-async-pool",
    number: "026",
    title: "Ограничитель параллельных операций",
    description:
      "Реализуйте runPool(tasks, limit): запускайте массив функций с ограничением числа одновременных операций.",
    requirements: [
      "tasks - массив функций без аргументов, возвращающих значения или Promise; limit - положительное целое число.",
      "Возвращайте Promise массива результатов в исходном порядке. Пустой вход даёт []. Массив tasks не изменяется.",
      "Каждую функцию запускайте ровно один раз, в порядке входа. Пока есть очередь, занимайте все доступные слоты.",
      "После первого обнаруженного отклонения или синхронного исключения прекратите новые запуски и отклоните результат с той же причиной.",
      "Уже начатую работу отменять не требуется, но её поздние отклонения должны быть обработаны. Управляйте слотами через Promise, без опроса таймерами.",
    ],
    example:
      "const tasks = [() => Promise.resolve('a'), () => 'b']\nawait runPool(tasks, 1) // ['a', 'b']",
    starter: "function runPool(tasks, limit) {\n  // Ваше решение\n}\n",
    solution:
      "function runPool(tasks, limit) {\n  return new Promise((resolve, reject) => {\n    const result = new Array(tasks.length)\n    let next = 0, active = 0, completed = 0, stopped = false\n    if (!tasks.length) { resolve(result); return }\n    function launch() {\n      while (!stopped && active < limit && next < tasks.length) {\n        const index = next++\n        active++\n        Promise.resolve().then(() => tasks[index]()).then((value) => {\n          active--\n          result[index] = value\n          completed++\n          if (completed === tasks.length) resolve(result)\n          else launch()\n        }, (error) => {\n          active--\n          stopped = true\n          reject(error)\n        })\n      }\n    }\n    launch()\n  })\n}",
    explanation:
      "Передавайте отложенные функции, а не уже запущенные Promise. Планировщик занимает свободные слоты и освобождает их после завершения. Индексы отделяют порядок результата от порядка завершения; общий флаг прекращает новые запуски после обнаружения ошибки.",
    difficulty: "Продвинутый",
    duration: "35 мин",
    topic: "JavaScript",
    moduleId: "javascript",
  },
  {
    id: "js-event-emitter",
    number: "027",
    title: "EventEmitter с отпиской",
    description:
      "Реализуйте createEmitter() с методами on(event, listener) и emit(event, ...args).",
    requirements: [
      "on возвращает функцию отписки. Повторная отписка безопасна.",
      "Каждая регистрация независима: одну функцию можно зарегистрировать дважды и отдельно удалить каждую подписку.",
      "emit синхронно вызывает слушателей в порядке регистрации со всеми аргументами. Его возвращаемое значение не проверяется.",
      "Набор слушателей фиксируется в начале emit: добавление и удаление во время вызова влияет только на следующие emit.",
      "Имена вроде __proto__ безопасны, экземпляры независимы. Исключение слушателя выходит наружу и прерывает текущую рассылку.",
    ],
    example:
      "const bus = createEmitter()\nconst off = bus.on('message', (text) => console.log(text))\nbus.emit('message', 'hello')\noff()\nbus.emit('message', 'уже не будет выведено')",
    starter: "function createEmitter() {\n  // Ваше решение\n}\n",
    solution:
      "function createEmitter() {\n  const events = new Map()\n  return {\n    on(event, listener) {\n      const entry = { listener }\n      const list = events.get(event) ?? []\n      list.push(entry)\n      events.set(event, list)\n      return () => {\n        const current = events.get(event)\n        if (!current) return\n        const index = current.indexOf(entry)\n        if (index >= 0) current.splice(index, 1)\n        if (!current.length) events.delete(event)\n      }\n    },\n    emit(event, ...args) {\n      for (const entry of [...(events.get(event) ?? [])]) {\n        entry.listener(...args)\n      }\n    },\n  }\n}",
    explanation:
      "Map безопасно хранит любые строковые ключи. Отдельная запись на регистрацию сохраняет независимость одинаковых функций. Снимок списка обеспечивает заранее оговорённую семантику изменений во время emit; отписка удаляет конкретную запись и освобождает пустую группу.",
    difficulty: "Продвинутый",
    duration: "30 мин",
    topic: "JavaScript",
    moduleId: "javascript",
  },
  {
    id: "js-retry",
    number: "028",
    title: "Повторные попытки с backoff",
    description:
      "Реализуйте retry(operation, attempts, baseDelay, sleep). Функция sleep передаётся извне и возвращает Promise ожидания.",
    requirements: [
      "attempts - целое от 1 до 5, включая первую попытку. baseDelay - положительное целое число.",
      "Вызывайте operation без аргументов. Она может вернуть значение, Promise или бросить синхронную ошибку.",
      "Перед повтором после неудачи ждите sleep(baseDelay * 2 ** failureIndex), где failureIndex начинается с 0.",
      "Верните Promise первого успешного значения. При исчерпании попыток отклоните его с последней исходной причиной.",
      "Нет ожидания до первой попытки и после последней неудачи. Ошибка sleep сразу выходит наружу без нового вызова operation.",
      "operation гарантированно безопасна для повтора. Jitter, отмена, классификация HTTP-ошибок и deadline в эту учебную задачу не входят.",
    ],
    example:
      "let calls = 0\nconst operation = () => {\n  if (++calls < 2) throw new Error('временный сбой')\n  return 'готово'\n}\nawait retry(operation, 3, 100, (ms) => new Promise(r => setTimeout(r, ms)))",
    starter:
      "async function retry(operation, attempts, baseDelay, sleep) {\n  // Ваше решение\n}\n",
    solution:
      "async function retry(operation, attempts, baseDelay, sleep) {\n  for (let attempt = 0; attempt < attempts; attempt++) {\n    try {\n      return await operation()\n    } catch (error) {\n      if (attempt + 1 === attempts) throw error\n    }\n    await sleep(baseDelay * 2 ** attempt)\n  }\n}",
    explanation:
      "await внутри try позволяет перехватить и синхронную ошибку, и отклонение Promise. Ожидание вынесено за catch операции, поэтому его ошибка не запускает следующую попытку. В production нужно отдельно определить безопасные повторы, предел ожидания, jitter и отмену.",
    difficulty: "Продвинутый",
    duration: "30 мин",
    topic: "JavaScript",
    moduleId: "javascript",
  },
]
