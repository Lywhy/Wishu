**В обычном create Zustand 5 результат selector должен удовлетворять стабильному snapshot-контракту; новая fallback-функция или массив при каждом чтении может вызвать цикл.**

<!-- wishu:answer-block -->

### Механизм и границы

- Вынесите fallback-функцию в стабильную константу. Для нескольких выбранных значений используйте подходящий useShallow или альтернативный equality-API библиотеки.

- UseShallow сравнивает выбранную поверхность, а не произвольно глубокий граф, поэтому новая вложенная структура всё ещё имеет значение.

- Не переносите второй equality-аргумент старого API в обычный create v5 без проверки миграции.

### Пример

```jsx
const noop = () => {}
const action = useStore((state) => state.action ?? noop)
// Не создаётся новая () => {} при каждом вызове selector.
```

### Типичная ошибка

Добавлять `useCallback` вокруг компонента, оставив нестабильным сам результат selector.

### Для закрепления

- [Что создаёт create в Zustand и нужен ли Provider?](/questions/zustand-store-basics)

- [Как selector и useShallow влияют на обновления Zustand-компонента?](/questions/zustand-selector-shallow)

### Источник

[Zustand: migrating-to-v5](https://zustand.docs.pmnd.rs/reference/migrations/migrating-to-v5)
