import { DictsProps } from '@/components/ElCustomTable';

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

// tsx 渲染组件的参数类型 （由 ElCustomFormItem 组件 渲染调用 renderer 函数）
export type SearchRenderProps<T> = {
    queryParams: { [k in keyof T]: string } & { [key: string]: any };
    dicts: DictsProps[]; // 字典类型
};

export type SearchProps<T = any> = {
    el?: `el-${SearchType}`; // 搜索框类别
    props?: { [key: string]: any }; // 搜索项配置属性，与 element plus 文档中 Attributes 的 配置项一致
    // 选择上面两个配置可不用使用 renderer， 反之使用renderder
    label?: string; // 自定义搜索名称
    width?: number; // label宽度
    Key?: string; // 自定义搜索字段 prop , 未设置 则默认使用 列表prop
    tooltip?: string; // 搜索提示
    order?: number; // 搜索项排序
    cols?: Omit<SearchColType, 'gutter'>; // 搜索栏排列栅格
    renderer?: (scope: SearchRenderProps<T>) => VNode; // 自定义渲染 搜索栏 (可高度自定义)
};
