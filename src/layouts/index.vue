<template>
	<component :is="layoutComponent[layout]" />
	<!-- 布局设置 -->
	<app-setting />
</template>

<script setup lang="ts" name="Layout">
	import AppSetting from './components/AppSetting/index.vue';
	import LayoutVertical from './LayoutVertical/index.vue';
	import LayoutBasic from './LayoutBasic/index.vue';
	import LayoutHorizontal from './LayoutHorizontal/index.vue';
	import LayoutLattice from './LayoutLattice/index.vue';
	import LayoutGradient from './LayoutGradient/index.vue';
	import { LayoutConfig } from '@/types/config';
	import { useLayoutStore } from '@/store';
	// Record<Keys, Type> 将一种类型的属性映射到另一种类型
	const layoutComponent: Record<LayoutConfig, Component> = {
		vertical: LayoutVertical,
		basic: LayoutBasic,
		horizontal: LayoutHorizontal,
		lattice: LayoutLattice,
		gradient: LayoutGradient,
	};
	const layoutStore = useLayoutStore();
	const layout = computed(() => layoutStore.layout);
</script>

<style scoped lang="scss"></style>
