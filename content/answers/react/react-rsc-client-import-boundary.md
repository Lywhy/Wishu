**Директива use client отмечает вход в клиентский граф зависимостей RSC-интеграции, а не запрет любого серверного рендера конкретного JSX.**

<!-- wishu:answer-block -->

#### Как это работает

Импортируемые клиентским модулем зависимости попадают в его клиентскую область, поэтому через эту границу нельзя бездумно импортировать серверные секреты и API. Сервер может передать поддерживаемое содержимое через props/children, не делая весь исходный серверный граф клиентским.

Client Components тоже могут получать серверный HTML при SSR. Для обычного Vite SPA без RSC-поддержки эта директива не добавляет серверную архитектуру.

#### Пример

```jsx
"use client"
import { useState } from "react"
export function InteractivePanel({ children }) {
  const [open, setOpen] = useState(true)
  return (
    <section>
      <button onClick={() => setOpen((v) => !v)}>Переключить</button>
      {open && children}
    </section>
  )
}
```

#### Разбор примера

InteractivePanel включает `useState` и свой клиентский граф, но принимает children снаружи. Место передачи содержимого и его исходный модульный граф не одно и то же. При SSR эта клиентская часть тоже может участвовать в получении начального HTML.

#### Типичная ошибка

Считать, что use client гарантирует выполнение модуля исключительно в браузере и позволяет читать window без анализа SSR.

#### Для закрепления

- [Что такое гидратация и почему возникает hydration mismatch?](/questions/react-hydration)

- [Чем Server Components отличаются от SSR и Client Components?](/questions/react-server-components)

#### Источники

[React: use-client](https://react.dev/reference/rsc/use-client)
