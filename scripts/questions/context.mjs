import { resolve } from "node:path"
import { command, compileCatalog, loadCatalog, outputs, readJson, root } from "./catalog.mjs"
import { options } from "./options.mjs"
import { rankQuestions, validateFilters } from "./search.mjs"
import { changedFiles } from "./fingerprints.mjs"
import { readBatch } from "./planning.mjs"

command(async () => {
  const argv = process.argv.slice(2)
  const args = options(argv, {
    flags: [
      "json",
      "answers",
      "all",
      "skills",
      "sources",
      "decisions",
      "neighbors",
      "fresh",
      "examples",
      "boundaries",
      "feedback",
      "version-notes",
    ],
    values: ["query", "batch", "profile"],
    positionals: true,
  })
  if (!argv.includes("--limit")) args.limit = 3
  const batch = args.batch ? await readBatch(args.batch) : null
  if (batch) {
    if (
      (args.section && args.section !== batch.sectionId) ||
      (args.subsection && args.subsection !== batch.subsectionId)
    )
      throw new Error("Фильтры не совпадают с пакетом")
    args.section = batch.sectionId
    args.subsection = batch.subsectionId
  }
  if (!args.section) throw new Error("Укажите --section или --batch")
  let catalog, compiled
  if (args.fresh || args.answers) {
    catalog = await loadCatalog(args)
    compiled = compileCatalog(catalog)
  }
  const lookup = compiled?.lookup ?? (await readJson(resolve(root, outputs.lookup)))
  validateFilters(lookup.sections, args)
  let focused = lookup.questions.filter(
    (item) =>
      item.sectionId === args.section &&
      (!args.subsection || item.subsectionId === args.subsection),
  )
  const focusIds = batch?.workspace?.questionIds ?? batch?.questionIds ?? []
  if (focusIds.length && !args.query) focused = focused.filter((item) => focusIds.includes(item.id))
  focused = args.query
    ? rankQuestions(focused, args.query).map((item) => item.question)
    : [...focused].sort(
        (a, b) =>
          ["core", "extended", "specialist"].indexOf(a.priority ?? "core") -
          ["core", "extended", "specialist"].indexOf(b.priority ?? "core"),
      )
  const selected = focused.slice(0, args.all ? focused.length : args.limit)
  const paths = [
    "content/questions/catalog.json",
    ...(args.subsection
      ? [`content/questions/${args.section}/${args.subsection}.json`]
      : lookup.sections
          .find((section) => section.id === args.section)
          .subsections.map((topic) => `content/questions/${args.section}/${topic.id}.json`)),
    ...selected.flatMap((item) => [
      `content/questions/${item.sectionId}/${item.subsectionId}.json`,
      ...(item.answerFile ? ["content/" + item.answerFile] : []),
    ]),
  ]
  const snapshots = await readJson(resolve(root, outputs.files))
  const indexed = Object.fromEntries(paths.map((file) => [file, snapshots.files[file] ?? null]))
  const stale = await changedFiles(indexed)
  const sinceCheckpoint = batch?.workspace?.files ? await changedFiles(batch.workspace.files) : null
  const packet = {
    scope: `${args.section}/${args.subsection ?? "*"}`,
    totalMatches: focused.length,
    questions: selected.map((item) => ({
      id: item.id,
      title: item.title,
      goal: item.learningGoal,
      file: `content/questions/${item.sectionId}/${item.subsectionId}.json`,
      ...(item.answerFile ? { answerFile: "content/" + item.answerFile } : {}),
      hash: item.contentHash,
    })),
    staleIndexFiles: stale.map((item) => item.file),
    ...(batch
      ? {
          batch: batch.id,
          currentPass: batch.currentPass,
          nextActions: batch.workspace?.nextActions ?? [],
          changedSinceCheckpoint: sinceCheckpoint?.map((item) => item.file) ?? null,
        }
      : {}),
  }
  if (args.profile || args.examples || args.boundaries || args.feedback || args["version-notes"]) {
    const prep = await readJson(resolve(root, "content/preparation/catalog.json"))
    if (args.profile) {
      const profile = prep.profiles.find((item) => item.id === args.profile)
      if (!profile) throw new Error(`Неизвестный профиль ${args.profile}`)
      packet.profile = profile
    }
    if (args.examples) packet.examples = prep.exemplars.slice(0, args.limit)
    if (args.boundaries)
      packet.boundaries = prep.boundaries
        .filter((item) =>
          [...item.canonicalQuestionIds, ...item.appliedQuestionIds].some((id) =>
            lookup.questions.some(
              (question) => question.id === id && question.sectionId === args.section,
            ),
          ),
        )
        .slice(0, args.limit)
    if (args.feedback)
      packet.feedback = prep.interviewFeedback
        .filter((item) => item.sectionId === args.section)
        .slice(0, args.limit)
    if (args["version-notes"])
      packet.versionNotes = prep.versionNotes
        .filter((item) =>
          item.questionIds.some((id) =>
            lookup.questions.some(
              (question) =>
                question.id === id &&
                question.sectionId === args.section &&
                (!args.subsection || question.subsectionId === args.subsection),
            ),
          ),
        )
        .slice(0, args.limit)
  }
  if (args.skills || args.all) {
    const coverage = compiled?.coverage ?? (await readJson(resolve(root, outputs.coverage)))
    packet.skills = coverage.sections
      .filter((section) => section.id === args.section)
      .flatMap((section) =>
        section.topics
          .filter((topic) => !args.subsection || topic.id === args.subsection)
          .flatMap((topic) =>
            topic.goals
              .filter(
                (goal) =>
                  args.all ||
                  selected.some(
                    (item) =>
                      item.subsectionId === topic.id && (goal.id === item.id || goal.id === "core"),
                  ) ||
                  ["planned", "partial"].includes(goal.status),
              )
              .map((goal) => ({
                id: goal.id,
                topic: topic.id,
                status: goal.status,
                description: goal.description,
                priority: goal.priority ?? "core",
              })),
          ),
      )
      .slice(0, args.all ? undefined : args.limit)
  }
  if (args.sources || args.all) {
    const bank = await readJson(resolve(root, "content/references/sources.json"))
    packet.sources = bank.topics
      .filter(
        (topic) =>
          topic.sectionId === args.section &&
          (!args.subsection || topic.subsectionId === args.subsection),
      )
      .map((topic) => ({
        topic: topic.subsectionId,
        caveats: topic.caveats ?? [],
        sources: topic.sources
          .slice(0, args.all ? undefined : args.limit)
          .map((source) => ({
            id: source.id,
            title: source.title,
            url: source.url,
            checkedAt: source.checkedAt,
            ...(source.notes ? { notes: source.notes } : {}),
          })),
      }))
  }
  if (args.decisions || args.all) {
    const journal = await readJson(resolve(root, "content/decisions.json"))
    packet.decisions = journal.entries
      .filter(
        (item) =>
          item.type === "workflow" ||
          item.sectionId === args.section ||
          item.questionIds.some((id) => selected.some((question) => question.id === id)),
      )
      .slice(0, args.all ? undefined : args.limit)
      .map((item) => ({ id: item.id, reason: item.reason }))
  }
  if (args.neighbors || args.all) {
    const index = await readJson(resolve(root, outputs.index))
    const local = new Set(
      lookup.questions
        .filter(
          (item) =>
            item.sectionId === args.section &&
            (!args.subsection || item.subsectionId === args.subsection),
        )
        .map((item) => item.id),
    )
    const related = new Set(
      index.questions
        .filter((item) => selected.some((question) => question.id === item.id))
        .flatMap((item) => item.relatedQuestionIds),
    )
    const candidates = index.questions.filter((item) => !local.has(item.id))
    packet.nearby = [
      ...new Map(
        [
          ...candidates.filter((item) => related.has(item.id)),
          ...(args.query ? rankQuestions(candidates, args.query).map((item) => item.question) : []),
        ].map((item) => [item.id, item]),
      ).values(),
    ]
      .slice(0, args.limit)
      .map((item) => ({
        id: item.id,
        title: item.title,
        topic: `${item.sectionId}/${item.subsectionId}`,
      }))
  }
  if (args.answers)
    packet.answers = selected.map((item) => ({
      id: item.id,
      answer: catalog.entries.find((entry) => entry.question.id === item.id).question.answer,
    }))
  if (args.json) {
    console.log(JSON.stringify(packet, null, 2))
    return
  }
  console.log(
    `${packet.scope}: ${selected.length}/${focused.length} вопросов${args.fresh ? "; свежие исходники" : "; компактный индекс"}.`,
  )
  for (const item of packet.questions)
    console.log(
      `${item.id}: ${item.title}\n  ${item.goal}\n  ${item.file}${item.answerFile ? " | " + item.answerFile : ""}`,
    )
  if (stale.length)
    console.log(`Индекс устарел: ${stale.length} файлов. Используйте --fresh или content:build.`)
  if (batch)
    console.log(
      `Пакет ${batch.id}; проход ${batch.currentPass}; с рабочего снимка: ${sinceCheckpoint === null ? "снимка нет" : sinceCheckpoint.length + " изменённых файлов"}. Следующее: ${packet.nextActions.join("; ") || "см. план"}`,
    )
  for (const key of [
    "skills",
    "sources",
    "decisions",
    "nearby",
    "answers",
    "profile",
    "examples",
    "boundaries",
    "feedback",
    "versionNotes",
  ])
    if (packet[key]) console.log(`${key}: ${JSON.stringify(packet[key])}`)
  if (!args.answers)
    console.log(
      "Полный ответ: content:show --id <id>. Детали: --skills --sources --decisions --neighbors.",
    )
})
