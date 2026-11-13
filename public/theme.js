;(() => {
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  try {
    const stored = localStorage.getItem("wishu-theme")
    if (stored === "light" || stored === "dark") theme = stored
  } catch {
    // Use the initial system preference when browser storage is unavailable.
  }
  document.documentElement.classList.toggle("dark", theme === "dark")
  document.documentElement.dataset.themePreference = theme
  try {
    const stored = JSON.parse(localStorage.getItem("wishu-interface-settings") || "null")
    const palette = stored?.state?.palette
    if (
      [
        "coffee",
        "supabase",
        "react-bits",
        "shadcn",
        "github",
        "chatgpt",
        "claude",
        "pinterest",
      ].includes(palette)
    )
      document.documentElement.dataset.palette = palette
  } catch {
    // The default palette remains available without storage.
  }
})()
