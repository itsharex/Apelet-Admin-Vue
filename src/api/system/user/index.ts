import request from '@/utils/request';
import { UserInfo } from './types';
const baseUrl = '/system/user/';

/**
 * 用户列表
 * @param params
 * @returns
 */
export const getUserList = (params: PageRequest) => {
	return request<UserInfo[]>({
		url: baseUrl + 'list',
		method: 'get',
		params,
	});
};
