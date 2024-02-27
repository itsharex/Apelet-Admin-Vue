import request from '@/utils/request';

/**
 * 菜单列表
 * @param params
 * @returns
 */
export const getMenuList = <T, V>(params: T) => {
    return request<V>({
        url: '/system/menus',
        method: 'get',
        params
    });
};
