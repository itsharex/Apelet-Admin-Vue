/// <reference types="vite/client" />
// 声明菜单的命名空间
declare namespace Menu {
	interface SubMenuOptions {
		path: string;
		component?: string | (() => Promise<unknown>);
		redirect?: string;
		name: string;
		children: SubMenuOptions[];
		meta?: MetaProps;
	}

	interface MetaProps {
		icon: string;
		title: string;
		hidden: boolean;
		activeMenu?: string;
		isLink?: boolean;
		isFixed?: boolean;
		isCache?: boolean;
	}
}
