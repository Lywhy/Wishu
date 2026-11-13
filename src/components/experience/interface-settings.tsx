import { Settings, Sun, Moon } from "lucide-react"
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
import { useTheme } from "@/lib/theme-context"
import { interfacePalettes, isInterfacePalette } from "@/lib/interface-palettes"
import { Badge } from "@/components/ui/badge"

export function InterfaceSettings() {
  const settings = useInterfaceSettings()
  const { theme, setTheme } = useTheme()
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
        <Settings aria-hidden="true" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Вид и чтение</SheetTitle>
        <SheetDescription>Настройте фон и оформление ответов и лекций под себя.</SheetDescription>
        <div className="grid grid-cols-2 items-start gap-3">
          <div className="space-y-3">
            <p className="text-sm font-medium" id="interface-mode-label">
              Режим
            </p>
            <Button
              className="w-full"
              variant="outline"
              aria-label={theme === "dark" ? "Включить светлый режим" : "Включить тёмный режим"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
              {theme === "dark" ? "Тёмный" : "Светлый"}
            </Button>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium" id="interface-language-label">
              Язык
            </p>
            <Button
              className="w-full"
              variant="outline"
              disabled
              aria-labelledby="interface-language-label"
              aria-describedby="interface-language-status"
            >
              Русский
            </Button>
            <Badge
              id="interface-language-status"
              variant="outline"
              className="text-muted-foreground"
            >
              В разработке
            </Badge>
          </div>
        </div>
        <fieldset className="space-y-3 border-t pt-4">
          <legend className="text-sm font-medium">Цветовая тема</legend>
          <ToggleGroup
            aria-label="Цветовая тема"
            variant="outline"
            className="grid w-full grid-cols-2"
            value={[settings.palette]}
            onValueChange={(values) => {
              const value = values[0]
              if (value && isInterfacePalette(value)) settings.setPalette(value)
            }}
          >
            {interfacePalettes.map((palette) => (
              <ToggleGroupItem
                key={palette.id}
                value={palette.id}
                className="h-12 justify-start gap-2 px-3"
              >
                <span
                  aria-hidden="true"
                  className={`size-3 shrink-0 rounded-full ${palette.swatch}`}
                />
                {palette.title}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </fieldset>
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
        <LocalSaveNotice area="interface" errorsOnly />
        <Button variant="outline" onClick={settings.reset}>
          Вернуть стандартный вид
        </Button>
      </SheetContent>
    </Sheet>
  )
}
