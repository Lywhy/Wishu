import { createHighlighterCoreSync } from "shiki/core"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"
import javascript from "shiki/langs/javascript.mjs"
import typescript from "shiki/langs/typescript.mjs"
import jsx from "shiki/langs/jsx.mjs"
import tsx from "shiki/langs/tsx.mjs"
import html from "shiki/langs/html.mjs"
import css from "shiki/langs/css.mjs"
import json from "shiki/langs/json.mjs"
import sql from "shiki/langs/sql.mjs"
import light from "shiki/themes/github-light.mjs"
import dark from "shiki/themes/github-dark.mjs"

export type CodeLanguage =
  | "javascript"
  | "typescript"
  | "jsx"
  | "tsx"
  | "html"
  | "css"
  | "json"
  | "sql"

let highlighter: ReturnType<typeof createHighlighterCoreSync> | undefined

export function highlightCode(code: string, language: CodeLanguage, theme: "light" | "dark") {
  highlighter ??= createHighlighterCoreSync({
    engine: createJavaScriptRegexEngine(),
    themes: [light, dark],
    langs: [javascript, typescript, jsx, tsx, html, css, json, sql],
  })
  return highlighter.codeToTokens(code, {
    lang: language,
    theme: theme === "dark" ? "github-dark" : "github-light",
  }).tokens
}

export function codeLanguageFor(topic: string, code: string): CodeLanguage {
  if (topic === "React") return "tsx"
  if (topic === "TypeScript") return "typescript"
  if (
    topic === "PostgreSQL" ||
    /^\s*(?:SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|WITH)\b/i.test(code)
  )
    return "sql"
  if (code.trimStart().startsWith("<")) return "html"
  return "javascript"
}
