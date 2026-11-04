// This function is serialized into an opaque-origin sandbox. Keep it self-contained.
export async function taskSandbox(config) {
  const results = config.lesson ? [] : [...config.checks]
  const started = performance.now()
  const guard = () => {
    if (performance.now() - started > 1200) throw new Error("Превышено время выполнения.")
  }
  const assert = (condition, message = "Результат не соответствует условию.") => {
    if (!condition) throw new Error(message)
  }
  const same = (a, b) => {
    if (Object.is(a, b)) return true
    if (!a || !b || typeof a !== "object" || typeof b !== "object") return false
    const keys = Object.keys(a)
    return (
      Array.isArray(a) === Array.isArray(b) &&
      (!Array.isArray(a) || a.length === b.length) &&
      keys.length === Object.keys(b).length &&
      keys.every((key) => Object.hasOwn(b, key) && same(a[key], b[key]))
    )
  }
  const modules = {}
  const require = (name) => {
    if (modules[name]) return modules[name].exports
    if (!Object.hasOwn(config.modules, name)) throw new Error("Импорт не поддерживается: " + name)
    const module = { exports: {} }
    modules[name] = module
    new Function("require", "module", "exports", config.modules[name])(
      require,
      module,
      module.exports,
    )
    return module.exports
  }
  const logs = []
  const output = { ...console, log: (...args) => logs.push(args) }
  const load = () => {
    const module = { exports: {} }
    const name = {
      "unique-values": "unique",
      "group-by": "groupBy",
      debounce: "debounce",
      "typed-pick": "pick",
      "react-counter": "Counter",
      "array-chunk": "chunk",
      "flatten-array": "flatten",
      "partition-array": "partition",
      "count-characters": "countCharacters",
      "typed-get": "getProperty",
      "typed-first": "first",
      "typed-result": "success",
      "typed-merge": "mergeObjects",
      "typed-pluck": "pluck",
      "typed-map-values": "mapValues",
      "react-toggle": "Toggle",
      "react-tabs": "Tabs",
      "react-disclosure": "Disclosure",
      "react-pagination": "Pager",
      "react-remove-item": "RemovableList",
      "react-rating": "Rating",
    }[config.taskId]
    return new Function(
      "require",
      "module",
      "exports",
      "console",
      "React",
      config.guardName,
      config.compiled +
        (name ? `\nreturn typeof ${name} === 'function' ? ${name} : module.exports.${name};` : ""),
    )(
      require,
      module,
      module.exports,
      output,
      config.taskId.startsWith("react-") ? require("react") : undefined,
      guard,
    )
  }
  const random = (min, max) => {
    const values = new Uint32Array(1)
    crypto.getRandomValues(values)
    return min + (values[0] % (max - min + 1))
  }
  const format = (value) => {
    const seen = new WeakSet()
    try {
      const text = JSON.stringify(
        value,
        (_key, item) => {
          if (item === undefined) return "[undefined]"
          if (typeof item === "function") return "[function]"
          if (typeof item === "bigint") return String(item) + "n"
          if (item && typeof item === "object") {
            if (seen.has(item)) return "[circular]"
            seen.add(item)
          }
          return item
        },
        2,
      )
      const layout = (item, depth = 0) => {
        if (item === null || typeof item !== "object") return JSON.stringify(item)
        const indent = "  ".repeat(depth)
        const nextIndent = indent + "  "
        if (Array.isArray(item)) {
          if (item.every((value) => value === null || typeof value !== "object")) {
            return "[" + item.map((value) => JSON.stringify(value)).join(", ") + "]"
          }
          return (
            "[\n" +
            item.map((value) => nextIndent + layout(value, depth + 1)).join(",\n") +
            "\n" +
            indent +
            "]"
          )
        }
        const entries = Object.entries(item)
        if (!entries.length) return "{}"
        return (
          "{\n" +
          entries
            .map(
              ([key, value]) => nextIndent + JSON.stringify(key) + ": " + layout(value, depth + 1),
            )
            .join(",\n") +
          "\n" +
          indent +
          "}"
        )
      }
      return layout(JSON.parse(text)).slice(0, 12000)
    } catch {
      return "Не удалось отобразить значение"
    }
  }
  const freeze = (value) => {
    if (value && typeof value === "object") {
      for (const item of Object.values(value)) freeze(item)
      Object.freeze(value)
    }
    return value
  }
  const snapshot = () => logs.slice(0, 80).map((args) => args.map(format).join(" "))
  for (const method of ["log", "info", "warn", "error", "debug"]) {
    output[method] = (...args) => {
      if (logs.length < 80) logs.push([method + ":", ...args])
    }
  }
  window.console = output
  const run = async (name, level, input, expected, execute) => {
    logs.length = 0
    let actual
    try {
      guard()
      actual = await execute((value) => {
        actual = value
      })
      assert(same(actual, expected))
      if (config.lesson) {
        const failed = config.checks.find((check) => !check.passed)
        assert(!failed, failed?.message ?? "Ошибка типов")
      }
      results.push({
        name,
        level,
        input: format(input),
        expected: format(expected),
        actual: format(actual),
        logs: snapshot(),
        passed: true,
      })
    } catch (error) {
      results.push({
        name,
        level,
        input: format(input),
        expected: format(expected),
        actual: format(actual),
        logs: snapshot(),
        passed: false,
        message: String(error?.message ?? error).slice(0, 600),
      })
    }
  }
  const id = config.taskId
  for (let index = config.lesson ? 2 : 0; index < (config.lesson ? 3 : 5); index++) {
    const level = index < 2 ? "Базовый" : index < 4 ? "Средний" : "Сложный"
    const size = index === 0 ? 3 : index === 1 ? 0 : index === 4 ? random(25, 45) : random(5, 12)
    const numbers =
      index < 2 ? (index ? [] : [2, 1, 2]) : Array.from({ length: size }, () => random(-9, 9))
    const token = index < 2 ? "пример" : "случай-" + random(100, 99999)
    const name = `${index + 1}. ${level}${index >= 2 ? " · случайные параметры" : ""}`
    if (id.startsWith("react-")) {
      const step = index < 2 ? index + 1 : random(2, 15)
      const count = index < 2 ? index : random(3, index === 4 ? 15 : 7)
      let props = {},
        actions = [],
        expected,
        kind
      if (id === "react-counter") {
        props = index === 0 ? {} : { step }
        actions = Array(index === 0 ? 1 : count).fill("Увеличить")
        expected = String(step * (index === 0 ? 1 : count))
        if (index === 4) {
          actions.push("Уменьшить", "Сбросить", "Увеличить")
          expected = String(step)
        }
        kind = "counter"
      }
      if (id === "react-toggle") {
        actions = Array(count).fill("Переключить")
        expected = count % 2 ? "Включено" : "Выключено"
      }
      if (id === "react-disclosure") {
        props = { text: token }
        actions = Array(count).fill("Подробнее")
        expected = count % 2 ? token : ""
        kind = "disclosure"
      }
      if (id === "react-tabs") {
        props = {
          tabs:
            index === 1
              ? []
              : Array.from({ length: index < 2 ? 2 : random(3, 9) }, (_, i) => ({
                  id: token + i,
                  title: "Вкладка " + i,
                  content: token + " текст " + i,
                })),
        }
        const chosen = props.tabs.length ? (index < 2 ? 0 : random(0, props.tabs.length - 1)) : -1
        actions = chosen < 0 ? [] : [props.tabs[chosen].title]
        expected = chosen < 0 ? "Нет вкладок" : props.tabs[chosen].content
        kind = "tabs"
      }
      if (id === "react-pagination") {
        props = { totalPages: index === 1 ? 1 : index < 2 ? 3 : random(3, 12) }
        const target = index < 2 ? 1 : index === 4 ? props.totalPages : random(2, props.totalPages)
        actions = Array(target - 1).fill("Вперёд")
        expected = String(target)
        kind = "pager"
        if (index === 4) {
          actions.push("Вперёд", "Назад")
          expected = String(target - 1)
        }
      }
      if (id === "react-remove-item") {
        props = {
          initialItems: Array.from({ length: size }, (_, i) => ({
            id: (index < 2 ? 1 : random(1, 9999)) + i * 10000,
            title: token + " " + i,
          })),
        }
        actions = props.initialItems
          .filter((_, i) => index === 4 || i % 2 === 0)
          .map((item) => "Удалить " + item.title)
        expected = String(size - actions.length)
        kind = "list"
      }
      if (id === "react-rating") {
        const rating = index < 2 ? index : random(1, 5)
        actions = rating ? [String(rating)] : []
        expected = String(rating)
        if (index === 4) {
          actions.push("Сбросить")
          expected = "0"
        }
        kind = "rating"
      }
      await run(name, level, { props, actions }, expected, (observe) => {
        const React = require("react"),
          DOM = require("react-dom"),
          { createRoot } = require("react-dom/client")
        const Component = load(),
          element = document.createElement("div")
        document.body.append(element)
        const root = createRoot(element)
        const button = (label) => {
          const found = [...element.querySelectorAll("button")].find(
            (node) => node.textContent.trim() === label,
          )
          assert(found, "Не найдена кнопка: " + label)
          return found
        }
        try {
          DOM.flushSync(() => root.render(React.createElement(Component, freeze(props))))
          const initial = element.querySelector("output")?.textContent.trim()
          if (id === "react-toggle") {
            observe(initial)
            assert(initial === "Выключено", "Неверное начальное состояние")
          }
          if (kind === "disclosure") {
            observe(initial)
            assert(initial === "", "Текст должен быть скрыт изначально")
          }
          if (kind === "pager" || kind === "rating" || kind === "list") {
            const wanted =
              kind === "pager" ? "1" : kind === "rating" ? "0" : String(props.initialItems.length)
            observe(initial)
            assert(initial === wanted, "Неверное начальное значение")
          }
          for (const label of actions) DOM.flushSync(() => button(label).click())
          let value
          if (kind === "counter") {
            const node = [...element.querySelectorAll("*")].find(
              (node) =>
                node.tagName !== "BUTTON" &&
                node.childElementCount === 0 &&
                /^-?\d+$/.test(node.textContent.trim()),
            )
            value = node?.textContent.trim() ?? element.textContent
          } else value = element.querySelector("output")?.textContent.trim()
          observe(value)
          if (kind === "disclosure")
            assert(
              button("Подробнее").getAttribute("aria-expanded") === String(count % 2 === 1),
              "Неверный aria-expanded",
            )
          if (kind === "pager") {
            assert(button("Назад").disabled === (value === "1"), "Граница Назад")
            assert(
              button("Вперёд").disabled === (Number(value) === props.totalPages),
              "Граница Вперёд",
            )
          }
          if (kind === "tabs")
            for (const tab of props.tabs)
              assert(
                button(tab.title).getAttribute("role") === "tab" &&
                  button(tab.title).getAttribute("aria-selected") ===
                    String(tab.content === expected),
                "Проверьте role и aria-selected",
              )
          if (kind === "rating")
            for (let n = 1; n <= 5; n++)
              assert(
                button(String(n)).getAttribute("aria-pressed") === String(String(n) === expected),
                "Неверный aria-pressed",
              )
          if (kind === "list") {
            const remaining = props.initialItems.filter(
              (item) => !actions.includes("Удалить " + item.title),
            )
            const rows = [...element.querySelectorAll("li")]
            assert(
              rows.length === remaining.length &&
                rows.every((row, i) => row.textContent.includes(remaining[i].title)),
              "Неверный состав списка",
            )
          }
          return value
        } finally {
          DOM.flushSync(() => root.unmount())
          element.remove()
        }
      })
      continue
    }
    if (id === "debounce") {
      const delay = index < 2 ? 20 : random(10, 100),
        calls = index < 2 ? index + 1 : random(3, 10)
      const expected = [[token, calls - 1]]
      await run(name, level, { delay, calls, context: token }, expected, (observe) => {
        let time = 0,
          next = 0
        const timers = new Map(),
          actual = []
        window.setTimeout = (fn, ms) => {
          const key = ++next
          timers.set(key, { fn, at: time + ms })
          return key
        }
        window.clearTimeout = (key) => timers.delete(key)
        const tick = (ms) => {
          time += ms
          for (const [key, item] of [...timers])
            if (item.at <= time) {
              timers.delete(key)
              item.fn()
            }
        }
        const wrapped = load()(function (value) {
          actual.push([this.label, value])
        }, delay)
        for (let n = 0; n < calls; n++) {
          wrapped.call({ label: token }, n)
          tick(delay - 1)
          observe(actual)
          assert(actual.length === 0, "Вызов раньше паузы")
        }
        tick(1)
        observe(actual)
        assert(timers.size === 0, "Остались лишние таймеры")
        return actual
      })
      continue
    }
    if (id === "event-delegation") {
      const key = index < 2 ? String(42 + index) : String(random(100, 999999))
      const input = { id: key, dynamic: index >= 2, nested: true, ignoreOutside: true }
      await run(name, level, input, [key], (observe) => {
        document.body.innerHTML =
          '<ul id="list"><li><button data-id="' +
          key +
          '"><span>Выбрать</span></button></li><li id="empty">Пусто</li></ul><button id="outside" data-id="x">Вне</button>'
        load()
        const list = document.querySelector("#list")
        if (index >= 2) {
          const li = document.createElement("li")
          li.innerHTML = '<button data-id="' + key + '"><span>Новый</span></button>'
          list.append(li)
          li.querySelector("span").click()
        } else list.querySelector("span").click()
        const actual = logs.filter((args) => args[0] === "log:").map((args) => String(args[1]))
        observe(actual)
        assert(same(actual, [key]))
        const before = logs.length
        document.querySelector("#empty").click()
        document.querySelector("#outside").click()
        assert(logs.length === before, "Обработан клик вне кнопки списка")
        return actual
      })
      continue
    }
    let args, expected, callback
    if (id === "unique-values") {
      args = [numbers]
      expected = [...new Set(numbers)]
    }
    if (id === "array-chunk") {
      const width = index < 2 ? 2 : random(1, index === 4 ? size + 5 : 5)
      args = [numbers, width]
      expected = []
      for (let i = 0; i < numbers.length; i += width) expected.push(numbers.slice(i, i + width))
    }
    if (id === "flatten-array") {
      args = [
        index < 2
          ? index
            ? []
            : [1, [2, [3]], []]
          : numbers.map((n, i) => {
              let value = n
              const depth = index === 4 ? random(3, 8) : i % 3
              for (let j = 0; j < depth; j++) value = [value]
              return value
            }),
      ]
      expected = index < 2 ? (index ? [] : [1, 2, 3]) : numbers
    }
    if (id === "partition-array") {
      const limit = index < 2 ? 0 : random(-5, 5)
      args = [numbers]
      callback = (value) => value > limit
      expected = [numbers.filter(callback), numbers.filter((value) => !callback(value))]
      args.push("value > " + limit)
    }
    if (id === "count-characters") {
      const text =
        index < 2
          ? index
            ? ""
            : "aba"
          : numbers.map((n) => ["😀", "a", "A", " ", "я"][Math.abs(n) % 5]).join("")
      args = [text]
      expected = {}
      for (const char of text) expected[char] = (expected[char] ?? 0) + 1
    }
    if (id === "group-by") {
      const items = numbers.map((n, i) => ({
        team: index === 4 && i % 3 === 0 ? "__proto__" : String(Math.abs(n) % 3),
        id: i,
      }))
      args = [items, "team"]
      expected = Object.create(null)
      for (const item of items) (expected[item.team] ??= []).push(item)
    }
    if (id === "typed-pick") {
      const object =
        index < 2
          ? { name: "Ann", age: 25 }
          : Object.fromEntries(numbers.map((n, i) => ["key" + i, n]))
      const keys = Object.keys(object).filter((_, i) => (index === 1 ? false : i % 2 === 0))
      args = [object, keys]
      expected = Object.fromEntries(keys.map((key) => [key, object[key]]))
    }
    if (id === "typed-get") {
      const key = index < 2 ? "value" : token
      const value =
        index === 1 ? false : index === 4 ? { nested: numbers } : index === 0 ? 42 : token
      args = [{ [key]: value }, key]
      expected = value
    }
    if (id === "typed-first") {
      const items =
        index === 3
          ? numbers.map(String)
          : index === 4
            ? numbers.map((value) => ({ value }))
            : numbers
      args = [items]
      expected = items[0]
    }
    if (id === "typed-result") {
      const value = index === 0 ? 42 : index === 1 ? null : index === 4 ? { items: numbers } : token
      args = [value]
      expected = { ok: true, value }
    }
    if (id === "typed-merge") {
      const left = { id: 1, label: token },
        right = index === 1 ? {} : { id: token, items: numbers }
      args = [left, right]
      expected = { ...left, ...right }
    }
    if (id === "typed-pluck") {
      const items = numbers.map((n, i) => ({ id: n, label: token + i })),
        key = index === 4 ? "label" : "id"
      args = [items, key]
      expected = items.map((item) => item[key])
    }
    if (id === "typed-map-values") {
      const obj = Object.fromEntries(
        numbers.map((n, i) => [index === 4 && i === 0 ? "__proto__" : "key" + i, n]),
      )
      args = [obj, "(value, key) => key + value"]
      callback = (value, key) => key + value
      expected = Object.fromEntries(Object.keys(obj).map((key) => [key, callback(obj[key], key)]))
    }
    await run(name, level, args, expected, (observe) => {
      const fn = load()
      let actual,
        calls = 0
      if (callback) {
        const cb = (...values) => {
          calls++
          return callback(...values)
        }
        actual = fn(freeze(args[0]), cb)
        observe(actual)
        assert(
          calls === (Array.isArray(args[0]) ? args[0].length : Object.keys(args[0]).length),
          "Callback должен вызываться один раз на элемент",
        )
      } else actual = fn(...freeze(args))
      observe(actual)
      if (
        [
          "unique-values",
          "array-chunk",
          "flatten-array",
          "typed-pick",
          "typed-merge",
          "typed-map-values",
        ].includes(id)
      )
        assert(actual !== args[0], "Нужна новая ссылка результата")
      return actual
    })
  }
  parent.postMessage({ type: "wishu-task-result", token: config.token, results }, "*")
}
