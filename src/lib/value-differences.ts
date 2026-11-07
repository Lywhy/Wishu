export function valueDifferences(expected: string | undefined, actual: string | undefined) {
  if (expected === undefined || actual === undefined)
    return expected === actual
      ? []
      : [
          {
            path: "result",
            expected: expected ?? "нет результата",
            actual: actual ?? "нет результата",
          },
        ]
  let left: unknown, right: unknown
  try {
    left = JSON.parse(expected ?? "null")
    right = JSON.parse(actual ?? "null")
  } catch {
    return expected === actual
      ? []
      : [
          {
            path: "result",
            expected: expected ?? "нет результата",
            actual: actual ?? "нет результата",
          },
        ]
  }
  const differences: { path: string; expected: string; actual: string }[] = []
  const display = (value: unknown) => (value === undefined ? "отсутствует" : JSON.stringify(value))
  const walk = (a: unknown, b: unknown, path: string, depth: number) => {
    if (differences.length >= 12 || Object.is(a, b)) return
    if (
      depth < 15 &&
      a !== null &&
      b !== null &&
      typeof a === "object" &&
      typeof b === "object" &&
      Array.isArray(a) === Array.isArray(b)
    ) {
      const x = a as Record<string, unknown>,
        y = b as Record<string, unknown>
      if (Array.isArray(a) && Array.isArray(b) && a.length !== b.length)
        differences.push({
          path: path + ".length",
          expected: String(a.length),
          actual: String(b.length),
        })
      for (const key of new Set([...Object.keys(x), ...Object.keys(y)]))
        walk(
          x[key],
          y[key],
          path + (Array.isArray(a) ? `[${key}]` : `[${JSON.stringify(key)}]`),
          depth + 1,
        )
    } else differences.push({ path, expected: display(a), actual: display(b) })
  }
  walk(left, right, "result", 0)
  return differences
}
