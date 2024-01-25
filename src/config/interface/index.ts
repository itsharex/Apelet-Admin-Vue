import type { StorageLike, PersistedStateOptions } from 'pinia-plugin-persistedstate';
export type LayoutConfig = 'basic' | 'vertical' | 'lattice' | 'horizontal' | 'gradient';

// 是否开启滚动条加载进度跟随
export interface ProgressConfig {
    el?: HTMLElement;
    isOpenProgress: boolean;
}
// 持久化参数类型
export interface PersistConfig extends PersistedStateOptions {
    key?: string;
    paths?: string[];
    storage?: StorageLike;
    secureLs?: boolean;
}

// 配置类型
export interface SettingConfig {
    title: string;
    screenSize: number;
    asideMaxWidth: string;
    asideMinWidth: string;
}

// 布局模式
export interface LayoutModeConfig {
    label: string;
    value: LayoutConfig;
}

// 布局类型
export interface GlobalState {
    layout: LayoutConfig;
    menuMode: string;
    isOpenProgress: boolean;
    isDark: boolean;
    themeColor: string;
    isResetGradient: boolean;
    hoverIndex: number;
    gradientTextColor: string;
    tabsHidden: boolean;
    tabStyle: string;
    tabsIcon: boolean;
    tabsCache: boolean;
    breadcrumbs: boolean;
    breadcrumbsIcon: boolean;
    menuUnique: boolean;
    grayMode: boolean;
    weakness: boolean;
    animateMode: string;
}
