import request from '@/utils/request';
import { RequestMenu, ResponseMenu } from './types';
const baseUrl = '/system/menu/';

/**
 * 菜单列表
 * @param params
 * @returns
 */
export const getMenuList = (params: RequestMenu) => {
    return request<ResponseMenu[]>({
        url: baseUrl + 'list',
        method: 'get',
        params
    });
};
