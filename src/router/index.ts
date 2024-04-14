import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';

import { constantRoutes, errorRoutes } from './modules/constant-router';

const router: Router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [...constantRoutes, ...errorRoutes] as RouteRecordRaw[],
	scrollBehavior: () => ({ top: 0, left: 0 }),
});

export const resetRouter = (): void => {
	const resetWhiteNameList = ['Login'];
	router.getRoutes().forEach((route) => {
		const { name } = route;
		if (name && !resetWhiteNameList.includes(name as string)) {
			router.hasRoute(name) && router.removeRoute(name);
		}
	});
};
export default router;
