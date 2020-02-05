/* @internal */
namespace ts.codefix {
    const fixId = "fixAsyncReturnType";
    const errorCodes = [
        Diagnostics.The_return_type_of_an_async_function_or_method_must_be_the_global_Promise_T_type_Did_you_mean_to_write_Promise_0.code,
    ];

    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { sourceFile, program, span } = context;
            const checker = program.getTypeChecker();
            const info = getInfo(sourceFile, checker, span.start);
            if (!info) {
                return undefined;
            }

            const { returnType, token } = info;
            const changes = textChanges.ChangeTracker.with(context, t => doChange(t, sourceFile, checker, token, returnType));
            return [createCodeFixActionWithoutFixAll(fixId, changes, [Diagnostics.Add_index_signature_for_property_0, returnType])];
        },
        fixIds: [fixId],
    });

    function doChange(changes: textChanges.ChangeTracker, sourceFile: SourceFile, checker: TypeChecker, token: Node, returnType: string): void {
        changes.replaceNodeWithText(sourceFile, token, `Promise<${ returnType }>`);
    }

    function getInfo(sourceFile: SourceFile, checker: TypeChecker, pos: number): { returnType: string, token: Node } | undefined {
        if (isInJSFile(sourceFile)) {
            return undefined;
        }

        const token = getTokenAtPosition(sourceFile, pos);
        const symbol = checker.getSymbolAtLocation(token);
        if (symbol) {
            return { token, returnType: checker.symbolToString(symbol) };
        }
    }
}
