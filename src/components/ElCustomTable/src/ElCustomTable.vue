<template>
    <el-card class="mb-4" shadow="hover"> </el-card>
    <el-card shadow="hover">
        <el-row class="flex-between flex-wrap custom-table">
            <div>
                <slot name="operateButton"></slot>
            </div>
            <div>
                <template v-if="true">
                    <el-button circle :icon="Search" />
                    <el-button circle :icon="Refresh" />
                </template>
                <slot name="toolButton"> </slot>
            </div>
        </el-row>
        <el-table ref="tableRef" :data="tableData" :border="border" style="width: 100%">
            <!-- 默认插槽 支持el-table 的columns -->
            <slot />
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
import { Refresh, Search } from '@element-plus/icons-vue';
import { ColumnProps, SearchColType } from '@/components/ElCustomTable';

export interface CustomTableProps {
    columns: ColumnProps[]; // 表格列 => 必传
    tableData: any[]; // 表格数据 => 必传
    pagination?: boolean; // 是否开启分页插件
    toolButton?: boolean; // 是否开启右上角工具栏
    border?: boolean; // 是否显示边框
    rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染；显示树形数据时，该属性是必填的
    searchCol?: SearchColType;
}

const props = withDefaults(defineProps<CustomTableProps>(), {
    columns: () => [],
    tableData: () => [],
    pagination: true,
    border: true,
    toolButton: true,
    rowKey: 'id',
    searchCol: () => ({ xs: 24, sm: 12, md: 12, lg: 6, xl: 6 })
});
</script>
