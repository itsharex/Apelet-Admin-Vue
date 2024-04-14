import { PluginOption } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vue from '@vitejs/plugin-vue';
import UnoCss from '@unocss/vite';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import removeNoMatch from 'vite-plugin-router-warn';
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
		/**
		 * 开发环境下移除非必要的vue-router动态路由警告No match found for location with path
		 * 非必要具体看 https://github.com/vuejs/router/issues/521 和 https://github.com/vuejs/router/issues/359
		 * vite-plugin-router-warn只在开发环境下启用，只处理vue-router文件并且只在服务启动或重启时运行一次，性能消耗可忽略不计
		 */
		removeNoMatch(),
		// Vxe-Table 按需引入
		createStyleImportPlugin({
			resolves: [VxeTableResolve()],
		}),
	];
	return vitePlugins;
}
