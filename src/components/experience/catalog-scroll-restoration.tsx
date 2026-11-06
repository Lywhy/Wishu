import { useLayoutEffect, useRef } from "react"
import { useLocation, useNavigationType } from "react-router-dom"
const positions = new Map<string, number>()
export function CatalogScrollRestoration() {
  const { pathname, search, key } = useLocation(),
    navigation = useNavigationType()
  const previous = useRef("")
  useLayoutEffect(() => {
    if (pathname.startsWith("/questions")) return
    const id = pathname + search
    const old = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"
    if (previous.current !== id || navigation === "POP")
      window.scrollTo({
        top: navigation === "POP" ? (positions.get(key) ?? positions.get(id) ?? 0) : 0,
        behavior: "instant",
      })
    previous.current = id
    let y = window.scrollY
    const track = () => {
      y = window.scrollY
    }
    window.addEventListener("scroll", track, { passive: true })
    return () => {
      positions.set(key, y)
      positions.set(id, y)
      while (positions.size > 200) {
        const first = positions.keys().next().value
        if (first) positions.delete(first)
        else break
      }
      window.removeEventListener("scroll", track)
      window.history.scrollRestoration = old
    }
  }, [pathname, search, key, navigation])
  return null
}
