import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Json = null | boolean | number | string | Json[] | { [key: string]: Json }
const missing = Symbol("missing")
type Peer = Json | typeof missing
function parse(value?: string): Json | undefined {
  if (value === undefined) return undefined
  try {
    return JSON.parse(value) as Json
  } catch {
    return undefined
  }
}
function primitive(value: Json) {
  return JSON.stringify(value)
}
function peerAt(peer: Peer, key: string): Peer {
  return peer !== missing && peer !== null && typeof peer === "object" && Object.hasOwn(peer, key)
    ? (peer as Record<string, Json>)[key]
    : missing
}
function Leaf({ value, peer, compare }: { value: Json; peer: Peer; compare: boolean }) {
  const different = compare && (peer === missing || !Object.is(value, peer))
  return (
    <span
      className={cn(
        different &&
          "rounded bg-amber-500/20 px-1 text-foreground underline decoration-amber-600/50 underline-offset-4",
      )}
    >
      {primitive(value)}
      {different && <span className="sr-only"> (отличается)</span>}
    </span>
  )
}
function JsonNode({
  value,
  peer,
  compare,
  depth = 0,
  name,
}: {
  value: Json
  peer: Peer
  compare: boolean
  depth?: number
  name?: string
}) {
  if (value === null || typeof value !== "object")
    return (
      <>
        <span className="text-muted-foreground">{name !== undefined ? name + ": " : ""}</span>
        <Leaf value={value} peer={peer} compare={compare} />
      </>
    )
  if (
    Array.isArray(value) &&
    value.length <= 8 &&
    value.every((item) => item === null || typeof item !== "object")
  )
    return (
      <>
        {name !== undefined && <span className="text-muted-foreground">{name}: </span>}[
        {value.map((item, index) => (
          <span key={index}>
            {index > 0 ? ", " : ""}
            <Leaf value={item} peer={peerAt(peer, String(index))} compare={compare} />
          </span>
        ))}
        ]
        {compare && (!Array.isArray(peer) || peer.length !== value.length) && (
          <span className="ml-2 text-amber-700 dark:text-amber-300">
            {Array.isArray(peer) ? "длина отличается" : "тип отличается"}
          </span>
        )}
      </>
    )
  return <JsonBranch value={value} peer={peer} compare={compare} depth={depth} name={name} />
}
function JsonBranch({
  value,
  peer,
  compare,
  depth,
  name,
}: {
  value: Json[] | { [key: string]: Json }
  peer: Peer
  compare: boolean
  depth: number
  name?: string
}) {
  const [limit, setLimit] = useState(10)
  const entries = Object.entries(value)
  const missingKeys =
    compare && peer !== missing && peer !== null && typeof peer === "object"
      ? Object.keys(peer).filter((key) => !Object.hasOwn(value, key))
      : []
  if (depth > 20) return <pre className="whitespace-pre-wrap">{JSON.stringify(value)}</pre>
  return (
    <Collapsible defaultOpen={depth === 0}>
      <CollapsibleTrigger className="group inline-flex max-w-full items-center gap-2 rounded py-1 text-left outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring">
        <ChevronDown
          aria-hidden="true"
          className="size-3 shrink-0 transition-transform duration-150 group-aria-expanded:rotate-180 motion-reduce:transition-none"
        />
        <span className="wrap-anywhere">
          {name !== undefined ? name + ": " : ""}
          {Array.isArray(value) ? "Массив" : "Объект"} ({entries.length})
        </span>
      </CollapsibleTrigger>
      {compare &&
        (peer === missing ||
          peer === null ||
          typeof peer !== "object" ||
          Array.isArray(value) !== Array.isArray(peer)) && (
          <p className="text-destructive">Тип или наличие значения отличается</p>
        )}
      <CollapsibleContent className="ml-1.5 space-y-1 border-l pl-3">
        {entries.slice(0, limit).map(([key, item]) => (
          <div key={key}>
            <JsonNode
              value={item}
              peer={peerAt(peer, key)}
              compare={compare}
              depth={depth + 1}
              name={Array.isArray(value) ? `[${key}]` : JSON.stringify(key)}
            />
          </div>
        ))}
        {entries.length > limit && (
          <Button size="sm" variant="ghost" onClick={() => setLimit((size) => size + 20)}>
            Показать ещё ({entries.length - limit})
          </Button>
        )}
        {missingKeys.slice(0, 10).map((key) => (
          <p key={"missing:" + key} className="text-destructive">
            {JSON.stringify(key)}: отсутствует
          </p>
        ))}
        {missingKeys.length > 10 && (
          <p className="text-destructive">Ещё отсутствующих полей: {missingKeys.length - 10}</p>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
export function ResultValue({
  label,
  value,
  compareWith,
  highlight = false,
}: {
  label: string
  value?: string
  compareWith?: string
  highlight?: boolean
}) {
  const parsed = parse(value),
    peer = parse(compareWith)
  return (
    <div className="min-w-0">
      <h4 className="mb-2 text-xs font-medium text-muted-foreground">{label}</h4>
      <div
        aria-label={label}
        className="max-h-72 overflow-auto overscroll-contain rounded-lg bg-muted/40 p-3 font-mono text-xs leading-6 wrap-anywhere outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      >
        {parsed !== undefined ? (
          <JsonNode value={parsed} peer={peer === undefined ? missing : peer} compare={highlight} />
        ) : (
          <pre
            className={cn(
              "whitespace-pre-wrap",
              highlight && value !== compareWith && "rounded bg-amber-500/10 p-1",
            )}
          >
            {value ?? "Нет результата"}
          </pre>
        )}
      </div>
    </div>
  )
}
