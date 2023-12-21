import { createRouter, createWebHistory, Router } from 'vue-router';

import { constantRoutes, errorRoutes } from './modules/constant-router';
import { dynamicRoutes } from './modules/dynamic-touter';

const router: Router = createRouter({
	history: createWebHistory(),
	routes: [...constantRoutes, ...errorRoutes, ...dynamicRoutes],
	scrollBehavior: () => ({ top: 0, left: 0 })
});
export default router;
