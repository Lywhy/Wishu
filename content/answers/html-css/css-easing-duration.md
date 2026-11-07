**Duration задаёт время, easing - изменение прогресса внутри этого времени.** Одинаковые 200ms могут ощущаться по-разному при linear и ease-out.

<!-- wishu:answer-block -->

#### Как это работает

- Ease-in замедляет начало относительно линейного движения, ease-out замедляет конец. Это не задержка старта: за задержку отвечает delay.
- Steps делит прогресс на ступени, например для смены кадров спрайта. Это не интерполяция с плавным прохождением всех промежуточных значений.
- Для cubic-bezier допустимая временная ось имеет ограничения на x-координаты контрольных точек. Не подставляйте случайные четыре числа ради «пружины».
- Подбирайте движение по задаче и учитывайте reduced motion. Завершение анимации не должно быть единственным источником бизнес-состояния.

#### Пример

```css
.panel {
  transition: opacity 180ms ease-out;
}
.frames {
  animation: frames 1s steps(4, end) infinite;
}
@keyframes frames {
  from {
    background-position-x: 0;
  }
  to {
    background-position-x: -400px;
  }
}
```

#### Для закрепления

- [Что определяют animation-delay, direction и fill-mode?](/questions/css-animation-fill-timing)
- [Как учитывать prefers-reduced-motion без потери смысла интерфейса?](/questions/css-reduced-motion)

#### Источник

[MDN: easing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function).
