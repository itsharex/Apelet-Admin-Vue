import { createRouter, createWebHistory, Router } from 'vue-router';

import { constantRoutes, errorRoutes } from './modules/constant-router';

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [...constantRoutes, ...errorRoutes],
    scrollBehavior: () => ({ top: 0, left: 0 })
});
export default router;
