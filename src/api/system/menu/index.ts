import request from '@/utils/request';

/**
 * 菜单列表
 * @param params
 * @returns
 */
export const getMenuList = <T>(params: T) => {
    return request({
        url: '/system/menus',
        method: 'get',
        params
    });
};
