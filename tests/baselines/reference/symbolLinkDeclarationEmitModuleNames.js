//// [tests/cases/compiler/symbolLinkDeclarationEmitModuleNames.ts] ////

//// [application.ts]
import { Constructor } from "@loopback/context";
export type ControllerClass = Constructor<any>;
//// [usage.ts]
import { ControllerClass } from './application';
import { BindingKey } from '@loopback/context';

export const CONTROLLER_CLASS = BindingKey.create<ControllerClass>(null as any); // line in question
//// [value-promise.ts]
export type Constructor<T> = (...args: any[]) => T;
//// [bindingkey.ts]
import { Constructor } from "@loopback/context"
export class BindingKey<T> {
  readonly __type: T;
  static create<T extends Constructor<any>>(ctor: T) {
    return new BindingKey<T>();
  }
}

//// [index.ts]
export * from "./src/value-promise";
export * from "./src/bindingkey";


//// [value-promise.js]
"use strict";
exports.__esModule = true;
//// [bindingkey.js]
"use strict";
exports.__esModule = true;
exports.BindingKey = void 0;
var BindingKey = /** @class */ (function () {
    function BindingKey() {
    }
    BindingKey.create = function (ctor) {
        return new BindingKey();
    };
    return BindingKey;
}());
exports.BindingKey = BindingKey;
//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
exports.__esModule = true;
__exportStar(require("./src/bindingkey"), exports);
//// [application.js]
"use strict";
exports.__esModule = true;
//// [usage.js]
"use strict";
exports.__esModule = true;
exports.CONTROLLER_CLASS = void 0;
var context_1 = require("@loopback/context");
exports.CONTROLLER_CLASS = context_1.BindingKey.create(null); // line in question


//// [value-promise.d.ts]
export declare type Constructor<T> = (...args: any[]) => T;
//// [bindingkey.d.ts]
import { Constructor } from "@loopback/context";
export declare class BindingKey<T> {
    readonly __type: T;
    static create<T extends Constructor<any>>(ctor: T): BindingKey<T>;
}
//// [index.d.ts]
export * from "./src/value-promise";
export * from "./src/bindingkey";
//// [application.d.ts]
import { Constructor } from "@loopback/context";
export declare type ControllerClass = Constructor<any>;
//// [usage.d.ts]
import { BindingKey } from '@loopback/context';
export declare const CONTROLLER_CLASS: BindingKey<import("@loopback/context").Constructor<any>>;
