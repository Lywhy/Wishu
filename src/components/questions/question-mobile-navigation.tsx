import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { QuestionSidebar } from "@/components/questions/question-sidebar"
import type { Question } from "@/data/interview-content"
import type { QuestionSession } from "@/data/question-session"

export function QuestionMobileNavigation({
  questions,
  title,
  session,
  currentTitle,
  questionId,
}: {
  questions: Question[]
  title: string
  session: QuestionSession
  currentTitle: string
  questionId: string
}) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)")
    const changed = () => {
      if (desktop.matches) setOpen(false)
    }
    desktop.addEventListener("change", changed)
    return () => desktop.removeEventListener("change", changed)
  }, [])
  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger render={<Button variant="outline" className="h-10 w-full" />}>
          Вопросы и действия ({questions.length})
        </SheetTrigger>
        <SheetContent className="*:data-[slot=card]:border-0 *:data-[slot=card]:bg-transparent *:data-[slot=card]:p-0">
          <SheetTitle>Вопросы и действия</SheetTitle>
          <SheetDescription>Сейчас: {currentTitle}</SheetDescription>
          <QuestionSidebar
            questions={questions}
            title={title}
            session={session}
            questionId={questionId}
            onNavigate={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
