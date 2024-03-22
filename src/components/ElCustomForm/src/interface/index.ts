// 搜索框类别
export type SearchType =
    | 'input'
    | 'input-number'
    | 'select'
    | 'select-v2'
    | 'tree-select'
    | 'cascader'
    | 'date-picker'
    | 'time-picker'
    | 'time-select'
    | 'switch'
    | 'slider';

// 搜索区域类型
export type ColTypeProp = 'gutter' | 'span' | 'offset' | 'push' | 'pull' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SearchColType = Partial<Record<ColTypeProp, number>>;

export type SearchProps = {
    el?: `el-${SearchType}`; // 搜索框类别
    label?: string; // 自定义搜索名
    props?: any; // 搜索项属性，与 element plus 文档中的 配置项一致
    Key?: string; // 自定义key
    tooltip?: string; // 搜索提示
    order?: number; // 搜索项排序
    cols?: Omit<SearchColType, 'gutter'>; // 搜索栏排列栅格
    defaultValue?: string | number | boolean | any[]; // 默认值
    renderer?: (scope: any) => VNode; // 自定义渲染 搜索栏
};
