**`Object.fromEntries` строит свойства из пар, но обход через `Object.entries` берёт только собственные перечисляемые строковые ключи. Поэтому круговой переход не сохраняет весь контракт произвольного объекта.**

<!-- wishu:answer-block -->

### Как это работает

Теряются неперечисляемые и символьные ключи, accessor-поведение и исходные дескрипторы; чтение entries может выполнить getter. FromEntries самостоятельно допускает подходящие символьные ключи в переданных парах.

Повторные ключи перезаписываются более поздними записями. Не используйте такую проекцию как доказательство полной копии класса или гарантированное сохранение прототипа.

### Пример и его разбор

```javascript
const secret = Symbol("secret")
const input = { shown: 1, [secret]: 2 }
const output = Object.fromEntries(Object.entries(input))
console.log(output.shown) // 1
console.log(Object.hasOwn(output, secret)) // false
```

В начале у input есть обычный и символьный ключ. Entries пропускает символьный, поэтому fromEntries уже нечего восстанавливать на его месте. При передаче символьной пары напрямую fromEntries такое свойство создал бы: потеря происходит на этапе выбора исходных записей, а не из-за запрета символов в итоговом объекте.

### Типичная ошибка

> Ожидать сохранения `Symbol`-полей и дескрипторов после Object.entries.

### Источники

[MDN: Global_Objects/Object/fromEntries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)
