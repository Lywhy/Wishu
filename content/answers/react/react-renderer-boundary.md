**React описывает компоненты и правила обновления, а react-dom связывает дерево с браузерным DOM.**

<!-- wishu:answer-block -->

#### Как это работает

Другой renderer может использовать ту же компонентную модель для иной платформы. Не переносите API DOM в переносимую логику. `createRoot` относится к react-dom/client; `useState` - к react. Установка ядра сама не выбирает контейнер страницы.

#### Пример

```jsx
import { useState } from "react"
import { createRoot } from "react-dom/client"
createRoot(document.getElementById("root")).render(<App />)
```

#### Разбор примера

`createRoot` связывает приложение с конкретным браузерным контейнером. `useState` относится к компонентной модели и не выбирает DOM-узел. Пример предполагает существующие App и root; отсутствие контейнера нужно обработать на границе инициализации приложения.

#### Типичная ошибка

Импортировать `createRoot` из react или считать DOM обязательной частью ядра.

#### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

#### Источники

[React: react-dom](https://react.dev/reference/react-dom)
