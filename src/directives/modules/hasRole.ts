import { DirectiveBinding } from 'vue';
import { useUserStore } from '@/store';

/**
 * 自定义指令-操作权限处理
 */
const hasRole: DirectiveOptions<'vHasRole'> = {
    name: 'hasRole',
    directive: {
        mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
            const userStore = useUserStore();
            // 所有权限
            const adminRoleKey = 'admin';
            const { value } = binding;
            const roleKey = userStore.roleKey;
            if (!value) throw new Error(`请设置操作权限值`);
            if (!(adminRoleKey === value || roleKey === value)) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    }
};

export default hasRole;
