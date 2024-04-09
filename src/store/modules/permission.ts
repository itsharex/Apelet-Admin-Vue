import { defineStore } from 'pinia';
// 未对常量路由做path拼接
import { constantRoutes } from '@/router/modules/constant-router';
// import asyncRoutes from '@/routers.json';
import { piniaPersist } from '@/config/piniaPersist';
// 在 Vue3 中, 以hook函数引入 import { useRouter, useRoute } from 'vue-router'; 没有任何问题。
// 但是在 JavaScript 或者 TypeScript 中，需引入使用我们导出的实例 router
// 由于现在路由时异步的，在useRouter或useRoute一定要放在setup方法内的顶层，否则作用域改变useRouter()执行返回的是undefined。
import { useRouter, useRoute } from 'vue-router';
import { deepClone, flatTreeToArray } from '@/utils/common';
import { useAppStore } from '@/store';
import { getRouters } from '@/api/login';

const modules = import.meta.glob('../../views/**/*.vue');
const Layout = () => import('@/layouts/index.vue');

export const usePermissionStore = defineStore(
    'permission',
    () => {
        const appStore = useAppStore();
        const router = useRouter();
        const route = useRoute();

        // 所有路由
        let allRoutes = ref<SubMenuRouteRecordRaw[]>([]);
        // 侧边栏路由
        let asideBarRoutes = ref<SubMenuRouteRecordRaw[]>([]);
        // 需要扁平化的标签路由
        let flatTabsRoutes = ref<SubMenuRouteRecordRaw[]>([]);
        // 当前选中的最外层父级路由Name
        let currParentRouteName = ref<string>();
        // 备用路由
        let copyMenuRoutes = ref<SubMenuRouteRecordRaw[]>([]);

        // 获取异步路由
        const getAsyncRoutes = () => {
            return new Promise<SubMenuRouteRecordRaw[]>(async resolve => {
                // 后续从服务器获取路由
                const asyncRoutes = (await getRouters()).data;
                let cloneAsyncRoutes = deepClone(asyncRoutes);
                const routes = handleFilterAsyncRoute(cloneAsyncRoutes);
                allRoutes.value = constantRoutes.concat(deepClone(routes));
                asideBarRoutes.value = constantRoutes.concat(deepClone(routes));
                flatTabsRoutes.value = flatTreeToArray(deepClone(asideBarRoutes.value));
                copyMenuRoutes.value = deepClone(allRoutes.value);
                resolve(routes);
            });
        };

        // 处理点击顶部菜单后的一系列操作
        const handleCopyRoutes = () => {
            let currName = currParentRouteName.value;
            const children = allRoutes.value.find(el => el.name === currName)?.children;
            if (children) {
                // 扁平化所有子路由，查找当前路由是否在所有子路由中
                let flatEveryRoutes = flatTreeToArray(children);
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

        // 获取当前路由树第一个父级的最后一级的子路由
        const getCurrRouteLastChild = (currRoute: SubMenuRouteRecordRaw) => {
            if (currRoute.children?.length) {
                return getCurrRouteLastChild(currRoute.children[0]);
            }
            return currRoute.name;
        };

        // 处理异步加载路由
        const handleFilterAsyncRoute = (asyncRoutes: SubMenuRouteRecordRaw[], parentRoute?: SubMenuRouteRecordRaw) => {
            if (!asyncRoutes || asyncRoutes.length === 0) return [];
            asyncRoutes.map(route => {
                if (route.component === 'Layout') {
                    route.component = markRaw(Layout);
                } else {
                    route.component = resolveView(route.component as string);
                }
                // 处理路由path
                route.path = generateRoutePath(parentRoute?.path, route.path);
                if (route.children?.length) {
                    // 处理目录redirect
                    handleRedirectRoutes(route, route.children);
                    route.children = handleFilterAsyncRoute(route.children, route);
                }
            });
            return asyncRoutes;
        };

        // 处理所有目录的redirect
        const handleRedirectRoutes = (route: SubMenuRouteRecordRaw, children?: SubMenuRouteRecordRaw[]) => {
            if (children?.length) {
                children.map((el, index) => {
                    if (index === 0) route.redirect = generateRoutePath(route.path, el.path);
                    if (el.children?.length) handleRedirectRoutes(el, el.children);
                });
            }
        };

        // 处理路由path
        const generateRoutePath = (parentPath: string = '', path: string) => {
            if (parentPath.endsWith('/')) {
                parentPath = parentPath.slice(0, -1);
            }
            if (!path.startsWith('/')) {
                path = '/' + path;
            }
            return parentPath + path;
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
