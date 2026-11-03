import { Type } from "class-transformer"
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from "class-validator"

export class QuestionIdDto {
  @IsString()
  @Matches(/^[a-z0-9][a-z0-9-]{0,119}$/)
  questionId!: string
}

export class QuestionProgressDto {
  @ValidateIf((_object, value) => value !== undefined && value !== null)
  @IsIn(["repeat", "learned", "skipped"])
  status?: "repeat" | "learned" | "skipped" | null

  @ValidateIf((_object, value) => value !== undefined)
  @IsBoolean()
  saved?: boolean
}

export class QuestionSettingsDto {
  @IsBoolean()
  autoRevealAnswers!: boolean
}

export class QuestionImportEntryDto extends QuestionProgressDto {
  @IsString()
  @MaxLength(120)
  @Matches(/^[a-z0-9][a-z0-9-]*$/)
  questionId!: string
}

export class QuestionImportDto extends QuestionSettingsDto {
  @IsArray()
  @ArrayMaxSize(5000)
  @ValidateNested({ each: true })
  @Type(() => QuestionImportEntryDto)
  entries!: QuestionImportEntryDto[]
}
