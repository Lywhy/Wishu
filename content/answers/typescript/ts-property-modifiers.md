**Свойство name?: string может отсутствовать; при чтении нужно учитывать `undefined`.** Readonly запрещает переназначать свойство через данный тип, но не делает объект глубоко неизменяемым и не меняет его дескриптор JavaScript.

<!-- wishu:answer-block -->

- При exactOptionalPropertyTypes отсутствие и явная запись `undefined` различаются: для последней требуется соответствующий union. Эта проверка включается отдельно от strict. Readonly-ссылка может видеть изменения, выполненные через другую совместимую изменяемую ссылку. Для вложенного readonly-контракта нужно отдельно описать вложенные значения.

<!-- wishu:answer-block -->

### Отсутствует или записан undefined
С exactOptionalPropertyTypes `name?: string` разрешает отсутствие поля, но не запись undefined. Для явной записи нужен контракт `name?: string | undefined`. При чтении optional-поля undefined всё равно возможен. Это важно для patch-объектов, проверок через in и Object.keys: отсутствие и существующее поле с undefined наблюдаются по-разному.

```typescript
// exactOptionalPropertyTypes: true
type Patch = { name?: string }
const unchanged: Patch = {}
const renamed: Patch = { name: "Анна" }
// const cleared: Patch = { name: undefined } // Ошибка.
type ExplicitUndefined = { name?: string | undefined }
```
