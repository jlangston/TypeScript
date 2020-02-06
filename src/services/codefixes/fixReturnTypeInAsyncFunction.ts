/* @internal */
namespace ts.codefix {
    const fixId = "fixReturnTypeInAsyncFunction";
    const errorCodes = [
        Diagnostics.The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type_Did_you_mean_to_write_Promise_0.code,
    ];

    registerCodeFix({
        errorCodes,
        fixIds: [fixId],
        getCodeActions(context) {
            const { sourceFile, program, span } = context;
            const checker = program.getTypeChecker();
            const returnType = getReturnType(sourceFile, span.start);
            if (!returnType) {
                return undefined;
            }

            const type = checker.getTypeFromTypeNode(returnType);
            const typeStr = checker.typeToString(type);
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, returnType));
            return [createCodeFixAction(fixId, changes, [Diagnostics.Replace_0_with_Promise_1, typeStr, typeStr], fixId, Diagnostics.Fix_all_incorrect_return_type_of_an_async_functions)];
        },
        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            const returnType = getReturnType(diag.file, diag.start);
            if (returnType) doChange(changes, diag.file, returnType);
        })
    });

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, returnType: TypeNode): void {
        changes.replaceNode(sourceFile, returnType, createTypeReferenceNode("Promise", createNodeArray([returnType])));
    }

    function getReturnType(sourceFile: SourceFile, pos: number): TypeNode | undefined {
        if (isInJSFile(sourceFile)) {
            return undefined;
        }

        const token = getTokenAtPosition(sourceFile, pos);
        const parent = findAncestor(token, isFunctionLikeDeclaration);
        if (parent?.type) {
            return parent.type;
        }
    }
}
