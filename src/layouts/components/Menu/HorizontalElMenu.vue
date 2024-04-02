<template>
    <horizontal-scroll v-show="!appStore.isMobile">
        <el-menu
            class="horizontal-menu !border-0 !w-full !h-full"
            :default-active="activeMenu"
            router
            :ellipsis="false"
            mode="horizontal"
            :unique-opened="menuUnique"
            :collapse-transition="false">
            <SubMenu :menu-list="menuList" />
        </el-menu>
    </horizontal-scroll>
</template>

<script setup lang="ts" name="Menu">
import SubMenu from './SubMenu.vue';
import { usePermissionStore, useLayoutStore, useAppStore } from '@/store';
import { useRoute } from 'vue-router';

const layoutStore = useLayoutStore();
const permissionStore = usePermissionStore();
const appStore = useAppStore();
const route = useRoute();

const menuUnique = computed(() => layoutStore.menuUnique);
//菜单模式
const menuList = computed<SubMenuRouteRecordRaw[]>(() => permissionStore.asideBarRoutes);

const activeMenu = computed<string>(() => {
    const { path, meta } = route;
    if (meta.activeMenu) return meta.activeMenu;
    return path;
});
</script>

<style scoped lang="scss">
:deep(.horizontal-menu) {
    --el-menu-hover-bg-color: transparent;
    --el-menu-bg-color: transparent;
    .el-sub-menu {
        &.is-active > .el-sub-menu__title {
            color: var(--el-color-primary);
        }
        .el-sub-menu__title {
            &:hover::before {
                background: transparent !important;
            }
        }
    }
    .el-menu-item {
        & > * {
            z-index: 1;
        }
        &.is-active > * {
            color: var(--el-color-primary);
        }
        &:hover::before,
        &.is-active::before {
            background: transparent !important;
        }
    }
}
</style>
