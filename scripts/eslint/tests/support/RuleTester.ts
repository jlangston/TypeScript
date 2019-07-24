import * as path from "path";
import { TSESLint } from "@typescript-eslint/experimental-utils";

export const ROOT_DIR = path.join(process.cwd(), "built/eslint/tests/support/");
export const RuleTester = TSESLint.RuleTester;
