import { memo } from "react"
import { useInterfaceSettings } from "@/stores/interface-settings"
import { AnimatedText } from "@/components/catalog/catalog-primitives"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CodeBlock } from "@/components/practice/practice-elements"
import { codeLanguageFor } from "@/lib/syntax-highlighter"
function htmlProps<T extends { node?: unknown }>(props: T) {
  const next = { ...props }
  delete next.node
  return next
}
export const LearningMarkdown = memo(function LearningMarkdown({
  content,
  topic,
  anchorPrefix,
  variant = "lecture",
}: {
  content: string
  topic: string
  anchorPrefix?: string
  variant?: "lecture" | "answer"
}) {
  const size = useInterfaceSettings((state) => state.readingSize)
  const spacing = useInterfaceSettings((state) => state.readingSpacing)
  return (
    <div
      style={{ fontSize: size, lineHeight: { normal: 1.8, relaxed: 2, wide: 2.2 }[spacing] }}
      className={
        variant === "answer"
          ? "min-w-0 space-y-5 text-sm leading-7 wrap-anywhere [&>p:first-of-type]:rounded-r-lg [&>p:first-of-type]:border-l-2 [&>p:first-of-type]:border-primary/35 [&>p:first-of-type]:bg-primary/5 [&>p:first-of-type]:p-4 [&>p:first-of-type]:text-foreground"
          : "min-w-0 space-y-5 text-sm leading-7 wrap-anywhere"
      }
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        remarkRehypeOptions={{
          footnoteLabel: "Примечания",
          footnoteBackLabel: "Вернуться к сноске",
        }}
        components={{
          hr: (props) => <hr className="my-8 border-border/60" {...htmlProps(props)} />,
          img: (props) => (
            <img
              className="h-auto max-w-full rounded-lg"
              loading="lazy"
              {...htmlProps(props)}
              alt={props.alt ?? ""}
            />
          ),
          h1: (props) => (
            <h2
              className="mt-8 text-[1.6em] leading-tight font-semibold tracking-tight first:mt-0"
              {...htmlProps(props)}
              id={
                anchorPrefix && props.node?.position
                  ? `${anchorPrefix}-line-${props.node.position.start.line}`
                  : props.id
              }
            >
              {props.children}
            </h2>
          ),
          h2: (props) => (
            <h2
              className={
                variant === "answer"
                  ? "mt-7 scroll-mt-24 text-[1.25em] leading-snug font-semibold first:mt-0"
                  : "mt-8 scroll-mt-24 text-[1.4em] leading-snug font-semibold tracking-tight first:mt-0"
              }
              {...htmlProps(props)}
              id={
                anchorPrefix && props.node?.position
                  ? `${anchorPrefix}-line-${props.node.position.start.line}`
                  : props.id
              }
            >
              {props.children}
            </h2>
          ),
          h3: (props) => (
            <h3
              className="mt-6 scroll-mt-24 text-[1.1em] font-semibold first:mt-0"
              {...htmlProps(props)}
              id={
                anchorPrefix && props.node?.position
                  ? `${anchorPrefix}-line-${props.node.position.start.line}`
                  : props.id
              }
            >
              {props.children}
            </h3>
          ),
          p: (props) => (
            <p className="leading-[inherit]" {...htmlProps(props)}>
              <AnimatedText>{props.children}</AnimatedText>
            </p>
          ),
          strong: (props) => (
            <strong className="font-semibold text-foreground" {...htmlProps(props)} />
          ),
          ul: (props) => (
            <ul className="list-disc space-y-2 pl-5 marker:text-primary" {...htmlProps(props)} />
          ),
          ol: (props) => (
            <ol className="list-decimal space-y-2 pl-5 marker:text-primary" {...htmlProps(props)} />
          ),
          li: (props) => <li className="pl-1 [&>ol]:mt-2 [&>ul]:mt-2" {...htmlProps(props)} />,
          blockquote: (props) => (
            <blockquote
              className="rounded-r-lg border-l-2 border-primary/35 bg-muted/30 p-4 text-foreground"
              {...htmlProps(props)}
            />
          ),
          a: (props) => (
            <a
              className="rounded-sm text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-ring motion-reduce:transition-none"
              {...htmlProps(props)}
            >
              {props.children}
            </a>
          ),
          table: (props) => (
            <div
              aria-label="Таблица материала с горизонтальной прокруткой"
              className="max-w-full overflow-x-auto overscroll-x-contain rounded-lg bg-muted/20 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
            >
              <table
                className="w-full border-collapse text-left text-[0.9em] [&_tr:last-child_td]:border-b-0"
                {...htmlProps(props)}
              />
            </div>
          ),
          th: (props) => (
            <th
              className="border-b border-border/80 bg-muted/60 px-4 py-3 align-top font-semibold"
              {...htmlProps(props)}
            />
          ),
          td: (props) => (
            <td className="border-b border-border/50 px-4 py-3 align-top" {...htmlProps(props)} />
          ),
          pre: ({ children }) => <div className="min-w-0">{children}</div>,
          code: ({ children, className }) =>
            className?.startsWith("language-") || String(children).endsWith("\n") ? (
              <CodeBlock
                code={String(children).replace(/\n$/, "")}
                language={codeLanguageFor(
                  topic,
                  String(children),
                  className?.slice("language-".length),
                )}
              />
            ) : (
              <code className="rounded-md bg-muted/70 px-1.5 py-0.5 font-mono text-[0.9em]">
                {children}
              </code>
            ),
        }}
      >
        {content}
      </Markdown>
    </div>
  )
})
