import { Injectable, NotFoundException } from "@nestjs/common"
import { DatabaseService } from "../../database/database.service"

interface GroupRow {
  id: string
  title: string
  description: string
}
interface SectionRow {
  id: string
  group: string
  title: string
  description: string
  moduleId: string
  mark: string
}
interface SubsectionRow {
  id: string
  sectionId: string
  title: string
  description: string
}
interface QuestionRow {
  id: string
  sectionId: string
  subsectionId: string
  title: string
  topic: string
  difficulty: "Базовый" | "Средний" | "Продвинутый"
  summary: string
  answer: string[]
  code: string | null
  takeaway: string
  moduleId: string
}

const questionColumns = `q.id, q.section_id AS "sectionId", q.subsection_id AS "subsectionId", q.title, q.topic, q.difficulty, q.summary, q.answer, q.code, q.takeaway, s.module_id AS "moduleId"`

@Injectable()
export class QuestionsService {
  constructor(private readonly database: DatabaseService) {}

  async catalog() {
    return this.database.transaction(async (client) => {
      await client.query("SET TRANSACTION ISOLATION LEVEL REPEATABLE READ, READ ONLY")
      const groups = await client.query<GroupRow>(
        "SELECT id, title, description FROM question_groups ORDER BY sort_order, id",
      )
      const sections = await client.query<SectionRow>(
        'SELECT id, group_id AS "group", title, description, module_id AS "moduleId", mark FROM question_sections ORDER BY sort_order, id',
      )
      const subsections = await client.query<SubsectionRow>(
        'SELECT id, section_id AS "sectionId", title, description FROM question_subsections ORDER BY sort_order, id',
      )
      const questions = await client.query<QuestionRow>(
        `SELECT ${questionColumns} FROM questions q JOIN question_sections s ON s.id = q.section_id JOIN question_subsections sub ON sub.section_id = q.section_id AND sub.id = q.subsection_id ORDER BY s.sort_order, sub.sort_order, q.sort_order, q.id`,
      )
      return {
        groups: groups.rows,
        sections: sections.rows.map((section) => ({
          ...section,
          subsections: subsections.rows
            .filter((subsection) => subsection.sectionId === section.id)
            .map((subsection) => ({
              id: subsection.id,
              title: subsection.title,
              description: subsection.description,
              questionIds: questions.rows
                .filter(
                  (question) =>
                    question.sectionId === section.id && question.subsectionId === subsection.id,
                )
                .map((question) => question.id),
            })),
        })),
        questions: questions.rows,
      }
    })
  }

  async findQuestion(id: string) {
    const result = await this.database.query<QuestionRow>(
      `SELECT ${questionColumns} FROM questions q JOIN question_sections s ON s.id = q.section_id WHERE q.id = $1`,
      [id],
    )
    if (!result.rows[0]) throw new NotFoundException("Вопрос не найден")
    return result.rows[0]
  }
}
