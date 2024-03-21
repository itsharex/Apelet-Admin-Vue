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

const ElCustomTableColumn = (prop: ColumnProps) => {
    return (
        <>
            <el-table-column {...prop} align={prop.align ?? 'center'}>
                {/* 在 ElCustomTableColumn 父组件中使用 el-table-column 子组件的作用域插槽  */}
                {{
                    default: (scope: ContentRendererType<any>) => {
                        if (prop.renderer) return prop.renderer(scope);
                        if (slots[prop.prop as string]) return slots[prop.prop as string]!(scope);
                        return scope.row[prop.prop!];
                    },
                    header: (scope: HeaderRendererType<any>) => {
                        if (prop.headerRenderer) return prop.headerRenderer(scope);
                        if (slots[`${prop.prop as string}Header`]) return slots[`${prop.prop as string}Header`]!(scope);
                        return prop.label;
                    }
                }}
            </el-table-column>
        </>
    );
};
</script>
