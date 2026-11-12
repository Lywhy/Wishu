**Context позволяет читать значение из ближайшего подходящего провайдера выше по дереву без передачи через каждый промежуточный компонент.** Провайдер не влияет на `useContext`, вызванный в том же компоненте до возвращения этого провайдера.

<!-- wishu:answer-block -->

#### Как это работает

Значение createContext(defaultValue) используется только при отсутствии провайдера. Если провайдер передал `undefined`, потребитель получит `undefined`. В React 19 доступна запись `<ThemeContext value={theme}>`; форма `<ThemeContext.Provider>` поддерживает прежний способ записи.

#### Пример

```tsx
const ThemeContext = createContext("light")

function ThemeName() {
  return <span>{useContext(ThemeContext)}</span>
}
```

#### Разбор примера

ThemeName читает значение ближайшего ThemeContext-провайдера. Без него используется light, а провайдер с undefined передал бы именно undefined. Значение по умолчанию не является обработчиком любого пустого или ошибочного значения.

#### Типичная ошибка

> Ожидать, что defaultValue сработает при переданном Provider значении undefined. Значение по умолчанию относится к отсутствию подходящего Provider.

#### Источники

[React: react / useContext](https://react.dev/reference/react/useContext)
