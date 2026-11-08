**Тело `Request`/`Response` является потребляемым потоком; после чтения его нельзя безусловно прочитать заново.**

<!-- wishu:answer-block -->

### Механизм и границы

- Если действительно нужны два потребителя, clone создают до использования тела и учитывают стоимость ветвления.

- Clone не делает большие данные бесплатными: различная скорость потребителей может привести к буферизации.

### Сценарий

Логирование response.text() перед response.json() может израсходовать тело; заранее продумайте один разбор или clone.

```javascript
const response = await fetch("/api/items")
if (!response.ok) throw new Error(`HTTP ${response.status}`)
const copy = response.clone() // до чтения тела
const data = await response.json()
const rawText = await copy.text()
// Для большого ответа учитывайте накопление данных в более медленной ветке.
```

### Типичная ошибка

Считать объект `Response` многократно читаемым контейнером уже готовой строки.

### Для закрепления

- [Как выполнять запросы через fetch с async/await и проверять HTTP-ошибки?](/questions/async-fetch)

### Источники

- [Использование Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
