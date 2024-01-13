<template>
    <horizontal-scroll v-show="!appStore.isMobile">
        <div class="menu-list" @click="changeMenu">
            <div
                v-for="menu in horizontalMenu"
                :key="menu.name"
                :data-name="menu.name"
                :class="['menu-item', { active: menu.name === currName }]"
            >
                {{ $t(`menus.${menu.meta?.title}`) }}
            </div>
        </div>
    </horizontal-scroll>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAppStore } from '@/store';
import { useMenu } from '@/hooks';

const route = useRoute();
const appStore = useAppStore();
const { horizontalMenu, initRoutes, currName } = useMenu();
// 冒泡获取dataSet, 需要点击对应的DOM元素
const changeMenu = (e: Event) => {
    let routeName = (e.target as HTMLElement).dataset.name as string;
    if (!routeName || route.name === routeName) return;
    initRoutes(routeName);
};
</script>

<style scoped lang="scss">
.menu-list {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
.menu-item {
    position: relative;
    padding: 10px;
    margin: 0 10px;
    font-size: 14px;
    color: var(--al-gradient-text-color);
    white-space: nowrap;
    cursor: pointer;
    &.active {
        position: relative;
    }
    &.active::before {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 2px;
        content: '';
        background-color: var(--al-gradient-text-color);
    }
    &::after {
        position: absolute;
        top: 100%;
        left: 50%;
        width: 0;
        height: 2px;
        content: '';
        background-color: var(--al-gradient-text-color);
        transition: all 0.3s ease;
    }
    &:hover::after {
        left: 0%;
        width: 100%;
    }
}
</style>
