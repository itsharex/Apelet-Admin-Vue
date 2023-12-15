import { createI18n } from 'vue-i18n';
import messages from './locales';
import { getStorage } from '@/utils/storage';
import request from '@/utils/request';

const i18n = createI18n({
    globalInjection: true, //全局生效$t
    locale: getStorage('language') ?? 'zh-CN', // 获取缓存语言，没有默认zh-CN
    fallbackLocale: 'zh-Ch', // 切换失败回滚语言
    messages, // 自定义语言
    legacy: false // 如果要支持compositionAPI，此项必须设置为false;
});

const asyncI18nFunc = () => {};
export default i18n;
