import type { Directive } from 'vue';

// 第一个为string，第二个参数为 Directive类型
export interface Directives {
    vHasPerms: Directive;
    vHasRoles: Directive;
}
export type Keys = keyof Directives;

// 指令名类型  若需要指令名小写  V => Lowercase<V>
type LowerDirectiveName<T extends Keys> = T extends `v${infer V}` ? V : never;

// 指令对象类型
export interface DirectiveOptions<T extends Keys> {
    name: LowerDirectiveName<T>;
    directive: Directives[T];
}
