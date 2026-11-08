import { useLayoutEffect, type ReactNode } from "react"
import { motion, useAnimationControls, useReducedMotion } from "motion/react"

// Animate presentation without keys or remounting route providers, forms or Monaco.
export function PageAppearance({ children, routeKey }: { children: ReactNode; routeKey: string }) {
  const controls = useAnimationControls()
  const reduced = useReducedMotion()
  useLayoutEffect(() => {
    if (reduced) controls.set({ opacity: 1 })
    else {
      controls.set({ opacity: 0 })
      void controls.start({
        opacity: 1,
        transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] },
      })
    }
    return () => controls.stop()
  }, [controls, reduced, routeKey])
  return (
    <motion.div initial={reduced ? false : { opacity: 0 }} animate={controls} className="min-w-0">
      {children}
    </motion.div>
  )
}
