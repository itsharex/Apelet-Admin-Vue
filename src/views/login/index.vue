<template>
	<div class="login-container">
		<vue-particles
			id="tsparticles"
			:particles-init="particlesInit"
			:particles-loaded="particlesLoaded"
			:options="options"
		/>
		<top-nav />
		<el-card class="w-100 !bg-transparent !rounded-4% !border-none <sm:w-83">
			<h3 class="text-center mt-6 font-500 text-primary text-6">{{ $t(`login.login`) }}</h3>
			<el-form ref="ruleFormRef" :model="loginForm" :rules="rules" class="mt-6">
				<el-form-item prop="username">
					<el-input
						v-model="loginForm.username"
						size="large"
						:placeholder="$t(`login.usernamePlaceholder`)"
						:suffix-icon="User"
					/>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						v-model="loginForm.password"
						show-password
						size="large"
						:placeholder="$t(`login.passwordPlaceholder`)"
						@keyup.enter="getCode()"
					/>
				</el-form-item>
				<el-form-item v-if="captchaEnabled">
					<VerifyCode
						ref="verifyRef"
						:captcha-type="captchaType"
						:img-size="{ width: '400px', height: '200px' }"
						mode="pop"
						@success="successVerify"
					/>
				</el-form-item>
				<el-form-item>
					<div class="w-full flex-between">
						<el-checkbox v-model:model-value="rememberPassword" class="<sm:text-sm">
							{{ $t(`login.remember`) }}
						</el-checkbox>
						<el-text type="primary" class="cursor-pointer <sm:!text-sm">
							{{ $t(`login.forgetPassword`) }}
						</el-text>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="w-full" size="large" @click="getCode">
						{{ $t(`login.login`) }}
					</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="Login">
	import TopNav from './components/TopNav.vue';
	import { VerifyCode } from '@/components/Verifition';
	import { User } from '@element-plus/icons-vue';
	import { particles } from './helpers/particlesConfig';
	import { useParticles } from './hooks/useParticles';
	import { useLoginForm } from './hooks/useLoginForm';

	const { options } = toRefs(particles);
	const { particlesInit, particlesLoaded } = useParticles();

	const {
		ruleFormRef,
		verifyRef,
		rules,
		loginForm,
		rememberPassword,
		captchaEnabled,
		captchaType,
		successVerify,
		getCode,
	} = useLoginForm();
</script>

<style scoped lang="scss">
	.login-container {
		@apply relative flex-center wh-full bg-cover bg-no-repeat bg-center-top;

		background-image: url('@/assets/images/background.svg');
	}
</style>
