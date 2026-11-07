import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ShareCollection() {
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle")
  const [link, setLink] = useState("")
  async function copy() {
    const current = window.location.href
    setLink(current)
    try {
      await navigator.clipboard.writeText(current)
      setStatus("copied")
    } catch {
      setStatus("manual")
    }
  }
  return (
    <div className="space-y-2">
      <Button
        variant="outline"
        title="Ссылка сохраняет фильтры. Личные отметки и избранное не передаются."
        className="min-w-44"
        onClick={() => void copy()}
      >
        {status === "copied" ? "Ссылка скопирована" : "Поделиться подборкой"}
      </Button>
      {status === "manual" && (
        <div className="max-w-sm space-y-1">
          <p className="text-xs text-muted-foreground">Выделите ссылку и скопируйте её вручную.</p>
          <Input
            aria-label="Ссылка на подборку"
            readOnly
            value={link}
            onFocus={(event) => event.currentTarget.select()}
          />
        </div>
      )}
      <output className="sr-only">
        {status === "copied" ? "Ссылка с текущими фильтрами скопирована" : ""}
      </output>
    </div>
  )
}
