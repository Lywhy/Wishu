import { valueDifferences } from "@/lib/value-differences"

export function ResultDifferences({ expected, actual }: { expected?: string; actual?: string }) {

  const items = valueDifferences(expected, actual)
  return items.length ? (
    <div className="space-y-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
      <h4 className="text-xs font-semibold">Где отличается результат</h4>
      {items.map((item, i) => (
        <div key={i} className="space-y-1 font-mono text-xs wrap-anywhere">
          <p className="font-semibold">{item.path}</p>
          <p>
            Ожидалось:{" "}
            <mark className="rounded bg-emerald-500/15 px-1 text-foreground">{item.expected}</mark>
          </p>
          <p>
            Получено:{" "}
            <mark className="rounded bg-destructive/15 px-1 text-foreground">{item.actual}</mark>
          </p>
        </div>
      ))}
    </div>
  ) : null
}
