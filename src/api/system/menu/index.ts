import request from '@/utils/request';
import { MenuInfo } from './types';
const baseUrl = '/system/menu/';

/**
 * 菜单列表
 * @param params
 * @returns
 */
export const getMenuList = (params: PageRequest) => {
    return request<MenuInfo[]>({
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
    return request<MenuInfo[]>({
        url: baseUrl + 'treeselect',
        method: 'get',
        params
    });
};
