import { RuleTester } from "./support/RuleTester";
import rule = require("../rules/simple-indent");

const ruleTester = new RuleTester({
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
    },
    parser: require.resolve("@typescript-eslint/parser"),
});

ruleTester.run("simple-indent", rule, {
    valid: [
        {
            code: `
/**
 *			Comment
 */
            `
        }
//         {
//             code: `
// module TestModule {
//     var func = () => {
//         console.warn("hi");
//     };
// }
//             `,
//         },
//         {
//             code: `
// class TestClass {
//     private variable;

//     testFunction() {
//         this.variable = 3;
//     }
// }
//             `,
//         },
//         {
//             code: `
// var obj = {
//     a: 1,
//     b: 2,
//     c: 3
// };
//             `,
//         },
//         {
//             code: `
// export enum TestEnum {
//     VALUE1,
//     VALUE2
// }
//             `,
//         },
//         {
//             code: `
// switch (integerValue) {
//     case 1:
//         console.warn("1");
//         break;
//     default:
//         console.warn("default");
//         break;
// }
//             `,
//         },
//         {
//             code: `
// function loops() {
//     for (var i = 0; i < 1; ++i) {
//         console.warn(i);
//     }

//     while (i < 1) {
//         console.warn(i);
//     }

//     do {
//         console.warn(i);
//     } while (i < 1);

//     if (i < 1) {
//         console.warn(i);
//     } else {
//         console.warn(i + 1);
//     }
// }
//             `,
//         },
    ],

    invalid: [
//         {
//             code: `
// module TestModule {
// 	var testVariable = 123;
// }
//             `,
//             errors: [
//                 { messageId: 'simpleIndentError', line: 3, column: 2 },
//             ]
//         },
//         {
//             code: `function a() {
// 		var test = 123;
//         /**
//          * TEST
//          */
// }`,
// //             output: `
// // function a() {
// //         var test = 123;
// // }
// //             `,
//             errors: [
// 				{ messageId: 'simpleIndentError', line: 3, column: 3 },
//             ],
//         }
    ],
});
