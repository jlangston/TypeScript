/// <reference path='fourslash.ts' />

// @target: es2015
////interface Foo<T> {}
////async function foo(): Foo<number> {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "Foo<number>", "Foo<number>"],
    newFileContent:
`interface Foo<T> {}
async function foo(): Promise<Foo<number>> {}`
});
