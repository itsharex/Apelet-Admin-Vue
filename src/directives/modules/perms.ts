import { DirectiveBinding } from 'vue';
import { useUserStore } from '@/store';

/**
 * 自定义指令-操作权限处理
 */
const hasPerms: DirectiveOptions<'vPerms'> = {
    name: 'perms',
    directive: {
        mounted(el: HTMLElement, binding: DirectiveBinding<string[]>) {
            const userStore = useUserStore();
            // 所有权限
            const allPermission = '*:*:*';
            const { value } = binding;
            const permissions = userStore.permissions;
            if (!value) throw new Error(`请设置操作权限值`);
            if (!(Array.isArray(value) && value.length)) throw new Error(`操作权限值格式有误！格式：[*:*:*]`);
            const hasPermission = permissions.some(perm => {
                return allPermission === perm || value.includes(perm);
            });
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    }
};

export default hasPerms;
