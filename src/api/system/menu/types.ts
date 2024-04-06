import { RouteMeta } from 'vue-router';

// 响应
export interface ResponseMenu {
    createBy: string;
    createTime: string;
    updateBy: string;
    updateTime: string;
    deleted: boolean;
    parentName?: string | null;
    parentId: number;
    children?: ResponseMenu[];
    menuId: number;
    menuName: string;
    menuType: number;
    routerName: string;
    orderNum: number;
    path: string;
    component: string;
    isLink: boolean;
    linkSrc?: string | null;
    isFrame: boolean;
    iframeSrc?: string | null;
    permission: string;
    redirect: string;
    metaInfo: RouteMeta;
    localesKey: string;
    menuSort: number;
    status: number;
    menuIcon?: string;
    remark: string;
}
