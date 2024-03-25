import { defineStore } from 'pinia';
import { piniaPersist } from '@/config/piniaPersist';
import { getLoginUserInfo, login, logout } from '@/api/login';
import { RequestLoginForm } from '@/api/login/types';
import { rsaEncrypt } from '@/utils/encrypt';
import { deepClone } from '@/utils/common';
import { UserState } from '../interface';

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: '',
        roleKey: '',
        userInfo: {
            userId: 0,
            nickname: '',
            username: '',
            userType: 0,
            avatar: '',
            roleId: 0,
            roleName: '',
            postId: 0,
            postName: '',
            phoneNumber: '',
            deptId: 0,
            deptName: '',
            email: '',
            sex: 0,
            status: 0,
            loginIp: '',
            loginDate: ''
        },
        permissions: []
    }),
    getters: {
        userName(): string {
            return this.userInfo.username;
        }
    },
    actions: {
        async loginAction(form: RequestLoginForm) {
            let cloneForm = deepClone(form);
            cloneForm.password = rsaEncrypt(cloneForm.password);
            const { data } = await login(cloneForm);
            this.token = data.token;
        },

        async getUserInfo() {
            const { data } = await getLoginUserInfo();
            this.roleKey = data.roleKey;
            this.permissions = data.permissions;
            Object.assign(this.userInfo, data.userInfo);
        },

        async logout() {
            await logout();
            this.token = '';
            this.permissions = [];
            this.roleKey = '';
        }
    },
    persist: piniaPersist({ key: 'user', paths: ['token'] })
});
