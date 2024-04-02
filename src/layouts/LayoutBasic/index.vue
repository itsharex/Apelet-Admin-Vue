<template>
    <el-container class="h-full" ref="containerRef">
        <AppMask v-show="showAppMask" @click.prevent="closeAppMask" />
        <el-header class="flex justify-between !p-0 border-b-1 border-[var(--el-color-info-light-8)]">
            <Logo v-show="!appStore.isMobile" :style="{ width: asideMaxWidth }" />
            <NavBar
                :style="{ width: !appStore.isMobile ? `calc(100% - ${asideMaxWidth})` : '100%' }"
                class="!h-full !border-none" />
        </el-header>
        <el-container class="relative !h-[calc(100%-60px)]">
            <Aside />
            <el-container direction="vertical">
                <Tabs />
                <MainApp />
            </el-container>
        </el-container>
    </el-container>
</template>

<script setup lang="ts" name="LayoutBasic">
import { MainApp, NavBar, Aside, Tabs, AppMask, Logo } from '../components';
import { useAppStore } from '@/store';
import { deviceDetection } from '../helpers/deviceDetection';
import { settingConfig } from '@/config/settings';

const appStore = useAppStore();
const containerRef = ref<HTMLElement>();
const showAppMask = computed(() => appStore.isMobile && !appStore.isCollapse);
const closeAppMask = () => appStore.$patch({ isCollapse: true });
const { asideMaxWidth } = reactive<SettingConfig>(settingConfig);

deviceDetection(containerRef);
</script>

<style lang="scss" scoped></style>
@/config/modules/settings
