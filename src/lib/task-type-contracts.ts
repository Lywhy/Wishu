export const taskTypeContracts: Record<string, string> = {
  "typed-get":
    '\nconst __n: number = getProperty({ age: 2 }, "age");\nconst __s: string = getProperty({ name: "Ann" }, "name");\n// @ts-expect-error нет ключа\ngetProperty({ age: 2 }, "missing");\n// @ts-expect-error точный тип поля\nconst __wrong: string = getProperty({ age: 2 }, "age");',
  "typed-first":
    '\nconst __n: number | undefined = first([1, 2]);\nconst __s: string | undefined = first(["a"] as readonly string[]);\n// @ts-expect-error результат может отсутствовать\nconst __wrong: number = first([1]);\n// @ts-expect-error не массив\nfirst(123);',
  "typed-result":
    '\nconst __r = success(42);\nconst __ok: true = __r.ok;\nconst __value: number = __r.value;\n// @ts-expect-error значение не строка\nconst __wrong: string = success(42).value;\n// @ts-expect-error дискриминант не false\nconst __false: false = success("ok").ok;',
  "typed-merge":
    '\nconst __merged = mergeObjects({ id: 1, name: "Ann" }, { id: "new" });\nconst __id: string = __merged.id;\nconst __name: string = __merged.name;\n// @ts-expect-error тип заменён\nconst __wrong: number = __merged.id;\n// @ts-expect-error отсутствующее поле\n__merged.missing;',
  "typed-pluck":
    '\nconst __ids: number[] = pluck([{ id: 1 }], "id");\nconst __names: string[] = pluck([{ name: "Ann" }] as readonly { name: string }[], "name");\n// @ts-expect-error ключ отсутствует\npluck([{ id: 1 }], "name");\n// @ts-expect-error тип элементов не строка\nconst __wrong: string[] = pluck([{ id: 1 }], "id");',
  "typed-map-values":
    '\nconst __mapped = mapValues({ a: 1 }, (value, key) => key + value.toFixed());\nconst __s: string = __mapped.a;\nconst __numbers: Record<string, number> = mapValues({ a: "abc" }, value => value.length);\n// @ts-expect-error неверный тип результата\nconst __wrong: number = __mapped.a;\n// @ts-expect-error параметр callback не строка\nmapValues({ a: 1 }, (value: string) => value.length);',
}
