import { useEffect, useState } from "react"
import { localDay } from "@/stores/review-schedule"
export function useReviewDay() {
  const [today, setToday] = useState(localDay)
  useEffect(() => {
    const update = () => setToday(localDay())
    const timer = setInterval(update, 60000)
    window.addEventListener("focus", update)
    return () => {
      clearInterval(timer)
      window.removeEventListener("focus", update)
    }
  }, [])
  return today
}
