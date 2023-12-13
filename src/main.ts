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

import App from './App.vue';

// pinia
import pinia from '@/store';
// router
import router from '@/router';

// 自定义指令
import directives from '@/directives';
// 全局组件
import components from '@/components/index';

//全局密码加密
import { AES_Encrypt, AES_Decrypt } from '@/utils/crypto';

// i18n
import i18n from '@/i18n';

// 权限认证
import './permission';

const app = createApp(App);

// 注册全局方法
app.config.globalProperties.$Encrypt = AES_Encrypt;
app.config.globalProperties.$Decrypt = AES_Decrypt;

app.use(components).use(directives);
app.use(router).use(pinia).use(i18n);
app.mount('#app');
