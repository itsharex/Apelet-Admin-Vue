<template>
    <el-card v-show="isShowSearch" class="mb-4" shadow="hover">
        <el-custom-form
            :search-columns
            :query-params
            :search-col
            :search="handleSearch"
            :reset="handleReset"
            :resize="handleResize"
        />
    </el-card>
    <slot name="statistics"></slot>
    <el-card shadow="hover">
        <el-row class="flex-between flex-wrap custom-table">
            <div>
                <slot name="operateButton" v-bind="selectionScope"></slot>
            </div>
            <div>
                <template v-if="toolButton">
                    <el-button circle :icon="Search" @click="showAndHindenSearch" />
                    <el-button circle :icon="Refresh" @click="handleSearch" />
                </template>
                <slot name="toolButton"> </slot>
            </div>
        </el-row>
        <div ref="adaptRef" v-adaptive>
            <el-table
                ref="tableRef"
                class="h-full!"
                v-loading="loading"
                v-bind="$attrs"
                :data="computedData"
                :border
                :row-key
                :highlight-current-row
                @selection-change="selectionChange"
            >
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
                                <slot v-else :name="column.type" v-bind="scope"></slot>
                            </template>
                            <!-- 拖拽排序 -->
                            <el-tag v-if="column.type === 'sortable'">
                                <el-icon><DCaret /></el-icon>
                            </el-tag>
                        </template>
                        <template #header="scope">
                            <component :is="column.headerRenderer" v-bind="scope" v-if="column.headerRenderer" />
                            <slot v-else :name="`${column.type}Header`" v-bind="scope"></slot>
                        </template>
                    </el-table-column>
                    <!-- 自定义column -->
                    <el-custom-table-column v-if="!column.type && column.prop" :column>
                        <!-- 用于自定义单元格插槽 -->
                        <template v-for="slot in slotsToArray(column)" :key="slot" #[slot]="scope">
                            <slot :name="slot" v-bind="scope"></slot>
                        </template>
                    </el-custom-table-column>
                </template>

                <!-- 默认插槽 支持el-table 的columns -->
                <slot />
                <!-- append -->
                <template #append>
                    <slot name="append"></slot>
                </template>
                <!-- empty -->
                <template #empty>
                    <el-empty description="暂无数据" />
                </template>
            </el-table>
        </div>
        <!-- 分页插槽 -->
        <slot name="pagination">
            <Pagination
                v-if="pagination"
                v-model:current-page="queryParams.pageNum"
                v-model:page-size="queryParams.pageSize"
                :total="total"
                @get-list="getPageList"
            />
        </slot>
    </el-card>
</template>

<script setup lang="ts" name="ElCustomTable">
import ElCustomTableColumn from './ElCustomTableColumn.vue';
import { ElCustomForm, SearchColType } from '@/components/ElCustomForm';
import { Pagination } from '@/components/Pagination';
import { Refresh, Search } from '@element-plus/icons-vue';
import { ColumnProps } from '@/components/ElCustomTable';
import { ElTable } from 'element-plus';
import { useTable, useSelection, useTableTool } from './hooks';
import { updateTableHeight } from './helpers/adaptive';

export interface CustomTableProps {
    tableColumns: ColumnProps[]; // 表格列 => 必传
    tableData?: any[]; // 表格数据， 存在则不调用 requestApi => 非必传
    initParams?: { [key: string]: any }; // 初始化参数，有用户自定义
    pagination?: boolean; // 是否开启分页插件, 关闭分页请重新设置 表格自适应高度 （useAdaptive)
    requestApi?: (...args: any) => Promise<ApiResponse<any>>; // 数据请求接口
    toolButton?: boolean; // 是否开启右上角工具栏
    highlightCurrentRow?: boolean; // 是否单选
    border?: boolean; // 是否显示边框
    rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染；显示树形数据时，该属性是必填的
    searchCol?: SearchColType;
    dataCallback?: (params: any) => any;
}

const props = withDefaults(defineProps<CustomTableProps>(), {
    tableColumns: () => [],
    pagination: true,
    highlightCurrentRow: false,
    border: true,
    toolButton: true,
    rowKey: 'id'
});

// 设定 inheritAttrs: false 和使用 v-bind="$attrs" 来实现深层组件属性透传
defineOptions({
    inheritAttrs: false
});

// 表格实例
const tableRef = ref<InstanceType<typeof ElTable>>();
const adaptRef = ref<HTMLElement>();

// 该组件的插槽集
const slots = useSlots();
const slotsToArray = (column: ColumnProps) =>
    Object.keys(slots).filter(item => item === column.prop || item === `${column.prop as string}Header`);

// table request hook
const { total, data, loading, queryParams, handleReset, handleSearch, getList } = useTable(
    props.requestApi,
    props.initParams,
    props.pagination,
    props.dataCallback
);

// table selection hook
const { selectionScope, selectionChange } = useSelection(props.rowKey);

// table rightTool hook
const { isShowSearch, handleShowSearch } = useTableTool();

// 自定义列
const columnList = computed<ColumnProps[]>(() => props.tableColumns);
// 表格数据
const computedData = computed(() => {
    if (!props.tableData) return data.value;
    return props.tableData;
});

// 分页获取新的数据
const getPageList = () => {
    handleSearch();
    handleResize();
};

// 处理搜索栏参数
const searchColumns = computed(() => {
    return columnList.value
        .filter(item => item.search?.el || item.search?.renderer)
        .sort((pre, next) => pre.search?.order! - next.search?.order!);
});

// 更新表格高度
const handleResize = () => updateTableHeight(adaptRef.value!);

// 搜索栏显示/隐藏方法
const showAndHindenSearch = () => {
    queryParams.value.pageSize = isShowSearch.value ? 20 : 10;
    handleShowSearch();
    getPageList();
};

defineExpose({
    getList,
    ...tableRef.value
});
</script>
