import { useLayoutEffect, useRef } from "react"
import { useLocation, useNavigationType } from "react-router-dom"
import { useQuestionExperience } from "@/stores/question-experience"

const positions = new Map<string, number>()

export function QuestionRouteHistory() {
  const { pathname, search, key } = useLocation()
  const navigationType = useNavigationType()
  const previousPath = useRef<string | null>(null)

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])

  useLayoutEffect(() => {
    const isList = pathname === "/questions" || pathname.startsWith("/questions/sections/")
    const visit = useQuestionExperience.getState().listVisits[pathname]
    const remembered = isList && visit?.search === search ? visit.scrollY : 0
    const top = navigationType === "POP" ? (positions.get(key) ?? remembered) : remembered
    if (previousPath.current !== pathname || navigationType === "POP") {
      window.scrollTo({ top, behavior: "instant" })
      document.querySelector<HTMLElement>("[data-question-heading]")?.focus({ preventScroll: true })
    }
    previousPath.current = pathname
    let scrollY = window.scrollY
    const track = () => {
      scrollY = window.scrollY
    }
    const save = () => {
      positions.set(key, scrollY)
      // Bound memory used by long practice sessions.
      const oldest = positions.keys().next().value
      if (positions.size > 200 && oldest !== undefined) positions.delete(oldest)
      if (isList) useQuestionExperience.getState().rememberList(pathname, { search, scrollY })
    }
    window.addEventListener("scroll", track, { passive: true })
    window.addEventListener("pagehide", save)
    return () => {
      window.removeEventListener("scroll", track)
      window.removeEventListener("pagehide", save)
      save()
    }
  }, [pathname, search, key, navigationType])

  return null
}
