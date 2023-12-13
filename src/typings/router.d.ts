/// <reference types="vite/client" />
import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        // 菜单图标
        icon?: string;
        // 菜单标题
        title: string;
        // 是否隐藏某个菜单
        hidden: boolean;
        // 跳转到子级菜单是否选中父级菜单
        activeMenu?: string;
        // 是否是外链
        isLink?: boolean;
        // 是否固定标签页
        isFixed?: boolean;
        // 是否缓存
        isCache?: boolean;
    }
}
