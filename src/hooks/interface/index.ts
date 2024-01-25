export interface ContextMenuOptins {
    icon: string;
    label: string;
    prop: string;
    show: boolean;
    disabled: boolean;
}

// 右键菜单参数类型
export interface MenuOptions {
    unique?: string | number;
    label: string;
    icon?: string;
    tips?: string;
    hidden?: boolean;
    disabled?: boolean;
    children?: MenuOptions[];
}
