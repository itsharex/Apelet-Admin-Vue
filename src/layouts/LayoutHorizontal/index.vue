<template>
    <el-container class="h-full" ref="containerRef">
        <AppMask v-show="showAppMask" @click.prevent="closeAppMask" />
        <Aside v-if="appStore.isMobile" />
        <el-header class="flex justify-between !p-0 border-b-1 border-[var(--el-color-info-light-8)]">
            <Logo v-show="!appStore.isMobile" :style="{ width: asideMaxWidth }" />
            <CollapseIcon v-show="appStore.isMobile" />
            <HorizontalElMenu />
            <ToolRight />
        </el-header>
        <el-container direction="vertical" class="relative !h-[calc(100%-60px)]">
            <Tabs />
            <MainApp />
        </el-container>
    </el-container>
</template>

<script setup lang="ts" name="LayoutHorizontal">
import CollapseIcon from '../components/NavBar/components/CollapseIcon.vue';
import HorizontalElMenu from '../components/Menu/HorizontalElMenu.vue';
import ToolRight from '../components/NavBar/ToolRight.vue';
import { MainApp, Tabs, AppMask, Aside, Logo } from '../components';
import { useAppStore } from '@/store';
import { deviceDetection } from '../helpers/deviceDetection';
import { settingConfig, type SettingConfigType } from '@/config/settings';

const appStore = useAppStore();
const containerRef = ref<HTMLElement>();
const showAppMask = computed(() => appStore.isMobile && !appStore.isCollapse);
const closeAppMask = () => appStore.$patch({ isCollapse: true });
const { asideMaxWidth } = reactive<SettingConfigType>(settingConfig);

deviceDetection(containerRef);
</script>

<style lang="scss" scoped></style>
