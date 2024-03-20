import request from '@/utils/request';
import { RequestMenu, ResponseMenu } from './types';

/**
 * 菜单列表
 * @param params
 * @returns
 */
export const getMenuList = (params: RequestMenu) => {
    return request<ResponseMenu[]>({
        url: '/system/menus',
        method: 'get',
        params
    });
};
