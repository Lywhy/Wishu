export function lectureHeadings(markdown: string) {
  let fence = false
  return markdown.split("\n").flatMap((line, index) => {
    if (/^\s*(```|~~~)/.test(line)) {
      fence = !fence
      return []
    }
    const found = !fence ? /^(#{2,3})\s+(.+)$/.exec(line) : null
    return found
      ? [{ line: index + 1, title: found[2].replace(/[*`_]/g, ""), depth: found[1].length }]
      : []
  })
}
