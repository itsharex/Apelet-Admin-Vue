/// <reference types="vite/client" />

export {};

declare global {
    // keyof是取得对象的key值组成的联合类型
    // in 一般搭配联合类型进行迭代
    type ObjKeyOfArray<T> = {
        [k in keyof T]: [k, T[k]]; // [k in keyof T] 对应属性   [k, T[K]] 表示数组，类型为 k, T[K] 对应的类型
    }[keyof T]; // [keyof T] 表示取值的类型为 T 的 属性名
}
