**Тайм-аут клиента ограничивает его исходящую операцию, а `Context` входящего запроса передаёт актуальность работы обработчику и зависимостям.**

<!-- wishu:answer-block -->

#### Как это работает

Для исходящего вызова используют `NewRequestWithContext`, связывая его с входящим r.Context или более коротким deadline. Клиент обычно переиспользуют, а тело ответа закрывают после успешного Do. Отмена должна доходить до реально выполняемой операции; проверка флага после долгого вызова не освобождает ресурс во время ожидания.

#### Пример

```go
ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
defer cancel()
req, err := http.NewRequestWithContext(ctx, http.MethodGet, upstreamURL, nil)
if err != nil { return err }
res, err := client.Do(req)
if err != nil { return err }
defer res.Body.Close()
// Фрагмент функции, возвращающей error; client создан отдельно.
```

#### Разбор примера

Дедлайн ограничивает downstream-вызов, а отмена исходного запроса также распространяется по Context. UpstreamURL задаётся приложением, а не произвольным пользовательским URL без проверки. HTTP-статус res проверяется отдельно.

#### Типичная ошибка

> Создавать запрос с Background вместо r.Context и продолжать ненужную работу после отключения клиента.

#### Источник

[Go: http / NewRequestWithContext](https://pkg.go.dev/net/http#NewRequestWithContext)
