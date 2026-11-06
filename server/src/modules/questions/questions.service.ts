import type { CreateQuestionDto } from "./questions.dto"
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
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
  inDevelopment: boolean
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
  popular: boolean
  summary: string
  answer: string[]
  code: string | null
  takeaway: string
  pitfall: string | null
  moduleId: string
}

const questionColumns = `q.id, q.section_id AS "sectionId", q.subsection_id AS "subsectionId", q.title, q.topic, q.difficulty, q.popular, q.summary, q.answer, q.code, q.takeaway, q.pitfall, s.module_id AS "moduleId"`

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
        'SELECT id, group_id AS "group", title, description, module_id AS "moduleId", mark, in_development AS "inDevelopment" FROM question_sections ORDER BY sort_order, id',
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

  async create(body: CreateQuestionDto) {
    const id = "custom-" + body.requestId.toLowerCase()
    const answer = [body.shortAnswer, ...(body.details?.trim() ? [body.details.trim()] : [])]
    return this.database.transaction(async (client) => {
      await client.query("SELECT pg_advisory_xact_lock(hashtextextended($1, 0))", [id])
      const location = await client.query<{ title: string; moduleId: string }>(
        'SELECT s.title, s.module_id AS "moduleId" FROM question_subsections sub JOIN question_sections s ON s.id=sub.section_id WHERE sub.section_id=$1 AND sub.id=$2 AND NOT s.in_development FOR UPDATE OF sub',
        [body.sectionId, body.subsectionId],
      )
      const section = location.rows[0]
      if (!section) throw new BadRequestException("Выберите доступный раздел и подраздел")
      const values = [
        id,
        body.sectionId,
        body.subsectionId,
        body.title,
        section.title,
        body.difficulty,
        body.summary,
        JSON.stringify(answer),
        body.code?.trim() || null,
        body.takeaway,
        body.popular,
        body.pitfall?.trim() || null,
      ]
      const existing = await client.query<QuestionRow>(
        "SELECT " +
          questionColumns +
          " FROM questions q JOIN question_sections s ON s.id=q.section_id WHERE q.id=$1",
        [id],
      )
      if (existing.rows[0]) {
        const row = existing.rows[0]
        if (
          row.sectionId !== body.sectionId ||
          row.subsectionId !== body.subsectionId ||
          row.title !== body.title ||
          row.difficulty !== body.difficulty ||
          row.summary !== body.summary ||
          JSON.stringify(row.answer) !== JSON.stringify(answer) ||
          row.code !== values[8] ||
          row.takeaway !== body.takeaway ||
          row.popular !== body.popular ||
          row.pitfall !== values[11]
        )
          throw new ConflictException(
            "Этот запрос уже сохранён. Откройте список вопросов перед созданием нового.",
          )
        return row
      }
      const duplicate = await client.query(
        "SELECT id FROM questions WHERE section_id=$1 AND subsection_id=$2 AND lower(title)=lower($3) LIMIT 1",
        [body.sectionId, body.subsectionId, body.title],
      )
      if (duplicate.rows.length)
        throw new ConflictException("В этом подразделе уже есть вопрос с таким названием")
      await client.query(
        "INSERT INTO questions (id,section_id,subsection_id,title,topic,difficulty,summary,answer,code,takeaway,popular,pitfall,sort_order) SELECT $1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,$10,$11,$12,COALESCE(MAX(sort_order),-1)+1 FROM questions WHERE section_id=$2 AND subsection_id=$3",
        values,
      )
      return {
        id,
        sectionId: body.sectionId,
        subsectionId: body.subsectionId,
        title: body.title,
        topic: section.title,
        moduleId: section.moduleId,
        difficulty: body.difficulty,
        summary: body.summary,
        answer,
        code: values[8] as string | null,
        takeaway: body.takeaway,
        popular: body.popular,
        pitfall: values[11] as string | null,
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
