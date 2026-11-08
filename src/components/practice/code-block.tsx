import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"
import { highlightCode, type CodeLanguage } from "@/lib/syntax-highlighter"

interface CodeBlockProps {
  code: string
  label?: string
  language?: CodeLanguage
}

export function CodeBlock(props: CodeBlockProps) {
  return <CodeBlockContent key={props.code} {...props} />
}

function CodeBlockContent({ code, label = "Пример", language = "javascript" }: CodeBlockProps) {
  const { theme } = useTheme()
  const lines = useMemo(() => highlightCode(code, language, theme), [code, language, theme])
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [failedCode, setFailedCode] = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [code],
  )
  async function copy() {
    if (timer.current) clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(code)
      setFailedCode(null)
      setCopiedCode(code)
      timer.current = setTimeout(() => setCopiedCode(null), 2000)
    } catch {
      setCopiedCode(null)
      setFailedCode(code)
    }
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-border/60 bg-muted/25">
      <div className="flex min-h-11 items-center justify-between gap-3 border-b border-border/60 px-4 py-1.5 text-xs text-muted-foreground">
        <span>{label}</span>
        <Button
          type="button"
          variant="ghost"
          className="h-8 min-w-28 text-xs"
          onClick={() => void copy()}
        >
          {copiedCode === code ? "Скопировано" : "Скопировать"}
        </Button>
      </div>
      <p
        className={failedCode === code ? "border-b px-4 py-2 text-xs text-destructive" : "sr-only"}
      >
        {failedCode === code
          ? "Не удалось скопировать. Выделите код и скопируйте вручную."
          : copiedCode === code
            ? "Код скопирован"
            : ""}
      </p>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6 sm:text-sm">
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
