<template>
    <component :is="dynamicTool[dynamic]"></component>
</template>

<script setup lang="ts">
import { ToolItem, ToolGradient } from './index';
import { useLayoutStore } from '@/store';
const layoutStore = useLayoutStore();
const dynamicTool = {
    'tool-gradient': ToolGradient,
    'tool-item': ToolItem
};
const dynamic = computed(() => (layoutStore.layout === 'gradient' ? 'tool-gradient' : 'tool-item'));
</script>

<style scoped lang="scss"></style>
