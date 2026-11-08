import type { ReactNode } from "react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { cn } from "@/lib/utils"

export function PageState({
  title,
  description,
  children,
  kind = "empty",
  heading = "h1",
  className,
}: {
  title: string
  description: string
  children?: ReactNode
  kind?: "empty" | "error" | "unavailable"
  heading?: "h1" | "h2"
  className?: string
}) {
  const Heading = heading
  return (
    <Empty
      className={cn(
        "min-h-72 border border-solid border-border/70 bg-card px-5 py-12 sm:min-h-80 sm:px-8",
        className,
      )}
    >
      <EmptyHeader className="max-w-md gap-3">
        {kind !== "empty" && (
          <p
            className={cn(
              "text-xs font-medium",
              kind === "error" ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {kind === "error" ? "Не удалось выполнить действие" : "Пока недоступно"}
          </p>
        )}
        <EmptyTitle>
          <Heading className="text-xl leading-7 font-semibold tracking-tight text-balance sm:text-2xl">
            {title}
          </Heading>
        </EmptyTitle>
        <EmptyDescription className="leading-7 text-pretty">{description}</EmptyDescription>
      </EmptyHeader>
      {children && (
        <EmptyContent className="mt-2 flex-row flex-wrap justify-center">{children}</EmptyContent>
      )}
    </Empty>
  )
}
