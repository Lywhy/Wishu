import * as React from "react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Страницы"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}
function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-wrap items-center gap-0.5", className)}
      {...props}
    />
  )
}
function PaginationItem(props: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}
type PaginationLinkProps = {
  isActive?: boolean
  render?: React.ReactElement<React.ComponentProps<"a">>
} & Pick<React.ComponentProps<typeof Button>, "size" | "disabled"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  render,
  disabled,
  ...props
}: PaginationLinkProps) {
  const anchorProps: React.ComponentProps<"a"> & { "data-slot": string; "data-active"?: boolean } =
    {
      ...props,
      "aria-current": isActive ? "page" : undefined,
      "aria-disabled": disabled || undefined,
      "data-slot": "pagination-link",
      "data-active": isActive,
      tabIndex: disabled ? -1 : props.tabIndex,
    }
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      disabled={disabled}
      render={
        render ? (
          React.cloneElement(render, anchorProps)
        ) : (
          <a {...anchorProps}>{anchorProps.children}</a>
        )
      }
    />
  )
}
function PaginationPrevious({
  text = "Назад",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink aria-label="Предыдущая страница" size="default" {...props}>
      {text}
    </PaginationLink>
  )
}
function PaginationNext({
  text = "Вперёд",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink aria-label="Следующая страница" size="default" {...props}>
      {text}
    </PaginationLink>
  )
}
function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn("flex size-8 items-center justify-center", className)}
      {...props}
    >
      <span aria-hidden>…</span>
      <span className="sr-only">Другие страницы</span>
    </span>
  )
}
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
