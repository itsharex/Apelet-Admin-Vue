import { DirectiveOptions } from '../interface/type';
import { DirectiveBinding } from 'vue';
import { useUserStore } from '@/store';

/**
 * 自定义指令-角色权限处理
 */
const hasRoles: DirectiveOptions<'vHasRoles'> = {
    name: 'HasRoles',
    directive: {
        mounted(el: HTMLElement, binding: DirectiveBinding) {
            const userStore = useUserStore();
            // 所有权限
            const allRole = 'admin';
            const { value } = binding;
            const roles = userStore.userInfo.roles;
            if (!value) throw new Error(`请设置角色权限值`);
            if (!(Array.isArray(value) && value.length)) throw new Error(`角色权限值格式有误！格式：[*]`);
            const hasRole = roles.some(role => {
                return allRole === role || value.includes(role);
            });
            if (!hasRole) el.parentNode && el.parentNode.removeChild(el);
        }
    }
};

export default hasRoles;
