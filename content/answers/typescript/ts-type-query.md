**В JavaScript-выражении `typeof` value возвращает строку вроде "`string`" или "object".** В позиции типа TypeScript `typeof` value получает статический тип известной переменной или свойства. Это позволяет не дублировать форму объекта в отдельном объявлении.

<!-- wishu:answer-block -->

#### Как это работает

Type query не выполняет выражение и имеет синтаксические ограничения: нельзя произвольно написать `typeof` вызов(). Для результата функции обычно используют `ReturnType<typeof fn>`. Полученный тип зависит от уже выполненного вывода и расширения литералов; `typeof` сам не делает объект readonly.

#### Пример

```typescript
const settings = { theme: "dark", retries: 3 }
type Settings = typeof settings
const runtimeCategory = typeof settings // строка "object"
type Theme = Settings["theme"] // string, не литерал "dark"
function count() {
  return 3
}
type Count = ReturnType<typeof count> // number
```

#### Разбор примера

Settings повторяет уже выведенную форму settings, поэтому theme остаётся string. RuntimeCategory, напротив, хранит реальный текст «object». Для Count используется тип функции count и `ReturnType`: сам вызов не требуется и вычисление числа 3 ради извлечения типа не происходит.

#### Источники

[TypeScript: typeof-types](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html)
