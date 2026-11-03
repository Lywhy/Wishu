import { Fragment, useMemo } from "react"
import { useTheme } from "@/lib/theme-context"
import { highlightCode, type CodeLanguage } from "@/lib/syntax-highlighter"

export function CodeBlock({
  code,
  label = "Пример",
  language = "javascript",
}: {
  code: string
  label?: string
  language?: CodeLanguage
}) {
  const { theme } = useTheme()
  const lines = useMemo(() => highlightCode(code, language, theme), [code, language, theme])

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border bg-muted/40">
      <div className="border-b px-4 py-2 text-[11px] text-muted-foreground">{label}</div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-6 sm:text-[13px]">
        <code>
          {lines.map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              {line.map((token, tokenIndex) => (
                <span key={tokenIndex} style={{ color: token.color }}>
                  {token.content}
                </span>
              ))}
              {lineIndex < lines.length - 1 ? "\n" : null}
            </Fragment>
          ))}
        </code>
      </pre>
    </div>
  )
}
