const stopWords = new Set(
  "что такое как чем зачем почему когда где какой какие какая каких это для или при над под без после через внутри можно нужно будет если она они его этой между отличие отличается работает работу использовать против вопрос объяснить основные важно значения значение the a an to and is does".split(
    " ",
  ),
)

export function words(value) {
  return new Set(
    (
      value
        .toLocaleLowerCase("ru")
        .replaceAll("ё", "е")
        .match(/[\p{L}\p{N}]+/gu) ?? []
    ).filter((word) => word.length > 1 && !stopWords.has(word)),
  )
}

export function similarity(left, right) {
  const a = words(left),
    b = words(right)
  if (a.size === 0 || b.size === 0) return 0
  const intersection = [...a].filter((word) => b.has(word)).length
  return intersection / (a.size + b.size - intersection)
}

export function parseOptions(argv, { query = false, limit = 12 } = {}) {
  const options = { limit, section: undefined, subsection: undefined, query: "" }
  const positionals = []
  for (let index = 0; index < argv.length; index++) {
    const argument = argv[index]
    if (argument === "--") continue
    if (["--section", "--subsection", "--limit"].includes(argument)) {
      const value = argv[++index]
      if (!value || value.startsWith("--")) throw new Error(`Укажите значение ${argument}`)
      if (argument === "--limit") {
        const number = Number(value)
        if (!Number.isSafeInteger(number) || number < 1 || number > 100)
          throw new Error("--limit должен быть целым числом от 1 до 100")
        options.limit = number
      } else options[argument.slice(2)] = value
    } else if (argument.startsWith("--") || !query)
      throw new Error(`Неизвестный аргумент: ${argument}`)
    else positionals.push(argument)
  }
  options.query = positionals.join(" ").trim()
  if (query && !options.query)
    throw new Error('Укажите запрос: pnpm content:find -- "замыкания" --section javascript')
  if (options.subsection && !options.section) throw new Error("Для --subsection укажите --section")
  return options
}

export function validateFilters(sections, options) {
  const section = sections.find((section) => section.id === options.section)
  if (options.section && !section) throw new Error(`Нет раздела ${options.section}`)
  if (
    options.subsection &&
    !section.subsections.some((subsection) => subsection.id === options.subsection)
  )
    throw new Error(`Нет подраздела ${options.section}/${options.subsection}`)
}

export function filterIndex(questions, options) {
  return questions.filter(
    (question) =>
      (!options.section || question.sectionId === options.section) &&
      (!options.subsection || question.subsectionId === options.subsection),
  )
}

export function rankQuestions(questions, query) {
  const terms = words(query)
  const exact = query.toLocaleLowerCase("ru")
  return questions
    .map((question) => {
      const title = words(question.title)
      const goal = words(question.learningGoal)
      const keywords = words(question.keywords.join(" "))
      let score = 0
      for (const term of terms) {
        if (title.has(term)) score += 4
        if (goal.has(term)) score += 2
        if (keywords.has(term)) score += 5
      }
      if (question.id.toLowerCase().includes(exact)) score += 12
      if (question.title.toLocaleLowerCase("ru").includes(exact)) score += 10
      return { question, score }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.question.id.localeCompare(b.question.id, "en"))
}

// Lexical suggestions only: a high score is not proof of semantic duplication.
export function duplicateCandidates(all, selectedIds, limit) {
  if (!selectedIds.size) return []
  const tokenSets = all.map((question) => ({
    title: words(question.title),
    goal: words(question.learningGoal),
  }))
  const overlap = (a, b) => {
    if (!a.size || !b.size) return 0
    const common = [...a].filter((word) => b.has(word)).length
    return common / (a.size + b.size - common)
  }
  const candidates = []
  for (let selected = 0; selected < all.length; selected++) {
    if (!selectedIds.has(all[selected].id)) continue
    for (let other = 0; other < all.length; other++) {
      if (other === selected || (selectedIds.has(all[other].id) && other < selected)) continue
      const left = Math.min(selected, other),
        right = Math.max(selected, other)
      const a = all[left],
        b = all[right]
      const titleScore = overlap(tokenSets[left].title, tokenSets[right].title)
      const goalScore = overlap(tokenSets[left].goal, tokenSets[right].goal)
      if (titleScore >= 0.76 || goalScore >= 0.85)
        candidates.push({ left: a, right: b, score: Math.max(titleScore, goalScore) })
    }
  }
  return candidates
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.left.id.localeCompare(b.left.id, "en") ||
        a.right.id.localeCompare(b.right.id, "en"),
    )
    .slice(0, limit)
}
