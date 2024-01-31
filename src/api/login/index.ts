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
 * 获取验证码类别
 * @returns
 */
export const getCaptchaType = () => {
    return request<GraphCaptcha>({
        url: '/reCaptcha/type',
        method: 'get'
    });
};

/**
 * 获取图形验证码
 * @returns
 */
export const getCaptchaImage = () => {
    return request<GraphCaptcha>({
        url: '/captchaImage',
        method: 'get'
    });
};

/**
 * 获取滑块或者点选获取图片
 * @returns
 */
export const reqGet = (data: RequestBlockAndClickCaptcha) => {
    return request<BlockAndClickCaptcha>({
        url: '/reCaptcha/get',
        method: 'post',
        data
    });
};

/**
 * 滑块或者点选校验
 * @param data
 * @returns
 */
export const reqCheck = (data: RequestCheckBlockAndClickCaptcha) => {
    return request<CheckBlockAndClickCaptcha>({
        url: '/reCaptcha/check',
        method: 'post',
        data
    });
};

/**
 * 获取所有路由
 * @returns
 */
export const getRouters = () => {
    return request<SubMenuRouteRecordRaw[]>({
        url: '/getRouters',
        method: 'get'
    });
};
