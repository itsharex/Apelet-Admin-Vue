<template>
    <template v-for="item in filterOneChildrenRoutes(menuList)" :key="item.name">
        <el-sub-menu v-if="item.children?.length" :index="item.path">
            <template #title>
                <el-icon v-if="item.meta?.icon">
                    <component :is="item.meta?.icon" />
                </el-icon>
                <!-- truncate 多行溢出省略号 -->
                <span class="truncate">{{ $t(`menus.${item.meta?.title}`) }}</span>
            </template>
            <sub-menu :menu-list="item.children" />
        </el-sub-menu>
        <el-menu-item v-else :index="item.path">
            <!-- 只有一个子路由时，需要将icon写在title外面，否则无法显示，具体查看官网 -->
            <el-icon v-if="item.meta?.icon">
                <component :is="item.meta?.icon" />
            </el-icon>
            <template #title>
                <span class="truncate">{{ $t(`menus.${item.meta?.title}`) }}</span>
            </template>
        </el-menu-item>
    </template>
</template>

<script setup lang="ts" name="SubMenu">
defineProps<{ menuList: Menu.SubMenuOptions[] }>();
const filterOneChildrenRoutes = (routes: Menu.SubMenuOptions[]): Menu.SubMenuOptions[] => {
    return routes
        .filter(menu => !menu.meta?.hidden) // 去除需要隐藏的路由
        .map(menu => {
            // 只有一个子路由的时候，切父级路由没有title等信息时，需要使用子路由作为父级路由展示
            if (!menu.meta?.title && menu.children?.length === 1) {
                menu = reactive({ ...menu.children[0] });
            }
            return menu;
        });
};
</script>

<style scoped lang="scss"></style>
