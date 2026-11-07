import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function CatalogLoading({ label }: { label: string }) {
  return (
    <div className="space-y-6 py-4" aria-busy="true">
      <output className="sr-only">{label}</output>
      <div aria-hidden="true" className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-2/3 max-w-md" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <Skeleton aria-hidden="true" className="h-20 w-full rounded-xl" />
      <div aria-hidden="true" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <Card key={item} className="gap-4 p-5">
            <Skeleton className="size-12 rounded-xl" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </Card>
        ))}
      </div>
    </div>
  )
}
