import type { ComponentProps, ReactNode } from "react"
import { motion, MotionConfig, useReducedMotion } from "motion/react"
import { Card } from "@/components/ui/card"
import { SemanticBadge } from "@/components/catalog/semantic-badge"
import { cn } from "@/lib/utils"

const MotionCard = motion.create(Card)
export function InterfaceMotion({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </MotionConfig>
  )
}
export function AnimatedCard({
  introDelay = 0,
  ...props
}: ComponentProps<typeof MotionCard> & { introDelay?: number }) {
  const reduced = useReducedMotion()
  return (
    <MotionCard
      initial={reduced ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0 : 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: reduced ? 0 : introDelay,
      }}
      {...props}
    />
  )
}
// Opacity only: keep sticky navigation and fixed descendants in their original coordinate space.
export function AnimatedBlock({
  introDelay = 0,
  ...props
}: ComponentProps<typeof motion.div> & { introDelay?: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduced ? 0 : 0.8,
        delay: reduced ? 0 : introDelay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      {...props}
    />
  )
}
export function AnimatedText({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.span
      className="block"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduced ? 0 : 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        delay: reduced ? 0 : delay,
      }}
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
        "flex size-12 shrink-0 items-center justify-center rounded-xl border border-current/20 font-mono text-lg font-semibold transition-[background-color,border-color,color] duration-200 motion-reduce:transition-none",
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
  actions,
}: {
  title: string
  description: string
  eyebrow: string
  questionHeading?: boolean
  actions?: ReactNode
}) {
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-4 sm:mb-8">
      <div className="min-w-0 flex-1 basis-full space-y-3 sm:basis-0">
        <p className="hidden text-xs font-medium tracking-wide text-primary sm:block">
          <AnimatedText>{eyebrow}</AnimatedText>
        </p>
        <h1
          data-question-heading={questionHeading || undefined}
          tabIndex={questionHeading ? -1 : undefined}
          className="text-2xl leading-tight font-semibold tracking-tight text-balance wrap-anywhere outline-none sm:text-3xl"
        >
          <AnimatedText delay={0.04}>{title}</AnimatedText>
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-pretty text-muted-foreground">
          <AnimatedText delay={0.08}>{description}</AnimatedText>
        </p>
      </div>
      {actions && (
        <div className="flex w-full min-w-0 flex-wrap gap-2 sm:w-auto sm:max-w-full sm:pt-6">
          {actions}
        </div>
      )}
    </header>
  )
}
export function TaskStatusBadge({ status }: { status: "solved" | "draft" | "new" }) {
  return (
    <SemanticBadge
      tone={status === "solved" ? "success" : status === "draft" ? "info" : "neutral"}
      dot
    >
      {status === "solved" ? "Решена" : status === "draft" ? "В работе" : "Не начата"}
    </SemanticBadge>
  )
}

export function CompletedBadge({ children }: { children: ReactNode }) {
  return (
    <SemanticBadge tone="success" dot>
      {children}
    </SemanticBadge>
  )
}
