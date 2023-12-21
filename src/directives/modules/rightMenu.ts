import { Directives } from '../interface/type';

interface ELType extends HTMLElement {
	contextMenuEvent: (e: MouseEvent) => void;
}
/**
 * 自定义指令-右键菜单
 */
const RightMenu: Directives['vRightMenu'] = {
	mounted(el: ELType) {
		el.contextMenuEvent = (e: MouseEvent) => {
			e.preventDefault();
		};
		el.removeEventListener('contextmenu', el.contextMenuEvent);
		el.addEventListener('contextmenu', el.contextMenuEvent);
	}
};

export default RightMenu;
