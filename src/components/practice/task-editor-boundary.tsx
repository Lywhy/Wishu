import { Component, type ReactNode } from "react"
import { Textarea } from "@/components/ui/textarea"

export class TaskEditorBoundary extends Component<
  { children: ReactNode; value: string; onChange: (value: string) => void },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="space-y-3 p-4">
        <p role="alert" className="text-sm text-destructive">
          Редактор не загрузился. Черновик доступен в обычном поле; для повторной загрузки обновите
          страницу.
        </p>
        <Textarea
          aria-label="Решение задачи"
          value={this.props.value}
          onChange={(event) => this.props.onChange(event.target.value)}
          spellCheck={false}
          className="min-h-96 font-mono text-sm"
        />
      </div>
    )
  }
}
