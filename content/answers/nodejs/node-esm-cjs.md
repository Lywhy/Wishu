**CommonJS использует require и module.exports, ESM - import и export.** Расширения .cjs и .mjs явно задают формат; для .js также важны ближайший package.json и его type. Взаимодействие форматов имеет правила, зависящие от версии Node.

<!-- wishu:answer-block -->

- В ESM нет общих переменных CommonJS __dirname и __filename в прежнем виде; используют import.meta и URL-механизмы. Нельзя просто заменить ключевые слова, не проверив разрешение путей, расширения и exports зависимостей.
