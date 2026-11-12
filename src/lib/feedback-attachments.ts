export interface FeedbackScreenshot {
  id: string
  name: string
  dataUrl: string
}

export function readScreenshot(file: File): Promise<FeedbackScreenshot> {
  if (!["image/png", "image/jpeg"].includes(file.type))
    return Promise.reject(new Error("Выберите PNG или JPEG."))
  if (file.size > 3 * 1024 * 1024)
    return Promise.reject(new Error("Размер одного скриншота - до 3 МБ."))
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error("Не удалось прочитать изображение."))
    reader.onload = () => {
      const dataUrl = String(reader.result)
      if (!/^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/.test(dataUrl)) {
        reject(new Error("Не удалось прочитать изображение."))
        return
      }
      resolve({ id: crypto.randomUUID(), name: file.name || "Скриншот.png", dataUrl })
    }
    reader.readAsDataURL(file)
  })
}

export function downloadFeedbackReport(
  id: string,
  title: string,
  body: string,
  screenshots: FeedbackScreenshot[],
) {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }
  const escape = (value: string) => value.replace(/[&<>"']/g, (char) => entities[char] ?? char)
  const images = screenshots.filter((image) =>
    /^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/.test(image.dataUrl),
  )
  // Standalone export: no application runtime or external stylesheet is available.
  const html = `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline'"><title>${escape(title)}</title><body style="max-width:960px;margin:24px auto;padding:0 16px;font:16px/1.6 system-ui"><h1 style="font-size:24px;overflow-wrap:anywhere">${escape(title)}</h1><pre style="white-space:pre-wrap;overflow-wrap:anywhere;font:inherit">${escape(body)}</pre>${images.map((image) => `<figure style="margin:24px 0"><figcaption>${escape(image.name)}</figcaption><img style="max-width:100%;height:auto" alt="${escape(image.name)}" src="${image.dataUrl}" width="800"></figure>`).join("")}</body></html>`
  const url = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }))
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = `wishu-feedback-${id}.html`
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}
