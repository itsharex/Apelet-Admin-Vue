import request from '@/utils/request';
import {
    LoginForm,
    LoginResponse,
    GraphCaptcha,
    blockAndClickCaptcha,
    RequestBlockAndClickCaptcha,
    RequestCheckBlockAndClickCaptcha,
    CheckBlockAndClickCaptcha
} from './types';

/**
 * 登录
 * @param data
 * @returns
 */
export const login = (data: LoginForm) => {
    return request<LoginResponse>({
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
    return request<GraphCaptcha>({
        url: '/captchaImage',
        method: 'get'
    });
};

//获取滑块或者点击验证图片
export function reqGet(data: RequestBlockAndClickCaptcha) {
    return request<blockAndClickCaptcha>({
        url: '/captcha/get',
        method: 'post',
        data
    });
}

//滑块或者点击校验
export function reqCheck(data: RequestCheckBlockAndClickCaptcha) {
    return request<CheckBlockAndClickCaptcha>({
        url: '/captcha/check',
        method: 'post',
        data
    });
}
