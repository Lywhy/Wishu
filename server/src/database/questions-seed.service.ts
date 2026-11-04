import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { Injectable } from "@nestjs/common"
import { DatabaseService } from "./database.service"

interface SeedData {
  groups: { id: string; title: string; description: string; order: number }[]
  sections: {
    id: string
    groupId: string
    title: string
    description: string
    moduleId: string
    inDevelopment?: boolean
    mark: string
    order: number
  }[]
  subsections: {
    id: string
    sectionId: string
    title: string
    description: string
    order: number
  }[]
  questions: {
    id: string
    sectionId: string
    subsectionId: string
    title: string
    topic: string
    difficulty: string
    popular?: boolean
    summary: string
    answer: string[]
    code?: string
    takeaway: string
    pitfall?: string
    order: number
  }[]
}

@Injectable()
export class QuestionsSeedService {
  constructor(private readonly database: DatabaseService) {}

  async run() {
    const seed = JSON.parse(
      await readFile(resolve(__dirname, "../../database/seeds/questions.json"), "utf8"),
    ) as SeedData
    await this.database.transaction(async (client) => {
      await client.query("SELECT pg_advisory_xact_lock($1)", [1743070001])
      for (const group of seed.groups) {
        await client.query(
          "INSERT INTO question_groups (id, title, description, sort_order) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order",
          [group.id, group.title, group.description, group.order],
        )
      }
      for (const section of seed.sections) {
        await client.query(
          "INSERT INTO question_sections (id, group_id, title, description, module_id, mark, sort_order, in_development) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO UPDATE SET group_id = EXCLUDED.group_id, title = EXCLUDED.title, description = EXCLUDED.description, module_id = EXCLUDED.module_id, mark = EXCLUDED.mark, sort_order = EXCLUDED.sort_order, in_development = EXCLUDED.in_development",
          [
            section.id,
            section.groupId,
            section.title,
            section.description,
            section.moduleId,
            section.mark,
            section.order,
            section.inDevelopment ?? false,
          ],
        )
      }
      for (const subsection of seed.subsections) {
        await client.query(
          "INSERT INTO question_subsections (section_id, id, title, description, sort_order) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (section_id, id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order",
          [
            subsection.sectionId,
            subsection.id,
            subsection.title,
            subsection.description,
            subsection.order,
          ],
        )
      }
      for (const question of seed.questions) {
        await client.query(
          "INSERT INTO questions (id, section_id, subsection_id, title, topic, difficulty, summary, answer, code, takeaway, sort_order, popular, pitfall) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,$10,$11,$12,$13) ON CONFLICT (id) DO UPDATE SET section_id = EXCLUDED.section_id, subsection_id = EXCLUDED.subsection_id, title = EXCLUDED.title, topic = EXCLUDED.topic, difficulty = EXCLUDED.difficulty, summary = EXCLUDED.summary, answer = EXCLUDED.answer, code = EXCLUDED.code, takeaway = EXCLUDED.takeaway, sort_order = EXCLUDED.sort_order, popular = EXCLUDED.popular, pitfall = EXCLUDED.pitfall",
          [
            question.id,
            question.sectionId,
            question.subsectionId,
            question.title,
            question.topic,
            question.difficulty,
            question.summary,
            JSON.stringify(question.answer),
            question.code ?? null,
            question.takeaway,
            question.order,
            question.popular ?? false,
            question.pitfall ?? null,
          ],
        )
      }
    })
    return {
      groups: seed.groups.length,
      sections: seed.sections.length,
      subsections: seed.subsections.length,
      questions: seed.questions.length,
    }
  }
}
