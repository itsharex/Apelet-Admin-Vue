import { defineStore } from 'pinia';
import { login } from '@/api/system/user';
import { piniaPersist } from '@/config/piniaPersist';
import { LoginForm } from '@/api/system/interface/interface';
import { UserState } from '@/store/interface/index';

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: '',
        userInfo: {
            username: '',
            roles: [],
            permissions: []
        }
    }),
    getters: {},
    actions: {
        async loginAction(form: LoginForm) {
            const { data } = await login(form);
            this.token = data?.token;
        },

        async getUserInfo() {}
    },
    persist: piniaPersist({ key: 'user', paths: ['token'] })
});
