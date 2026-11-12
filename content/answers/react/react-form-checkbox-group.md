**Независимые checkbox управляются отдельными boolean либо набором выбранных ID; каждый читает свой checked.**

<!-- wishu:answer-block -->

#### Как это работает

Не привязывайте все checkbox к одному boolean, если выбор множественный. value задаёт значение контрола для отправки, а checked - текущее включение. name связывает поля с `FormData`, но не создаёт React-state.

#### Пример

```jsx
<input
  type="checkbox"
  name="topic"
  value={id}
  checked={selected.includes(id)}
  onChange={(event) => toggleTopic(id, event.target.checked)}
/>
```

#### Разбор примера

Id определяет конкретный пункт и его отправляемое значение, а selected.includes вычисляет checked. `toggleTopic` должен создать обновлённый набор без мутации прежнего снимка. Общий name позволяет собрать несколько выбранных значений через getAll.

#### Типичная ошибка

Использовать value как признак включения или мутировать массив selected на месте.

#### Для закрепления

- [Чем управляемое поле отличается от неуправляемого?](/questions/react-controlled-input)

#### Источники

[React: components / input](https://react.dev/reference/react-dom/components/input)
