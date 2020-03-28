/// <reference path='fourslash.ts' />

// @target: es2015
////async function foo(): {} {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "{}", "{}"],
    newFileContent: `async function foo(): Promise<{}> {}`
});
