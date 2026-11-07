import { mkdir, open } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { command, compileCatalog, loadCatalog, root, saveJson } from "./catalog.mjs"
import { changedFiles, fingerprints } from "./fingerprints.mjs"
import { options } from "./options.mjs"
import { batchPath, planningData, readBatch } from "./planning.mjs"

command(async () => {
  const args = options(process.argv.slice(2), {
    flags: ["dry-run", "json", "remember", "all"],
    values: ["new", "id", "title", "questions", "next", "decisions"],
  })
  if (args.new) {
    if (!args.section || !args.subsection)
      throw new Error("Для нового плана укажите --section и --subsection")
    const catalog = await loadCatalog(args),
      compiled = compileCatalog(catalog)
    await planningData(catalog)
    const topic = compiled.coverage.sections.flatMap((section) => section.topics)[0]
    const plan = {
      schemaVersion: 1,
      id: args.new,
      title: args.title ?? args.new,
      sectionId: args.section,
      subsectionId: args.subsection,
      currentPass: "scope",
      goalIds: topic.goals.map((goal) => goal.id),
      questionIds: [],
      scopePass: {
        status: "pending",
        remaining: [
          "Проверить цели, пробелы и пересечения; зафиксировать решения в content/decisions.json.",
        ],
      },
      answerPass: {
        status: "pending",
        remaining: ["Подготовить ответы, примеры, источники и проверить итоговый пакет."],
      },
      baseline: compiled.index.questions.map((item) => ({
        id: item.id,
        title: item.title,
        contentHash: item.contentHash,
      })),
      notes: [],
    }
    const file = resolve(root, batchPath(args.new))
    if (args["dry-run"]) {
      console.log(JSON.stringify(plan, null, 2))
      return
    }
    await mkdir(dirname(file), { recursive: true })
    const handle = await open(file, "wx")
    try {
      await handle.writeFile(JSON.stringify(plan, null, 2) + "\n")
    } finally {
      await handle.close()
    }
    console.log(
      `Создан план ${batchPath(args.new)}. Baseline сохранён независимо от content:build.`,
    )
    return
  }
  if (!args.id) throw new Error("Укажите --new <id> или --id <id>")
  const plan = await readBatch(args.id)
  if (args.remember) {
    const catalog = await loadCatalog({ section: plan.sectionId, subsection: plan.subsectionId })
    const { journal } = await planningData(catalog)
    const ids = args.questions
      ? [
          ...new Set(
            args.questions
              .split(",")
              .map((id) => id.trim())
              .filter(Boolean),
          ),
        ]
      : (plan.workspace?.questionIds ?? plan.questionIds)
    if (!ids.length) throw new Error("Для рабочего снимка укажите --questions id1,id2")
    const focused = ids.map((id) => {
      const entry = catalog.entries.find((entry) => entry.question.id === id)
      if (!entry) throw new Error(`ID ${id} не относится к области пакета`)
      return entry
    })
    if (args.next !== undefined && (args.next.length > 280 || !args.next.trim()))
      throw new Error("--next: одно действие до 280 символов")
    const decisionIds = args.decisions
      ? args.decisions.split(",").filter(Boolean)
      : (plan.workspace?.decisionIds ?? [])
    if (!decisionIds.every((id) => journal.entries.some((decision) => decision.id === id)))
      throw new Error("Неизвестный ID редакторского решения")
    const files = [
      "AGENTS.md",
      "content/AGENTS.md",
      "content/questions/catalog.json",
      "content/references/sources.json",
      "content/decisions.json",
      "content/preparation/catalog.json",
      ...focused.flatMap((entry) => [
        entry.sourceFile,
        ...(entry.question.answerFile ? ["content/" + entry.question.answerFile] : []),
      ]),
    ]
    plan.questionIds = ids
    plan.workspace = {
      questionIds: ids,
      decisionIds,
      files: await fingerprints(files),
      nextActions: args.next ? [args.next] : (plan.workspace?.nextActions ?? []),
    }
    if (!args["dry-run"]) await saveJson(batchPath(plan.id), plan)
    console.log(
      `${args["dry-run"] ? "Предпросмотр" : "Снимок сохранён"}: ${ids.length} вопросов, ${Object.keys(plan.workspace.files).length} файлов.`,
    )
    return
  }
  if (args.json) {
    console.log(JSON.stringify(plan, null, 2))
    return
  }
  const changed = plan.workspace?.files ? await changedFiles(plan.workspace.files) : null
  console.log(
    `${plan.id}: ${plan.currentPass}; scope=${plan.scopePass.status}; answers=${plan.answerPass.status}; ${plan.questionIds.length} вопросов.`,
  )
  console.log(
    `Дальше: ${(plan.workspace?.nextActions ?? plan[plan.currentPass === "scope" ? "scopePass" : "answerPass"].remaining).slice(0, args.all ? undefined : 3).join("; ") || "нет оставшихся действий"}`,
  )
  console.log(
    changed === null
      ? "Рабочего снимка нет. Сохранить: --remember --questions id1,id2 --next действие"
      : `После снимка: ${changed.length} изменённых файлов.${
          changed.length
            ? "\n" +
              changed
                .slice(0, args.all ? undefined : 3)
                .map((item) => item.file)
                .join("\n")
            : " Повторный анализ неизменённых файлов не требуется; перед правкой прочитайте актуальный файл."
        }`,
  )
})
