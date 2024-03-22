// 请求
export interface RequestMenu extends PageRequest {}

// 响应
export interface ResponseMenu {
    id: number;
    parentId: number;
    menuName: string;
    routerName: string;
    path: string;
    rank: number;
    menuType: number;
    menuTypeStr: string;
    isButton: boolean;
    status: number;
    statusStr: string;
    createTime: string;
    icon: string;
}
