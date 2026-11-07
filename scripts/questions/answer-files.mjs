import { mkdir, readFile, realpath } from "node:fs/promises"
import { dirname, isAbsolute, relative, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"

const contentRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../content")
const answerRoot = resolve(contentRoot, "answers")
export const answerDelimiter = "\n\n<!-- wishu:answer-block -->\n\n"
const inside = (parent, child) => {
  const path = relative(parent, child)
  return !isAbsolute(path) && path !== ".." && !path.startsWith(".." + sep)
}

export function answerPath(file) {
  if (typeof file !== "string" || !/^answers\/[a-z0-9-]+\/[a-z0-9-]+\.md$/.test(file))
    throw new Error(`Некорректный answerFile: ${file}`)
  const path = resolve(contentRoot, file)
  if (!inside(answerRoot, path)) throw new Error("Markdown должен находиться в content/answers")
  return path
}

export function parseAnswer(markdown) {
  if (typeof markdown !== "string") throw new Error("Ответ должен быть Markdown-строкой")
  const normalized = markdown.replace(/\r\n/g, "\n").replace(/^\uFEFF/, "")
  const body = normalized.endsWith("\n") ? normalized.slice(0, -1) : normalized
  const answer = body.split(answerDelimiter)
  if (answer.some((block) => !block.trim())) throw new Error("Markdown содержит пустой блок ответа")
  return answer
}

export function serializeAnswer(answer) {
  if (
    !Array.isArray(answer) ||
    !answer.length ||
    answer.some(
      (block) => typeof block !== "string" || !block.trim() || block.includes(answerDelimiter),
    )
  )
    throw new Error("Некорректные блоки ответа или зарезервированный разделитель")
  return answer.join(answerDelimiter) + "\n"
}

export async function readAnswer(file, overrides = new Map()) {
  const path = answerPath(file)
  if (overrides.has(file)) return parseAnswer(overrides.get(file))
  const physical = await realpath(path)
  const physicalRoot = await realpath(answerRoot)
  if (!inside(await realpath(contentRoot), physicalRoot) || !inside(physicalRoot, physical))
    throw new Error("Ссылка answerFile выходит из каталога ответов")
  return parseAnswer(await readFile(path, "utf8"))
}

export async function answerWritePath(file) {
  const path = answerPath(file)
  await mkdir(answerRoot, { recursive: true })
  const physicalRoot = await realpath(answerRoot)
  if (!inside(await realpath(contentRoot), physicalRoot))
    throw new Error("Каталог ответов выходит за пределы content")
  await mkdir(dirname(path), { recursive: true })
  if (!inside(physicalRoot, await realpath(dirname(path))))
    throw new Error("Каталог Markdown выходит за пределы content/answers")
  return path
}
