import request from '@/utils/request';
import { ResponseMenu } from './types';
const baseUrl = '/system/menu/';

/**
 * 菜单列表
 * @param params
 * @returns
 */
export const getMenuList = (params: PageRequest) => {
    return request<ResponseMenu[]>({
        url: baseUrl + 'list',
        method: 'get',
        params
    });
};

/**
 * 获取菜单下拉树列表
 * @param params
 * @returns
 */
export const menuTreeselect = (params?: PageRequest) => {
    return request<ResponseMenu[]>({
        url: baseUrl + 'treeselect',
        method: 'get',
        params
    });
};
