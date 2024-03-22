<template>
    <component
        :is="column.search?.renderer ?? ElComponentObj[column.search?.el!]"
        v-model.trim="queryParams[column.search?.Key ?? (column.prop as string)]"
        v-bind="{ ...column.search?.props, queryParams }"
    >
        <!-- 待实现 column.search?.el 的 select 等的option -->
    </component>
</template>

<script setup lang="ts">
import {
    ElInput,
    ElInputNumber,
    ElSelect,
    ElSelectV2,
    ElTreeSelect,
    ElCascader,
    ElDatePicker,
    ElTimePicker,
    ElTimeSelect
} from 'element-plus';
import { ColumnProps } from '@/components/ElCustomTable';
import { SearchType } from '@/components/ElCustomForm';

// 可选择 全局导入  （自动导入插件 在这里通过组件名动态渲染不成功）
const ElComponentObj: Record<`el-${SearchType}`, any> = markRaw({
    'el-input': ElInput,
    'el-cascader': ElCascader,
    'el-select': ElSelect,
    'el-date-picker': ElDatePicker,
    'el-input-number': ElInputNumber,
    'el-select-v2': ElSelectV2,
    'el-time-picker': ElTimePicker,
    'el-time-select': ElTimeSelect,
    'el-tree-select': ElTreeSelect
});

type FormItemProps = {
    column: ColumnProps;
    queryParams?: { [key: string]: any };
};

const props = defineProps<FormItemProps>();

const queryParams = computed(() => props.queryParams!);
</script>

<style></style>
