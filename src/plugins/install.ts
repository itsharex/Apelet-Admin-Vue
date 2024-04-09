import { App } from 'vue';

// 自定义指令
import directives from '@/directives';
// 全局组件 和 加载所有element plus图标
import components from '@/components/index';
// 粒子动画
import Particles from 'particles.vue3';
// vxe-table
import VxeTable from 'vxe-table';

export const initInstall = (app: App) => {
    app.use(directives);
    app.use(components);
    app.use(Particles);
    app.use(VxeTable);
};
