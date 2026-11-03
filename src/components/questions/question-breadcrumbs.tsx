import { Fragment } from "react"
import { Link } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function QuestionBreadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <Breadcrumb aria-label="Хлебные крошки" className="mb-7">
      <BreadcrumbList className="text-xs">
        {items.map((item, index) => (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.to ? (
                <BreadcrumbLink render={<Link to={item.to} />}>{item.label}</BreadcrumbLink>
              ) : index === items.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <span>{item.label}</span>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
