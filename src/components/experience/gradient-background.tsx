import { lazy, Suspense } from "react"
import { useReducedMotion } from "motion/react"
import { useInterfaceSettings } from "@/stores/interface-settings"
import { useTheme } from "@/lib/theme-context"

const GradientASCII = lazy(() => import("@/components/GradientASCII"))
const coffeeDark = ["#352419", "#65432e", "#a47750", "#d7ad85"]
const coffeeLight = ["#e6cfb6", "#cfa77e", "#a57853", "#795038"]

export function GradientBackground() {
  const { theme } = useTheme()
  const reducedMotion = useReducedMotion()
  const dark = theme === "dark"
  const mode = useInterfaceSettings((state) => state.background)
  const still = reducedMotion || mode === "static"
  if (mode === "off") return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden mask-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.12)_20%,black_90%)] opacity-25 select-none dark:opacity-35"
    >
      <Suspense fallback={null}>
        <GradientASCII
          key={still ? "still" : "motion"}
          colors={dark ? coffeeDark : coffeeLight}
          // Visual defaults live in GradientASCII; only theme and motion policy override them.
          speed={still ? 0 : undefined}
          flicker={still ? 0 : undefined}
          grain={still ? 0 : undefined}
          lightMode={!dark}
          intro={still ? false : undefined}
          mouseInteraction={false}
          clickEffect="none"
        />
      </Suspense>
    </div>
  )
}
