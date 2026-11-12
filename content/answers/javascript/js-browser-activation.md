**Наличие функции не гарантирует разрешение операции. Некоторые API зависят от secure context, пользовательской активации, разрешений и политики embedding-среды.**

<!-- wishu:answer-block -->

### Как это работает

Transient activation имеет срок и может потребляться; нельзя обобщать всё до правила «любой `await` сразу убивает активацию» или «любой click разрешает всё». Смотрите контракт конкретного API и обрабатывайте отказ.

Permissions API не поддерживает одинаковый набор descriptor во всех средах. UI должен оставлять понятный ручной путь, если операция недоступна.

### Пример и его разбор

```javascript
async function copyText(text) {
  if (!navigator.clipboard?.writeText) return false
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
// Вызывать из подходящего взаимодействия; false требует понятного fallback.
```

CopyText сначала проверяет наличие метода, затем отдельно обрабатывает отказ Promise. `false` позволяет интерфейсу предложить ручное копирование вместо ложного сообщения об успехе. Даже корректно написанную функцию нужно вызывать в условиях, допускаемых политикой конкретного API.

### Типичная ошибка

> Считать существование navigator.clipboard доказательством успешного доступа.

### Источники

[MDN: UserActivation](https://developer.mozilla.org/en-US/docs/Web/API/UserActivation)
