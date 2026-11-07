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
import java from "shiki/langs/java.mjs"
import vue from "shiki/langs/vue.mjs"
import dockerfile from "shiki/langs/dockerfile.mjs"
import shellscript from "shiki/langs/shellscript.mjs"
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
  | "java"
  | "vue"
  | "dockerfile"
  | "shellscript"

let highlighter: ReturnType<typeof createHighlighterCoreSync> | undefined

export function highlightCode(code: string, language: CodeLanguage, theme: "light" | "dark") {
  highlighter ??= createHighlighterCoreSync({
    engine: createJavaScriptRegexEngine(),
    themes: [light, dark],
    langs: [
      javascript,
      typescript,
      jsx,
      tsx,
      html,
      css,
      json,
      sql,
      java,
      vue,
      dockerfile,
      shellscript,
    ],
  })
  return highlighter.codeToTokens(code, {
    lang: language,
    theme: theme === "dark" ? "github-dark" : "github-light",
  }).tokens
}

const languageAliases: Record<string, CodeLanguage> = {
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  jsx: "jsx",
  tsx: "tsx",
  html: "html",
  css: "css",
  json: "json",
  sql: "sql",
  java: "java",
  vue: "vue",
  dockerfile: "dockerfile",
  shellscript: "shellscript",
  bash: "shellscript",
  sh: "shellscript",
  shell: "shellscript",
}

export function codeLanguageFor(topic: string, code: string, languageHint?: string): CodeLanguage {
  const hinted = languageHint?.toLowerCase()
  if (hinted && Object.hasOwn(languageAliases, hinted)) return languageAliases[hinted]
  if (topic === "HTML и CSS") {
    const start = code.trimStart()
    if (start.startsWith("<")) return "html"
    if (/^(?:const|let|var|function|import|export|document|window)\b/.test(start))
      return "javascript"
    return "css"
  }
  if (topic === "React" || topic === "Next.js") return "tsx"
  if (topic === "TypeScript" || topic === "NestJS") return "typescript"
  if (topic === "Java") return "java"
  if (topic === "Vue") return code.trimStart().startsWith("<") ? "vue" : "javascript"
  if (topic === "Git" || topic === "Redis") return "shellscript"
  if (topic === "Docker")
    return /^\s*(?:FROM|RUN|COPY|CMD|ENTRYPOINT|WORKDIR|EXPOSE|ENV|ARG)\b/.test(code)
      ? "dockerfile"
      : "shellscript"
  if (topic === "SQL" && code.trimStart().startsWith("//")) return "javascript"
  if (
    topic === "SQL" ||
    topic === "PostgreSQL" ||
    /^\s*(?:SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|WITH)\b/i.test(code)
  )
    return "sql"
  if (code.trimStart().startsWith("<")) return "html"
  return "javascript"
}
