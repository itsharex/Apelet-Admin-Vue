<template>
	<el-config-provider :locale="language">
		<router-view />
	</el-config-provider>
</template>

<script setup lang="ts">
	import { useAppStore } from '@/store';
	import { useTheme } from './hooks';
	import zhCN from 'element-plus/es/locale/lang/zh-cn';
	import en from 'element-plus/es/locale/lang/en';

	const appStore = useAppStore();
	const language = computed(() => (appStore.language === 'zh-CN' ? zhCN : en));

	const { initTheme } = useTheme();
	initTheme();
</script>

<style lang="scss" scoped></style>
