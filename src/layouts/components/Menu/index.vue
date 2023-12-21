<template>
    <el-scrollbar>
        <el-menu
            class="!border-0 !w-full"
            :default-active="activeMenu"
            router
            :unique-opened="menuUnique"
            :collapse="isCollapse"
            :collapse-transition="false"
            popper-effect="dark"
        >
            <SubMenu :menu-list="menuList" />
        </el-menu>
    </el-scrollbar>
</template>

<script setup lang="ts" name="Menu">
import SubMenu from './SubMenu.vue';
import { usePermissionStore, useLayoutStore, useAppStore } from '@/store';
import { useRoute } from 'vue-router';

const layoutStore = useLayoutStore();
const permissionStore = usePermissionStore();
const appStore = useAppStore();
const route = useRoute();

const isCollapse = computed(() => {
    return appStore.isCollapse;
});
const menuUnique = computed(() => layoutStore.menuUnique);
//菜单模式
const menuList = computed<Menu.SubMenuOptions[]>(() => permissionStore.asideBarRoutes);

const activeMenu = computed<string>(() => {
    const { path, meta } = route;
    if (meta.activeMenu) return meta.activeMenu;
    return path;
});
</script>

<style scoped lang="scss"></style>
