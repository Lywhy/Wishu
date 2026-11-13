**`Decode` проверяет возможность разобрать JSON в заданную структуру. Обязательность, диапазоны и бизнес-условия нужно проверять отдельно.**

<!-- wishu:answer-block -->

#### Как это работает

Неизвестные поля можно запрещать через DisallowUnknownFields. Лимит тела защищает память, а повторное чтение до EOF помогает запретить второй JSON-документ. Нулевое поле после `Decode` не всегда отличает отсутствие от явно переданного нуля; для этого нужна подходящая модель, например указатель.

#### Пример

```go
type Input struct { Title string `json:"title"` }
r.Body = http.MaxBytesReader(w, r.Body, 1<<20)
decoder := json.NewDecoder(r.Body)
decoder.DisallowUnknownFields()
var input Input
if err := decoder.Decode(&input); err != nil { return err }
if strings.TrimSpace(input.Title) == "" { return errors.New("нужен title") }
// Контракт одного документа дополнительно требует второй Decode с io.EOF.
```

#### Разбор примера

Пример относится к вспомогательной функции с error, а не непосредственно к сигнатуре HandlerFunc. Он ограничивает тело и проверяет title, но явно оставляет проверку единственного документа отдельным шагом. Авторизацию `Decode` не выполняет.

#### Типичная ошибка

> Принимать пустую строку как валидный заголовок только потому, что JSON синтаксически корректен.

#### Источник

[Go: json](https://pkg.go.dev/encoding/json)
