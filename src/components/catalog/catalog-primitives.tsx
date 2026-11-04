import type { ComponentProps, ReactNode } from "react"
import { motion, MotionConfig, useReducedMotion } from "motion/react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const MotionCard = motion.create(Card)
export function InterfaceMotion({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionConfig>
  )
}
export function AnimatedCard(props: ComponentProps<typeof MotionCard>) {
  const reduced = useReducedMotion()
  return (
    <MotionCard
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.25 }}
      {...props}
    />
  )
}
export function AnimatedText({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.span
      className="block"
      initial={reduced ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.span>
  )
}
export function CategoryMark({
  mark,
  color,
  muted = false,
  className,
}: {
  mark: string
  color: string
  muted?: boolean
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-xl border border-current/25 font-mono text-lg font-semibold",
        muted ? "border-border bg-muted text-muted-foreground" : color,
        className,
      )}
    >
      {mark}
    </span>
  )
}
export function CatalogHeader({
  title,
  description,
  eyebrow,
  questionHeading = false,
}: {
  title: string
  description: string
  eyebrow: string
  questionHeading?: boolean
}) {
  return (
    <header className="mb-7 space-y-3">
      <p className="text-xs font-medium tracking-wide text-primary">
        <AnimatedText>{eyebrow}</AnimatedText>
      </p>
      <h1
        data-question-heading={questionHeading || undefined}
        tabIndex={questionHeading ? -1 : undefined}
        className="text-3xl font-semibold tracking-tight outline-none sm:text-4xl"
      >
        <AnimatedText delay={0.04}>{title}</AnimatedText>
      </h1>
      <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
        <AnimatedText delay={0.08}>{description}</AnimatedText>
      </p>
    </header>
  )
}
export function TaskStatusBadge({ status }: { status: "solved" | "draft" | "new" }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "border text-[11px] font-medium",
        status === "solved"
          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
          : status === "draft"
            ? "border-sky-500/20 bg-sky-500/10 text-sky-800 dark:text-sky-300"
            : "border-border bg-muted/60 text-muted-foreground",
      )}
    >
      {status === "solved" ? "Решена" : status === "draft" ? "В работе" : "Не начата"}
    </Badge>
  )
}

export function CompletedBadge({ children }: { children: ReactNode }) {
  return (
    <Badge
      variant="secondary"
      className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
    >
      {children}
    </Badge>
  )
}
