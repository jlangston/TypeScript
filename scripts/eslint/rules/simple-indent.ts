// import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/experimental-utils";
import { createRule } from "./utils";
import { TSESTree } from "@typescript-eslint/typescript-estree";

type MessageId = "simpleIndentError";
type Options = any;

export = createRule<Options, MessageId>({
    name: "simple-indent",
    meta: {
        docs: {
            description: "Enforce consistent indentation",
            category: "Stylistic Issues",
            recommended: "error",
        },
        messages: {
            simpleIndentError: "{expected} indentation expected",
        },
        fixable: 'whitespace',
        schema: [],
        type: "layout",
    },
    defaultOptions: [],
    create(context) {
        const sourceCode = context.getSourceCode();

        const checkIndent = (node: TSESTree.Program) => {

            const linebreaks = sourceCode.getText().match(/\r\n|[\r\n\u2028\u2029]/gu);
            const ranges = sourceCode.getLines()
                .reduce((rangesMap, line, lineIndex) => {
                    const linebreakLength = linebreaks && linebreaks[lineIndex] ? linebreaks[lineIndex].length : 1;
                    const lineLength = line.length;

                    const prevLine = rangesMap.get(lineIndex - 1);
                    const start = prevLine ? prevLine.end : 0;
                    const end = start + lineLength + linebreakLength;

                    return rangesMap.set(lineIndex, { start, end, lineLength });
                }, new Map());


            sourceCode.getLines().forEach((line, lineIndex) => {

                const lineLen = line.length;

                if (!lineLen) {
                    return;
                }

                const matches = /\S/.exec(line);
                const indentEnd = matches ? matches.index : 0;
                if (!indentEnd) {
                    return;
                }

                const whitespace = line.slice(0, indentEnd);
                if (!/\t/.test(whitespace)) {
                    return;
                }


                // sourceCode

                const { start } = ranges.get(lineIndex);
                console.log('ddd', sourceCode.getNodeByRangeIndex(start));

                context.report({
                    messageId: 'simpleIndentError',
                    node,
                    loc: { column: indentEnd, line: lineIndex + 1 },
                    // fix(fixer) {
                    //     const size = 4;
                    //     const text = whitespace
                    //         .replace(/\t/g, match => " ".repeat(size).repeat(Math.ceil(match.length / size)));

                    //     return fixer.replaceTextRange([ranges.get(lineIndex).start, ranges.get(lineIndex).start + indentEnd], text);
                    // },
                });
            });
        }

        return {
            Program: checkIndent,
        }
    },
});
