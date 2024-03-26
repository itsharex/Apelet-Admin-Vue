import { App } from 'vue';

// 自定义指令
import directives from '@/directives';
// 全局组件
import components from '@/components/index';
// 粒子动画
import Particles from 'particles.vue3';

export const initInstall = async (app: App) => {
    app.use(directives);
    app.use(components);
    app.use(Particles);
};
