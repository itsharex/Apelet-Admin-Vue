/**
 * table 操作 hook
 * @param api 表格数据Api
 * @param initParams 用户自定义初始参数
 * @param pagination 是否开启分页插件
 * @param dataCallBack 接口返回成功回调
 * @returns
 */
export const useTableData = (
    api?: (...args: any) => Promise<ApiResponse<any>>,
    initParams?: { [key: string]: any },
    pagination?: boolean, // 是否开启分页插件
    dataCallBack?: (params: any) => any // 数据响应成功回调, 进行数据处理
) => {
    let total = ref(0);
    let data = ref<any>([]);
    let loading = ref(false);
    let queryParams = ref<{ [key: string]: any }>({
        ...initParams
    });

    // 获取数据
    const getList = async () => {
        if (!api) return;
        if (!pagination) {
            delete queryParams.value.pageNum;
            delete queryParams.value.pageSize;
        }
        loading.value = true;
        let response = await api(queryParams.value);
        dataCallBack && (response.data = dataCallBack(response.data));
        data.value = response.data;
        total.value = response.total;
        loading.value = false;
    };

    // 搜索
    const handleSearch = () => {
        getList();
    };

    // 重置
    const handleReset = () => {
        queryParams.value = {
            ...initParams
        };
        handleSearch();
    };

    onMounted(() => {
        getList();
    });

    return {
        total,
        data,
        loading,
        queryParams,
        handleSearch,
        handleReset,
        getList
    };
};
