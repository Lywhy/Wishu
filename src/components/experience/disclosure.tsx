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
      className={cn("rounded-lg bg-muted/25 text-card-foreground", className)}
      {...props}
    >
      <CollapsibleTrigger className="group/disclosure flex min-h-11 w-full items-center gap-3 rounded-[inherit] px-4 py-3 text-left text-sm font-medium text-foreground/90 transition-colors duration-150 outline-none hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset motion-reduce:transition-none">
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2">{title}</span>
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-350 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-aria-expanded/disclosure:rotate-180 motion-reduce:transition-none"
        />
      </CollapsibleTrigger>
      <CollapsibleContent
        keepMounted
        className="h-(--collapsible-panel-height,auto) overflow-hidden transition-[height,opacity] duration-350 ease-[cubic-bezier(0.22,0.61,0.36,1)] data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0 motion-reduce:transition-none"
      >
        <div className="px-4 pb-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
