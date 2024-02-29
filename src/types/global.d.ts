/// <reference types="vite/client" />

// JavaScript 规范声明任何没有 import 声明、export 或顶层 await 的 JavaScript 文件都应被视为脚本而不是模块。
// 若需要 将其视为模块 添加 export {}; 这会将文件更改为不导出任何内容的模块。无论你的模块目标如何，此语法都有效。
export {};

declare global {
    // keyof是取得对象的key值组成的联合类型
    // in 一般搭配联合类型进行迭代
    type ObjKeyOfArray<T> = {
        [k in keyof T]: [k, T[k]]; // [k in keyof T] 对应属性   [k, T[K]] 表示数组，类型为 k, T[K] 对应的类型
    }[keyof T]; // [keyof T] 表示取值的类型为 T 的 属性名
}
