<template>
    <div class="flex-center h-14 p-10px cursor-pointer hover:bg-fill" @click="triggerCollapse">
        <svg-icon :name="appStore.isCollapse ? 'align-right' : 'align-left'" width="20" height="20" />
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
const appStore = useAppStore();
const triggerCollapse = () => {
    appStore.$patch({ isCollapse: !appStore.isCollapse });
};
</script>

<style scoped lang="scss"></style>
