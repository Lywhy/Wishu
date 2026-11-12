**IndexedDB - асинхронное хранилище структурированных данных origin с object stores, ключами и индексами.**

<!-- wishu:answer-block -->

### Как это работает

Оно подходит большим наборам и офлайн-данным, где строкового синхронного `localStorage` недостаточно. Схему меняют через версию базы и событие upgradeneeded.

Изменения выполняются транзакциями; успех отдельного request ещё не гарантирует успешный commit всей транзакции. Время активности транзакции ограничено, поэтому нельзя произвольно ждать сеть посередине и рассчитывать на прежнюю транзакцию.

Квоты, очистка данных и ошибки по-прежнему требуют обработки; чувствительные данные доступны коду того же origin.

### Пример и его разбор

```javascript
// Предусловие: db открыт и содержит store "items" с подходящим ключом.
function saveRecord(db, record) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("items", "readwrite")
    tx.objectStore("items").put(record)
    tx.oncomplete = () => resolve()
    tx.onabort = () => reject(tx.error)
  })
}
```

`Promise` завершается по событию complete транзакции, а не сразу после put. Так вызывающий код узнаёт об успешной записи всей операции. Время выполнения стороннего fetch не следует встраивать между созданием транзакции и её запросами без понимания правил её активности.

### Источники

[MDN: API / Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
