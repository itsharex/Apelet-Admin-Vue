import { LoginForm } from '@/api/login/types';
import { getCookie, removeCookie, setCookie } from '@/utils/cookie';
import { rsaEncrypt, rsaDecrypt } from '@/utils/encrypt';
import { ElNotification, FormInstance, FormRules } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store';
import { useRouter, useRoute } from 'vue-router';
import { getCaptchaImage } from '@/api/login';

export const useLoginForm = () => {
    const { t } = useI18n();
    const ruleFormRef = ref<FormInstance>();
    const userStore = useUserStore();
    const router = useRouter();
    const route = useRoute();
    const rules = reactive<FormRules<LoginForm>>({
        username: [{ required: true, message: t(`login.usernamePlaceholder`), trigger: 'blur' }],
        password: [{ required: true, message: t(`login.passwordPlaceholder`), trigger: 'blur' }]
        // verifyCode: [{ required: true, message: t(`login.verifyCodePlaceholder`), trigger: 'blur' }]
    });

    const loginForm = reactive<LoginForm>({
        username: 'admin',
        password: '123456'
    });

    // 记住密码
    let rememberPassword = ref(false);
    // 验证码开关
    let captchaEnabled = ref(false);
    // 图片验证码base64图片
    let captchaUrl = ref<string>('');

    const verifyRef = ref();

    const getCode = () => {
        // 开启验证码并且为滑动或点击
        if (captchaEnabled.value) {
            verifyRef.value.show();
        } else {
            submitForm(ruleFormRef.value);
        }
    };

    // 滑动点击验证码校验成功回调函数
    const successVerify = ({ captchaVerification }: { captchaVerification: string }) => {
        if (captchaVerification) {
            submitForm(ruleFormRef.value);
        }
    };

    // 登录提交
    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        await formEl.validate(async valid => {
            if (valid) {
                await userStore.loginAction(loginForm);
                rememberPass();
                router.push((route.query?.redirect || '') as string);
                await userStore.getUserInfo();
                ElNotification({
                    title: '登录成功!',
                    type: 'success',
                    message: `欢迎回来，${userStore.userInfo.username}`
                });
            } else {
                throw new Error('校验失败');
            }
        });
    };

    // 记住密码
    const rememberPass = () => {
        const { username, password } = loginForm;
        if (rememberPassword.value) {
            setCookie('username', rsaEncrypt(username), 30);
            setCookie('password', rsaEncrypt(password), 30);
            setCookie('rememberPassword', rememberPassword.value + '', 30);
        } else {
            removeCookie('username');
            removeCookie('password');
            removeCookie('rememberPassword');
        }
    };

    // 读取账号密码
    const readCookie = () => {
        const username = getCookie('username');
        const password = getCookie('password');
        const remember = getCookie('rememberPassword');
        if (username) loginForm.username = rsaDecrypt(username);
        if (username) loginForm.password = rsaDecrypt(password);
        if (username) rememberPassword.value = !!remember;
    };

    // 获取验证码
    const getCaptchaCode = async () => {
        let res = await getCaptchaImage();
        captchaEnabled.value = res.data.isCaptchaOn;
        if (captchaEnabled.value) {
            captchaUrl.value = 'data:image/gif;base64,' + res.data.captchaCodeImg;
            loginForm.captchaCodeKey = res.data.captchaCodeKey;
        }
    };

    getCaptchaCode();

    onMounted(() => {
        readCookie();
    });

    return {
        ruleFormRef,
        verifyRef,
        rules,
        loginForm,
        rememberPassword,
        captchaEnabled,
        captchaUrl,
        getCode,
        getCaptchaCode,
        successVerify
    };
};
