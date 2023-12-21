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

export type CustomMouseMenuOptions = {
	menuList: MenuOptions[];
	el?: HTMLElement;
};
