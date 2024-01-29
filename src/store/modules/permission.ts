import { defineStore } from 'pinia';
import { constantRoutes } from '@/router/modules/constant-router';
// import asyncRoutes from '@/routers.json';
import Layout from '@/layouts/index.vue';
import { piniaPersist } from '@/config/piniaPersist';
// 在 Vue3 中, 以hook函数引入 import { useRouter, useRoute } from 'vue-router'; 没有任何问题。
// 但是在 JavaScript 或者 TypeScript 中，需引入使用我们导出的实例 router
// 由于现在路由时异步的，在useRouter或useRoute一定要放在setup方法内的顶层，否则作用域改变useRouter()执行返回的是undefined。
// import { useRouter, useRoute } from 'vue-router';
import router from '@/router';
import { deepClone } from '@/utils/common';
import { useAppStore } from '@/store';
import { getRouters } from '@/api/login';

const modules = import.meta.glob('../../views/**/*.vue');

type MenuType = Menu.SubMenuOptions;

export const usePermissionStore = defineStore(
    'permission',
    () => {
        const appStore = useAppStore();
        const route = router.currentRoute.value;

        // 所有路由
        let allRoutes = ref<MenuType[]>([]);
        // 侧边栏路由
        let asideBarRoutes = ref<MenuType[]>([]);
        // 需要扁平化的标签路由
        let flatTabsRoutes = ref<MenuType[]>([]);
        // 当前选中的最外层父级路由Name
        let currParentRouteName = ref<string>();
        // 复制一份菜单路由做备用
        let copyMenuRoutes = ref<MenuType[]>([]);

        // 获取异步路由
        const getAsyncRoutes = () => {
            return new Promise(async resolve => {
                // 后续从服务器获取路由
                const asyncRoutes = (await getRouters()).data;
                let cloneAsyncRoutes: MenuType[] = deepClone<MenuType[]>(asyncRoutes);
                let cloneRewriteRoutes: MenuType[] = deepClone<MenuType[]>(asyncRoutes);
                const constantRoutes = handleFilterConstantRoutes();
                const rewriteRoutes = handleFilterAsyncRoute(cloneRewriteRoutes);
                const sideBarRoutes = handleFilterAsyncRoute(cloneAsyncRoutes);
                allRoutes.value = constantRoutes.concat(rewriteRoutes);
                asideBarRoutes.value = constantRoutes.concat(sideBarRoutes);
                flatTabsRoutes.value = handleFlatRoutes(deepClone(asideBarRoutes.value));
                copyMenuRoutes.value = deepClone(allRoutes.value);
                rewriteRoutes.push({
                    path: '/:pathMatch(.*)*',
                    redirect: '/404',
                    meta: { hidden: true }
                });
                resolve(rewriteRoutes);
            });
        };

        // 处理点击顶部菜单后的一系列操作
        const handleCopyRoutes = () => {
            let currName = currParentRouteName.value;
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
                // 为目录
                if (route.children?.length) {
                    // 处理目录的重定向
                    route.redirect = handleRedirectRoutes(route.path, route.children);
                    // 处理子路由
                    route.children = filterChildrenRoutes(route, route.children);
                } else {
                    // 没有子路由
                    const { newParentPath } = generateRoutePath(route.path, '');
                    route.path = newParentPath;
                    delete route['children'];
                }
            });
            return filterRoutes;
        };

        // 过滤子路由，并处理path
        const filterChildrenRoutes = (parentRoutes: MenuType, childrenRoutes: MenuType[]): MenuType[] => {
            let children: MenuType[] = [];
            childrenRoutes.forEach(el => {
                if (el.component && typeof el.component === 'string') {
                    el.component = resolveView(el.component);
                }
                // 处理路由path
                const { newParentPath, newPath } = generateRoutePath(parentRoutes.path, el.path);
                // 更改父级path
                parentRoutes.path = newParentPath;
                // 更改当前path
                el.path = newParentPath + newPath;
                children.push(el);
                if (el.children?.length) {
                    filterChildrenRoutes(el, el.children);
                }
            });
            return children;
        };

        // 处理目录重定向路由
        const handleRedirectRoutes = (parentPath: string, children: MenuType[]) => {
            if (!children || children.length === 0) {
                return parentPath;
            }
            const { newParentPath, newPath } = generateRoutePath(parentPath, children[0].path);
            const path = newParentPath + newPath;
            // 递归子节点
            if (children[0].children) return handleRedirectRoutes(path, children[0].children);
            return path;
        };

        // 处理路由path
        const generateRoutePath = (parentPath: string, path: string) => {
            if (!parentPath.startsWith('/')) {
                parentPath = '/' + parentPath;
            }
            if (parentPath.endsWith('/')) {
                parentPath = parentPath.slice(0, -1);
            }
            if (!path.startsWith('/')) {
                path = '/' + path;
            }
            return {
                newParentPath: parentPath,
                newPath: path
            };
        };

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
            currParentRouteName,
            copyMenuRoutes,
            getAsyncRoutes,
            handleCopyRoutes
        };
    },
    {
        persist: piniaPersist({ key: 'permission', paths: ['currParentRouteName'] })
    }
);
