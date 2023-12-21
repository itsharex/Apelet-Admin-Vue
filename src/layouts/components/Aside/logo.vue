<template>
	<router-link to="/" class="flex-center shrink-0 h-14 w-full nowrap-hidden">
		<Icon v-show="displayIcon" name="local-icon-logo" size="30" color="var(--el-color-primary)" />
		<h3 v-show="!displayTitle" class="ml-2 text-4 text-primary truncate font-bold">Apelet Admin</h3>
	</router-link>
</template>

<script setup lang="ts" name="Logo">
import { useLayoutStore, useAppStore } from '@/store';
const layoutStore = useLayoutStore();
const appStore = useAppStore();

const displayTitle = computed(() => layoutStore.layout === 'vertical' && appStore.isCollapse);
const displayIcon = computed(() => layoutStore.layout !== 'lattice' || appStore.isMobile);
</script>

<style scoped lang="scss"></style>
