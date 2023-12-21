let valueType: string[] = ['string', 'number', 'boolean', 'undefined'];

/**
 * 深度克隆
 * @param value 需要深克隆的值
 * @returns
 */
export function deepClone<T>(value: T): T {
    // 判空
    if (!value) return value;
    // 判断是否是基本类型
    if (valueType.includes(typeof value)) return value;
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
