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
