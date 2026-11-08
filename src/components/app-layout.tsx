import { PageState } from "@/components/catalog/page-state"
import { PageAppearance } from "@/components/catalog/page-appearance"
import { GlobalSearch } from "@/components/experience/global-search"
import { InterfaceSettings } from "@/components/experience/interface-settings"
import { useQuestionExperience } from "@/stores/question-experience"
import { GradientBackground } from "@/components/experience/gradient-background"
import { SessionBanner } from "@/pages/study-session-page"
import { CatalogScrollRestoration } from "@/components/experience/catalog-scroll-restoration"
import { useFeedbackDrafts } from "@/stores/feedback-drafts"
import { feedbackPageForPath } from "@/lib/platform-feedback"
import { MessageSquare, Moon, Sun } from "lucide-react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/theme-context"

const navigation = [
  { to: "/learn", title: "Обучение" },
  { to: "/questions", title: "Вопросы" },
  { to: "/tasks", title: "Задачи" },
  { to: "/interviews", title: "Собеседования" },
]

export function AppLayout() {
  const { theme, setTheme } = useTheme()
  const questionSearch = useQuestionExperience(
    (state) => state.listVisits["/questions"]?.search ?? "",
  )
  const route = useLocation()
  const { pathname } = route
  const sessionReturn = route.state?.questionSession?.returnTo
  const requestedReturn =
    route.state?.returnTo ??
    (typeof sessionReturn === "string" &&
    /^\/(interviews|session|questions\/preparation|mock-interview)(?:\?|$)/.test(sessionReturn)
      ? sessionReturn
      : null)
  const returnTo =
    typeof requestedReturn === "string" &&
    /^\/(learn|tasks|questions|interviews|session|mock-interview)(?:\/|\?|$)/.test(requestedReturn)
      ? requestedReturn
      : null
  const showFooter = ["/learn", "/questions", "/tasks", "/interviews"].includes(
    pathname.replace(/\/+$/, ""),
  )

  return (
    <div className="relative isolate flex min-h-dvh flex-col bg-background text-foreground">
      <GradientBackground />
      <a
        href="#main"
        className="sr-only fixed top-3 left-3 z-50 rounded-lg bg-background p-3 focus:not-sr-only"
      >
        К содержимому
      </a>
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 pt-4 sm:px-8 lg:h-16 lg:flex-nowrap lg:gap-x-8 lg:gap-y-0 lg:pt-0">
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
            className="order-3 -mb-px flex w-full justify-between gap-4 overflow-x-auto overscroll-x-contain sm:gap-6 lg:order-0 lg:h-full lg:w-auto lg:justify-start"
          >
            {navigation.map(({ to, title }) => (
              <NavLink
                key={to}
                to={to === "/questions" ? to + questionSearch : to}
                className={({ isActive }) =>
                  cn(
                    "flex shrink-0 items-center border-b-2 px-1 py-4 text-xs font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset motion-reduce:transition-none sm:text-sm lg:py-0",
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
          <div className="flex items-center gap-1 sm:gap-3">
            <GlobalSearch />
            <Button
              nativeButton={false}
              variant="outline"
              size="icon"
              aria-current={pathname === "/feedback" ? "page" : undefined}
              aria-label="Баги и предложения"
              title="Баги и предложения"
              render={<Link to="/feedback" state={{ feedbackOrigin: pathname }} />}
              onClick={() => {
                const draft = useFeedbackDrafts.getState()
                if (pathname !== "/feedback" && !draft.bug.details.trim())
                  draft.updateBug({ page: feedbackPageForPath(pathname), path: pathname })
              }}
            >
              <MessageSquare aria-hidden="true" />
            </Button>
            <InterfaceSettings />
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
      <main
        id="main"
        className="mx-auto w-full max-w-7xl min-w-0 flex-1 scroll-mt-28 px-4 py-6 sm:px-8 lg:py-8"
      >
        <CatalogScrollRestoration />
        <SessionBanner />
        {returnTo && (
          <Link className="mb-4 block text-xs text-primary underline" to={returnTo}>
            {returnTo.startsWith("/interviews")
              ? "Вернуться к собеседованию"
              : returnTo === "/session" || returnTo === "/questions/preparation"
                ? "Вернуться к занятию"
                : "Вернуться к исходному материалу"}
          </Link>
        )}
        <PageAppearance routeKey={pathname}>
          <Outlet />
        </PageAppearance>
      </main>
      {showFooter && (
        <footer className="mx-auto flex w-full max-w-7xl shrink-0 flex-col gap-2 px-4 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="font-medium">
            wishu. <span className="ml-2 font-normal">Каждый день - на шаг увереннее.</span>
          </span>
          <span>Изучайте. Разбирайтесь. Практикуйтесь.</span>
        </footer>
      )}
    </div>
  )
}

export function ComingSoonPage({ title, description }: { title: string; description: string }) {
  return (
    <PageState title={title} description={description}>
      <Button nativeButton={false} render={<Link to="/learn" />}>
        К обучению
      </Button>
    </PageState>
  )
}
