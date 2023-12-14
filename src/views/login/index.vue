<template>
    <div class="login-container">
        <vue-particles
            id="tsparticles"
            :particles-init="particlesInit"
            :particles-loaded="particlesLoaded"
            :options="options"
        />
        <top-nav />
        <el-card class="w-100 flex-center !bg-transparent !rounded-4% !border-none <sm:w-83">
            <h3 class="text-center mt-6 font-500 text-primary text-18px">Apelet Admin</h3>
            <el-form ref="ruleFormRef" :model="loginForm" :rules="rules" class="mt-6">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" show-password />
                </el-form-item>
                <el-form-item>
                    <div class="w-full flex-between">
                        <el-checkbox class="<sm:text-sm"> 记住密码 </el-checkbox>
                        <el-text type="primary" class="cursor-pointer <sm:!text-sm"> 忘记密码？ </el-text>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="w-full" @click="submitForm(ruleFormRef)"> 登录 </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts" name="Login">
import TopNav from './components/TopNav.vue';
// 粒子动画
import { loadSlim } from 'tsparticles-slim';
import { particles } from './helpers/particlesConfig';
import { FormInstance, FormRules } from 'element-plus';

type LoginForm = {
    username: string;
    password: string;
    verfyCode?: string;
};

const { options } = toRefs(particles);
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules<LoginForm>>({
    username: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
    ],
    password: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
    ]
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

const particlesInit = async engine => {
    await loadSlim(engine);
};

const particlesLoaded = async container => {
    console.log('Particles container loaded', container);
};
</script>

<style scoped lang="scss">
.login-container {
    @apply relative flex-center wh-full bg-cover bg-no-repeat bg-center-top;

    background-image: url('@/assets/images/background.svg');
}
</style>
