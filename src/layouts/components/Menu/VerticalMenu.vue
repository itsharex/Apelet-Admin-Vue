<template>
    <el-aside v-show="!appStore.isMobile" class="aside" :width="asideMinWidth">
        <router-link to="/" class="flex-center shrink-0 h-14 w-full nowrap-hidden">
            <Icon name="local-icon-logo" size="30" color="var(--el-color-primary)" />
        </router-link>
        <el-menu
            class="!border-0 !w-full"
            :collapse="true"
            :default-active="currName"
            :collapse-transition="false"
            popper-effect="dark"
        >
            <template v-for="menu in horizontalMenu" :key="menu.name">
                <el-tooltip :content="$t(`${menu.meta?.title}`)" placement="right" effect="dark">
                    <el-menu-item @click="changeMenu" :index="menu.name">
                        <el-icon v-if="menu.meta?.icon">
                            <component :is="menu.meta?.icon" />
                        </el-icon>
                    </el-menu-item>
                </el-tooltip>
            </template>
        </el-menu>
    </el-aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useMenu } from '@/hooks';
import { MenuItemClicked } from 'element-plus';
import mittBus from '@/utils/mittBus';
import { settingConfig } from '@/config/settings';
import { SettingConfig } from '@/config/interface';
import { useAppStore } from '@/store';

const route = useRoute();
const appStore = useAppStore();
const { horizontalMenu, currName, initRoutes } = useMenu();
const { asideMinWidth } = reactive<SettingConfig>(settingConfig);

const changeMenu = (instance: MenuItemClicked) => {
    let routeName = instance.index;
    if (!routeName || route.name === routeName) return;
    initRoutes(routeName);
};

onMounted(() => {
    // 点击tab标签和面包屑修改路由选中
    mittBus.on('latticeEvent', (value: any) => {
        initRoutes(value as string);
    });
});

onUnmounted(() => {
    mittBus.off('latticeEvent');
});
</script>

<style scoped lang="scss">
.aside {
    @apply py-2 flex-col-stretch bg-background  border-r-1  border-[var(--el-color-info-light-8)] transition-width duration-300;
}
</style>
@/config/modules/settings
