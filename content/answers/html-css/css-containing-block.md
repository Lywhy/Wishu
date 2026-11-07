Absolute использует подходящий containing block, часто заданный ближайшим позиционированным предком. Fixed обычно связан с viewport, но некоторые свойства предков, например transform, могут создать для него другой containing block.

<!-- wishu:answer-block -->

Это отдельная задача от порядка наложения: один предок способен одновременно влиять и на координаты, и на stacking context, но увеличение z-index не изменит систему координат.

При смещении оверлея проверяйте цепочку предков, transform, containment и область прокрутки. Для локального значка задайте явный position: relative у нужного контейнера. Для модального взаимодействия рассмотрите top layer, а не только fixed.

<!-- wishu:answer-block -->

[Документация](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position).
