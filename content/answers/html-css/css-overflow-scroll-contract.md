Hidden обрезает видимое переполнение, но элемент может оставаться прокручиваемым программно. Clip обрезает без создания scroll container; auto показывает механизм прокрутки при необходимости, scroll резервирует его поведение независимо от наличия переполнения.

<!-- wishu:answer-block -->

Для scroll нужен ограниченный размер по соответствующей оси. В flex-колонке часто требуется min-block-size: 0 у сжимаемой области, иначе она растянет страницу вместо внутреннего скролла.

Overflow влияет на sticky и clipping оверлеев. Сам по себе clip не создаёт новый formatting context; если он нужен, укажите это отдельно, например flow-root. Не прячьте ошибку макета глобальным overflow-x: hidden.

<!-- wishu:answer-block -->

[Документация](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow).
