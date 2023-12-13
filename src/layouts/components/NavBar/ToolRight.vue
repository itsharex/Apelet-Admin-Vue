<template>
    <div class="flex-y-center h-full">
        <tool-item />
    </div>
</template>

<script setup lang="ts">
import { ToolItem } from './index';
import { useLayoutStore } from '@/store';
const layoutStore = useLayoutStore();
const { layout } = storeToRefs(layoutStore);
const isGradient = computed(() => layout.value.includes('gradient'));
</script>

<style scoped lang="scss"></style>
