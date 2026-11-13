import { lazy, Suspense } from "react"
import { useReducedMotion } from "motion/react"
import { useInterfaceSettings } from "@/stores/interface-settings"
import { useTheme } from "@/lib/theme-context"
import { interfacePalettes } from "@/lib/interface-palettes"

const GradientASCII = lazy(() => import("@/components/GradientASCII"))

export function GradientBackground() {
  const { theme } = useTheme()
  const reducedMotion = useReducedMotion()
  const dark = theme === "dark"
  const mode = useInterfaceSettings((state) => state.background)
  const paletteId = useInterfaceSettings((state) => state.palette)
  const palette = interfacePalettes.find((item) => item.id === paletteId) ?? interfacePalettes[0]
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
          colors={[...(dark ? palette.dark : palette.light)]}
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
