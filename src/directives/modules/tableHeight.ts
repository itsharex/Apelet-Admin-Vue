import { DirectiveBinding } from 'vue';
import { DirectiveOptions, CustomTableHeight } from '../interface';

interface CustomTableElement extends HTMLElement {
    onResize: (...args: any) => void;
}

const doResize = (el: HTMLElement, binding: DirectiveBinding<CustomTableHeight>) => {
    // 指令作用于DOM距离顶部的距离 https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect
    const top = Math.floor(el.getBoundingClientRect().top);
    // DOM距离底部的 自定义距离
    const bottom = (binding.value && binding.value.height) || 86;
    el.style.height = window.innerHeight - top - bottom + 'px';
};

/**
 * 自定义指令-根据视口高度自适应表格高度, 最好使用在包裹el-table 外层的 div上， 因为el-table根据内容调整表格会导致多次触发该指令
 */
const tableHeight: DirectiveOptions<'vTableHeight'> = {
    name: 'tableHeight',
    directive: {
        mounted(el: CustomTableElement, binding: DirectiveBinding<CustomTableHeight>) {
            el.onResize = () => {
                doResize(el, binding);
            };
            window.addEventListener('resize', el.onResize);
        },
        // 如果搜索栏是可以展开收起的，用此方法更新
        updated(el: CustomTableElement, binding: DirectiveBinding<CustomTableHeight>) {
            doResize(el, binding);
        },
        unmounted(el: CustomTableElement) {
            window.removeEventListener('resize', el.onResize);
        }
    }
};

export default tableHeight;
