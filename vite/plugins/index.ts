import { PluginOption } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import UnoCss from '@unocss/vite';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import createCompression from './compression';
import createVisualizer from './visualizer';
import createSvgIcon from './svg-icon';
import createAutoImport from './auto-import';
import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import';

/**
 * Vite注册所需插件
 */
export function createVitePlugins(env: Record<string, string>, command: boolean): PluginOption[] {
    const vitePlugins: PluginOption[] = [
        vue(),
        // 自动导入
        ...createAutoImport(),
        // UnoCss 原子化
        UnoCss(),
        // 在Vue中支持JSX语法
        vueJsx(),
        // 让setup语法糖支持 name 属性
        VueSetupExtend(),
        // 打包分析插件
        createVisualizer(),
        // svg 图标
        createSvgIcon(command),
        // 文件压缩
        createCompression(env),
        // Vxe-Table 按需引入
        createStyleImportPlugin({
            resolves: [VxeTableResolve()]
        })
    ];
    return vitePlugins;
}
