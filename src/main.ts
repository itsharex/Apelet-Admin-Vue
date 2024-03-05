// unoCss.css
import 'virtual:uno.css';
// import scss
import '~/assets/styles/index.scss';
// element css
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
// svg icons
import 'virtual:svg-icons-register';
// nprogress
import 'nprogress/nprogress.css';
// animate.css  animate版本是4.x，使用时要注意对应的所有类名都以animate__开头，并且还要配合animate__animated一起使用！
import 'animate.css';

import { createApp } from 'vue';

import { install } from './plugins';

import App from './App.vue';
// pinia
import pinia from '@/store';
// i18n
import i18n from '@/i18n';
// router
import router from '@/router';

// 权限认证
import './permission';

const setupApp = async () => {
    const app = createApp(App);
    install(app);

    app.use(i18n);

    app.use(router);

    app.use(pinia);

    await router.isReady();

    app.mount('#app');
};

setupApp();
