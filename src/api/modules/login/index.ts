import request from '@/utils/request';
import { LoginForm, LoginResponseOption, CaptchaOption } from '@/api/interface/login';

/**
 * 登录
 * @param data
 * @returns
 */
export const login = (data: LoginForm) => {
    return request<LoginResponseOption>({
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
