import { debounce } from 'lodash-es';

interface CustomTableHeight extends HTMLElement {
    resizeLister?: () => void;
}

/**
 * 自适应表格高度
 * @param el 需要动态计算高度的DOM元素
 * @param offsetBottom 元素到视口底部的距离
 * @returns
 */
export const useAdaptive = (el: CustomTableHeight, offsetBottom: number = 86) => {
    const doResize = debounce(async () => {
        const top = el.getBoundingClientRect().top;
        const height = window.innerHeight - top - offsetBottom;
        el.style.transition = 'height 0.3s';
        el.style.height = height + 'px';
    }, 300);

    el.resizeLister = async () => {
        await doResize();
    };
    window.addEventListener('resize', el.resizeLister);

    onUpdated(async () => {
        await doResize();
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', el.resizeLister!);
    });

    return {
        doResize
    };
};
