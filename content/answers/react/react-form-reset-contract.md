**form.reset() сбрасывает нативные поля к их значениям по умолчанию, но не заменяет состояние React.** Управляемое поле нужно сбрасывать через его владельца состояния.

<!-- wishu:answer-block -->

#### Как это работает

В форме с value={name} новый рендер снова применит name. Для осмысленного сброса вызовите соответствующие setters или действие reducer. Для неуправляемых полей reset опирается на `defaultValue`/`defaultChecked`. Сброс не означает очистку всех значений до пустых.

В React 19 успешный form Action сбрасывает неуправляемые поля автоматически. Это не обещание автоматического сброса всех React-state, ошибок и управляемых черновиков.

#### Пример

```jsx
function NameForm() {
  const [name, setName] = useState("")
  return (
    <form onReset={() => setName("")}>
      <label>
        Имя
        <input value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <button type="reset">Сбросить</button>
    </form>
  )
}
```

#### Разбор примера

`onReset` изменяет React-state, поэтому управляемое name действительно возвращается к пустой строке. Нативный reset сам по себе не переписал бы эту ячейку. Ошибки отправки и серверные данные также требуют отдельной политики сброса.

#### Типичная ошибка

Считать, что reset удаляет записи с сервера или очищает любой state внутри дочернего дерева.

#### Источники

[React: components / form](https://react.dev/reference/react-dom/components/form)
