import Editor, { loader } from "@monaco-editor/react"
import { useEffect, useRef } from "react"
import * as monaco from "monaco-editor"
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import TypeScriptWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import { useTaskExperience } from "@/stores/task-experience"
import { useTheme } from "@/lib/theme-context"

const host = globalThis as typeof globalThis & { MonacoEnvironment: monaco.Environment }
host.MonacoEnvironment = {
  getWorker(_moduleId, label) {
    if (label === "typescript" || label === "javascript") return new TypeScriptWorker()
    if (label === "css" || label === "scss" || label === "less") return new CssWorker()
    if (label === "html" || label === "handlebars" || label === "razor") return new HtmlWorker()
    if (label === "json") return new JsonWorker()
    return new EditorWorker()
  },
}
loader.config({ monaco })
const compilerOptions = {
  target: monaco.typescript.ScriptTarget.ESNext,
  module: monaco.typescript.ModuleKind.ESNext,
  moduleResolution: monaco.typescript.ModuleResolutionKind.NodeJs,
  jsx: monaco.typescript.JsxEmit.ReactJSX,
  allowNonTsExtensions: true,
  allowJs: true,
  strict: true,
}
monaco.typescript.typescriptDefaults.setCompilerOptions(compilerOptions)
monaco.typescript.javascriptDefaults.setCompilerOptions({ ...compilerOptions, checkJs: false })
monaco.typescript.javascriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: false,
})
monaco.typescript.typescriptDefaults.setEagerModelSync(true)

function projectTheme(theme: "light" | "dark") {
  const canvas = document.createElement("canvas")
  canvas.width = canvas.height = 1
  const context = canvas.getContext("2d")
  let background = theme === "dark" ? "#1c1917" : "#ffffff"
  if (context) {
    context.fillStyle =
      getComputedStyle(document.documentElement).getPropertyValue("--card").trim() || background
    context.fillRect(0, 0, 1, 1)
    const bytes = context.getImageData(0, 0, 1, 1).data
    background =
      "#" +
      [...bytes]
        .slice(0, 3)
        .map((value) => value.toString(16).padStart(2, "0"))
        .join("")
  }
  monaco.editor.defineTheme(`wishu-${theme}`, {
    base: theme === "dark" ? "vs-dark" : "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": background,
      "editorGutter.background": background,
      "editorOverviewRuler.background": background,
    },
  })
}
monaco.editor.defineTheme("wishu-light", {
  base: "vs",
  inherit: true,
  rules: [],
  colors: { "editor.background": "#ffffff" },
})
monaco.editor.defineTheme("wishu-dark", {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: { "editor.background": "#1c1917" },
})

export default function TaskCodeEditor({
  taskId,
  topic,
  value,
  onChange,
  expanded = false,
}: {
  taskId: string
  topic: string
  value: string
  onChange: (value: string) => void
  expanded?: boolean
}) {
  const { theme } = useTheme()
  const cleanup = useRef<(() => void) | null>(null)
  useEffect(() => () => cleanup.current?.(), [taskId])
  useEffect(() => {
    projectTheme(theme)
  }, [theme])
  const extension = topic === "TypeScript" ? "ts" : topic === "React" ? "jsx" : "js"
  return (
    <Editor
      height={expanded ? "70dvh" : "clamp(20rem, 44vh, 30rem)"}
      path={`file:///wishu/tasks/${taskId}.${extension}`}
      language={extension === "ts" ? "typescript" : "javascript"}
      theme={`wishu-${theme}`}
      beforeMount={() => projectTheme(theme)}
      onMount={(editor) => {
        cleanup.current?.()
        const saved = useTaskExperience.getState().editorStates[taskId]
        if (saved) {
          try {
            editor.restoreViewState(saved)
          } catch {
            /* Ignore incompatible editor versions. */
          }
        }
        let timer: ReturnType<typeof setTimeout> | undefined
        let lastState = editor.saveViewState()
        const persist = () => {
          if (lastState) useTaskExperience.getState().saveEditorState(taskId, lastState)
        }
        const capture = () => {
          lastState = editor.saveViewState()
          clearTimeout(timer)
          timer = setTimeout(persist, 400)
        }
        const cursor = editor.onDidChangeCursorSelection(capture)
        const scroll = editor.onDidScrollChange(capture)
        cleanup.current = () => {
          clearTimeout(timer)
          cursor.dispose()
          scroll.dispose()
          persist()
        }
      }}
      value={value}
      onChange={(next) => onChange(next ?? "")}
      loading={
        <output className="block p-5 text-sm text-muted-foreground">Загружаем редактор…</output>
      }
      options={{
        ariaLabel: "Редактор решения задачи",
        automaticLayout: true,
        fontSize: 14,
        lineHeight: 24,
        fontFamily: "Consolas, 'Courier New', monospace",
        minimap: { enabled: false },
        padding: { top: 16, bottom: 16 },
        scrollBeyondLastLine: false,
        wordWrap: "on",
        tabSize: 2,
        insertSpaces: true,
        quickSuggestions: { other: true, comments: false, strings: false },
        suggestOnTriggerCharacters: true,
        parameterHints: { enabled: true },
        bracketPairColorization: { enabled: true },
        autoClosingBrackets: "always",
        autoClosingQuotes: "always",
        formatOnPaste: true,
        accessibilitySupport: "auto",
      }}
    />
  )
}
