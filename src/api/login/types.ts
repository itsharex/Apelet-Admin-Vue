/**
 * 请求类型
 */
// 登录携带参数类型
export interface LoginForm {
    username: string;
    password: string;
    verifyCode?: string;
    captchaCodeKey?: string;
    captchaCategory?: string;
    captchaVerification?: string;
}

// 获取滑块点击验证码
export interface RequestBlockAndClickCaptcha {
    captchaType: string;
    clientUid?: string;
}

// 滑块点击验证码校验请求
export interface RequestCheckBlockAndClickCaptcha {
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
    isGraphical: boolean;
    captchaCategory: string;
    captchaCodeKey: string;
    captchaCodeImg: string;
}

// 滑块点击验证码响应
export interface blockAndClickCaptcha {
    originalImageBase64: string;
    point: blockAndClickCaptchaPoint;
    jigsawImageBase64: string;
    token: string;
    result: boolean;
    opAdmin: boolean;
}

// 核验滑块点击验证码
export interface CheckBlockAndClickCaptcha {
    captchaType: string;
    token: string;
    result: boolean;
    opAdmin: boolean;
}

interface blockAndClickCaptchaPoint {
    x: number;
    y: number;
}
