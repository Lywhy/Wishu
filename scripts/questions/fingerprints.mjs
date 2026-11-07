import { createHash } from "node:crypto"
import { readFile, realpath } from "node:fs/promises"
import { dirname, isAbsolute, relative, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"
const project = resolve(dirname(fileURLToPath(import.meta.url)), "../..")

export async function fingerprint(file) {
  if (
    typeof file !== "string" ||
    isAbsolute(file) ||
    file.includes("\\") ||
    file.split("/").includes("..")
  )
    throw new Error(`Некорректный путь снимка ${file}`)
  const target = resolve(project, file),
    location = relative(project, target)
  if (isAbsolute(location) || location.startsWith(".." + sep) || location === "..")
    throw new Error("Путь снимка выходит из проекта")
  try {
    const physical = relative(await realpath(project), await realpath(target))
    if (isAbsolute(physical) || physical.startsWith(".." + sep) || physical === "..")
      throw new Error("Файл снимка ссылается за пределы проекта")
    return createHash("sha256")
      .update(await readFile(target))
      .digest("hex")
  } catch (error) {
    if (error.code === "ENOENT") return null
    throw error
  }
}
export async function fingerprints(files) {
  return Object.fromEntries(
    await Promise.all(
      [...new Set(files)].sort().map(async (file) => [file, await fingerprint(file)]),
    ),
  )
}
export async function fileIndex(catalog) {
  const files = [
    "content/questions/catalog.json",
    "content/references/sources.json",
    "content/decisions.json",
    "content/preparation/catalog.json",
    ...catalog.bundles.map(
      (item) => `content/questions/${item.subsection.sectionId}/${item.subsection.id}.json`,
    ),
    ...catalog.entries
      .filter((item) => item.question.answerFile)
      .map((item) => "content/" + item.question.answerFile),
  ]
  return { schemaVersion: 1, files: await fingerprints(files) }
}
export async function changedFiles(snapshot) {
  const current = await fingerprints(Object.keys(snapshot))
  return Object.keys(snapshot)
    .filter((file) => current[file] !== snapshot[file])
    .map((file) => ({ file, hash: current[file] }))
}
