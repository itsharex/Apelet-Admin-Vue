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
    | 'time-select';

// 搜索区域类型
export type ColTypeProp = 'gutter' | 'span' | 'offset' | 'push' | 'pull' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SearchColType = Partial<Record<ColTypeProp, number>>;

// tsx 渲染组件接受的 属性
export type SearchRendderProps<T> = {
    queryParams: { [k in keyof T]: string } & { [key: string]: any };
    options: any[];
};

export type SearchProps<T = any> = {
    el?: `el-${SearchType}`; // 搜索框类别
    props?: { [key: string]: any }; // 搜索项属性，与 element plus 文档中的 配置项一致
    // 选择上面两个配置可不用使用 renderer， 反之使用renderder
    label?: string; // 自定义搜索名
    Key?: string; // 自定义搜索字段key
    tooltip?: string; // 搜索提示
    order?: number; // 搜索项排序
    cols?: Omit<SearchColType, 'gutter'>; // 搜索栏排列栅格
    renderer?: (scope: SearchRendderProps<T>) => VNode; // 自定义渲染 搜索栏
};
