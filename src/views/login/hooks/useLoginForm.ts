import { LoginForm } from '@/api/system/user/interface';
import { getCookie, removeCookie, setCookie } from '@/utils/cookie';
import { rsaEncrypt, rsaDecrypt } from '@/utils/encrypt';
import { FormInstance, FormRules } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store';
import { useRouter, useRoute } from 'vue-router';

export const useLoginForm = () => {
    const { t } = useI18n();
    const ruleFormRef = ref<FormInstance>();
    const userStore = useUserStore();
    const router = useRouter();
    const route = useRoute();
    const rules = reactive<FormRules<LoginForm>>({
        username: [{ required: true, message: t(`login.usernamePlaceholder`), trigger: 'blur' }],
        password: [{ required: true, message: t(`login.passwordPlaceholder`), trigger: 'blur' }]
    });
    const loginForm = reactive<LoginForm>({
        username: 'admin',
        password: '123456'
    });

    let rememberPassword = ref(false);

    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        await formEl.validate(async (valid, fields) => {
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
                console.log('error submit!');
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

    onMounted(() => {
        readCookie();
    });

    return {
        ruleFormRef,
        rules,
        loginForm,
        rememberPassword,
        submitForm
    };
};
