import echarts, { type ECOption } from '@/config/echarts';
import { useDebounceFn } from '@vueuse/core';
import { useLayoutStore } from '@/store';

export const useEcharts = (el: HTMLDivElement, options: Ref<ECOption>) => {
    let myChart: echarts.ECharts | null = null;
    const layoutStore = useLayoutStore();

    const initCharts = () => {
        const theme = layoutStore.isDark ? 'dark' : 'default';
        myChart = markRaw(echarts.init(el, theme, { renderer: 'canvas' }));
        setOptions(options.value);
    };
};
