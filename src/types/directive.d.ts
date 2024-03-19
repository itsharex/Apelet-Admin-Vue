/// <reference types="vite/client" />

import type { Directive } from 'vue';

declare global {
    interface Directives {
        vPerms: Directive<any, string[]>;
        vRole: Directive<any, string>;
    }

    // keys = 'vHasPerms' | 'vHasRoles'
    type Keys = keyof Directives;
    /**
     * 指令名类型  将指令名第一个字母小写  V => Uncapitalize<V>
     * 模板字面类型 Lowercase内在字符串操作类型  https://ts.nodejs.cn/docs/handbook/2/template-literal-types.html#lowercasestringtype
     * 条件类型 https://ts.nodejs.cn/docs/handbook/2/conditional-types.html
     *
     */
    type LowerDirectiveName<T extends Keys> = T extends `v${infer V}` ? Uncapitalize<V> : never;
    // 指令对象类型
    interface DirectiveOptions<T extends Keys> {
        name: LowerDirectiveName<T>;
        directive: Directives[T];
    }
}
