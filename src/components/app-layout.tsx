import { Braces, Moon, Sun } from "lucide-react"
import { Link, NavLink, Outlet } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"

const navigation = [
  { to: "/learn", title: "Обучение" },
  { to: "/questions", title: "Вопросы" },
  { to: "/tasks", title: "Задачи" },
]

export function AppLayout() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-muted/20 text-foreground">
      <a
        href="#main"
        className="sr-only fixed top-3 left-3 z-50 rounded-lg bg-background p-3 focus:not-sr-only"
      >
        К содержимому
      </a>
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 pt-5 sm:px-8 lg:h-20 lg:flex-nowrap lg:gap-x-8 lg:gap-y-0 lg:pt-0">
          <Link
            to="/learn"
            aria-label="Wishu - главная"
            className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="text-2xl font-bold tracking-tight">
              wishu<span className="text-primary">.</span>
            </span>
          </Link>
          <nav
            aria-label="Главная навигация"
            className="order-3 -mb-px flex w-full gap-5 overflow-x-auto sm:gap-8 lg:order-none lg:h-full lg:w-auto"
          >
            {navigation.map(({ to, title }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex shrink-0 items-center border-b-2 px-1 py-4 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring lg:py-0",
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {title}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
              title={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
            >
              {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </Button>
          </div>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        <Outlet />
      </main>
      <footer className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="font-medium">
          wishu. <span className="ml-2 font-normal">Каждый день - на шаг увереннее.</span>
        </span>
        <span>Изучайте. Разбирайтесь. Практикуйтесь.</span>
      </footer>
    </div>
  )
}

export function ComingSoonPage({ title, description }: { title: string; description: string }) {
  return (
    <section className="mx-auto flex min-h-[65vh] max-w-lg flex-col items-center justify-center text-center">
      <span className="mb-6 flex size-16 items-center justify-center rounded-2xl border bg-background text-primary">
        <Braces className="size-7" aria-hidden="true" />
      </span>
      <Badge variant="secondary">Не найдено</Badge>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
      <Button nativeButton={false} className="mt-7" render={<Link to="/learn" />}>
        К обучению
      </Button>
    </section>
  )
}
