*_Value receiver получает копию значения, pointer receiver - копию адреса. Набор методов T и *T различается, что влияет на удовлетворение интерфейсу.*_

<!-- wishu:answer-block -->

#### Как это работает

Метод pointer receiver используют для изменения исходного объекта или когда копирование нежелательно. Вызов на адресуемой переменной иногда позволяет удобное автоматическое взятие адреса, но это не меняет правила method set при присваивании интерфейсу. Структуры с mutex обычно не должны копироваться после начала использования.

#### Пример

```go
type Counter struct { Value int }
func (c *Counter) Increment() { c.Value++ }
type Incrementer interface { Increment() }
var _ Incrementer = (*Counter)(nil)
// var _ Incrementer = Counter{} // У Counter нет нужного method set.
```

#### Разбор примера

Проверка с *Counter описывает совместимость типа, а не исполняет Increment на nil. Если receiver заменить на значение, изменение Value затронет копию, что нарушит ожидаемую команду увеличения.

#### Типичная ошибка

> Перенести удобство вызова метода на переменной на все случаи совместимости с интерфейсом.

#### Источник

[Go: effective_go / pointers_vs_values](https://go.dev/doc/effective_go#pointers_vs_values)
