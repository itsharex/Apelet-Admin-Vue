<template>
	<el-container class="h-full" ref="containerRef">
		<AppMask v-show="showAppMask" @click.prevent="closeAppMask" />
		<VerticalMenu />
		<Aside :class="appStore.isCollapse && `!border-0`" />
		<el-container direction="vertical" class="relative">
			<NavBar />
			<Tabs />
			<MainApp />
		</el-container>
	</el-container>
</template>

<script setup lang="ts" name="LayoutLattice">
	import VerticalMenu from '../components/Menu/VerticalMenu.vue';
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
