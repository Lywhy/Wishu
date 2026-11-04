import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CodeBlock } from "@/components/practice/practice-elements"
import { codeLanguageFor } from "@/lib/syntax-highlighter"
function htmlProps<T extends { node?: unknown }>(props: T) {
  const next = { ...props }
  delete next.node
  return next
}
export function LearningMarkdown({ content, topic }: { content: string; topic: string }) {
  return (
    <div className="space-y-5 text-sm leading-7 wrap-anywhere">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => (
            <h2 className="mt-8 text-2xl font-semibold" {...htmlProps(props)}>
              {props.children}
            </h2>
          ),
          h2: (props) => (
            <h2 className="mt-8 border-b pb-3 text-xl font-semibold" {...htmlProps(props)}>
              {props.children}
            </h2>
          ),
          h3: (props) => (
            <h3 className="mt-6 text-base font-semibold" {...htmlProps(props)}>
              {props.children}
            </h3>
          ),
          p: (props) => <p className="leading-7" {...htmlProps(props)} />,
          strong: (props) => (
            <strong className="font-semibold text-foreground" {...htmlProps(props)} />
          ),
          ul: (props) => (
            <ul className="list-disc space-y-2 pl-5 marker:text-primary" {...htmlProps(props)} />
          ),
          ol: (props) => (
            <ol className="list-decimal space-y-2 pl-5 marker:text-primary" {...htmlProps(props)} />
          ),
          li: (props) => <li className="pl-1" {...htmlProps(props)} />,
          blockquote: (props) => (
            <blockquote
              className="rounded-r-lg border-l-4 border-primary bg-primary/5 p-4 text-foreground"
              {...htmlProps(props)}
            />
          ),
          a: (props) => (
            <a className="text-primary underline underline-offset-4" {...htmlProps(props)}>
              {props.children}
            </a>
          ),
          table: (props) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs" {...htmlProps(props)} />
            </div>
          ),
          th: (props) => <th className="border bg-muted p-3 font-semibold" {...htmlProps(props)} />,
          td: (props) => <td className="border p-3" {...htmlProps(props)} />,
          pre: ({ children }) => <div className="min-w-0">{children}</div>,
          code: ({ children, className }) =>
            className?.startsWith("language-") ? (
              <CodeBlock
                code={String(children).replace(/\n$/, "")}
                language={codeLanguageFor(topic, String(children))}
              />
            ) : (
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em]">
                {children}
              </code>
            ),
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}
