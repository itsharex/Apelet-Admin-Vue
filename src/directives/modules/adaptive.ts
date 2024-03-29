import { DirectiveBinding } from 'vue';
import { DirectiveOptions } from '../interface';
import { debounce } from 'lodash-es';

interface CustomTableElement extends HTMLElement {
    onResize: (...args: any) => void;
}

export const doResize = debounce((el: HTMLElement, binding: DirectiveBinding<{ offsetHeight: number }>) => {
    // 指令作用于DOM距离顶部的距离 https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
    const top = Math.floor(el.getBoundingClientRect().top);
    // DOM距离底部的 自定义距离
    const offsetHeight = (binding.value && binding.value.offsetHeight) || 86;
    const height = window.innerHeight - top - offsetHeight;
    el.style.transition = 'height 0.3s';
    el.style.height = height + 'px';
}, 500);

/**
 * 自定义指令-根据视口高度自适应表格高度
 */
const adaptive: DirectiveOptions<'vAdaptive'> = {
    name: 'adaptive',
    directive: {
        // 初始化时 注册事件
        mounted(el: CustomTableElement, binding: DirectiveBinding<{ offsetHeight: number }>) {
            el.onResize = () => {
                doResize(el, binding);
            };
            window.addEventListener('resize', el.onResize);
        },
        // 如果搜索栏是可以展开收起的，用此方法更新
        updated(el: CustomTableElement, binding: DirectiveBinding<{ offsetHeight: number }>) {
            doResize(el, binding);
        },
        unmounted(el: CustomTableElement) {
            window.removeEventListener('resize', el.onResize);
        }
    }
};

export default adaptive;
