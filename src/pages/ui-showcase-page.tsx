import { useId, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import {
  CatalogHeader,
  CategoryMark,
  CompletedBadge,
  TaskStatusBadge,
} from "@/components/catalog/catalog-primitives"
import { PageState } from "@/components/catalog/page-state"
import { SemanticBadge } from "@/components/catalog/semantic-badge"
import { CatalogLoading } from "@/components/catalog/catalog-loading"
import { LearningMarkdown } from "@/components/learning/learning-markdown"
import { DifficultyBadge } from "@/components/practice/practice-elements"
import { ResultValue } from "@/components/experience/result-value"
import { Disclosure } from "@/components/experience/disclosure"
import { QuestionBreadcrumbs } from "@/components/questions/question-breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function Sample({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="min-w-0 space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <Card className="min-w-0 gap-5 rounded-xl p-5 shadow-none sm:p-6">{children}</Card>
    </section>
  )
}

const material = [
  "## Короткий ответ",
  "**Замыкание** - функция вместе с доступом к лексическому окружению, в котором она была создана.",
  "### Что нужно запомнить",
  "- Функция сохраняет доступ к переменным внешней области.\n- Вызовы фабрики могут создавать независимое состояние.\n- Объекты в окружении остаются доступными, пока на них есть ссылки.",
  "> Важно: замыкание сохраняет доступ к переменной, а не снимок её значения.",
  "```javascript\nfunction counter() {\n  let value = 0\n  return () => ++value\n}\nconst next = counter()\nnext() // 1\nnext() // 2\n```",
  "| Вызов | Результат | Причина |\n| --- | --- | --- |\n| `next()` | `1` | Первое увеличение |\n| `next()` | `2` | Состояние сохранено |",
  "Подробнее о лексическом окружении - в материалах раздела.[^scope]",
  "[^scope]: Сноска с пояснением и ссылкой обратно к тексту.",
].join("\n\n")

export default function UiShowcasePage() {
  const prefix = useId()
  const [selected, setSelected] = useState(false)
  const [checked, setChecked] = useState(true)
  return (
    <>
      <QuestionBreadcrumbs
        items={[{ label: "Обучение", to: "/learn" }, { label: "Образцы интерфейса" }]}
      />
      <CatalogHeader
        title="Образцы интерфейса"
        description="Страница для разработки: реальные компоненты, состояния и длинное содержимое. Доступна только в режиме разработки по адресу /dev/ui."
        eyebrow="Визуальная система"
      />
      <div className="space-y-8">
        <Sample title="Поверхности и иерархия">
          <div className="grid gap-4 sm:grid-cols-3">
            {["bg-background", "bg-card", "bg-muted/40"].map((background) => (
              <div
                key={background}
                className={`rounded-lg border border-border/70 p-4 ${background}`}
              >
                <p className="text-sm font-semibold">Поверхность</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Второстепенный текст должен оставаться читаемым в обеих темах.
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <CategoryMark mark="JS" color="bg-amber-500/10 text-amber-700 dark:text-amber-300" />
            <CategoryMark mark="TS" color="bg-blue-500/10 text-blue-700 dark:text-blue-300" />
            <CategoryMark mark="R" color="bg-cyan-500/10 text-cyan-700 dark:text-cyan-300" />
          </div>
        </Sample>
        <Sample title="Кнопки и состояния">
          <div className="flex flex-wrap items-center gap-2">
            <Button>Основное действие</Button>
            <Button variant="outline">Дополнительное</Button>
            <Button variant="ghost">Вспомогательное</Button>
            <Button disabled>Недоступно</Button>
            <Button disabled aria-busy="true">
              Сохраняем…
            </Button>
            <Toggle pressed={selected} onPressedChange={setSelected}>
              Выбрано: {selected ? "да" : "нет"}
            </Toggle>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="outline">
              Компактная
            </Button>
            <Button variant="outline">Обычная</Button>
            <Button size="lg" variant="outline">
              Крупная
            </Button>
          </div>
        </Sample>
        <Sample title="Статусы и сложность">
          <div className="flex flex-wrap gap-2">
            <TaskStatusBadge status="new" />
            <TaskStatusBadge status="draft" />
            <TaskStatusBadge status="solved" />
            <CompletedBadge>Пройдено</CompletedBadge>
            <SemanticBadge tone="warning" dot>
              Повторить
            </SemanticBadge>
            <SemanticBadge tone="accent" dot>
              Пропущен
            </SemanticBadge>
            <SemanticBadge tone="info">В избранном</SemanticBadge>
            <SemanticBadge tone="popular">Популярный</SemanticBadge>
            <SemanticBadge className="border-dashed">В разработке</SemanticBadge>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["Базовый", "Средний", "Продвинутый"] as const).map((level) => (
              <DifficultyBadge key={level} level={level} />
            ))}
          </div>
          <Progress aria-label="Пример прогресса" value={60} />
        </Sample>
        <Sample title="Поля и сообщения">
          <div className="grid items-start gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor={`${prefix}-name`} className="text-sm font-medium">
                Название
              </label>
              <Input
                id={`${prefix}-name`}
                placeholder="Например, замыкания"
                aria-describedby={`${prefix}-hint`}
              />
              <p id={`${prefix}-hint`} className="text-xs leading-6 text-muted-foreground">
                Краткая подсказка рядом с полем.
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor={`${prefix}-error`} className="text-sm font-medium">
                Поле с ошибкой
              </label>
              <Input
                id={`${prefix}-error`}
                defaultValue="JS"
                aria-invalid="true"
                aria-describedby={`${prefix}-error-text`}
              />
              <p id={`${prefix}-error-text`} className="text-xs leading-6 text-destructive">
                Укажите не менее 5 символов.
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor={`${prefix}-text`} className="text-sm font-medium">
                Описание
              </label>
              <Textarea id={`${prefix}-text`} placeholder="Текст с переносами строк" rows={4} />
            </div>
            <div className="space-y-4">
              <Select
                defaultValue="all"
                items={[
                  { value: "all", label: "Все вопросы" },
                  { value: "saved", label: "Только избранное" },
                ]}
              >
                <SelectTrigger className="w-full" aria-label="Пример фильтра">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectItem value="all">Все вопросы</SelectItem>
                  <SelectItem value="saved">Только избранное</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-3">
                <Switch id={`${prefix}-switch`} checked={checked} onCheckedChange={setChecked} />
                <label htmlFor={`${prefix}-switch`} className="text-sm">
                  Раскрывать ответы сразу
                </label>
              </div>
              <Input aria-label="Недоступное поле" placeholder="Недоступно" disabled />
            </div>
          </div>
        </Sample>
        <Sample title="Панели, вкладки и раскрытие">
          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>Открыть диалог</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Название диалога</DialogTitle>
                  <DialogDescription>
                    Текст с пояснением действия и его результата.
                  </DialogDescription>
                </DialogHeader>
                <p className="text-sm leading-7">
                  Закрытие по Escape, кнопке и фону обеспечивает Base UI.
                </p>
                <DialogFooter>
                  <Button disabled>Пример действия</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>Открыть панель</SheetTrigger>
              <SheetContent>
                <SheetTitle>Боковая панель</SheetTitle>
                <SheetDescription>
                  Проверка отступов, закрытия и длинных заголовков.
                </SheetDescription>
                <LearningMarkdown content={material} topic="JavaScript" />
              </SheetContent>
            </Sheet>
          </div>
          <Tabs defaultValue="first">
            <TabsList aria-label="Пример вкладок">
              <TabsTrigger value="first">Описание</TabsTrigger>
              <TabsTrigger value="second">Состояния</TabsTrigger>
            </TabsList>
            <TabsContent value="first" className="pt-3 leading-7">
              Содержимое первой вкладки.
            </TabsContent>
            <TabsContent value="second" className="pt-3 leading-7">
              Проверьте управление стрелками и видимость фокуса.
            </TabsContent>
          </Tabs>
          <Disclosure title="Длинный заголовок раскрытия, который переносится на узком экране">
            <p className="text-sm leading-7">
              Текст не должен обрезаться после открытия или изменения ширины окна.
            </p>
          </Disclosure>
        </Sample>
        <Sample title="Материал и результаты">
          <LearningMarkdown content={material} topic="JavaScript" variant="answer" />
          <div className="grid gap-4 sm:grid-cols-2">
            <ResultValue label="Ожидаемый результат" value="[1,2,3]" />
            <ResultValue label="Ваш результат" value="[1,2,4]" compareWith="[1,2,3]" highlight />
          </div>
        </Sample>
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Пустое состояние и ошибка</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <PageState
              heading="h2"
              title="Ничего не нашлось"
              description="Измените запрос или сбросьте фильтры."
            >
              <Button variant="outline" disabled>
                Сбросить фильтры
              </Button>
            </PageState>
            <PageState
              heading="h2"
              kind="error"
              title="Не удалось загрузить материалы"
              description="Проверьте подключение и повторите попытку."
            >
              <Button disabled>Повторить загрузку</Button>
            </PageState>
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Загрузка каталога</h2>
          <CatalogLoading label="Пример загрузки каталога" />
        </section>
        <Button nativeButton={false} variant="outline" render={<Link to="/learn" />}>
          Вернуться к обучению
        </Button>
      </div>
    </>
  )
}
