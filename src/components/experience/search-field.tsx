import { useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
export function SearchField({
  value,
  onValueChange,
  label,
  placeholder,
  className,
}: {
  value: string
  onValueChange: (value: string) => void
  label: string
  placeholder: string
  className?: string
}) {
  const input = useRef<HTMLInputElement>(null)
  return (
    <div className={cn("relative", className)}>
      <Input
        ref={input}
        value={value}
        aria-label={label}
        placeholder={placeholder}
        className={cn("h-10 bg-background", value && "pr-20")}
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && value) {
            event.preventDefault()
            onValueChange("")
          }
        }}
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-1/2 right-1 -translate-y-1/2 text-xs"
          aria-label={`Очистить: ${label}`}
          onClick={() => {
            onValueChange("")
            input.current?.focus()
          }}
        >
          Очистить
        </Button>
      )}
    </div>
  )
}
