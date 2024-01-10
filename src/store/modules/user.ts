import { defineStore } from 'pinia';
import { piniaPersist } from '@/config/piniaPersist';
import { UserState } from '@/store/interface/index';
import { login } from '@/api/modules/login';
import { LoginForm } from '@/api/interface/login';
import { rsaEncrypt } from '@/utils/encrypt';
import { deepClone } from '@/utils/common';

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
            let cloneForm = deepClone(form);
            cloneForm.password = rsaEncrypt(cloneForm.password);
            const { data } = await login(cloneForm);
            this.token = data?.token;
        },

        async getUserInfo() {}
    },
    persist: piniaPersist({ key: 'user', paths: ['token'] })
});
