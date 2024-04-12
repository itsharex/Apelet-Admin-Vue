import { App } from 'vue';
// 自定义指令
import directives from '@/directives';
// 粒子动画
import Particles from 'particles.vue3';
// VxeTable
import { useVxeTable } from './vxe-table';
// 加载所有图标
import loadElementIcon from './element';
// i18n
import i18n from '@/i18n';

export const install = (app: App) => {
    // loadElementIcon(app);
    app.use(i18n);
    app.use(directives);
    app.use(Particles);
    app.use(useVxeTable);
};
