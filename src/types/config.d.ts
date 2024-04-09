/// <reference types="vite/client" />

import type { StorageLike, PersistedStateOptions } from 'pinia-plugin-persistedstate';

export type LayoutConfig = 'basic' | 'vertical' | 'lattice' | 'horizontal' | 'gradient';

declare global {
    // 是否开启滚动条加载进度跟随
    interface ProgressConfig {
        el?: HTMLElement;
        isOpenProgress: boolean;
    }
    // 持久化参数类型
    interface PersistConfig extends PersistedStateOptions {
        key?: string;
        paths?: string[];
        storage?: StorageLike;
        secureLs?: boolean;
    }

    // 配置类型
    interface SettingConfig {
        title: string;
        screenSize: number;
        asideMaxWidth: string;
        asideMinWidth: string;
    }

    // 布局模式
    interface LayoutModeConfig {
        label: string;
        value: LayoutConfig;
    }
}
