<template>
    <el-container class="h-full layout-gradient" ref="containerRef">
        <AppMask v-show="showAppMask" @click.prevent="closeAppMask" />
        <el-header class="flex flex-row justify-between !p-0 !bg-[transparent] !h-18">
            <el-container>
                <Logo v-show="!appStore.isMobile" class="!h-18 !w-fit !px-10" />
                <CollapseIcon v-show="appStore.isMobile" />
                <HorizontalMenu />
            </el-container>
            <ToolRight />
        </el-header>
        <el-container class="relative !h-[calc(100%-72px)]">
            <Aside :class="showPadding && '!mb-4 !ml-4'" class="!border-none !b-rounded" />
            <el-container>
                <MainApp class="!bg-[transparent] !shadow-none !b-rounded !pb-4" />
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

const appStore = useAppStore();
const containerRef = ref<HTMLElement | null>(null);
const showAppMask = computed(() => appStore.isMobile && !appStore.isCollapse);
const showPadding = computed(() => !appStore.isMobile && !appStore.isCollapse);
const closeAppMask = () => appStore.$patch({ isCollapse: true });

deviceDetection(containerRef);
</script>

<style lang="scss" scoped></style>
