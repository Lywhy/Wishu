import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useInterfaceSettings } from "@/stores/interface-settings"
import { LocalSaveNotice } from "@/components/experience/local-save-notice"

export function InterfaceSettings() {
  const settings = useInterfaceSettings()
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label="Настройки интерфейса"
            title="Настройки интерфейса"
          />
        }
      >
        <SlidersHorizontal aria-hidden="true" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Вид и чтение</SheetTitle>
        <SheetDescription>Настройте фон и оформление ответов и лекций под себя.</SheetDescription>
        <fieldset className="space-y-3">
          <legend className="mb-3 text-sm font-medium">Фон сайта</legend>
          <ToggleGroup
            aria-label="Режим фона"
            variant="outline"
            className="flex-wrap"
            value={[settings.background]}
            onValueChange={(values) => {
              const value = values[0]
              if (value === "animated" || value === "static" || value === "off")
                settings.setBackground(value)
            }}
          >
            <ToggleGroupItem value="animated">Анимация</ToggleGroupItem>
            <ToggleGroupItem value="static">Статичный</ToggleGroupItem>
            <ToggleGroupItem value="off">Без фона</ToggleGroupItem>
          </ToggleGroup>
          <p className="text-xs leading-6 text-muted-foreground">
            При уменьшенном движении в настройках системы фон остаётся неподвижным.
          </p>
        </fieldset>
        <fieldset className="space-y-3 border-t pt-4">
          <legend className="text-sm font-medium">Размер текста материала</legend>
          <ToggleGroup
            aria-label="Размер текста"
            variant="outline"
            value={[String(settings.readingSize)]}
            onValueChange={(values) => {
              const value = Number(values[0])
              if (value === 14 || value === 16 || value === 18) settings.setReadingSize(value)
            }}
          >
            {[14, 16, 18].map((size) => (
              <ToggleGroupItem key={size} value={String(size)}>
                {size} px
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </fieldset>
        <fieldset className="space-y-3 border-t pt-4">
          <legend className="text-sm font-medium">Межстрочный интервал</legend>
          <ToggleGroup
            aria-label="Межстрочный интервал"
            variant="outline"
            className="flex-wrap"
            value={[settings.readingSpacing]}
            onValueChange={(values) => {
              const value = values[0]
              if (value === "normal" || value === "relaxed" || value === "wide")
                settings.setReadingSpacing(value)
            }}
          >
            <ToggleGroupItem value="normal">Обычный</ToggleGroupItem>
            <ToggleGroupItem value="relaxed">Свободный</ToggleGroupItem>
            <ToggleGroupItem value="wide">Широкий</ToggleGroupItem>
          </ToggleGroup>
        </fieldset>
        <div
          className="rounded-xl border bg-muted/30 p-4"
          style={{
            fontSize: settings.readingSize,
            lineHeight: { normal: 1.8, relaxed: 2, wide: 2.2 }[settings.readingSpacing],
          }}
        >
          <p className="font-semibold">Пример оформления</p>
          <p>
            Короткие блоки, понятные примеры и удобный ритм чтения помогают сосредоточиться на
            материале.
          </p>
        </div>
        <LocalSaveNotice area="interface" />
        <Button variant="outline" onClick={settings.reset}>
          Вернуть стандартный вид
        </Button>
      </SheetContent>
    </Sheet>
  )
}
