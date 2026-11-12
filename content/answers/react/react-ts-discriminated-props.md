**Discriminated union описывает взаимоисключающие варианты компонента и связывает обязательные props с выбранным режимом.**

<!-- wishu:answer-block -->

#### Как это работает

Общий boolean с несколькими необязательными callback часто допускает бессмысленные комбинации. Сужайте union по discriminant перед чтением специфичных полей. Тип не валидирует конфигурацию, пришедшую из JSON.

#### Пример

```tsx
type Props = { mode: "link"; href: string } | { mode: "button"; onClick: () => void }
function Control(props: Props) {
  return props.mode === "link" ? (
    <a href={props.href}>Открыть</a>
  ) : (
    <button onClick={props.onClick}>Открыть</button>
  )
}
```

#### Разбор примера

Mode определяет, какие поля доступны и какой DOM-элемент создаётся. Ветка link требует href, ветка button - onClick. Это предотвращает случайный неполный набор props в TypeScript, но не проверяет конфигурацию из непроверенного внешнего источника.

#### Типичная ошибка

Делать href и `onClick` одновременно optional и перекладывать невозможные комбинации на runtime.

#### Для закрепления

- [Что такое JSX и чем он отличается от HTML?](/questions/react-jsx)

#### Источники

[React: typescript](https://react.dev/learn/typescript)
