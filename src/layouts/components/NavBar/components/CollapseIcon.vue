<template>
    <div
        :class="['flex-center h-18 p-2.5 cursor-pointer', !isGradient && '!h-14 hover:bg-fill']"
        @click="triggerCollapse"
    >
        <Icon :name="alignArrow" size="20" :color="alignArrowColor" />
    </div>
</template>

<script setup lang="ts">
import { useAppStore, useLayoutStore } from '@/store';
const appStore = useAppStore();
const layoutStore = useLayoutStore();
const isGradient = computed(() => layoutStore.layout === 'gradient');
const alignArrowColor = computed(() => (isGradient.value ? 'var(--al-gradient-text-color)' : ''));
const alignArrow = computed(() => (appStore.isCollapse ? 'local-icon-align-right' : 'local-icon-align-left'));
const triggerCollapse = () => {
    appStore.$patch({ isCollapse: !appStore.isCollapse });
};
</script>

<style scoped lang="scss"></style>
