**ReactNode подходит для разнообразного допустимого содержимого, ReactElement - для элемента, string - для строго текстового контракта.**

<!-- wishu:answer-block -->

### Механизм и границы

- Тип выбирают по разрешённому использованию, а не по популярности записи.

- ReactNode включает пустые значения, поэтому сам по себе не гарантирует видимого ребёнка. ReactElement не доказывает наличие нужного DOM-узла после рендера.

### Пример

```tsx
type NoticeProps = { children: React.ReactNode }
function Notice({ children }: NoticeProps) {
  return <aside>{children}</aside>
}
```

### Типичная ошибка

Требовать ReactElement от компонента, который должен принимать обычную строку.

### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

### Источник

[React: typescript](https://react.dev/learn/typescript)
