Результат DOM-поиска может отсутствовать, а `EventTarget` не обещает свойства конкретного HTML-элемента. Используйте проверку элемента, когда его вид не обеспечен внешним контрактом.

<!-- wishu:answer-block -->

#### Как это работает

Generic-параметр `querySelector` помогает описать ожидаемый результат, но не выполняет runtime-проверку соответствия найденного элемента. `event.target` может указывать на вложенный узел, а currentTarget связан с местом регистрации обработчика; точность доступного типа зависит от сигнатуры API и контекста.

В обработчике сохраните проверенный элемент в локальную переменную. Для разных window/iframe проверка `instanceof` имеет особенности принадлежности realm; при таком сценарии контракт проверки нужно определить отдельно.

#### Пример

```typescript
const node = document.querySelector("#email")
if (node instanceof HTMLInputElement) {
  console.log(node.value)
}
document.addEventListener("input", (event) => {
  const target = event.target
  if (!(target instanceof HTMLInputElement)) return
  console.log(target.value)
})
```

#### Разбор примера

Проверка `instanceof` исключает и `null`, и элементы другого интерфейса перед чтением value. В обработчике проверяется фактический `target`, который может отличаться от места подписки. Один generic-параметр `querySelector` или приведение `EventTarget` не выполнил бы эти проверки в браузере.

#### Типичная ошибка

> Слепо приводить `EventTarget` к `HTMLInputElement`, не учитывая вложенные и отсутствующие узлы.

#### Источники

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html)
