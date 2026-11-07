**Объедините тип данных и действий и передайте его в curried `create`<State>()(...).** Так `selector` и вызовы действий получают согласованные типы.

<!-- wishu:answer-block -->

#### Механизм и границы

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

#### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

#### Источник

[Zustand: beginner typescript](https://zustand.docs.pmnd.rs/learn/guides/beginner-typescript).
