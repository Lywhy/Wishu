import type { ComponentProps, ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

// Shared presentation; state, keyboard behavior and ARIA belong to shadcn/Base UI.
export function Disclosure({
  title,
  children,
  className,
  ...props
}: Omit<ComponentProps<typeof Collapsible>, "title"> & { title: ReactNode }) {
  return (
    <Collapsible
      className={cn("rounded-xl border bg-card text-card-foreground", className)}
      {...props}
    >
      <CollapsibleTrigger className="group/disclosure flex min-h-11 w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring">
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2">{title}</span>
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform group-aria-expanded/disclosure:rotate-180 motion-reduce:transition-none"
        />
      </CollapsibleTrigger>
      <CollapsibleContent
        keepMounted
        className="overflow-hidden transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none"
      >
        <div className="px-4 pb-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
