import { useRoute } from 'vue-router';
import { usePermissionStore, useAppStore } from '@/store';
import { debounce } from 'xe-utils';

// 垂直、横向菜单hooks
export const useMenu = () => {
    const permissionStore = usePermissionStore();
    const appStore = useAppStore();
    const route = useRoute();
    const { allRoutes, currParentRouteName } = storeToRefs(permissionStore);
    const horizontalMenu = computed(() => {
        return allRoutes.value
            .filter(menu => !menu.meta?.hidden) // 去除需要隐藏的路由
            .map(menu => {
                // 只有一个子路由的时候，切父级路由没有title等信息时，需要使用子路由作为父级路由展示
                if (!menu.meta?.title && menu.children?.length === 1) {
                    menu = reactive({ ...menu.children[0] });
                }
                return menu;
            });
    });

    let currName = ref<string | undefined>(currParentRouteName!.value);
    // 根据子级查询对应所有父级
    const findFatherByChild = (data: SubMenuRouteRecordRaw[], target: string): SubMenuRouteRecordRaw[] | undefined => {
        for (let i in data) {
            if (data[i].name === target) {
                return [data[i]];
            }
            if (data[i].children?.length) {
                let node = findFatherByChild(data[i].children as SubMenuRouteRecordRaw[], target);
                if (node !== undefined) {
                    return node.concat(data[i]);
                }
            }
        }
    };

    const initRoutes = (routeName?: string) => {
        if (!routeName) {
            routeName = route.name as string;
        }
        let allParentRoute = findFatherByChild(allRoutes.value, routeName);
        // 取出最外层父级
        let firstParentRouteName = allParentRoute?.filter(item => item.meta?.title).at(-1);
        currName.value = firstParentRouteName?.name;
        // 把选中的菜单name进行持久化
        permissionStore.$patch({ currParentRouteName: currName.value });
        // 处理展示路由数据
        permissionStore.handleCopyRoutes();
    };
    watch(
        () => appStore.isMobile,
        value => {
            if (value) {
                // 优化为等到侧边栏完全隐藏再触发,解决渐变布局侧边栏隐藏动画卡顿效果
                debounce(
                    () => {
                        // ts提示可能有循环递归问题
                        // @ts-ignore
                        permissionStore.$patch({ addRoutes: permissionStore.getCopyMenuRoutes });
                    },
                    300,
                    { trailing: true }
                );
            } else {
                initRoutes(currName.value);
            }
        },
        {
            immediate: true
        }
    );

    onMounted(() => {
        // 每次刷新或初始化进入初始化渐变布局的路由菜单
        // initRoutes(currName.value);
    });

    return {
        horizontalMenu,
        currName,
        initRoutes
    };
};
