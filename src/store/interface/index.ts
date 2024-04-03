// 用户store
export type UserState = {
    token: string;
    roleKey: string;
    userInfo: UserInfo;
    permissions: string[];
};
// 用户信息类型
export type UserInfo = {
    userId: number;
    postId: number;
    postName: string;
    roleId: number;
    roleName: string;
    deptId: number;
    deptName: string;
    userName: string;
    nickname: string;
    userType: number;
    email: string;
    phoneNumber: string;
    sex: number;
    avatar: string;
    status: number;
    loginIp: string;
    loginDate: string;
    creatorId?: number;
    creatorName?: string;
    createTime?: string;
    updaterId?: number;
    updaterName?: string;
    updateTime?: string;
    remark?: string;
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
