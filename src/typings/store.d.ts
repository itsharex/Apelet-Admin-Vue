/// <reference types="vite/client" />

export {};
declare global {
    interface TabsMenuState {
        icon: string;
        name: string;
        path: string;
        title: string;
        isFixed?: boolean;
        isCache?: boolean;
    }

    interface AppState {
        isCollapse: boolean;
        isMobile: boolean;
        reload: boolean;
        language: string;
    }

    interface UserState {
        token: string;
        roleKey: string;
        userInfo: UserInfo;
        permissions: string[];
    }
}

declare global {
    // 用户信息类型
    type UserInfo = {
        userId: number;
        postId: number;
        postName: string;
        roleId: number;
        roleName: string;
        deptId: number;
        deptName: string;
        username: string;
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
}
