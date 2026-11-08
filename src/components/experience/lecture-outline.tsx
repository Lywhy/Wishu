import { Disclosure } from "@/components/experience/disclosure"
import { lectureHeadings } from "@/lib/lecture-headings"
export function LectureOutline({
  content,
  prefix,
  compact = false,
}: {
  content: string
  prefix: string
  compact?: boolean
}) {
  const headings = lectureHeadings(content)
  const links =
    headings.length > (compact ? 3 : 1) ? (
      <nav
        aria-label={compact ? "Разделы ответа" : "В этой лекции"}
        className={compact ? "" : "rounded-lg bg-muted/25 p-4"}
      >
        {!compact && <h2 className="text-sm font-semibold">В этой лекции</h2>}
        <ol className="mt-3 space-y-2 text-xs">
          {headings.map((item) => (
            <li key={item.line} className={item.depth === 3 ? "pl-4" : ""}>
              <a
                className="rounded-sm text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-2 focus-visible:outline-ring motion-reduce:transition-none"
                href={`#${prefix}-line-${item.line}`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    ) : null
  return compact && links ? (
    <Disclosure title="В этом ответе" className="border-0 bg-muted/30">
      {links}
    </Disclosure>
  ) : (
    links
  )
}
