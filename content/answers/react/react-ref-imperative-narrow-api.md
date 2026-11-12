**Узкий ref-API раскрывает нужные команды компонента, не позволяя родителю произвольно менять его внутренний DOM.**

<!-- wishu:answer-block -->

#### Как это работает

`useImperativeHandle` может вернуть focus или resetSelection вместо всего input. Состав handle должен учитывать зависимости используемого состояния; устаревшее замыкание в handle так же опасно, как в обычном callback. Для декларативного open обычно лучше prop.

#### Пример

```jsx
useImperativeHandle(
  ref,
  () => ({
    focus() {
      inputRef.current?.focus()
    },
  }),
  [],
)
```

#### Разбор примера

Handle позволяет фокусировку без доступа к внутренним children. Реализацию можно заменить, сохранив публичную команду. Пустые зависимости здесь допустимы только потому, что метод читает стабильный ref, а не захватывает изменяемые props или состояние.

#### Типичная ошибка

Передать весь DOM ради одной команды и затем зависеть от частной структуры потомков.

#### Для закрепления

- [Чем useRef отличается от useState?](/questions/react-ref-state)

- [Зачем нужен useImperativeHandle?](/questions/react-imperative-handle)

#### Источники

[React: useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)
