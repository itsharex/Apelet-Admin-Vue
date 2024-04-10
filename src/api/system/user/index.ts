import request from '@/utils/request';
import { ResponseMenu } from './types';
const baseUrl = '/system/user/';

/**
 * 用户列表
 * @param params
 * @returns
 */
export const getUserList = (params: PageRequest) => {
    return request<ResponseMenu[]>({
        url: baseUrl + 'list',
        method: 'get',
        params
    });
};
