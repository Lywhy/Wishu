import { useNavigate } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQuestionCatalog } from "@/lib/question-catalog-context"
import { sectionPath } from "@/data/question-catalog"

export function QuestionSectionPicker({ sectionId }: { sectionId: string }) {
  const { questionSections, groups } = useQuestionCatalog()
  const navigate = useNavigate()
  const sections = groups.flatMap((group) =>
    questionSections
      .filter((section) => section.group === group.id && !section.inDevelopment)
      .map((section) => ({ ...section, groupTitle: group.title })),
  )
  return (
    <Select
      value={sectionId}
      items={sections.map((section) => ({ value: section.id, label: section.title }))}
      onValueChange={(value) => {
        if (typeof value === "string" && value !== sectionId) navigate(sectionPath(value))
      }}
    >
      <SelectTrigger aria-label="Выбрать другой раздел" className="w-full bg-background sm:w-64">
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start" alignItemWithTrigger={false}>
        {sections.map((section) => (
          <SelectItem key={section.id} value={section.id}>
            {section.title}
            <span className="ml-2 text-xs text-muted-foreground">{section.groupTitle}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
