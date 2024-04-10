// 用户信息类型
export type UserInfo = {
    createBy?: string;
    createTime?: string;
    updateBy?: any;
    updateTime?: any;
    deleted?: boolean;
    userId: number;
    deptId: number;
    deptName?: string;
    userName: string;
    nickName: string;
    userType: string;
    email: string;
    phonenumber: string;
    sex: string;
    avatar: string;
    status: string;
    loginIp?: string;
    loginDate?: string;
    remark?: string;
    dept?: DeptInfo;
    roles?: RoleInfo[];
    roleIds?: any;
    postIds?: any;
    roleId?: any;
    admin: boolean;
};

// 部门类型
export type DeptInfo = {
    createBy?: any;
    createTime?: any;
    updateBy?: any;
    updateTime?: any;
    deleted?: any;
    parentName?: any;
    parentId?: number;
    children?: DeptInfo[];
    deptId: number;
    deptName: string;
    orderNum?: number;
    leader?: string;
    phone?: any;
    email?: any;
    status?: string;
    ancestors?: string;
};

// 角色信息
export type RoleInfo = {
    createBy?: any;
    createTime?: any;
    updateBy?: any;
    updateTime?: any;
    deleted?: any;
    roleId: number;
    roleName: string;
    roleKey: string;
    roleSort: number;
    dataScope?: string;
    menuCheckStrictly?: any;
    deptCheckStrictly?: any;
    status?: string;
    remark?: any;
    flag?: boolean;
    menuIds?: any;
    deptIds?: any;
    admin?: boolean;
};
