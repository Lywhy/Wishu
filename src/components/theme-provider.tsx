import { useLayoutEffect, useState, type ReactNode } from "react"
import { ThemeContext, type Theme } from "@/lib/theme-context"
import { useInterfaceSettings } from "@/stores/interface-settings"
import { isInterfacePalette } from "@/lib/interface-palettes"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const palette = useInterfaceSettings((state) => state.palette)
  const [theme, updateTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  )

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    document.documentElement.dataset.themePreference = theme
    document.documentElement.dataset.palette = isInterfacePalette(palette) ? palette : "coffee"
  }, [theme, palette])

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
