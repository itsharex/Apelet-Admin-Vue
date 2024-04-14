import { TableColumnCtx } from 'element-plus';
import { ElCustomTable, type CustomTableProps } from '@/components/ElCustomTable';
import { SearchProps } from '@/components/ElCustomForm';

// 列的类型   索引、多选、排序、展开
export type ColumnType = 'index' | 'selection' | 'sortable' | 'expand';

export type LineClampType =
	| 'line-clamp-1'
	| 'line-clamp-2'
	| 'line-clamp-3'
	| 'line-clamp-4'
	| 'line-clamp-5'
	| 'line-clamp-6';

// 头部插槽类型
export interface HeaderRendererType<T> {
	$index: number;
	column: TableColumnCtx<T>;
	[key: string]: any;
}

// 单元格内容插槽类型
export interface ContentRendererType<T> extends HeaderRendererType<T> {
	row: T;
}

type dictNameType = 'dictValue' | 'dictLabel' | 'value' | 'label';
// 字典类型
export interface DictsProps extends Partial<Record<dictNameType, string>> {
	disabled?: boolean;
	children?: DictsProps[];
	[key: string]: any;
}

// 继承列类型TableColumnCtx， 进行二次拓展
export interface ColumnProps<T = any>
	extends Partial<Omit<TableColumnCtx<T>, 'type' | 'prop' | 'children' | 'renderCell' | 'renderHeader'>> {
	type?: ColumnType; // 列的类型
	prop?: keyof T;
	tag?: boolean | Ref<Boolean>; // 是否标签显示
	search?: SearchProps<T>; // 搜索栏
	dicts?: DictsProps[]; // 字典，用于回显单元格内容
	limitLine?: boolean | Ref<Boolean>; // 是否限制在特定行数   目前只支持 没有 插槽和tsx 渲染的返回内容
	lineClamp?: LineClampType; // 限制在特定行数类名
	popoverWidth?: number; // popover 弹出框宽度
	headerRenderer?: (scope: HeaderRendererType<T>) => VNode; // 自定义渲染头部内容
	renderer?: (scope: ContentRendererType<T>) => VNode; // 自定义渲染单元格内容
	children?: ColumnProps<T>; // 多级表头
}

// 导出表格类型
export type ElCustomTableInstance = Omit<
	InstanceType<typeof ElCustomTable>,
	keyof ComponentPublicInstance | keyof CustomTableProps
>;
