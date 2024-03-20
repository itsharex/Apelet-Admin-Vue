import { TableColumnCtx } from 'element-plus';
import { ComponentPublicInstance, VNode } from 'vue';
import { ElCustomTable, type CustomTableProps } from '@/components/ElCustomTable';

// 列的类型   索引、单选（高亮当前行）、多选、排序、展开
export type ColumnType = 'index' | 'highlight-current-row' | 'selection ' | 'sortable' | 'expand';

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
export type ColTypeProp = 'span' | 'offset' | 'push' | 'pull' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SearchColType = Partial<
    Record<ColTypeProp, number | { span?: number; offset?: number; pull?: number; push?: number }>
>;

// 头部插槽类型
export type HeaderRendererType<T> = {
    $index: number;
    column: TableColumnCtx<T>;
    [key: string]: any;
};

// 单元格内容插槽类型
export type RendererType<T> = {
    row: T;
    column: TableColumnCtx<T>;
    $index: number;
    [key: string]: any;
};

export type SearchProps = {
    el?: `el-${SearchType}`; // 搜索框类别
    label?: string;
    props?: any; // 搜索项参数，与 element plus 文档中的 配置项一致
    Key?: string; // 自定义key
    tooltip?: string; // 搜索提示
    overflow?: boolean; // 文字过长是否单行显示
    order?: number; // 搜索项排序
    cols: SearchColType; // 搜索栏排列栅格
    defaultValue?: any | any[]; // 默认值
    renderer?: (scope: any) => VNode; // 自定义渲染 搜索栏
};

// 继承TableColumnCtx， 进行二次拓展
export interface ColumnProps<T = any>
    extends Partial<Omit<TableColumnCtx<T>, 'type' | 'children' | 'renderCell' | 'renderHeader'>> {
    type?: ColumnType; // 列的类型
    tag?: boolean | Ref<Boolean>; // 是否标签显示
    search?: SearchProps; // 搜索栏
    dict?: any[]; // 字典，用于回显单元格内容
    headerRenderer?: (scope: HeaderRendererType<T>) => VNode; // 自定义渲染头部内容
    renderer?: (scope: RendererType<T>) => VNode; // 自定义渲染单元格内容
    children?: ColumnProps<T>; // 多级表头
}

// 导出表格类型
export type CustomTableInstance = Omit<
    InstanceType<typeof ElCustomTable>,
    keyof ComponentPublicInstance | keyof CustomTableProps
>;
