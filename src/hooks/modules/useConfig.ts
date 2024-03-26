import { useLayoutStore } from '@/store';
import Nprogress from '@/config/nprogress';

export const useConfig = () => {
    const layoutStore = useLayoutStore();

    // 内容区滚动条滚动加载条跟随
    const useProgress = (dom: HTMLElement) => {
        if (!layoutStore.isOpenProgress) return;
        // let dom = el.target as HTMLDivElement;
        // 获取滚动的高度
        const scrollTop = dom.scrollTop;
        // 滚动的最大高度 = 元素的内容高度 - 视口高度
        const scrollY = dom.scrollHeight - dom.clientHeight;
        // 占比
        let inc = Math.floor((scrollTop / scrollY) * 10000) / 10000;
        if (inc === 0) inc = 0.0001;
        if (inc === 1) inc = 0.9999;
        Nprogress.set(inc);
    };
    return {
        useProgress
    };
};
