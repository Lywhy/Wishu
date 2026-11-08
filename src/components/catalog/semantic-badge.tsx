import type { ComponentProps } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const tones = {
  neutral: "border-border bg-muted/60 text-muted-foreground",
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-300",
  danger: "border-red-500/20 bg-red-500/10 text-red-800 dark:text-red-300",
  info: "border-blue-500/20 bg-blue-500/10 text-blue-800 dark:text-blue-300",
  accent: "border-violet-500/20 bg-violet-500/10 text-violet-800 dark:text-violet-300",
  popular: "border-rose-500/20 bg-rose-500/10 text-rose-800 dark:text-rose-300",
}

export function SemanticBadge({
  tone = "neutral",
  dot = false,
  className,
  children,
  ...props
}: ComponentProps<typeof Badge> & { tone?: keyof typeof tones; dot?: boolean }) {
  return (
    <Badge variant="outline" className={cn("font-medium", tones[tone], className)} {...props}>
      {dot && <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-current" />}
      {children}
    </Badge>
  )
}
