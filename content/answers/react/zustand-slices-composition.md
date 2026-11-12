**Slices pattern разбивает один state creator на части, объединённые в одном экземпляре store.**

<!-- wishu:answer-block -->

#### Как это работает

Каждая часть получает совместимые set/get/api и возвращает свои данные/actions. Middleware обычно применяют к объединённому creator, а не независимо внутри каждого slice. Имена полей должны иметь явные границы: spread может незаметно перезаписать конфликт.

#### Пример

```jsx
const creator = (...args) => ({
  ...createCartSlice(...args),
  ...createUserSlice(...args),
})
const useAppStore = create(persist(creator, options))
```

#### Разбор примера

Обе фабрики получают общие set, get и api, а их поля собираются в один state. Поэтому это декомпозиция кода одного store, а не синхронизация двух независимых хранилищ. Middleware охватывает объединённый creator. Совпадающий ключ во втором spread перезапишет первый, поэтому имена данных и actions нужно согласовать до композиции и отразить в типах.

#### Типичная ошибка

Создать два отдельных stores и назвать их slices одного атомарного состояния.

#### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

#### Источники

[Zustand: slices-pattern](https://zustand.docs.pmnd.rs/learn/guides/slices-pattern)
