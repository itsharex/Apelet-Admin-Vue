import { debounce } from 'lodash-es';

/**
 * 手动更新元素高度
 */
export const updateTableHeight = debounce((el: HTMLElement, offsetHeight: number = 86) => {
    if (!el) return;
    const top = Math.floor(el.getBoundingClientRect().top);
    const height = window.innerHeight - top - offsetHeight;
    el.style.transition = 'height 0.3s';
    el.style.height = height + 'px';
}, 300);
