Первый специальный параметр `this: Context` задаёт ожидаемый контекст вызова и удаляется из JavaScript. Он не является дополнительным runtime-аргументом и сам не привязывает функцию к объекту.

<!-- wishu:answer-block -->

Для callback без зависимости от получателя можно указать `this: void`. Вызов через call, apply или bind проверяется точнее при strictBindCallApply. Стрелка получает this лексически и не объявляет такой параметр.

`ThisType<T>` решает близкую, но контекстную задачу: выступает маркером типа this в методах объектного литерала, когда есть подходящий контекст и включён noImplicitThis. Это не обычное поле интерфейса и не runtime-привязка. Для готовых сигнатур есть ThisParameterType и OmitThisParameter.

<!-- wishu:answer-block -->

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/2/functions.html).
