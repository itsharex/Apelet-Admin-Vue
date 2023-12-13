import { defineStore } from 'pinia';
import { constantRoutes } from '@/router/modules/constant-router';
import asyncRoutes from '@/routers.json';
import Layout from '@/layouts/index.vue';
import { piniaPersist } from '@/config/piniaPersist';
import { useRouter, useRoute } from 'vue-router';
import { deepClone } from '@/utils/common';
import { useAppStore } from '@/store';

const modules = import.meta.glob('../../views/**/*.vue');

type MenuType = Menu.SubMenuOptions;

export const usePermissionStore = defineStore(
    'permission',
    () => {
        const appStore = useAppStore();
        const router = useRouter();
        const route = useRoute();
        // 所有路由
        let allRoutes = ref<MenuType[]>([]);
        // 侧边栏路由
        let asideBarRoutes = ref<MenuType[]>([]);
        // 需要扁平化的标签路由
        let flatTabsRoutes = ref<MenuType[]>([]);
        // 当前选中路由
        let currRouteName = ref<string>();
        // 复制一份菜单路由做备用
        let copyMenuRoutes = ref<MenuType[]>([]);

        // 获取异步路由
        const getAsyncRoutes = () => {
            return new Promise(resolve => {
                // 后续从服务器获取路由
                let cloneAsyncRoutes: MenuType[] = deepClone<MenuType[]>(asyncRoutes as MenuType[]);
                let cloneRewriteRoutes: MenuType[] = deepClone<MenuType[]>(asyncRoutes as MenuType[]);
                const constantRoutes = handleFilterConstantRoutes();
                const rewriteRoutes = handleFilterAsyncRoute(cloneRewriteRoutes);
                const sideBarRoutes = handleFilterAsyncRoute(cloneAsyncRoutes);
                const tabsRoutes = handleFlatRoutes(constantRoutes.concat(sideBarRoutes));
                allRoutes.value = constantRoutes.concat(rewriteRoutes);
                asideBarRoutes.value = constantRoutes.concat(sideBarRoutes);
                copyMenuRoutes.value = deepClone(asideBarRoutes.value);
                flatTabsRoutes.value = tabsRoutes;
                resolve(rewriteRoutes);
            });
        };

        // 处理点击顶部菜单后的一系列操作
        const handleCopyRoutes = () => {
            let currName = currRouteName.value;
            const children = allRoutes.value.find(el => el.name === currName)?.children;
            if (children) {
                // 扁平化所有子路由，查找当前路由是否在所有子路由中
                let flatEveryRoutes = handleFlatRoutes(children);
                currName = flatEveryRoutes.find(el => el.name === route.name)?.name;
                // 如果不存在，则默认跳转第一个路由的最后一层的子路由
                if (!currName) currName = getCurrRouteLastChild(children[0]);
                // 把子路由复制给asideBarRoutes
                asideBarRoutes.value = children;
                appStore.$patch({ isCollapse: false });
            } else {
                asideBarRoutes.value = [];
                appStore.$patch({ isCollapse: true });
            }
            router.push({ name: currName });
        };

        // 过滤常量路由
        const handleFilterConstantRoutes = (): MenuType[] => {
            return (constantRoutes as MenuType[]).map(route => {
                if (route.children?.length) {
                    route.children = filterChildrenRoutes(route, route.children);
                }
                return route;
            });
        };

        // 获取当前数组第一个的最后一级的子路由
        const getCurrRouteLastChild = (currRoute: MenuType) => {
            if (currRoute.children?.length) {
                return getCurrRouteLastChild(currRoute.children[0]);
            }
            return currRoute.name;
        };

        // 扁平化路由
        const handleFlatRoutes = (asyncRoutes: MenuType[]): MenuType[] => {
            return asyncRoutes.reduce((arr: MenuType[], { children, ...item }) => {
                return arr.concat(item as any, children && children.length ? handleFlatRoutes(children) : []);
            }, []);
        };

        // 对从服务器请求回来的异步路由进行解析
        const handleFilterAsyncRoute = (filterRoutes: MenuType[]): MenuType[] => {
            filterRoutes.map(route => {
                if (route.component === 'Layout') {
                    route.component = markRaw(Layout as any);
                } else {
                    route.component = resolveView(route.component as string);
                }
                if (route.children?.length) {
                    route.children = filterChildrenRoutes(route, route.children);
                }
            });
            return filterRoutes;
        };

        // 过滤子路由，并处理path
        const filterChildrenRoutes = (parentRoutes: MenuType, childrenRoutes: MenuType[]): MenuType[] => {
            let children: MenuType[] = [];
            childrenRoutes.forEach(el => {
                if (typeof el.component === 'string') {
                    el.component = resolveView(el.component);
                }
                if (parentRoutes.path === '/') {
                    el.path = parentRoutes.path + el.path;
                } else {
                    el.path = parentRoutes.path + '/' + el.path;
                }
                children.push(el);
                if (el.children?.length) {
                    filterChildrenRoutes(el, el.children);
                }
            });
            return children;
        };

        // 去除 hidden = true 的路由
        // const filterHiddenRoutes = (routes: MenuType[]): MenuType[] => {
        //     return routes.filter(item => {
        //         if (item.children?.length) {
        //             filterHiddenRoutes(item.children);
        //         }
        //         return !item.meta?.hidden;
        //     });
        // };

        // 解析异步路由
        const resolveView = (component: string): (() => Promise<unknown>) => {
            let reg = /\..\/..\/views\/|.vue/g;
            const path = Object.keys(modules).find(key => key.replaceAll(reg, '') === component) as string;
            return modules[path];
        };

        return {
            allRoutes,
            asideBarRoutes,
            flatTabsRoutes,
            currRouteName,
            copyMenuRoutes,
            getAsyncRoutes,
            handleCopyRoutes
        };
    },
    {
        persist: piniaPersist({ key: 'permission', paths: ['currRouteName'] })
    }
);
