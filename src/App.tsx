import { QuestionsLayout } from "@/components/questions/questions-layout"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AppLayout, ComingSoonPage } from "@/components/app-layout"
import { LearningPage } from "@/pages/learning-page"
import { QuestionsPage } from "@/pages/questions-page"
import { QuestionDetailPage } from "@/pages/question-detail-page"
import { QuestionSectionPage } from "@/pages/question-section-page"
import { QuestionSubsectionPage } from "@/pages/question-subsection-page"
import { TasksPage } from "@/pages/tasks-page"
import { TaskDetailPage } from "@/pages/task-detail-page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/learn" replace />} />
        <Route element={<AppLayout />}>
          <Route path="/learn" element={<LearningPage />} />
          <Route element={<QuestionsLayout />}>
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/questions/sections/:sectionId" element={<QuestionSectionPage />} />
            <Route
              path="/questions/sections/:sectionId/:subsectionId"
              element={<QuestionSubsectionPage />}
            />
            <Route path="/questions/:questionId" element={<QuestionDetailPage />} />
          </Route>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/:taskId" element={<TaskDetailPage />} />
          <Route
            path="*"
            element={
              <ComingSoonPage
                title="Страница не найдена"
                description="Такой страницы нет. Вернитесь к модулям обучения, чтобы выбрать интересную тему."
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
