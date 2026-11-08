import { AnimatedText } from "@/components/catalog/catalog-primitives"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

export function PageHeading({
  title,
  description,
  mark,
  meta,
  actions,
  headingProps,
  questionHeading = false,
  className,
}: {
  title: string
  description?: string
  mark?: ReactNode
  meta?: ReactNode
  actions?: ReactNode
  questionHeading?: boolean
  headingProps?: Omit<ComponentProps<"h1">, "children">
  className?: string
}) {
  return (
    <header className={cn("mb-6 space-y-3 sm:mb-8", className)}>
      {mark}
      {meta && <div className="flex min-w-0 flex-wrap items-center gap-2">{meta}</div>}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1 basis-full space-y-3 sm:basis-0">
          <h1
            data-question-heading={questionHeading || undefined}
            {...headingProps}
            className={cn(
              "text-2xl leading-tight font-semibold tracking-tight text-balance wrap-anywhere outline-none sm:text-3xl",
              headingProps?.className,
            )}
          >
            <AnimatedText>{title}</AnimatedText>
          </h1>
          {description && (
            <p className="max-w-2xl text-sm leading-7 text-pretty text-muted-foreground">
              <AnimatedText delay={0.1}>{description}</AnimatedText>
            </p>
          )}
        </div>
        {actions && <div className="flex max-w-full flex-wrap gap-2">{actions}</div>}
      </div>
    </header>
  )
}
