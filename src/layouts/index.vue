<template>
	<component :is="layoutComponent[layout]" />
	<!-- 布局设置 -->
	<layout-drawer />
</template>

<script setup lang="ts" name="Layout">
import LayoutDrawer from './components/LayoutDrawer/index.vue';
import LayoutVertical from './LayoutVertical/index.vue';
import LayoutBasic from './LayoutBasic/index.vue';
import LayoutHorizontal from './LayoutHorizontal/index.vue';
import LayoutLattice from './LayoutLattice/index.vue';
import LayoutGradient from './LayoutGradient/index.vue';
import { LayoutType } from '@/config/interface';
import { useLayoutStore } from '@/store';
const layoutComponent: Record<LayoutType, Component> = {
	vertical: LayoutVertical,
	basic: LayoutBasic,
	horizontal: LayoutHorizontal,
	lattice: LayoutLattice,
	gradient: LayoutGradient
};
const layoutStore = useLayoutStore();
const layout = computed(() => layoutStore.layout);
</script>

<style scoped lang="scss"></style>
