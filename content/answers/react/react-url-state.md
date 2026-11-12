Поиск, выбранная вкладка, сортировка и страница списка часто полезны в URL: ссылку можно передать, обновить страницу и пройти назад. Временный ввод или чувствительные данные не обязаны попадать туда.

<!-- wishu:answer-block -->

#### Как это работает

Выберите один источник истины: не поддерживайте две независимые копии фильтра в state и search params через встречные эффекты. Парсите и нормализуйте значения URL, проверяйте границы и сбрасывайте страницу при смене фильтра.

Push создаёт шаг истории, replace меняет текущий. Для частого ввода часто удобен replace, но продуктовая навигация может требовать другого контракта. API маршрутизатора - отдельный слой, не встроенный React hook.

[React Router 7: useSearchParams](https://reactrouter.com/7.18.5/api/hooks/useSearchParams).

#### Пример

```tsx
import { useSearchParams } from "react-router-dom"
function Search() {
  const [params, setParams] = useSearchParams()
  const query = params.get("q") ?? ""
  return (
    <label>
      Поиск
      <input
        value={query}
        onChange={(event) => {
          const next = new URLSearchParams(params)
          next.set("q", event.target.value)
          next.delete("page")
          setParams(next, { replace: true })
        }}
      />
    </label>
  )
}
```

#### Разбор примера

URL хранит query как единственный источник выбранного фильтра. При вводе копируются params, обновляется q и сбрасывается page. Replace не добавляет отдельный шаг истории для каждого символа, сохраняя при этом восстанавливаемый адрес поиска.

#### Типичная ошибка

> Синхронизировать один фильтр в URL и локальном state двумя взаимными эффектами.

#### Источники

[React Router 7: useSearchParams](https://reactrouter.com/7.18.5/api/hooks/useSearchParams)

[Документация](https://react.dev/learn/choosing-the-state-structure)
