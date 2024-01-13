/**
 * 请求类型
 */
// 登录携带参数类型
export interface LoginForm {
    username: string;
    password: string;
    verifyCode?: string;
    captchaCodeKey?: string;
    captchaType?: string;
}

// 获取滑动验证码
export interface RequestSlideCaptcha {
    captchaType: string;
    clientUid?: string;
}

// 滑动验证码校验请求
export interface RequestCheckSlideCaptcha {
    captchaType: string;
    pointJson: string;
    token: string;
}

/**
 * 响应类型
 */
// 登录响应返回
export interface LoginResponse {
    token: string;
    currentUser: UserInfo;
}

// 用户信息
export interface UserInfo {
    username: string;
    roles: string[];
    permissions: string[];
}

// 图形验证码
export interface GraphCaptcha {
    isCaptchaOn: boolean;
    captchaCodeKey: string;
    captchaCodeImg: string;
}

// 滑动验证码响应
export interface SlideCaptcha {
    originalImageBase64: string;
    point: SlideCaptchaPoint;
    jigsawImageBase64: string;
    token: string;
    result: boolean;
    opAdmin: boolean;
}

// 核验验证码
export interface CheckSlideCaptcha {
    captchaType: string;
    token: string;
    result: boolean;
    opAdmin: boolean;
}

interface SlideCaptchaPoint {
    x: number;
    y: number;
}
