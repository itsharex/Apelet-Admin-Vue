/**
 * 右侧工具hook
 * @returns
 */
export const useTableTool = () => {
    let isShowSearch = ref(true);
    const handleShowSearch = () => {
        isShowSearch.value = !isShowSearch.value;
    };

    return {
        isShowSearch,
        handleShowSearch
    };
};
