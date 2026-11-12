React предоставляет объект события с target и `currentTarget` и поддерживает capture-обработчики через суффикс Capture. Target указывает на исходный узел, `currentTarget` - на узел текущего обработчика.

<!-- wishu:answer-block -->

#### Как это работает

StopPropagation влияет на распространение события, но не отменяет явный вызов переданного callback из вашего кода. `preventDefault` отдельно отменяет допустимое стандартное действие. Для части событий есть особенности, например React onScroll не следует считать обычным всплывающим кликом.

Portal сохраняет связь с деревом React, поэтому событие может попасть к React-родителю вне физической DOM-цепочки портала. Не считайте React-обработчики универсальной заменой любому нативному listener на document: их порядок зависит от места регистрации и фазы.

#### Пример

```tsx
function Panel() {
  return (
    <div onClickCapture={() => console.log("capture")} onClick={() => console.log("panel")}>
      <button
        onClick={(event) => {
          event.stopPropagation()
          console.log("button")
        }}
      >
        Нажать
      </button>
    </div>
  )
}
// Capture обработается до обработчика кнопки; всплытие до panel остановлено.
```

#### Разбор примера

Capture контейнера уже выполняется до попадания события на кнопку. StopPropagation внутри кнопки не отменяет этот произошедший шаг, но останавливает дальнейшее всплытие к panel. Если бы кнопка вручную вызвала родительский callback, остановка распространения не запретила бы обычный вызов функции.

#### Типичная ошибка

> Ожидать, что stopPropagation отменит уже выполненный capture или вручную вызванный callback.

#### Источники

[React: components / common](https://react.dev/reference/react-dom/components/common)
