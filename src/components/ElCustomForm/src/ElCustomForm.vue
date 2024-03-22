<template>
    <div class="p-4">
        <el-form ref="formRef" :model="queryParams">
            <el-row :gutter>
                <el-col v-for="item in searchColumns" :key="item.prop" v-bind="getColLayout(item)">
                    <el-form-item>
                        <template #default>
                            <span>{{ item.search?.label ?? item.label }}</span>
                        </template>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="flex flex-wrap">
                <el-button type="primary"> 搜索 </el-button>
                <el-button> 重置 </el-button>
            </el-row>
        </el-form>
    </div>
</template>

<script setup lang="tsx">
import { ElForm } from 'element-plus';
import { ColumnProps } from '@/components/ElCustomTable';
import { SearchColType } from '@/components/ElCustomForm';
import { isNullOrUndefined } from '@/utils/common';

interface CustomSearchProps {
    searchColumns: ColumnProps[]; // 搜索参数列 => 必传
    queryParams?: { [key: string]: any }; // 搜索参数
    searchCol?: SearchColType;
}

const props = withDefaults(defineProps<CustomSearchProps>(), {
    searchCol: () => ({ gutter: 10, xs: 24, sm: 12, md: 12, lg: 6, xl: 6 })
});

// el-row 布局
const { gutter } = toRefs(props.searchCol!);

// el-col 布局
const getColLayout = (column: ColumnProps) => {
    let cols = column.search?.cols!;
    if (!isNullOrUndefined(cols)) cols = props.searchCol!;
    return {
        span: cols.span,
        offset: cols.offset ?? 0,
        push: cols.push ?? 0,
        pull: cols.pull ?? 0,
        xs: cols.xs,
        sm: cols.sm,
        md: cols.md,
        lg: cols.lg,
        xl: cols.xl
    };
};

const formRef = ref<InstanceType<typeof ElForm>>();
</script>

<style></style>
