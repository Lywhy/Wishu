import { isJavascriptCodeReading } from "@/data/javascript-preparation"
import type { Question } from "@/data/interview-content"

// Keep one Markdown document so lists, tables and footnotes share one context.
export function javascriptAnswerMarkdown(question: Question) {
  const blocks = ["## Короткий ответ", question.answer[0] ?? ""]
  if (question.answer.length > 1) blocks.push("## Разбор", ...question.answer.slice(1))
  if (question.code && !isJavascriptCodeReading(question)) {
    const runs = question.code.match(/`+/g) ?? []
    const fence = "`".repeat(Math.max(3, ...runs.map((run) => run.length + 1)))
    blocks.push("## Пример с пояснениями", `${fence}javascript\n${question.code}\n${fence}`)
  }
  if (question.pitfall)
    blocks.push(
      "## Типичная ошибка",
      question.pitfall
        .split("\n")
        .map((line) => "> " + line)
        .join("\n"),
    )
  blocks.push("## Главная мысль", "**" + question.takeaway + "**")
  return blocks.join("\n\n")
}
