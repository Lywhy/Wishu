Items настраивает выравнивание элементов внутри их области, а content распределяет доступное место для совокупности строк или треков. Во Flexbox justify относится к основной оси, align - к поперечной, определяемой flex-direction.

<!-- wishu:answer-block -->

Align-content не начнёт заметно двигать единственную не обёрнутую flex-строку. В Grid нужно различать выравнивание всей сетки и каждого элемента в ячейке. Свободное пространство должно реально существовать.

Не связывайте justify навсегда с горизонталью: направление осей зависит от layout и writing mode.

<!-- wishu:answer-block -->

[Документация](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_alignment/Box_alignment_in_flexbox).
