<template>
    <div v-if="tabsHidden" :class="`${tabStyle}-tabs`" class="bg-[var(--el-bg-color)] flex-y-center">
        <el-tabs
            v-model="currTabMenu"
            type="card"
            class="w-[calc(100%-40px)]"
            @tab-click="changeTab"
            @tab-remove="removeTab"
        >
            <el-tab-pane v-for="menu in tabsMenuList" :key="menu.name" :closable="!menu.isFixed" :name="menu.path">
                <template #label>
                    <span
                        class="tab-item flex-center h-full pl-20px"
                        @contextmenu.prevent="handleContextMenu($event as PointerEvent, menu.path, menu.isFixed)"
                    >
                        <Icon v-show="menu.icon && tabsIcon" :name="`el-icon-${menu.icon}`" />
                        <span class="pl-2">{{ $t(`${menu.title}`) }}</span>
                    </span>
                </template>
            </el-tab-pane>
        </el-tabs>
        <!-- 标签工具 -->
        <tab-tools :options="contextMenuOptions" :curr-tab-menu="clickTabMenu" @updateStatus="updateStatus" />
        <!-- tab右键菜单 -->
        <tab-context-menu
            :show-context-menu="showContextMenu"
            :curr-tab-menu="clickTabMenu"
            :options="contextMenuOptions"
            :menu-style="menuStyle"
        />
    </div>
</template>

<script setup lang="ts" name="Tabs">
import TabContextMenu from './components/TabContextMenu.vue';
import TabTools from './components/TabTools.vue';
import { usePermissionStore, useTabsStore, useLayoutStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import { TabPaneName, TabsPaneContext } from 'element-plus';
import { useTabContextMenu } from '@/hooks';
import mittBus from '@/utils/mittBus';
import { TabsMenuState } from '@/store/interface';

const route = useRoute();
const router = useRouter();
const tabsStore = useTabsStore();
const permissionStore = usePermissionStore();
const layoutStore = useLayoutStore();

const { tabsMenuList } = toRefs(tabsStore);
const { flatTabsRoutes } = toRefs(permissionStore);
const { tabsHidden, tabsIcon, layout, tabStyle } = toRefs(layoutStore);
const { contextMenuOptions, showContextMenu, clickTabMenu, menuClientX, menuClientY, menuStyle, filterTabMenu } =
    useTabContextMenu();

let currTabMenu = ref<string>('');

// 初始化tabs展示内容
const initTabs = () => {
    flatTabsRoutes.value.forEach(menu => {
        if (menu.meta?.isFixed && !menu.meta.hidden) {
            const tabParams: TabsMenuState = {
                title: menu.meta.title as string,
                name: menu.name as string,
                path: menu.path,
                icon: menu.meta.icon as string,
                isFixed: menu.meta.isFixed
            };
            tabsStore.addTabs(tabParams);
        }
    });
};
// 添加tabs
const addTabs = () => {
    currTabMenu.value = route.fullPath;
    const tabParams: TabsMenuState = {
        title: route.meta.title as string,
        name: route.name as string,
        path: route.fullPath,
        icon: route.meta.icon as string,
        isFixed: route.meta.isFixed
    };
    tabsStore.addTabs(tabParams);
};

// 点击标签跳转
const changeTab = (pane: TabsPaneContext) => {
    const routePath = pane.paneName as string;
    // 如果是lattice 或 gradient 布局，需要栅格和横向菜单联动
    if (layout.value === 'lattice' || layout.value === 'gradient') {
        const currName = tabsMenuList.value.find(el => el.path === routePath)?.name;
        mittBus.emit('recoverMenuEvent', currName as string);
    }
    router.push(routePath);
};
// 删除标签
const removeTab = (path: TabPaneName) => tabsStore.removeTabs(path as string, path === currTabMenu.value);
const handleContextMenu = (event: PointerEvent, path: string, isFixed?: boolean) => {
    // 阻止默认行为
    event.preventDefault();
    // 过滤tab显示的菜单
    filterTabMenu(path, isFixed);
    // 设置点击的位置
    menuClientX.value = event.clientX;
    menuClientY.value = event.clientY;
    showContextMenu.value = true;
};
// 操作之后刷新状态
const updateStatus = () => {
    filterTabMenu(currTabMenu.value, route.meta.isFixed);
};

onMounted(() => {
    initTabs();
    addTabs();
});

// 监听路由添加到tab中
watch(
    () => route.fullPath,
    () => {
        if (!route.fullPath) return;
        addTabs();
    }
);
</script>

<style scoped lang="scss">
.smooth-tabs {
    .el-tabs--card {
        & > :deep(.el-tabs__header) {
            height: 34px;
            margin: 0;
            margin-top: 10px;
            border: none;
        }
        & > :deep(.el-tabs__header .el-tabs__nav) {
            height: 34px;
            padding: 0 10px;
            border: none;
        }
        & > :deep(.el-tabs__header .el-tabs__item) {
            height: 34px;
            padding: 0;
            padding-right: 20px;
            border-left: none;
            border-radius: 10px 10px 0 0;
        }
        & > :deep(.el-tabs__header .is-active) {
            background: var(--el-color-primary-light-9);
            border: none;
            &::before,
            &::after {
                position: absolute;
                bottom: 0;
                width: 10px;
                height: 10px;
                content: '';
            }
            &::before {
                left: -10px;
                background: radial-gradient(circle at 0 0, transparent 10px, var(--el-color-primary-light-9) 10px);
            }
            &::after {
                right: -10px;
                background: radial-gradient(circle at 10px 0, transparent 10px, var(--el-color-primary-light-9) 10px);
            }
        }
    }
}
.card-tabs {
    .el-tabs--card {
        & > :deep(.el-tabs__header) {
            height: 30px;
            margin: 0;
            margin: 7px 0;
            border: none;
        }
        & > :deep(.el-tabs__header .el-tabs__nav) {
            height: 30px;
            padding: 0 10px;
            border: none;
        }
        & > :deep(.el-tabs__header .el-tabs__item) {
            height: 30px;
            padding: 0;
            padding-right: 20px;
            margin-left: 6px;
            border: 1px solid var(--el-color-info-light-8);
            border-radius: 2px;
            &:hover {
                border: 1px solid var(--el-color-primary);
            }
        }
        & > :deep(.el-tabs__header .is-active) {
            background: var(--el-color-primary-light-9);
            border: 1px solid var(--el-color-primary);
        }
    }
}
.nimble-tabs {
    .el-tabs--card {
        & > :deep(.el-tabs__header) {
            height: 30px;
            margin: 0;
            margin: 7px 0;
            border: none;
        }
        & > :deep(.el-tabs__header .el-tabs__nav) {
            height: 30px;
            padding: 0 10px;
            border: none;
        }
        & > :deep(.el-tabs__header .el-tabs__item) {
            height: 30px;
            padding: 0;
            padding-right: 20px;
            margin-left: 6px;
            border: none;
            border-radius: 2px;
            &::before {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 2px;
                content: '';
                background-color: var(--el-color-primary);
                transition: width 0.3s;
            }
            &:hover {
                background-color: var(--el-color-primary-light-9);
            }
            &:hover::before {
                width: 100%;
            }
        }
        & > :deep(.el-tabs__header .is-active) {
            background: var(--el-color-primary-light-9);
            &::before {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2px;
                content: '';
                background-color: var(--el-color-primary);
            }
        }
    }
}
</style>
