import { readFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
const file = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../content/references/sources.json",
)
export async function readSourceRegistry() {
  return JSON.parse(await readFile(file, "utf8"))
}
export function resolveSourceRefs(bank, sectionId, subsectionId, refs) {
  if (
    !Array.isArray(refs) ||
    refs.some((ref) => typeof ref !== "string") ||
    new Set(refs).size !== refs.length
  )
    throw new Error("sourceRefs должен быть массивом неповторяющихся ID")
  const topic = bank.topics.find(
    (topic) => topic.sectionId === sectionId && topic.subsectionId === subsectionId,
  )
  return refs.map((id) => {
    const source = topic?.sources.find((source) => source.id === id)
    if (!source) throw new Error(`Неизвестный sourceRef ${sectionId}/${subsectionId}/${id}`)
    return { title: source.title, url: source.url }
  })
}
