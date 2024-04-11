/**
 * 系统默认类型，后续创建其他store，请重新创建类型文件， 其他模块同理
 */
import { UserInfo } from '@/api/system/user/types';

// 用户store
export type UserState = {
    token: string;
    roles: string[];
    userInfo: UserInfo;
    permissions: string[];
};

export type TabsMenuState = {
    icon: string;
    name: string;
    path: string;
    title: string;
    isFixed?: boolean;
    isCache?: boolean;
};

export type AppState = {
    isCollapse: boolean;
    isMobile: boolean;
    reload: boolean;
    language: string;
};

export type RouteState = {
    allRoutes: SubMenuRouteRecordRaw[];
    addRoutes: SubMenuRouteRecordRaw[];
    currParentRouteName?: string;
};

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
