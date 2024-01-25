<template>
    <el-aside :class="['aside', appStore.isMobile && 'fixed top-0 bottom-0 left-0 z-9999']" :width="collapseWidth">
        <Logo v-if="display" />
        <Menu />
    </el-aside>
</template>

<script setup lang="ts" name="Aside">
import Logo from './logo.vue';
import Menu from '../Menu/index.vue';
import { useAppStore, useLayoutStore } from '@/store';
import { settingConfig } from '@/config/settings';
import { SettingConfig } from '@/config/interface';

const appStore = useAppStore();
const layoutStore = useLayoutStore();
const { asideMaxWidth, asideMinWidth } = reactive<SettingConfig>(settingConfig);
const display = computed(() => ['vertical', 'lattice', 'horizontal'].includes(layoutStore.layout) || appStore.isMobile);
const collapseWidth = computed(() => {
    if (appStore.isMobile || ['lattice', 'gradient'].includes(layoutStore.layout)) {
        return appStore.isCollapse ? '0' : asideMaxWidth;
    } else {
        return appStore.isCollapse ? asideMinWidth : asideMaxWidth;
    }
});
</script>

<style scoped lang="scss">
.aside {
    @apply py-2 flex-col-stretch bg-background border-r-1 border-solid border-[var(--el-color-info-light-8)] transition-width duration-300;
}
</style>
