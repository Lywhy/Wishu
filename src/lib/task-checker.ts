import CompileWorker from "./task-compile.worker?worker"
import { taskSandbox } from "./task-sandbox-runtime.js"
import reactSource from "../../node_modules/react/cjs/react.production.js?raw"
import domSource from "../../node_modules/react-dom/cjs/react-dom.production.js?raw"
import clientSource from "../../node_modules/react-dom/cjs/react-dom-client.production.js?raw"
import schedulerSource from "../../node_modules/scheduler/cjs/scheduler.production.js?raw"

export interface TaskCheckResult {
  name: string
  passed: boolean
  message?: string
  level?: string
  input?: string
  expected?: string
  actual?: string
  logs?: string[]
}

export async function checkTask(
  taskId: string,
  code: string,
  signal: AbortSignal,
  options: { lesson?: boolean } = {},
): Promise<TaskCheckResult[]> {
  const prepared = await new Promise<{
    compiled: string
    guardName: string
    checks: TaskCheckResult[]
  }>((resolve, reject) => {
    const worker = new CompileWorker()
    const finish = () => {
      clearTimeout(timer)
      worker.terminate()
      signal.removeEventListener("abort", abort)
    }
    const abort = () => {
      finish()
      reject(new Error("Проверка отменена."))
    }
    const timer = setTimeout(() => {
      finish()
      reject(new Error("Подготовка кода заняла слишком много времени."))
    }, 10000)
    signal.addEventListener("abort", abort, { once: true })
    if (signal.aborted) return abort()
    worker.onerror = () => {
      finish()
      reject(new Error("Не удалось загрузить компилятор проверки."))
    }
    worker.onmessage = (event) => {
      finish()
      if (event.data.error) {
        reject(new Error(event.data.error))
      } else {
        resolve(event.data)
      }
    }
    worker.postMessage({ taskId, code })
  })
  return new Promise((resolve, reject) => {
    const frame = document.createElement("iframe")
    frame.sandbox.add("allow-scripts")
    frame.title = "Изолированная проверка задачи"
    frame.className = "hidden"
    const token = crypto.randomUUID()
    const finish = () => {
      clearTimeout(timer)
      window.removeEventListener("message", receive)
      signal.removeEventListener("abort", abort)
      frame.remove()
    }
    const abort = () => {
      finish()
      reject(new Error("Проверка отменена."))
    }
    const timer = setTimeout(() => {
      finish()
      reject(new Error("Превышено время проверки. Проверьте циклы и рекурсию."))
    }, 5000)
    const receive = (event: MessageEvent) => {
      if (
        event.source !== frame.contentWindow ||
        event.data?.type !== "wishu-task-result" ||
        event.data.token !== token
      )
        return
      const results: unknown = event.data.results
      if (
        !Array.isArray(results) ||
        !results.every(
          (result) =>
            result &&
            typeof result.name === "string" &&
            typeof result.passed === "boolean" &&
            (result.message === undefined || typeof result.message === "string") &&
            ["input", "expected", "actual", "level"].every(
              (key) => result[key] === undefined || typeof result[key] === "string",
            ) &&
            (result.logs === undefined ||
              (Array.isArray(result.logs) &&
                result.logs.every((line: unknown) => typeof line === "string"))),
        )
      )
        return
      finish()
      resolve(results)
    }
    window.addEventListener("message", receive)
    signal.addEventListener("abort", abort, { once: true })
    if (signal.aborted) return abort()
    const modules = taskId.startsWith("react-")
      ? {
          react: reactSource,
          "react-dom": domSource,
          "react-dom/client": clientSource,
          scheduler: schedulerSource,
        }
      : {}
    const config = JSON.stringify({
      ...prepared,
      taskId,
      lesson: options.lesson,
      token,
      modules,
    }).replaceAll("<", "\\u003c")
    frame.srcdoc = `<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; connect-src 'none'; form-action 'none'; base-uri 'none'"><body><script>(${taskSandbox.toString()})(${config})</script>`
    document.body.append(frame)
  })
}
