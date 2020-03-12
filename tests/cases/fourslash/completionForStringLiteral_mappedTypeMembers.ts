/// <reference path='fourslash.ts'/>

////type Foo = {
////   a: string;
////   b: string;
////};
////
////type A = Readonly<Foo>;
////type B = A["/**/"]

verify.completions({ marker: "", exact: ["a", "b"] });