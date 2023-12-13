<template>
    <el-container class="h-full" ref="containerRef">
        <AppMask v-show="showAppMask" @click.prevent="closeAppMask" />
        <el-header class="flex justify-between !p-0">
            <Logo v-show="!appStore.isMobile" :style="{ width: asideMaxWidth }" />
            <CollapseIcon v-show="appStore.isMobile" />
            <HorizontalMenu />
            <ToolRight />
        </el-header>
        <el-container class="relative">
            <Aside class="!border-none" />
            <el-container direction="vertical">
                <MainApp class="!bg-[transparent] !shadow-none" />
            </el-container>
        </el-container>
    </el-container>
</template>

<script setup lang="ts" name="LayoutGradient">
import CollapseIcon from '../components/NavBar/components/CollapseIcon.vue';
import HorizontalMenu from '../components/Menu/HorizontalMenu.vue';
import ToolRight from '../components/NavBar/ToolRight.vue';
import { MainApp, AppMask, Aside, Logo } from '../components';
import { useAppStore } from '@/store';
import { deviceDetection } from '../helpers/deviceDetection';
import { settingConfig } from '@/config/settings';

const appStore = useAppStore();
const containerRef = ref<HTMLElement | null>(null);
const showAppMask = computed(() => appStore.isMobile && !appStore.isCollapse);
const closeAppMask = () => appStore.$patch({ isCollapse: true });
const { asideMaxWidth } = settingConfig;

deviceDetection(containerRef);
</script>

<style lang="scss" scoped></style>
