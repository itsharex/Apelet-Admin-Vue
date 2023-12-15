import { FormInstance, FormRules } from 'element-plus';
import { useI18n } from 'vue-i18n';

type LoginForm = {
    username: string;
    password: string;
    verifyCode?: string;
};
export const useLoginForm = () => {
    const { t } = useI18n();
    const ruleFormRef = ref<FormInstance>();
    const rules = reactive<FormRules<LoginForm>>({
        username: [{ required: true, message: t(`login.usernamePlaceholder`), trigger: 'blur' }],
        password: [{ required: true, message: t(`login.passwordPlaceholder`), trigger: 'blur' }]
    });
    const loginForm = reactive<LoginForm>({
        username: 'admin',
        password: '123456'
    });

    const submitForm = async (formEl: FormInstance | undefined) => {
        if (!formEl) return;
        await formEl.validate((valid, fields) => {
            if (valid) {
                console.log('submit!');
            } else {
                console.log('error submit!', fields);
            }
        });
    };
    return {
        ruleFormRef,
        rules,
        loginForm,
        submitForm
    };
};
