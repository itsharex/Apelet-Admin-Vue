/// <reference types="vite/client" />

// 声明菜单的命名空间
declare namespace Menu {
    interface SubMenuOptions {
        path: string;
        component?: string | (() => Promise<unknown>);
        redirect?: string;
        name?: string;
        children?: SubMenuOptions[];
        meta?: MetaProps;
    }

    interface MetaProps {
        icon?: string;
        title?: string;
        hidden: boolean;
        activeMenu?: string;
        isLink?: boolean;
        isFixed?: boolean;
        isCache?: boolean;
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
        children?: MenuOptions[];
    }
}
