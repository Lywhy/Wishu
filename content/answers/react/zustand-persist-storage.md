**`createJSONStorage` адаптирует строковое storage к JSON-контракту persist; поставщик storage может быть синхронным или асинхронным.**

<!-- wishu:answer-block -->

#### Как это работает

`sessionStorage` меняет срок хранения относительно `localStorage`, а async storage отделяет завершение восстановления от создания store. Date, Map и другие значения не сохраняют свою семантику через обычный JSON автоматически. Не обращайтесь к браузерному storage на сервере без корректной интеграции.

#### Пример

```jsx
const configuration = {
  storage: createJSONStorage(() => sessionStorage),
  // Для async backend его getItem/setItem возвращают Promise по StateStorage-контракту.
}
```

#### Разбор примера

`createJSONStorage` берёт на себя преобразование между JSON-данными persist и строковыми значениями адаптера. `sessionStorage` ограничивает срок хранения сессией вкладки; асинхронный адаптер добавляет отдельный этап ожидания восстановления. Ошибки доступа и неподдерживаемые JSON-значения требуют политики приложения. Смена адаптера не превращает `localStorage`-подобное хранилище в серверный источник истины.

#### Типичная ошибка

Считать любой объект с методами похожего имени полностью совместимым JSON-хранилищем.

#### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Что сохраняет persist и почему гидратация не всегда завершается сразу?](/questions/zustand-persist-hydration)

#### Источники

[Zustand: persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist)
