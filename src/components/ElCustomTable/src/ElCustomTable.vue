<template>
    <el-card class="mb-4" shadow="hover"> </el-card>
    <el-card shadow="hover">
        <el-row class="flex-between flex-wrap custom-table">
            <div>
                <slot name="operateButton"></slot>
            </div>
            <div>
                <template v-if="toolButton">
                    <el-button circle :icon="Search" />
                    <el-button circle :icon="Refresh" />
                </template>
                <slot name="toolButton"> </slot>
            </div>
        </el-row>
        <el-table
            ref="tableRef"
            v-bind="$attrs"
            :data="tableData"
            :border="border"
            :row-key="rowKey"
            :highlight-current-row="highlightCurrentRow"
            style="width: 100%"
        >
            <!-- 默认插槽 支持el-table 的columns -->
            <slot />
            <!-- 循环处理columns列 -->
            <template v-for="column in columnList" :key="column">
                <el-table-column
                    v-if="column.type"
                    v-bind="column as any"
                    :align="column.align ?? 'center'"
                    :reserve-selection="column.type === 'selection'"
                >
                    <template #default="scope">
                        <template v-if="column.type === 'expand'">
                            <component :is="column.renderer" v-bind="scope" v-if="column.renderer" />
                            <!-- <slot v-else :name="column.type" v-bind="scope"></slot> -->
                        </template>
                        <!-- 拖拽排序 -->
                        <el-tag v-if="column.type === 'sortable'">
                            <el-icon><DCaret /></el-icon>
                        </el-tag>
                    </template>
                </el-table-column>
                <!-- 自定义column -->
                <el-custom-table-column v-if="!column.type && column.prop" :column>
                    <!-- 用于自定义单元格插槽 -->
                    <template v-for="slot in slotsToArray()" :key="slot" #[slot]="scope">
                        <slot :name="slot" v-bind="scope"></slot>
                    </template>
                </el-custom-table-column>
            </template>

            <!-- append -->
            <template name="append"> </template>
            <!-- empty -->
            <template name="empty"> </template>
        </el-table>
    </el-card>
</template>

<script setup lang="ts" name="ElCustomTable">
import { Refresh, Search } from '@element-plus/icons-vue';
import ElCustomTableColumn from './ElCustomTableColumn.vue';
import { ColumnProps, SearchColType } from '@/components/ElCustomTable';

export interface CustomTableProps {
    tableColumns: ColumnProps[]; // 表格列 => 必传
    tableData?: any[]; // 表格数据 => 必传
    pagination?: boolean; // 是否开启分页插件
    toolButton?: boolean; // 是否开启右上角工具栏
    highlightCurrentRow?: boolean; // 是否单选
    border?: boolean; // 是否显示边框
    rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染；显示树形数据时，该属性是必填的
    searchCol?: SearchColType;
}

const props = withDefaults(defineProps<CustomTableProps>(), {
    tableColumns: () => [],
    tableData: () => [],
    pagination: true,
    highlightCurrentRow: false,
    border: true,
    toolButton: true,
    rowKey: 'id',
    searchCol: () => ({ xs: 24, sm: 12, md: 12, lg: 6, xl: 6 })
});

// 自定义列
const columnList = computed<ColumnProps[]>(() => props.tableColumns);

const slots = useSlots();
const slotsToArray = () => Object.keys(slots);
</script>
