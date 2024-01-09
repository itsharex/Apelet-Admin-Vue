import request from '@/utils/request';
import { LoginForm, LoginResponseType, CaptchaOption } from '../interface/interface';

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

/**
 * 获取验证码
 * @returns
 */
export const getCaptchaImage = () => {
    return request<CaptchaOption>({
        url: '/captchaImage',
        method: 'get'
    });
};
