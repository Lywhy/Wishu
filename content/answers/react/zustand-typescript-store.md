**Объедините тип данных и действий и передайте его в curried `create<State>()(...)`.** Так `selector` и вызовы действий получают согласованные типы.

<!-- wishu:answer-block -->

#### Как это работает

- Форма с двумя парами скобок используется для явного параметра типа и последующего вывода создателя с `middleware`. Не заменяйте её случайным any.
- Get и `set` типизируются контрактом store, но типовая система не доказывает наличие всех данных в процессе самой инициализации. Не читайте ещё не созданный store как уже готовый.
- Сетевые и сохранённые данные остаются недоверенными. Тип функции загрузки и реальная проверка JSON решают разные задачи.

#### Пример

```typescript
type Preferences = { theme: "light" | "dark" }
type Actions = { setTheme: (theme: Preferences["theme"]) => void }
const usePreferences = create<Preferences & Actions>()((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
}))
```

#### Разбор примера

Пересечение Preferences и Actions описывает полный публичный state: и данные, и доступные функции. Поэтому setTheme принимает только допустимый вариант темы, а selector знает тип результата. Форма `create<Preferences & Actions>()` связывает явный тип с выводом следующего вызова. Эти проверки действуют при разработке: строка из storage или JSON-ответа всё равно нуждается в проверке перед записью.

#### Типичная ошибка

> Использовать any для persisted JSON и считать его проверенным из-за типа store.

#### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

#### Источники

[Zustand: beginner typescript](https://zustand.docs.pmnd.rs/learn/guides/beginner-typescript)
