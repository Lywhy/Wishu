import { createJSONStorage } from "zustand/middleware"
import { useLocalSaveStatus } from "@/stores/local-save-status"

// Keep the latest value in memory if browser storage fails, so retry saves that value.
export function browserStorage<T>(area: string) {
  const memory = new Map<string, string | null>()
  const write = (key: string, value: string | null) => {
    memory.set(key, value)
    try {
      if (value === null) localStorage.removeItem(key)
      else localStorage.setItem(key, value)
      useLocalSaveStatus.getState().update(area, { error: null, savedAt: Date.now() })
    } catch {
      useLocalSaveStatus.getState().update(area, {
        error: "Не удалось сохранить в браузере. Изменения пока доступны только в этой вкладке.",
        savedAt: null,
        retry: () => write(key, memory.get(key) ?? null),
      })
    }
  }
  return createJSONStorage<T>(() => ({
    getItem: (key: string) => {
      try {
        return localStorage.getItem(key) ?? memory.get(key) ?? null
      } catch {
        return memory.get(key) ?? null
      }
    },
    setItem: (key: string, value: string) => write(key, value),
    removeItem: (key: string) => write(key, null),
  }))
}
