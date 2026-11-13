**`BeginTx` создаёт транзакцию, а запросы выполняют через полученный Tx. Успех подтверждает `Commit`; при отказе выполняют Rollback.**

<!-- wishu:answer-block -->

#### Как это работает

sql.DB является пулом, а не одной пользовательской транзакцией. Запрос через db вместо tx способен уйти вне атомарной операции. Параметры отделяют данные от SQL-текста; синтаксис placeholders зависит от драйвера. `Context` задаёт срок операции, но не отменяет необходимость проверить ошибку Commit.

#### Пример

```go
tx, err := db.BeginTx(ctx, nil)
if err != nil { return err }
defer tx.Rollback()
_, err = tx.ExecContext(ctx, "UPDATE accounts SET active=$1 WHERE id=$2", true, id)
if err != nil { return err }
return tx.Commit()
// Пример для PostgreSQL-драйвера с placeholders $1/$2.
```

#### Разбор примера

Все действия показанного блока идут через tx. Отложенный `Rollback` страхует неуспешные пути; после успешного `Commit` транзакция уже завершена. Работа выполняется внутри функции, возвращающей error.

#### Типичная ошибка

> Считать транзакцию успешной до проверки `Commit` или смешивать db.Exec и tx.Exec в одной операции.

#### Источник

[Go: execute-transactions](https://go.dev/doc/database/execute-transactions)
