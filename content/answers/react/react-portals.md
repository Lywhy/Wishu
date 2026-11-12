**createPortal отображает содержимое в другом DOM-контейнере, сохраняя его положение в дереве React.** Это помогает разместить диалог или всплывающий слой вне контейнера с overflow или сложным stacking context.

<!-- wishu:answer-block -->

#### Как это работает

Context доступен по дереву React, и React-события распространяются по нему, а не только по физическим DOM-предкам. Portal сам не реализует доступность диалога: управление фокусом, возврат фокуса, Escape и семантику необходимо обеспечить отдельно.

#### Пример

```tsx
import { createPortal } from "react-dom"

function Overlay({ children }) {
  return createPortal(children, document.body)
}
```

#### Разбор примера

Overlay размещает children внутри document.body, но React-родитель и Context остаются прежними. Поэтому нажатие может затронуть обработчик React-предка вне физического контейнера. Пример клиентский: доступ к document и доступность модального поведения организуют отдельно.

#### Типичная ошибка

> Ожидать, что перенос DOM-узла через portal разорвёт React-контекст или автоматически решит управление фокусом диалога.

#### Источники

[react.dev: createPortal](https://react.dev/reference/react-dom/createPortal)
