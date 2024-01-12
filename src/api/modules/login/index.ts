import request from '@/utils/request';
import {
    LoginForm,
    LoginResponse,
    GraphCaptcha,
    SlideCaptcha,
    RequestSlideCaptcha,
    RequestCheckSlideCaptcha,
    CheckSlideCaptcha
} from '@/api/interface/login';

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

//获取验证图片
export function reqGet(data: RequestSlideCaptcha) {
    return request<SlideCaptcha>({
        url: '/captcha/get',
        method: 'post',
        data
    });
}

//滑动或者点选验证
export function reqCheck(data: RequestCheckSlideCaptcha) {
    return request<CheckSlideCaptcha>({
        url: '/captcha/check',
        method: 'post',
        data
    });
}
