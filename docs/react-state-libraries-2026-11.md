# Redux и Zustand в React

Добавлены два подраздела, по 12 вопросов в каждом: Redux и Redux Toolkit, Zustand. Всего 24: 7 базовых и 17 средних. Вопросы имеют Markdown-ответы с примерами, типичными ошибками, выводами и первичными источниками. Примеры являются фрагментами; внешние API и импорты предполагаются из описанного контекста.

- zustand-store-basics: Что создаёт create в Zustand и нужен ли Provider?
- zustand-selector-shallow: Как selector и useShallow влияют на обновления Zustand-компонента?
- zustand-set-merge: Как set объединяет состояние и почему вложенный объект нужно копировать?
- zustand-async-actions: Как писать async-действия Zustand и защищаться от устаревшего ответа?
- zustand-imperative-access: Чем useStore(selector) отличается от useStore.getState()?
- zustand-selective-subscribe: Когда нужен subscribeWithSelector и как освобождать подписку?
- zustand-persist-hydration: Что сохраняет persist и почему гидратация не всегда завершается сразу?
- zustand-persist-migration: Как version и migrate помогают изменить формат сохранённого Zustand-state?
- zustand-scoped-store: Как создать независимый Zustand-store для каждого экземпляра виджета?
- zustand-immer-middleware: Что разрешает immer middleware в Zustand и чего обычный set не делает?
- zustand-typescript-store: Как типизировать данные и actions Zustand через create<State>()()?
- zustand-reset-lifetime: Как сбросить Zustand-state и почему logout требует большего, чем clearStorage?
- redux-data-flow: Как устроен поток данных Redux: store, action, dispatch и reducer?
- redux-toolkit-role: Чем Redux Toolkit отличается от Redux и React-Redux?
- redux-store-provider: Как configureStore и Provider подключают Redux к React?
- redux-slice-immer: Что создаёт createSlice и почему в его reducer разрешена запись state.value++?
- redux-selector-equality: Когда useSelector обновляет компонент и почему новый объект в selector мешает?
- redux-memoized-selector: Как createSelector мемоизирует производные данные?
- redux-async-thunk: Что делает createAsyncThunk и зачем нужен unwrap?
- redux-query-cache: Чем RTK Query отличается от запроса внутри createAsyncThunk?
- redux-entity-adapter: Как createEntityAdapter помогает хранить и обновлять коллекцию?
- redux-serializable-state: Почему в Redux обычно не хранят Promise, функции и DOM-узлы?
- redux-middleware-effects: Для чего middleware и listenerMiddleware нужны вне reducer?
- redux-typescript-hooks: Как вывести RootState и AppDispatch и типизировать React-Redux hooks?

Сравнение подходов расширено в react-state-location; отдельный повторный вопрос не создавался. Определения нормализации, внешнего snapshot и SSR-изоляции не копируются в новые карточки. Зависимости приложения не устанавливались.

Oxfmt, content:build и полная content:check прошли: 929 вопросов, структура, связи и пять артефактов согласованы. Все 905 прежних ID сохранены; кроме react-state-location прежние хеши совпадают. Примеры и приложение не запускались. Для загрузки вопросов в PostgreSQL пользователь выполняет pnpm db:seed.
