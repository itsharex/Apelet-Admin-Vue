import { defineConfig, ConfigEnv, UserConfig, loadEnv } from 'vite';
import path from 'path';
import { createVitePlugins } from './vite/plugins/index';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
    const root = process.cwd();
    // Vite 默认是不加载 .env 文件的，因为这些文件需要在执行完 Vite 配置后才能确定加载哪一个
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // loadEnv的第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, root);

    return {
        root,
        resolve: {
            alias: {
                '~/': `${path.resolve(__dirname, 'src')}/`,
                '@': path.resolve(__dirname, 'src')
                // 需要把项目嵌入electron中，采用下列别名替换方式，防止windows解析路径错误
                // '@': path.posix.resolve(__dirname, 'src')
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // 配置scss 全局变量 @use "@/assets/styles/variable.scss" as *;
                    // elementPlus 主题配置 @use "@/assets/styles/elementPlus/index.scss" as *;
                    additionalData: `
                        @use "~/assets/styles/element/element-plus.scss" as *;
						@use "@/assets/styles/variable.scss" as *;
                        @use "~/assets/styles/mixins.scss" as *;
                    `
                }
            }
        },
        // command === 'serve' 表示serve独有配置     command === 'build' 表示 build 独有配置
        plugins: createVitePlugins(env, command === 'build'),
        server: {
            port: 80,
            host: '0.0.0.0',
            open: false,
            proxy: {
                '/dev-api': {
                    target: 'http://localhost:8080',
                    changeOrigin: true,
                    rewrite: api => api.replace(/^\/dev-api/, '')
                }
            }
        }
    };
});
