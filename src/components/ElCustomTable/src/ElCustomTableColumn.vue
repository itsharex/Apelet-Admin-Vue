<template>
	<ElCustomTableColumn v-bind="column" />
</template>

<script setup lang="tsx" name="ElCustomTableColumn">
	import { ColumnProps, ContentRendererType, HeaderRendererType } from '@/components/ElCustomTable';

	// 与上下文的 $slots 一样, 里面包含了父组件向当前组件传递的插槽集
	const slots = useSlots();

	defineProps<{
		column: ColumnProps;
	}>();

	/**
 *	根据条件渲染对应的插槽内容
	1. tsx渲染
	2. 插槽渲染
 * @param prop 父组件传递的 props 值
 */
	const ElCustomTableColumn = (props: ColumnProps) => {
		return (
			<>
				<el-table-column {...props} align={props.align ?? 'center'}>
					{/* 在 ElCustomTableColumn 父组件中使用 el-table-column 子组件的作用域插槽  */}
					{{
						default: (scope: ContentRendererType<any>) => {
							if (props.renderer) return props.renderer(scope);
							if (slots[props.prop as string]) return slots[props.prop as string]!(scope);
							return (
								<>
									{props.limitLine ? (
										<el-popover placement="top" width={props.popoverWidth} trigger="hover">
											{{
												default: () => <span>{scope.row[props.prop!]}</span>,
												reference: () => <span class={props.lineClamp}>{scope.row[props.prop!]}</span>,
											}}
										</el-popover>
									) : (
										scope.row[props.prop!]
									)}
								</>
							);
						},
						header: (scope: HeaderRendererType<any>) => {
							if (props.headerRenderer) return props.headerRenderer(scope);
							if (slots[`${props.prop as string}Header`]) return slots[`${props.prop as string}Header`]!(scope);
							return props.label;
						},
					}}
				</el-table-column>
			</>
		);
	};
</script>
