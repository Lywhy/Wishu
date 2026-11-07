**Delay сдвигает начало временной шкалы, direction меняет проход по кадрам, `fill-mode` определяет применение анимационных значений вне активной части.** Это не сохранение новых inline-стилей.

<!-- wishu:answer-block -->

#### Механизм и границы

- `forwards` сохраняет эффект конечного состояния по правилам направления и числа итераций; `backwards` применяет подходящее начальное состояние во время задержки. `both` сочетает эти эффекты.
- Отрицательный `delay` запускает анимацию как уже продвинувшуюся на соответствующее время. Это не ускорение `duration`.
- После удаления анимации снова проявляются обычные значения каскада. Состояние «задача решена» хранится в данных приложения, а не только в последнем кадре.
- Учитывайте reduced motion. Логика не должна навсегда зависеть от `animationend`: анимация может быть отменена или отключена.

#### Пример

```css
.notice {
  animation: appear 180ms ease 100ms backwards;
}
@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(0.25rem);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
```

#### Для закрепления

- [Когда использовать transition, а когда animation?](/questions/css-transition-animation)
- [Как учитывать prefers-reduced-motion без потери смысла интерфейса?](/questions/css-reduced-motion)

#### Источник

[MDN: animation-fill-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-fill-mode).
