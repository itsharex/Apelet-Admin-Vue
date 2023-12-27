<template>
    <el-container class="h-full bg-gradient-to-b from-sky-500 via-sky-200 to-sky-100" ref="containerRef">
        <AppMask v-show="showAppMask" @click.prevent="closeAppMask" />
        <el-header class="flex justify-between !p-0 !bg-[transparent]">
            <Logo v-show="!appStore.isMobile" :style="{ width: asideMaxWidth }" />
            <CollapseIcon v-show="appStore.isMobile" />
            <HorizontalMenu />
            <ToolRight />
        </el-header>
        <el-container class="relative !h-[calc(100%-60px)]">
            <Aside :class="showPadding && '!m-4 !mr-0'" class="!border-none !b-rounded" />
            <el-container>
                <MainApp class="!bg-[transparent] !shadow-none !b-rounded !py-4" />
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
const showPadding = computed(() => !appStore.isMobile && !appStore.isCollapse);
const closeAppMask = () => appStore.$patch({ isCollapse: true });
const { asideMaxWidth } = settingConfig;

deviceDetection(containerRef);
</script>

<style lang="scss" scoped></style>
