import { getMenuList } from '@/api/system/menu';
import { RequestMenu, ResponseMenu } from '@/api/system/menu/types';

export const useMenu = () => {
    // reactive 有很大局限性，因此推荐使用 ref
    let queryParams = ref<RequestMenu>({
        pageNum: 1,
        pageSize: 10
    });

    let menuList = ref<ResponseMenu[]>([]);

    const getList = async () => {
        let { data } = await getMenuList(queryParams.value);
        menuList.value = data.splice(0, 10);
    };

    const handleSearch = () => {
        getList();
    };

    const handleReset = () => {
        queryParams.value = {
            pageNum: 1,
            pageSize: 10
        };
        handleSearch();
    };

    onMounted(() => {
        getList();
    });

    return {
        queryParams,
        menuList,
        handleSearch,
        handleReset,
        getList
    };
};
