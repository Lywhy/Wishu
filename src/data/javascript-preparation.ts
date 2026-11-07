import type { Question } from "@/data/interview-content"

export const javascriptOptionalIds = new Set([
  "weak-ref",
  "finalization-registry",
  "shared-array-buffer",
  "temporal-api",
])

export function isJavascriptCodeReading(question: Question) {
  return question.topic === "JavaScript" && question.id.startsWith("js-output-")
}

export const javascriptPracticeTaskIds = [
  "debounce",
  "js-throttle",
  "js-simple-bind",
  "js-promise-all",
  "js-async-pool",
  "js-event-emitter",
  "js-retry",
]

export const javascriptQuestionTasks: Record<string, string[]> = {
  "function-bind": ["js-simple-bind"],
  "lost-this": ["js-simple-bind"],
  "function-this": ["js-simple-bind"],
  closures: ["debounce", "js-event-emitter"],
  "closures-in-loops": ["debounce"],
  "debounce-throttle": ["debounce", "js-throttle"],
  "js-output-lost-this": ["js-simple-bind"],
  "js-output-promise-recovery": ["js-promise-all", "js-retry"],
  "js-output-async-foreach": ["js-promise-all", "js-async-pool"],
  "promise-all-settled": ["js-promise-all", "js-async-pool"],
  "promise-chains": ["js-promise-all"],
  "async-concurrency-limit": ["js-async-pool"],
  "js-retry-policy": ["js-retry"],
  "js-resource-lifetime": ["js-event-emitter"],
}
