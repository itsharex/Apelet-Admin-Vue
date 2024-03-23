import { getMenuList } from '@/api/system/menu';
import { RequestMenu, ResponseMenu } from '@/api/system/menu/types';

export const useMenu = () => {
    let queryParams = reactive<RequestMenu>({
        pageNum: 1,
        pageSize: 10
    });

    let menuList = ref<ResponseMenu[]>([]);

    const getList = async () => {
        let { data } = await getMenuList(queryParams);
        menuList.value = data.splice(0, 10);
    };

    onMounted(async () => {
        getList();
    });

    return {
        queryParams,
        menuList
    };
};
