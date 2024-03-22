/**
 * 深度克隆  推荐使用 lodash-es 的 深克隆
 * @param value 需要深克隆的值
 * @returns
 */
export function deepClone<T extends object>(value: T): T {
    // 判空
    if (!value) return value;
    // 这里判断数组不能用typeof，因为typeof Array 返回的是object
    if (Array.isArray(value)) return value.map(item => deepClone(item)) as unknown as T;
    // 判断是否是对象
    if (typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value).map(([k, v]: [string, any]) => {
                return [k, deepClone(v)];
            })
        ) as unknown as T;
    }
    return value;
}

/**
 * 树结构转为数组 (扁平化)
 * @param array 树型
 * @returns
 */
export const flatTreeToArray = <T extends { children?: T[] }>(array: T[]): T[] => {
    return array.reduce((arr: T[], { children, ...item }) => {
        return arr.concat(item as T, children && children.length ? flatTreeToArray(children) : []);
    }, []);
};

/**
 * 类型守卫null和undefined联合检查
 * @param object 任意对象
 * @returns
 */
export function isNullOrUndefined<T>(object: T | undefined | null): object is T {
    return object !== undefined && object !== null;
}
