<template>
    <div class="flex-center shrink-0 h-14 w-full nowrap-hidden cursor-pointer" @click="routeBack">
        <Icon v-show="displayIcon" name="local-icon-logo" size="30" :color="logoColor" />
        <h3
            v-show="!displayTitle"
            :class="isGradient && '!text-[var(--al-gradient-text-color)]'"
            class="ml-2 text-4 text-primary truncate font-bold"
        >
            Apelet Admin
        </h3>
    </div>
</template>

<script setup lang="ts" name="Logo">
import { useLayoutStore, useAppStore } from '@/store';
import mittBus from '@/utils/mittBus';
import { useRouter } from 'vue-router';
const layoutStore = useLayoutStore();
const appStore = useAppStore();
const router = useRouter();

const displayTitle = computed(() => layoutStore.layout === 'vertical' && appStore.isCollapse);
const displayIcon = computed(() => layoutStore.layout !== 'lattice' || appStore.isMobile);
const isGradient = computed(() => layoutStore.layout === 'gradient' && !appStore.isMobile);
const logoColor = computed(() => (isGradient.value ? 'var(--al-gradient-text-color)' : 'var(--el-color-primary)'));

const routeBack = () => {
    if (layoutStore.layout === 'lattice' || layoutStore.layout === 'gradient') {
        mittBus.emit('recoverMenuEvent', 'HomePage');
    } else {
        router.push({ name: 'HomePage' });
    }
};
</script>

<style scoped lang="scss"></style>
