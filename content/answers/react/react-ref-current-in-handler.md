**DOM-ref назначается при commit; прочитать его нужно в момент действия, когда узел уже существует.**

<!-- wishu:answer-block -->

#### Как это работает

Снимок const node = ref.current во время первого render часто будет null и таким останется в созданном замыкании. Сам объект ref стабилен, но current отражает текущий узел и очищается при удалении.

#### Пример

```jsx
function focusField() {
  inputRef.current?.focus()
}
```

#### Разбор примера

FocusField читает current при реальном вызове, а не сохраняет null из первого render. Поэтому он получает актуальный прикреплённый узел. Optional chaining учитывает отсутствие поля, но не создаёт его и не делает ещё не выполненный commit синхронным.

#### Типичная ошибка

Сохранить current до mount и затем использовать старый снимок вместо актуального ref.

#### Для закрепления

- [Чем useRef отличается от useState?](/questions/react-ref-state)

#### Источники

[React: learn / manipulating-the-dom-with-refs](https://react.dev/learn/manipulating-the-dom-with-refs)
