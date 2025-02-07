import 'vue-router';
import { defineComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
    interface RouteMeta extends Record<string | number | symbol, unknown> {
        // 菜单图标
        icon?: string;
        // 菜单标题
        title?: string;
        // 是否隐藏某个菜单
        hidden?: boolean;
        // 跳转到子级菜单是否选中父级菜单
        activeMenu?: string;
        // 是否外链
        isLink?: boolean;
        // 外链地址
        linkSrc?: string;
        // 是否固定标签页
        isFixed?: boolean;
        // 是否缓存
        isCache?: boolean;
        // 是否内嵌
        isFrame?: boolean;
        // 需要内嵌的iframe链接地址
        iframeSrc?: string;
        // 页面级别权限设置
        roles?: string[];
        // 按钮级别权限设置
        perms?: string[];
        // 页面是否缓存
        keepAlive?: boolean;
    }
}

// 定义组件类型
type Component<T = any> = ReturnType<typeof defineComponent> | (() => Promise<typeof import('*.vue')>) | (() => Promise<T>);

declare global {
    interface SubMenuRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
        path: string;
        component?: Component | string;
        redirect?: string;
        name?: string;
        orderNum?: number;
        children?: SubMenuRouteRecordRaw[];
        meta?: RouteMeta;
    }

    interface ContextMenuOptions {
        icon: string;
        label: string;
        prop: string;
        show: boolean;
        disabled: boolean;
    }

    // 右键菜单参数类型
    interface RightMenuOptions {
        unique?: string | number;
        label: string;
        icon?: string;
        tips?: string;
        hidden?: boolean;
        disabled?: boolean;
        children?: SubMenuRouteRecordRaw[];
    }

    // 菜单国际化
    interface LocalesOptions {
        localsId: number;
        menuId: number;
        localsLabel: string;
        localsZhValue: string;
        localsEnValue: string;
    }
}
