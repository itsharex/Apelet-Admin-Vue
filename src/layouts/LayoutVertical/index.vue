<template>
	<el-container class="h-full" ref="containerRef">
		<AppMask v-show="showAppMask" @click.prevent="closeAppMask" />
		<Aside class="!p-0" />
		<el-container direction="vertical" class="relative">
			<NavBar />
			<Tabs />
			<MainApp />
		</el-container>
	</el-container>
</template>

<script setup lang="ts" name="LayoutVertical">
	import { MainApp, NavBar, Aside, Tabs, AppMask } from '../components';
	import { useAppStore } from '@/store';
	import { deviceDetection } from '../helpers/deviceDetection';
	const appStore = useAppStore();
	const containerRef = ref<HTMLElement>();
	const showAppMask = computed(() => appStore.isMobile && !appStore.isCollapse);
	const closeAppMask = () => appStore.$patch({ isCollapse: true });
	deviceDetection(containerRef);
</script>

<style lang="scss" scoped></style>
