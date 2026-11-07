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
      "js-throttle": "throttle",
      "js-simple-bind": "simpleBind",
      "js-promise-all": "promiseAll",
      "js-async-pool": "runPool",
      "js-event-emitter": "createEmitter",
      "js-retry": "retry",
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
  // Exercise contracts use Promise microtasks, not polling timers.
  const drainInterview = async () => {
    for (let turn = 0; turn < 80; turn++) {
      guard()
      await Promise.resolve()
    }
  }
  const settleInterview = async (promise) => {
    assert(promise && typeof promise.then === "function", "Нужно вернуть Promise")
    let state = { status: "pending" }
    Promise.resolve(promise).then(
      (value) => {
        state = { status: "fulfilled", value }
      },
      (error) => {
        state = { status: "rejected", error }
      },
    )
    await drainInterview()
    assert(state.status !== "pending", "Операция не завершилась после обработки микрозадач")
    return state
  }
  const id = config.taskId
  for (let index = config.lesson ? 2 : 0; index < (config.lesson ? 3 : 5); index++) {
    const level = index < 2 ? "Базовый" : index < 4 ? "Средний" : "Сложный"
    const size = index === 0 ? 3 : index === 1 ? 0 : index === 4 ? random(25, 45) : random(5, 12)
    const numbers =
      index < 2 ? (index ? [] : [2, 1, 2]) : Array.from({ length: size }, () => random(-9, 9))
    const token = index < 2 ? "пример" : "случай-" + random(100, 99999)
    const name = `${index + 1}. ${level}${index >= 2 ? " · случайные параметры" : ""}`
    if (id === "js-throttle") {
      const wait = index < 2 ? 10 : random(5, 40)
      const times =
        index === 0
          ? [0, 2, 10]
          : index === 1
            ? [0]
            : [
                0,
                wait - 1,
                wait,
                wait + 1,
                2 * wait,
                ...Array.from(
                  { length: index === 4 ? 12 : 4 },
                  (_, n) => 3 * wait + n * random(1, wait),
                ).sort((a, b) => a - b),
              ]
      let last = -Infinity
      const expected = times.map((time, position) => {
        if (time - last < wait) return undefined
        last = time
        return [token, position, time]
      })
      await run(name, level, { wait, times, context: token }, expected, (observe) => {
        const realNow = Date.now,
          realTimeout = window.setTimeout,
          realClear = window.clearTimeout
        let now = 0,
          scheduled = 0
        Date.now = () => now
        window.setTimeout = () => {
          scheduled++
          return 1
        }
        window.clearTimeout = () => {}
        try {
          const fn = load(),
            seen = []
          const limited = fn(function (position, time) {
            const value = [this.label, position, time]
            seen.push(value)
            return value
          }, wait)
          const actual = times.map((time, position) => {
            now = time
            return limited.call({ label: token }, position, time)
          })
          observe(actual)
          assert(
            seen.length === expected.filter((item) => item !== undefined).length,
            "Лишний или пропущенный вызов fn",
          )
          assert(scheduled === 0, "В этой версии throttle нет trailing и таймеров")
          if (index === 4) {
            now = 0
            let a = 0,
              b = 0
            const first = fn(() => ++a, wait),
              second = fn(() => ++b, wait)
            first()
            second()
            assert(a === 1 && b === 1, "Экземпляры должны быть независимы")
            const error = new Error(token)
            let count = 0,
              caught
            const failing = fn(() => {
              count++
              throw error
            }, wait)
            try {
              failing()
            } catch (cause) {
              caught = cause
            }
            assert(caught === error, "Нужно сохранить исключение fn")
            failing()
            assert(count === 1, "Исключение не должно сбрасывать интервал")
          }
          return actual
        } finally {
          Date.now = realNow
          window.setTimeout = realTimeout
          window.clearTimeout = realClear
        }
      })
      continue
    }
    if (id === "js-simple-bind") {
      const base = index < 2 ? 10 : random(-100, 100)
      const preset =
        index === 1
          ? []
          : index === 0
            ? [2]
            : Array.from({ length: random(1, 5) }, () => random(-20, 20))
      const args =
        index === 1
          ? []
          : index === 0
            ? [3]
            : Array.from({ length: random(1, 5) }, () => random(-20, 20))
      const expected = { base, args: [...preset, ...args] }
      await run(
        name,
        level,
        { context: { base }, preset, args, callerContext: { base: 999 } },
        expected,
        (observe) => {
          const fn = load(),
            context = Object.freeze({ base })
          let calls = 0
          const bound = fn(
            function (...values) {
              calls++
              return { base: this.base, args: values }
            },
            context,
            ...Object.freeze(preset),
          )
          const actual = bound.call({ base: 999 }, ...Object.freeze(args))
          observe(actual)
          assert(calls === 1, "Исходная функция должна вызываться ровно один раз")
          if (index === 4) {
            assert(
              same(bound.call({ base: 999 }, ...args), expected),
              "Начальные аргументы должны сохраняться при повторных вызовах",
            )
            function strictThis() {
              "use strict"
              return this
            }
            assert(
              fn(strictThis, null)() === null && fn(strictThis, undefined)() === undefined,
              "Нельзя подменять null и undefined глобальным объектом",
            )
            const marker = { value: token }
            assert(
              fn(() => marker, context)() === marker,
              "Нужно вернуть исходный объект результата",
            )
            let caught
            try {
              fn(() => {
                throw marker
              }, context)()
            } catch (error) {
              caught = error
            }
            assert(caught === marker, "Исключение должно выходить без подмены")
          }
          return actual
        },
      )
      continue
    }
    if (id === "js-promise-all") {
      const values =
        index === 1
          ? []
          : index === 0
            ? [1, 2]
            : Array.from({ length: random(4, 10) }, () => random(-100, 100))
      const reason = { error: token }
      const expected = index === 3 ? { rejected: reason } : values
      await run(
        name,
        level,
        {
          values,
          mode:
            index === 3
              ? "Отклонение при незавершённом соседе"
              : index === 4
                ? "Thenable и обратный порядок завершения"
                : "Значения и Promise",
        },
        expected,
        async (observe) => {
          const fn = load()
          if (index === 3) {
            const state = await settleInterview(
              fn(Object.freeze([new Promise(() => {}), Promise.reject(reason)])),
            )
            const actual = state.status === "rejected" ? { rejected: state.error } : state.value
            observe(actual)
            assert(
              state.status === "rejected" && state.error === reason,
              "Нужно отклониться с исходной причиной, не ожидая соседний Promise",
            )
            return actual
          }
          const releases = [],
            reads = []
          const input = values.map((value, position) =>
            index === 0
              ? position
                ? value
                : Promise.resolve(value)
              : index === 4
                ? {
                    then(resolve, reject) {
                      reads.push(position)
                      releases[position] = () => {
                        resolve(value)
                        resolve(value + 1)
                        reject(reason)
                      }
                    },
                  }
                : new Promise((resolve) => {
                    releases[position] = () => resolve(value)
                  }),
          )
          const result = fn(Object.freeze(input))
          let done = false
          Promise.resolve(result).then(
            () => {
              done = true
            },
            () => {
              done = true
            },
          )
          await drainInterview()
          if (index >= 2) {
            assert(!done, "Агрегат не должен завершаться до входных операций")
            if (index === 4)
              assert(
                reads.length === values.length && new Set(reads).size === values.length,
                "Каждый thenable обрабатывается ровно один раз",
              )
            for (let position = values.length - 1; position >= 0; position--) {
              assert(
                typeof releases[position] === "function",
                "Не начато ожидание входного значения",
              )
              releases[position]()
              await drainInterview()
              if (position > 0) assert(!done, "Агрегат завершён до последнего результата")
            }
          }
          const state = await settleInterview(result)
          observe(state.value)
          assert(state.status === "fulfilled", "Ожидался успешный Promise")
          if (index === 4) {
            const sparse = new Array(random(2, 6))
            sparse[sparse.length - 1] = token
            const sparseState = await settleInterview(fn(Object.freeze(sparse)))
            const dense = Array(sparse.length).fill(undefined)
            dense[dense.length - 1] = token
            assert(
              sparseState.status === "fulfilled" && same(sparseState.value, dense),
              "Пропуски входного массива должны становиться undefined в результате",
            )
            const invalid = Object.defineProperty({}, "then", {
              get() {
                throw reason
              },
            })
            const rejected = await settleInterview(fn([invalid]))
            assert(
              rejected.status === "rejected" && rejected.error === reason,
              "Ошибка чтения then должна отклонить агрегат с исходной причиной",
            )
          }
          return state.value
        },
      )
      continue
    }
    if (id === "js-async-pool") {
      const count = index === 1 ? 0 : index === 0 ? 3 : random(6, 12)
      const limit = index === 0 ? 2 : index === 1 ? 1 : random(2, 4)
      const values = Array.from({ length: count }, (_, position) => token + ":" + position)
      const reason = { error: token }
      const expected = index === 3 ? { rejected: reason } : values
      await run(
        name,
        level,
        {
          values,
          limit,
          mode:
            index === 3
              ? "Ошибка, остановка очереди и позднее отклонение"
              : index === 4
                ? "Смешанные синхронные результаты и Promise"
                : "Обратное завершение активных операций",
        },
        expected,
        async (observe) => {
          const fn = load(),
            started = [],
            pending = new Map()
          let active = 0,
            peak = 0,
            state = { status: "pending" }
          const tasks = values.map((value, position) => () => {
            started.push(position)
            active++
            peak = Math.max(peak, active)
            if (index === 4 && position % 3 === 0) {
              active--
              return value
            }
            if (index === 3 && position === 0) {
              active--
              throw reason
            }
            return new Promise((resolve, reject) =>
              pending.set(position, {
                resolve: () => {
                  active--
                  pending.delete(position)
                  resolve(value)
                },
                reject: () => {
                  active--
                  pending.delete(position)
                  reject(reason)
                },
              }),
            )
          })
          const result = fn(Object.freeze(tasks))
          assert(result && typeof result.then === "function", "Нужно вернуть Promise")
          result.then(
            (value) => {
              state = { status: "fulfilled", value }
            },
            (error) => {
              state = { status: "rejected", error }
            },
          )
          await drainInterview()
          if (index === 3) {
            observe(state)
            assert(
              state.status === "rejected" && state.error === reason,
              "Синхронная ошибка должна отклонить пул с исходной причиной",
            )
            const before = started.length
            let unhandled = false
            const onUnhandled = (event) => {
              event.preventDefault()
              unhandled = true
            }
            window.addEventListener("unhandledrejection", onUnhandled)
            try {
              for (const item of [...pending.values()]) item.reject()
              await drainInterview()
              // A task boundary lets the browser report any late unhandled rejection.
              await new Promise((resolve) => setTimeout(resolve, 0))
              assert(!unhandled, "Позднее отклонение начатой операции осталось без обработчика")
            } finally {
              window.removeEventListener("unhandledrejection", onUnhandled)
            }
            assert(
              started.length === before && before <= limit,
              "После обнаружения ошибки нельзя запускать очередь дальше",
            )
            return { rejected: state.error }
          }
          let rounds = 0
          while (state.status === "pending" && rounds++ < count + 2) {
            assert(active <= limit && peak <= limit, "Превышен лимит параллельности")
            assert(
              active === Math.min(limit, count - started.length + active),
              "Не заняты доступные слоты",
            )
            if (!pending.size) {
              await drainInterview()
              break
            }
            const position = Math.max(...pending.keys())
            pending.get(position).resolve()
            await drainInterview()
          }
          observe(state.value)
          assert(state.status === "fulfilled", "Очередь зависла или отклонилась")
          assert(
            same(
              started,
              values.map((_, position) => position),
            ),
            "Каждую операцию нужно запустить один раз в порядке входа",
          )
          assert(peak <= limit, "Превышен лимит")
          if (index === 4) {
            const marker = new Error(token)
            const rejected = await settleInterview(fn([() => Promise.reject(marker)], limit))
            assert(
              rejected.status === "rejected" && rejected.error === marker,
              "Отклонённый Promise должен отклонить пул",
            )
            const blocked = [],
              launches = []
            const queue = Array.from({ length: limit + 3 }, (_, position) => () => {
              launches.push(position)
              return new Promise((resolve, reject) => blocked.push({ resolve, reject }))
            })
            const failing = fn(queue, limit)
            let failed
            failing.then(
              () => {},
              (error) => {
                failed = error
              },
            )
            await drainInterview()
            assert(blocked.length === limit, "Нужно занять доступные слоты")
            blocked[0].reject(marker)
            await drainInterview()
            assert(
              failed === marker && launches.length === limit,
              "После асинхронного отклонения нельзя запускать оставшуюся очередь",
            )
            for (const item of blocked.slice(1)) item.resolve(token)
            await drainInterview()
            assert(
              launches.length === limit,
              "Успех ранее начатой работы не должен возобновлять остановленную очередь",
            )
          }
          return state.value
        },
      )
      continue
    }
    if (id === "js-event-emitter") {
      const event = index === 4 ? "__proto__" : token
      const payload = index < 2 ? [1, "пример"] : [random(-100, 100), token]
      const expected =
        index === 1
          ? []
          : index === 4
            ? [token + ":a", token + ":b", token + ":a", token + ":c"]
            : [payload, payload]
      await run(
        name,
        level,
        {
          event,
          payload,
          mode:
            index === 1
              ? "Пустая группа и отписка"
              : index === 4
                ? "Снимок подписок, безопасное имя и независимые экземпляры"
                : "Повторная регистрация одного слушателя",
        },
        expected,
        (observe) => {
          const create = load(),
            bus = create(),
            actual = []
          if (index === 4) {
            let offB,
              added = false
            bus.on(event, () => {
              actual.push(token + ":a")
              offB()
              if (!added) {
                added = true
                bus.on(event, () => actual.push(token + ":c"))
              }
            })
            offB = bus.on(event, () => actual.push(token + ":b"))
            bus.emit(event)
            bus.emit(event)
            observe(actual)
            create().emit(event)
            assert(same(actual, expected), "Нужны снимок подписок и независимость экземпляров")
            const marker = new Error(token)
            const throwing = create()
            let reached = false,
              caught
            throwing.on(event, () => {
              throw marker
            })
            throwing.on(event, () => {
              reached = true
            })
            try {
              throwing.emit(event)
            } catch (error) {
              caught = error
            }
            assert(
              caught === marker && !reached,
              "Ошибка слушателя прерывает рассылку и выходит наружу",
            )
          } else if (index === 1) {
            bus.emit(event, ...payload)
            const off = bus.on(event, (...args) => actual.push(args))
            off()
            off()
            bus.emit(event, ...payload)
          } else {
            const listener = (...args) => actual.push(args)
            const offA = bus.on(event, listener),
              offB = bus.on(event, listener)
            if (index === 0) {
              bus.emit(event, ...payload)
              offA()
              offB()
            } else {
              offA()
              offA()
              bus.emit(event, ...payload)
              bus.emit(event, ...payload)
              offB()
            }
            bus.emit(event, ...payload)
          }
          observe(actual)
          return actual
        },
      )
      continue
    }
    if (id === "js-retry") {
      const attempts = index === 0 ? 1 : index === 1 ? 3 : random(3, 5)
      const failures =
        index === 0 ? 0 : index === 1 ? 1 : index === 3 ? attempts : random(1, attempts - 1)
      const baseDelay = index < 2 ? 10 : random(5, 80)
      const reason = { error: token }
      const failuresByAttempt = Array.from({ length: attempts }, (_, position) => ({
        error: token,
        attempt: position + 1,
      }))
      const calls = Math.min(failures + 1, attempts)
      const delays = Array.from({ length: calls - 1 }, (_, position) => baseDelay * 2 ** position)
      const expected = {
        calls,
        delays,
        ...(failures >= attempts
          ? { rejected: failuresByAttempt[attempts - 1] }
          : { value: token }),
      }
      await run(
        name,
        level,
        { attempts, failures, baseDelay, result: token },
        expected,
        async (observe) => {
          const fn = load(),
            actualDelays = []
          let actualCalls = 0,
            sleeping = false
          const operation = () => {
            assert(!sleeping, "Попытка началась до завершения sleep")
            actualCalls++
            if (actualCalls <= failures) {
              if (actualCalls % 2) throw failuresByAttempt[actualCalls - 1]
              return Promise.reject(failuresByAttempt[actualCalls - 1])
            }
            return token
          }
          const sleep = async (ms) => {
            actualDelays.push(ms)
            sleeping = true
            await Promise.resolve()
            sleeping = false
          }
          const state = await settleInterview(fn(operation, attempts, baseDelay, sleep))
          const actual = {
            calls: actualCalls,
            delays: actualDelays,
            ...(state.status === "rejected" ? { rejected: state.error } : { value: state.value }),
          }
          observe(actual)
          if (failures >= attempts)
            assert(
              state.error === failuresByAttempt[attempts - 1],
              "Нужно сохранить исходную причину последней ошибки",
            )
          if (index === 4) {
            const sleepError = new Error(token)
            let count = 0
            const failedSleep = await settleInterview(
              fn(
                () => {
                  count++
                  return Promise.reject(reason)
                },
                attempts,
                baseDelay,
                () => Promise.reject(sleepError),
              ),
            )
            assert(
              count === 1 && failedSleep.status === "rejected" && failedSleep.error === sleepError,
              "Ошибка sleep должна остановить повторы",
            )
            const marker = { value: token }
            const success = await settleInterview(
              fn(() => Promise.resolve(marker), attempts, baseDelay, sleep),
            )
            assert(
              success.status === "fulfilled" && success.value === marker,
              "Успешный объект нужно вернуть без копирования",
            )
          }
          return actual
        },
      )
      continue
    }

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
