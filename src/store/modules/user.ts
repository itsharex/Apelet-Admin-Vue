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
        roles: [],
        userInfo: {
            admin: false,
            userId: 0,
            nickName: '',
            userName: '',
            userType: '',
            avatar: '',
            roleId: 0,
            phonenumber: '',
            deptId: 0,
            email: '',
            sex: '',
            status: '',
            loginIp: '',
            loginDate: ''
        },
        permissions: []
    }),
    getters: {
        userName(): string {
            return this.userInfo.userName;
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
            this.roles = data.roles;
            this.permissions = data.permissions;
            Object.assign(this.userInfo, data.user);
        },

        async logout() {
            await logout();
            this.token = '';
            this.permissions = [];
            this.roles = [];
        }
    },
    persist: piniaPersist({ key: 'user', paths: ['token'] })
});
