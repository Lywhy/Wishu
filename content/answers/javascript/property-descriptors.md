**Дескриптор описывает поведение собственного свойства.**

<!-- wishu:answer-block -->

### Как это работает

У data-свойства есть value и writable, у accessor-свойства - get и `Set`; смешивать эти два варианта нельзя. Общие флаги enumerable и configurable управляют перечислением и возможностью удаления или изменения конфигурации. `Object.getOwnPropertyDescriptor` читает дескриптор, `Object.defineProperty` создаёт или изменяет свойство и возвращает объект.

writable: `false` запрещает обычное присваивание нового значения data-свойству, но не замораживает вложенный объект. `getter` без `setter` - другой вариант свойства только для чтения. configurable: `false` запрещает удаление и большинство изменений дескриптора; у ещё writable data-свойства остаётся возможность изменить value и один раз отключить writable.

При создании нового свойства через defineProperty пропущенные флаги равны `false`, а value по умолчанию - `undefined`. При изменении существующего свойства пропущенные настройки сохраняются.

У обычного свойства литерала флаги изначально true. При запрещённом присваивании строгий режим вызывает TypeError; TypeScript readonly отдельно от этих механизмов работает на этапе проверки типов.

### Пример и его разбор

```javascript
const user = {}
Object.defineProperty(user, "id", {
  value: 7,
  writable: false,
  enumerable: true,
  configurable: false,
})
Object.keys(user) // ["id"]
Object.getOwnPropertyDescriptor(user, "id").writable // false
```

Дескриптор описывает правила доступа к свойству, а не только его значение. Поле id можно перечислять, но нельзя обычным присваиванием изменить или удалить, потому что writable и configurable выключены. При создании через defineProperty пропущенные флаги по умолчанию `false`; привычный литерал объекта создаёт свойства с другими значениями этих флагов.

### Источники

[MDN: Object / defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
