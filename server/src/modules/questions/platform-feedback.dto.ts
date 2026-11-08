import { Transform, Type } from "class-transformer"
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator"

export class FeedbackTopicDto {
  @IsString()
  @MaxLength(120)
  groupId!: string

  @IsString()
  @MaxLength(120)
  sectionId!: string

  @IsString()
  @MaxLength(160)
  sectionTitle!: string

  @IsString()
  @MaxLength(120)
  subsectionId!: string

  @IsString()
  @MaxLength(160)
  subsectionTitle!: string

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @MaxLength(200, { each: true })
  topics!: string[]
}

export class CreatePlatformFeedbackDto {
  @IsUUID("4")
  id!: string

  @IsIn(["bug", "suggestion"])
  kind!: "bug" | "suggestion"

  @IsIn(["learn", "questions", "tasks", "interviews", "other"])
  page!: "learn" | "questions" | "tasks" | "interviews" | "other"

  @IsIn(["content", "improvement"])
  mode!: "content" | "improvement"

  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @MaxLength(500)
  path!: string

  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @MaxLength(5000)
  details!: string

  @IsArray()
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => FeedbackTopicDto)
  items!: FeedbackTopicDto[]
}
