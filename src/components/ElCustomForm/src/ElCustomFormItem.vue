<template>
    <component
        :is="column.search?.renderer ?? ElComponentObj[column.search?.el!]"
        v-model.trim="queryParams[column.search?.Key ?? (column.prop as string)]"
        v-bind="{ ...column.search?.props, dicts: column.dicts, queryParams }">
        <!-- 
            配置项： options （el-select-v2、el-cascader)
                    data (el-tree-select)

            根据组件名默认动态渲染只有基础功能，若需要高度自定义搜索栏 请使用 render 函数渲染
        -->
        <template v-if="column.search?.el === 'el-select'">
            <component
                :is="ElOption"
                v-for="dict in column.dicts"
                :key="dict.value! || dict.dictValue!"
                :label="dict.label || dict.dictLabel"
                :value="dict.value! || dict.dictValue!">
            </component>
        </template>
    </component>
</template>

<script setup lang="ts" name="ElCustomFormItem">
import {
    ElInput,
    ElInputNumber,
    ElSelect,
    ElSelectV2,
    ElTreeSelect,
    ElCascader,
    ElDatePicker,
    ElTimePicker,
    ElTimeSelect,
    ElOption
} from 'element-plus';
import { ColumnProps } from '@/components/ElCustomTable';
import { SearchType } from '@/components/ElCustomForm';

// 在 setup 语法糖中 ， 使用 component 动态渲染 需要全局注册对应组件名的 组件实例 和  按需导入
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
