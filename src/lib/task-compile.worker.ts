import { taskTypeContracts } from "./task-type-contracts"
import * as ts from "task-typescript"
import es5 from "task-typescript/lib/lib.es5.d.ts?raw"
import decorators from "task-typescript/lib/lib.decorators.d.ts?raw"
import legacyDecorators from "task-typescript/lib/lib.decorators.legacy.d.ts?raw"

self.onmessage = (event: MessageEvent<{ taskId: string; code: string }>) => {
  try {
    const { code, taskId } = event.data
    if (code.length > 50000) throw new Error("Решение слишком большое: максимум 50 000 символов.")
    const guardName = "__wishu_guard_" + crypto.randomUUID().replaceAll("-", "")
    const guard = () =>
      ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(ts.factory.createIdentifier(guardName), undefined, []),
      )
    const instrument: ts.TransformerFactory<ts.SourceFile> = (context) => (source) => {
      const block = (statement: ts.Statement) => ts.factory.createBlock([guard(), statement], true)
      const visit: ts.Visitor = (node) => {
        const next = ts.visitEachChild(node, visit, context)
        if (ts.isBlock(next)) return ts.factory.updateBlock(next, [guard(), ...next.statements])
        if (ts.isWhileStatement(next))
          return ts.factory.updateWhileStatement(next, next.expression, block(next.statement))
        if (ts.isDoStatement(next))
          return ts.factory.updateDoStatement(next, block(next.statement), next.expression)
        if (ts.isForStatement(next))
          return ts.factory.updateForStatement(
            next,
            next.initializer,
            next.condition,
            next.incrementor,
            block(next.statement),
          )
        if (ts.isForOfStatement(next))
          return ts.factory.updateForOfStatement(
            next,
            next.awaitModifier,
            next.initializer,
            next.expression,
            block(next.statement),
          )
        if (ts.isForInStatement(next))
          return ts.factory.updateForInStatement(
            next,
            next.initializer,
            next.expression,
            block(next.statement),
          )
        return next
      }
      return ts.visitNode(source, visit) as ts.SourceFile
    }
    const compiled = ts.transpileModule(code, {
      fileName: taskId.startsWith("react-") ? "solution.tsx" : "solution.ts",
      reportDiagnostics: true,
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.React,
      },
      transformers: { before: [instrument] },
    })
    const errors =
      compiled.diagnostics?.filter((d) => d.category === ts.DiagnosticCategory.Error) ?? []
    if (errors.length) throw new Error(ts.flattenDiagnosticMessageText(errors[0].messageText, "\n"))
    const checks: { name: string; passed: boolean; message?: string }[] = []
    if (taskId === "typed-pick" || taskTypeContracts[taskId]) {
      const contract =
        taskTypeContracts[taskId] ??
        `
const __picked = pick({ name: "Ann", age: 25 }, ["name"]);
const __name: string = __picked.name;
// @ts-expect-error age не выбран
__picked.age;
// @ts-expect-error неверный тип результата
const __wrong: number = __picked.name;
// @ts-expect-error несуществующий ключ
pick({ name: "Ann" }, ["missing"]);
`
      const files: Record<string, string> = {
        "solution.ts": code + contract,
        "lib.es5.d.ts": es5,
        "lib.decorators.d.ts": decorators,
        "lib.decorators.legacy.d.ts": legacyDecorators,
      }
      const options: ts.CompilerOptions = {
        strict: true,
        noEmit: true,
        target: ts.ScriptTarget.ES2020,
        lib: ["lib.es5.d.ts"],
        skipLibCheck: true,
      }
      const read = (name: string) => files[name.replaceAll("\\", "/").split("/").pop() ?? ""]
      const host: ts.CompilerHost = {
        getSourceFile: (name, language) => {
          const text = read(name)
          return text === undefined ? undefined : ts.createSourceFile(name, text, language, true)
        },
        getDefaultLibFileName: () => "lib.es5.d.ts",
        writeFile: () => {},
        getCurrentDirectory: () => "/",
        getDirectories: () => [],
        fileExists: (name) => read(name) !== undefined,
        readFile: read,
        getCanonicalFileName: (name) => name,
        useCaseSensitiveFileNames: () => true,
        getNewLine: () => "\n",
      }
      const program = ts.createProgram(["solution.ts"], options, host)
      const diagnostics = ts
        .getPreEmitDiagnostics(program)
        .filter((d) => d.category === ts.DiagnosticCategory.Error)
      let hasAny = false
      const scan = (node: ts.Node) => {
        if (node.kind === ts.SyntaxKind.AnyKeyword) hasAny = true
        ts.forEachChild(node, scan)
      }
      scan(ts.createSourceFile("source.ts", code, ts.ScriptTarget.ES2020, true))
      checks.push({
        name: "Контракт типов и запрет any",
        passed: !hasAny && diagnostics.length === 0,
        message: hasAny
          ? "Не используйте any."
          : diagnostics[0]
            ? ts.flattenDiagnosticMessageText(diagnostics[0].messageText, "\n")
            : undefined,
      })
    }
    self.postMessage({ compiled: compiled.outputText, guardName, checks })
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : "Не удалось подготовить решение.",
    })
  }
}
