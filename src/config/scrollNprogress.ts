import type { App } from 'vue';
import { ProgressType } from './interface';
import Nprogress from '@/config/nprogress';
export default {
    install(app: App, options: ProgressType) {
        const handleProgress = () => {
            // 获取滚动的高度
            const scrollTop = document.documentElement.scrollTop;
            // 滚动的最大高度 = 元素的内容高度 - 视口高度
            const scrollY = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            // 占比
            let inc = Math.floor((scrollTop / scrollY) * 10000) / 10000;
            if (inc === 0) inc = 0.0001;
            if (inc === 1) inc = 0.9999;
            Nprogress.set(inc);
        };
        options.isOpenProgress
            ? window.addEventListener('scroll', handleProgress)
            : window.removeEventListener('scroll', handleProgress);
    }
};
