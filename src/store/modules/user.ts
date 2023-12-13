import { defineStore } from 'pinia';
import { piniaPersist } from '@/config/piniaPersist';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: ''
    }),
    getters: {},
    actions: {},
    persist: piniaPersist({ key: 'user', paths: ['token'] })
});
