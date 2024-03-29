export const useTable = (
    api?: (...args: any) => Promise<ApiResponse<any>>,
    initParams?: { [key: string]: any },
    pagination?: boolean, // 是否开启分页插件
    dataCallBack?: (params: ApiResponse<any>) => ApiResponse<any> // 数据响应成功回调, 进行数据处理
) => {
    let total = ref(0);
    let data = ref<any>([]);
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
        let response = await api(queryParams.value);
        dataCallBack && (response.data = dataCallBack(response.data));
        data.value = response.data;
        total.value = response.total;
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
        queryParams,
        handleSearch,
        handleReset
    };
};
