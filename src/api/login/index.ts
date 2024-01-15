import request from '@/utils/request';
import {
    LoginForm,
    LoginResponse,
    GraphCaptcha,
    RequestBlockAndClickCaptcha,
    RequestCheckBlockAndClickCaptcha,
    CheckBlockAndClickCaptcha,
    BlockAndClickCaptcha
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

//获取滑块或者点击获取图片
export function reqGet(data: RequestBlockAndClickCaptcha) {
    return request<BlockAndClickCaptcha>({
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
