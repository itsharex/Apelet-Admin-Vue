import type { Directive } from 'vue';

// 第一个为string，第二个参数为 Directive类型
export interface Directives {
    vHasPerms: Directive;
    vHasRoles: Directive;
}

// keys = 'vHasPerms' | 'vHasRoles'
export type Keys = keyof Directives;

/**
 * 指令名类型  指令名小写  V => Lowercase<V>
 * 模板字面类型 Lowercase内在字符串操作类型  https://ts.nodejs.cn/docs/handbook/2/template-literal-types.html#lowercasestringtype
 * 条件类型 https://ts.nodejs.cn/docs/handbook/2/conditional-types.html
 *
 */
type LowerDirectiveName<T extends Keys> = T extends `v${infer V}` ? Lowercase<V> : never;

// 指令对象类型
export interface DirectiveOptions<T extends Keys> {
    name: LowerDirectiveName<T>;
    directive: Directives[T];
}
