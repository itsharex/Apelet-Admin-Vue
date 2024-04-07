/// <reference types="vite/client" />

declare module 'nprogress';
declare module 'colorthief';
declare module 'particles.vue3';

import { Component } from 'vue';
import { Directives } from '@/directives/interface';
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module 'vue' {
    // 声明自定义指令TS类型，供编辑器识别提示
    interface ComponentCustomProperties extends Component, Directives {}
}

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_PORT: number;
    readonly VITE_APP_CONTEXT_PATH: string;
    readonly VITE_APP_HOST: string;
    readonly VITE_APP_BASE_API: string;
    readonly VITE_APP_ENV: string;
    readonly VITE_APP_SETTING: string;
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
