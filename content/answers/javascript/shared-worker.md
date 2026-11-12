**SharedWorker может обслуживать несколько контекстов одного origin при совместимых параметрах и условиях разделения браузером.**

<!-- wishu:answer-block -->

### Как это работает

Страницы общаются с ним через отдельные MessagePort, а внутри Worker новые подключения приходят в событии connect. Это удобно для общей координации вкладок.

Он не получает DOM страниц и не является бессрочным сервером. Нужно учитывать время жизни подключений, закрывать порты и проверять поддержку в целевых браузерах.

В отличие от Dedicated Worker, связь идёт через port; при addEventListener для порта нужно запустить доставку сообщений через start.

### Пример и его разбор

```javascript
function connectShared() {
  const worker = new SharedWorker("/shared-worker.js")
  worker.port.addEventListener("message", (event) => console.log(event.data))
  worker.port.start()
  worker.port.postMessage("hello")
  return () => worker.port.close()
}
```

Каждая вкладка получает свой порт к общему Worker, поэтому listener устанавливается на worker.port, а не прямо на объект Worker. После start начинается доставка сообщений обработчику addEventListener. Закрытие порта завершает участие этой страницы. Общность Worker не означает вечный процесс и зависит от origin, параметров создания и правил разделения среды.

### Источники

[MDN: Guide / Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
