export type LoginForm = {
    username: string;
    password: string;
    verifyCode?: string;
    captchaCodeKey?: string;
};

export type LoginResponseType = {
    token: string;
};

export type UserInfoOption = {
    username: string;
    roles: string[];
    permissions: string[];
};

export interface CaptchaOption {
    isCaptchaOn: boolean;
    captchaCodeKey: string;
    captchaCodeImg: string;
}
