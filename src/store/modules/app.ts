import { LocaleKey } from '@/i18n/locales';
import { defineStore } from 'pinia';
import { getStorage, setStorage } from '@/utils/storage';
import { AppState } from '../interface';

export const useAppStore = defineStore('app', {
    state: (): AppState => ({
        // 菜单是否收缩 是: false, 否: true
        isCollapse: false,
        // 移动端适配
        isMobile: false,
        // 刷新
        reload: true,
        // i18n
        language: getStorage<string>('language') ?? 'zh-CN'
    }),
    getters: {},
    actions: {
        setLanguage(language: LocaleKey) {
            this.language = language;
            setStorage('language', language);
        },
        // 刷新页面
        reloadPage() {
            this.reload = false;
            nextTick(() => {
                this.reload = true;
            });
        }
    }
});
