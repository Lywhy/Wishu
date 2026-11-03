import { useLayoutEffect, useState, type ReactNode } from "react"
import { ThemeContext, type Theme } from "@/lib/theme-context"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, updateTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  )

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.dataset.themePreference = theme
  }, [theme])

  function setTheme(nextTheme: Theme) {
    updateTheme(nextTheme)
    try {
      window.localStorage.setItem("wishu-theme", nextTheme)
    } catch {
      // Switching still works when browser storage is unavailable.
    }
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
