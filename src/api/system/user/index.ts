import request from '@/utils/request';
import { LoginForm, LoginResponseType } from './interface';

/**
 * 登录
 * @param data
 * @returns
 */
export const login = (data: LoginForm) => {
	return request<LoginResponseType>({
		url: '/login',
		method: 'POST',
		data
	});
};
