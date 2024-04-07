import router from '@/router';
import i18n from '@/i18n';
import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { start, done } from '@/config/nprogress';
// 单独导入，如果小仓库在大仓库外面，无法获取，需要有大仓库
import { useUserStore, usePermissionStore } from '@/store';
import { settingConfig } from '@/config/settings';

// 白名单
const whiteList = ['/login'];

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // pinia搭配路由使用时，必须放在守卫里才行，不然外面pinia先加载会失效
    const userStore = useUserStore();
    const permissionStore = usePermissionStore();
    const { title } = settingConfig;

    if (to.meta.title) {
        document.title = i18n.global.t(to.meta.title) + '-' + title;
    }
    start();
    if (userStore.token) {
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            if (!permissionStore.asideBarRoutes?.length) {
                await userStore.getUserInfo();
                const rewriteRoutes = await permissionStore.getAsyncRoutes();
                rewriteRoutes.forEach(route => {
                    router.addRoute(route as unknown as RouteRecordRaw);
                });
                next({ path: to.fullPath });
                // 增加 router.isReady() ， 使用下面语句 刷新会导致空白页面
                // next({ ...to, replace: true });
            } else {
                next();
            }
        }
    } else {
        // 没有token
        if (whiteList.includes(to.path)) {
            // 在免登录白名单，直接进入
            next();
        } else {
            next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
        }
    }
});

router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    done();
});
