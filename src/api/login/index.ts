import request from '@/utils/request';
import {
    RequestLoginForm,
    LoginResponse,
    GraphCaptchaResponse,
    RequestBlockAndClickCaptcha,
    RequestCheckBlockAndClickCaptcha,
    CheckBlockAndClickCaptchaResponse,
    BlockAndClickCaptchaResponse,
    UserResponse
} from './types';

/**
 * 登录
 * @param data
 * @returns
 */
export const login = (data: RequestLoginForm) => {
    return request<LoginResponse>({
        url: '/login',
        method: 'POST',
        data
    });
};

/**
 * 退出登录
 * @returns
 */
export const logout = () => {
    return request({
        url: '/logout',
        method: 'POST'
    });
};

/**
 * 获取用户信息
 * @param data
 * @returns
 */
export const getLoginUserInfo = () => {
    return request<UserResponse>({
        url: '/getLoginUserInfo',
        method: 'get'
    });
};

/**
 * 获取验证码类别
 * @returns
 */
export const getCaptchaType = () => {
    return request<GraphCaptchaResponse>({
        url: '/reCaptcha/type',
        method: 'get'
    });
};

/**
 * 获取图形验证码
 * @returns
 */
export const getCaptchaImage = () => {
    return request<GraphCaptchaResponse>({
        url: '/captchaImage',
        method: 'get'
    });
};

/**
 * 获取滑块或者点选获取图片
 * @returns
 */
export const reqGet = (data: RequestBlockAndClickCaptcha) => {
    return request<BlockAndClickCaptchaResponse>({
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
    return request<CheckBlockAndClickCaptchaResponse>({
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

/**
 * 获取所有i18n 信息
 * @returns
 */
export const getInternational = () => {
    return request<LocalesOptions[]>({
        url: '/getInternational',
        method: 'get'
    });
};
