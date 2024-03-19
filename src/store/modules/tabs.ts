import { defineStore } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { useLayoutStore } from '@/store';
import { setStorage, getStorage, removeStorage } from '@/utils/storage';

// 标签栏持久化key
const persistKey = 'tabs';

export const useTabsStore = defineStore('tabs', () => {
    // tab菜单列表
    let tabsMenuList = ref<TabsMenuState[]>(getStorage<TabsMenuState[]>(persistKey) || []);

    const layoutStore = useLayoutStore();
    const { tabsCache } = toRefs(layoutStore);
    const router = useRouter();
    const route = useRoute();

    // 添加tabs
    const addTabs = (tabsMenu: TabsMenuState) => {
        // 判断路由是否存在list中、不存在、则push， every() 对空数组 始终返回true
        const isExist = tabsMenuList.value.every(item => item.name !== tabsMenu.name);
        if (isExist) {
            tabsMenuList.value.push(tabsMenu);
        }
        handlePersistTabs();
    };

    // 移除tabs
    const removeTabs = (path: string, isCurrRoute: boolean) => {
        const newTabsList = tabsMenuList.value;
        if (isCurrRoute) {
            newTabsList.forEach((newPath, index) => {
                // 不满足条件跳出本次循环
                if (newPath.path !== path) return;
                const nextTab = newTabsList[index + 1] || newTabsList[index - 1];
                router.push((nextTab && nextTab.path) || '/index');
            });
        }
        tabsMenuList.value = newTabsList.filter(item => item.path !== path);
        handlePersistTabs();
    };

    // 关闭当前
    const closeCurrent = (currPath: string) => {
        removeTabs(currPath, currPath === route.fullPath);
    };
    // 关闭左侧
    const closeLeft = (currPath: string) => {
        const index = tabsMenuList.value.findIndex(item => item.path === currPath);
        // 过滤出固定标签
        const filterTabs = tabsMenuList.value.splice(0, index).filter(el => el.isFixed);
        tabsMenuList.value = [...filterTabs, ...tabsMenuList.value];
        // 查询当前路由是否存在，不存在则跳转到第一个
        const currRoute = tabsMenuList.value.find(item => item.path === route.fullPath)?.path;
        if (!currRoute) {
            router.push(tabsMenuList.value[1]?.path || '/index');
        }
    };
    // 关闭右侧
    const closeRight = (currPath: string) => {
        const index = tabsMenuList.value.findIndex(item => item.path === currPath);
        // 过滤出固定标签
        const filterTabs = tabsMenuList.value.splice(index + 1).filter(el => el.isFixed);
        tabsMenuList.value = [...filterTabs, ...tabsMenuList.value];
        // 查询当前路由是否存在，不存在则跳转到第一个
        const currRoute = tabsMenuList.value.find(item => item.path === route.fullPath)?.path;
        if (!currRoute) {
            router.push(tabsMenuList.value.at(-1)?.path || '/index');
        }
    };
    // 关闭其他
    const closeOther = (currPath: string) => {
        tabsMenuList.value = tabsMenuList.value.filter(item => item.path === currPath || item.isFixed);
        router.push(currPath || '/index');
    };
    // 关闭所有
    const closeAll = () => {
        tabsMenuList.value = tabsMenuList.value.filter(item => item.isFixed);
        router.push(tabsMenuList.value.at(-1)?.path || '/index');
    };

    // 标签栏持久化开启/关闭操作
    const handlePersistTabs = () => {
        if (tabsCache.value) setStorage(persistKey, tabsMenuList.value);
        else removeStorage(persistKey);
    };
    return {
        tabsMenuList,
        addTabs,
        removeTabs,
        closeCurrent,
        closeLeft,
        closeOther,
        closeRight,
        closeAll,
        handlePersistTabs
    };
});
