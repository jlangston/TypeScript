/// <reference path='fourslash.ts' />

// @Filename: f1.ts
////export interface Foo {
////    x: number;
////}
////export function createFoo(fn: (args: Foo) => void) {}

// @Filename: f2.ts
////import { createFoo } from "./f1";
////class A {
////    bar() {
////        createFoo(args => this.foo(args));
////    }
////}

goTo.file("f2.ts");
verify.codeFix({
    description: [ts.Diagnostics.Declare_method_0.message, "foo"],
    index: 0,
    newFileContent:
`import { createFoo, Foo } from "./f1";
class A {
    bar() {
        createFoo(args => this.foo(args));
    }
    foo(args: Foo): void {
        throw new Error("Method not implemented.");
    }
}`
});
