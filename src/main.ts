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
// router
import router from '@/router';
// pinia
import pinia from '@/store';

const app = createApp(App);

// 权限认证
import './permission';

install(app);
app.use(pinia);
app.use(router);

router.isReady().then(() => {
    app.mount('#app');
});
