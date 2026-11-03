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
})()
