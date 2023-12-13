import type { App } from 'vue';
// 加载所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 匹配到的文件默认是懒加载的，通过动态导入实现，并会在构建时分离为独立的 chunk
// 如果你倾向于直接引入所有的模块（例如依赖于这些模块中的副作用首先被应用），你可以传入 { eager: true } 作为第二个参数
// import.meta.glob('./dir/*.js', { eager: true })
const modules = import.meta.glob('./**/*.vue');

export default {
    install(app: App) {
        // 注册全局组件
        Object.keys(modules).forEach((key: string) => {
            let name = key.replaceAll(/\.\/|\/index.vue/g, '');
            app.component(name, modules[key]);
        });
        // 注册element Plus所有图标
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component);
        }
    }
};
