/// <reference path='fourslash.ts' />

// @target: es2015
////async function a(): number {}
////async function b(): string {}
////async function c(): string {}

verify.codeFixAll({
    fixId: "fixReturnTypeInAsyncFunction",
    fixAllDescription: ts.Diagnostics.Fix_all_incorrect_return_type_of_an_async_functions.message,
    newFileContent:
`async function a(): Promise<number> {}
async function b(): Promise<string> {}
async function c(): Promise<string> {}`
});
