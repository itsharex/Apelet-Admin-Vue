import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';

import { constantRoutes } from './modules/constant-router';
import { dynamicRoutes } from './modules/dynamic-touter';

const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    strict: true,
    routes: [...constantRoutes, ...dynamicRoutes] as RouteRecordRaw[],
    scrollBehavior: () => ({ top: 0, left: 0 })
});

export const resetRouter = (): void => {
    const resetWhiteNameList = ['Login'];
    router.getRoutes().forEach(route => {
        const { name } = route;
        if (name && !resetWhiteNameList.includes(name as string)) {
            router.hasRoute(name) && router.removeRoute(name);
        }
    });
};
export default router;
