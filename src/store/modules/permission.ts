import { defineStore } from 'pinia';
// 未对常量路由做path拼接
import { constantRoutes } from '@/router/modules/constant-router';
// import asyncRoutes from '@/routers.json';
import { piniaPersist } from '@/config/piniaPersist';
// 在 Vue3 中, 以hook函数引入 import { useRouter, useRoute } from 'vue-router'; 没有任何问题。
// 但是在 JavaScript 或者 TypeScript 中，需引入使用我们导出的实例 router
// 由于现在路由时异步的，在useRouter或useRoute一定要放在setup方法内的顶层，否则作用域改变useRouter()执行返回的是undefined。
import { useRouter, useRoute } from 'vue-router';
import { flatTreeToArray } from '@/utils/common';
import { useAppStore } from '@/store';
import { getRouters } from '@/api/login';
import { clone } from 'radash';
import { RouteState } from '../interface';

const modules = import.meta.glob('../../views/**/*.vue');
const Layout = () => import('@/layouts/index.vue');

export const usePermissionStore = defineStore('permission', {
    state: (): RouteState => ({
        allRoutes: [],
        addRoutes: [],
        currParentRouteName: ''
    }),
    getters: {
        getRouters(): SubMenuRouteRecordRaw[] {
            return this.allRoutes;
        },
        getAddRouters(): SubMenuRouteRecordRaw[] {
            return clone(this.addRoutes);
        },
        getFlatTabsRoutes(): SubMenuRouteRecordRaw[] {
            return flatTreeToArray(clone(this.allRoutes));
        },
        getCopyMenuRoutes(): SubMenuRouteRecordRaw[] {
            return clone(this.allRoutes);
        }
    },
    actions: {
        setAllRoutes(routes: SubMenuRouteRecordRaw[]) {
            this.allRoutes = clone(constantRoutes).concat(routes);
        },
        setAddRoutes(routes: SubMenuRouteRecordRaw[]) {
            this.addRoutes = routes;
            this.setAllRoutes(routes);
        },
        // 获取异步路由
        getAsyncRoutes() {
            return new Promise<void>(async resolve => {
                // 后续从服务器获取路由
                const { data } = await getRouters();
                const routes = this.handleFilterAsyncRoute(data);
                this.setAddRoutes(routes);
                resolve();
            });
        },

        // 处理点击顶部菜单后的一系列操作
        handleCopyRoutes() {
            const appStore = useAppStore();
            const route = useRoute();
            const router = useRouter();
            let currName = this.currParentRouteName;
            const children = this.allRoutes.find(el => el.name === currName)?.children;
            if (children) {
                // 扁平化所有子路由，查找当前路由是否在所有子路由中
                let flatEveryRoutes = flatTreeToArray(children);
                currName = flatEveryRoutes.find(el => el.name === route.name)?.name;
                // 如果不存在，则默认跳转第一个路由的最后一层的子路由
                if (!currName) currName = this.getCurrRouteLastChild(children[0]);
                // addRoutes
                this.addRoutes = children;
                appStore.$patch({ isCollapse: false });
            } else {
                this.addRoutes = [];
                appStore.$patch({ isCollapse: true });
            }
            router.push({ name: currName });
        },

        // 获取当前路由树第一个父级的最后一级的子路由
        getCurrRouteLastChild(currRoute: SubMenuRouteRecordRaw) {
            if (currRoute.children?.length) {
                return this.getCurrRouteLastChild(currRoute.children[0]);
            }
            return currRoute.name;
        },

        // 处理异步加载路由
        handleFilterAsyncRoute(asyncRoutes: SubMenuRouteRecordRaw[], parentRoute?: SubMenuRouteRecordRaw) {
            if (!asyncRoutes || asyncRoutes.length === 0) return [];
            const resRoutes: SubMenuRouteRecordRaw[] = [];
            for (let route of asyncRoutes) {
                if (route.component === 'Layout') {
                    route.component = markRaw(Layout);
                } else {
                    route.component = this.resolveView(route.component!);
                }
                // 处理路由path
                route.path = this.generateRoutePath(parentRoute?.path, route.path);
                if (route.children?.length) {
                    // 处理redirect
                    route.redirect = this.handleRedirectRoutes(route.path, route.children);
                    route.children = this.handleFilterAsyncRoute(route.children, route);
                }
                resRoutes.push(route);
            }
            return resRoutes;
        },

        // 处理所有目录的redirect
        handleRedirectRoutes(parentPath: string, children?: SubMenuRouteRecordRaw[]) {
            if (!children || children.length === 0) return parentPath;
            const redirectPath = this.generateRoutePath(parentPath, children[0].path);
            if (children[0].children) {
                return this.handleRedirectRoutes(redirectPath, children[0].children);
            } else {
                return redirectPath;
            }
        },

        // 生成路由path
        generateRoutePath(parentPath: string = '', path: string) {
            if (parentPath.endsWith('/')) {
                parentPath = parentPath.slice(0, -1);
            }
            if (!path.startsWith('/')) {
                path = '/' + path;
            }
            return parentPath + path;
        },

        // 解析异步路由
        resolveView(component: string): () => Promise<unknown> {
            let reg = /\..\/..\/views\/|.vue/g;
            const path = Object.keys(modules).find(key => key.replaceAll(reg, '') === component) as string;
            return modules[path];
        }
    },
    persist: piniaPersist({ key: 'permission', paths: ['currParentRouteName'] })
});
