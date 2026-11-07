`module` описывает обработку модульного синтаксиса и участвует в моделировании среды, а `moduleResolution` задаёт правила поиска импортируемого модуля. Настройки нужно выбирать под runtime или сборщик, а не под желание убрать конкретную ошибку.

<!-- wishu:answer-block -->

Для сборщика обычно рассматривают bundler с подходящим module, для Node ESM/CJS - согласованные node16/nodenext или другую поддерживаемую конкретной версией пару. Важны package.json, exports, расширения и формат каждого файла.

`paths` помогает TypeScript находить декларации или исходники, но сам по себе не переписывает пути в emitted JavaScript. Alias должен понимать и сборщик или runtime. Для опубликованной библиотеки учитывайте, сможет ли потребитель разрешить оставшиеся спецификаторы.

<!-- wishu:answer-block -->

Пример для приложения со сборщиком:

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "noEmit": true
  }
}
```

<!-- wishu:answer-block -->

[Документация TypeScript](https://www.typescriptlang.org/docs/handbook/modules/reference.html).
