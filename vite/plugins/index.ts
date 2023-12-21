import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import UnoCss from '@unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import { PluginOption } from 'vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

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
		createSvgIconsPlugin({
			// 指定要缓存的图标文件夹
			iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
			// 指定symbolId格式
			symbolId: 'icon-[dir]-[name]',
			// svg压缩
			svgoOptions: command
		})
	];
	return vitePlugins;
}
