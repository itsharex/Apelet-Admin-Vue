type SelectionType = {
    mutiple: boolean;
    single: boolean;
    ids: number[];
    rows: any[];
};

/**
 * 表格多选hook
 * @param rowKey 自定义表格数据的唯一标识
 * @returns
 */
export const useSelection = (rowKey: string = 'id') => {
    const selectionScope = ref<SelectionType>({
        mutiple: true,
        single: true,
        ids: [],
        rows: []
    });

    const { mutiple, single, ids, rows } = toRefs(selectionScope.value);

    const selectionChange = (selection: any[]) => {
        mutiple.value = selection.length !== 1;
        single.value = !selection.length;
        ids.value = selection.map(item => item[rowKey]);
        rows.value = selection;
    };

    return {
        ids,
        rows,
        selectionScope,
        selectionChange
    };
};
