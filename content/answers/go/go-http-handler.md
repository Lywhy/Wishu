*_Handler обрабатывает запрос через `ServeHTTP`(`ResponseWriter`, *`Request`). `HandlerFunc` адаптирует обычную функцию к этому интерфейсу.*_

<!-- wishu:answer-block -->

#### Как это работает

`ResponseWriter` управляет ответом, `Request` несёт метод, URL, заголовки, тело и Context. Заголовки и статус выставляют до записи тела: первая запись без `WriteHeader` обычно начинает ответ со статусом 200. После возврата обработчика нельзя продолжать произвольно писать в прежний `ResponseWriter` из фоновой горутины.

#### Пример

```go
func health(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    _, _ = w.Write([]byte(`{"ok":true}`))
}
// mux.HandleFunc("/health", health)
```

#### Разбор примера

Заголовок задаётся до тела, статус указан явно. Ошибка записи здесь сознательно не меняет ответ задним числом: после начала отправки нужен иной способ диагностики. Для http требуется импорт net/http.

#### Типичная ошибка

> Попытаться заменить успешный статус на 500 после того, как тело уже отправлено.

#### Источник

[Go: http](https://pkg.go.dev/net/http)
