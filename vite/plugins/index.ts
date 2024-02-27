import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import UnoCss from '@unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import viteCompression from 'vite-plugin-compression';
import { PluginOption } from 'vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { visualizer } from 'rollup-plugin-visualizer';

/**
 * Vite注册所需插件
 */
export function createVitePlugins(env: Record<string, string>, command: boolean): PluginOption[] {
    const vitePlugins: PluginOption[] = [
        vue(),
        // 自动导入
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            dts: 'src/auto-import.d.ts',
            resolvers: [
                // 导入 scss
                ElementPlusResolver({
                    importStyle: 'sass'
                })
            ]
        }),
        // 自动导入组件
        Components({
            dts: 'src/auto-components.d.ts',
            resolvers: [
                // 导入 scss
                ElementPlusResolver({
                    importStyle: 'sass'
                })
            ]
        }),
        // UnoCss 原子化
        UnoCss(),
        // 在Vue中支持JSX语法
        vueJsx(),
        // 让setup语法糖支持 name 属性
        VueSetupExtend(),
        // 打包分析插件
        visualizer({
            open: true,
            filename: 'visualizer.html' //分析图生成的文件名
        }),
        // svg 图标
        createSvgIconsPlugin({
            // 指定要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]',
            // svg压缩
            svgoOptions: command
        }),
        viteCompression({
            verbose: true, // 是否在控制台中输出压缩结果
            disable: false,
            threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
            algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
            ext: '.gz',
            deleteOriginFile: true // 源文件压缩后是否删除
        })
    ];
    return vitePlugins;
}
