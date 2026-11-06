import { lectureHeadings } from "@/lib/lecture-headings"
export function LectureOutline({ content, prefix }: { content: string; prefix: string }) {
  const headings = lectureHeadings(content)
  return headings.length > 1 ? (
    <nav aria-label="В этой лекции" className="rounded-xl border bg-muted/20 p-4">
      <h2 className="text-sm font-semibold">В этой лекции</h2>
      <ol className="mt-3 space-y-2 text-xs">
        {headings.map((item) => (
          <li key={item.line} className={item.depth === 3 ? "pl-4" : ""}>
            <a
              className="text-primary underline underline-offset-4"
              href={`#${prefix}-line-${item.line}`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  ) : null
}
