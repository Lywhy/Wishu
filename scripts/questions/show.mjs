import { resolve } from "node:path"
import { command, loadCatalog, outputs, readJson, root } from "./catalog.mjs"
import { options } from "./options.mjs"

command(async () => {
  const args = options(process.argv.slice(2), { flags: ["json", "metadata"], values: ["id"] })
  if (!args.id) throw new Error("Укажите --id")
  const lookup = await readJson(resolve(root, outputs.lookup))
  const record = lookup.questions.find((item) => item.id === args.id)
  if (!record)
    throw new Error(
      "ID отсутствует в индексе. Для нового вопроса выполните content:build или откройте его исходник.",
    )
  const catalog = await loadCatalog({ section: record.sectionId, subsection: record.subsectionId })
  const question = catalog.entries.find((entry) => entry.question.id === args.id)?.question
  if (!question)
    throw new Error("Вопрос больше не находится в указанном подразделе. Обновите индекс.")
  if (args.metadata) {
    const metadata = Object.fromEntries(
      Object.entries(question).filter(([key]) => !["answer", "code"].includes(key)),
    )
    console.log(JSON.stringify(metadata, null, 2))
    return
  }
  if (args.json) {
    console.log(JSON.stringify(question, null, 2))
    return
  }
  console.log(
    `# ${question.title}\n\n${question.answer.join("\n\n")}\n\nГлавная мысль: ${question.takeaway}`,
  )
  if (question.pitfall) console.log(`\nТипичная ошибка: ${question.pitfall}`)
  if (question.code) console.log(`\nКод вопроса:\n${question.code}`)
})
