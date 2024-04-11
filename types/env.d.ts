/**
 * 环境变量
 */
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_PORT: number;
    readonly VITE_APP_CONTEXT_PATH: string;
    readonly VITE_APP_BASE_API: string;
    readonly VITE_APP_ENV: string;
    readonly VITE_APP_SETTING: string;
    readonly VITE_BUILD_COMPRESS: string;
    // 更多环境变量...
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
