<template>
    <el-form ref="formRef" :model="queryParams" :label-position="labelPosition">
        <el-row :gutter>
            <el-col v-for="item in searchColumns.slice(0, 4)" :key="item.prop" v-bind="getColLayout(item)">
                <el-form-item :label-width="item.search?.width">
                    <!-- label 区域 -->
                    <template #label>
                        <div class="flex items-center">
                            <span>{{ item.search?.label ?? item.label }}</span>
                            <el-tooltip v-if="item.search?.tooltip" placement="top" effect="dark" :content="item.search?.tooltip">
                                <el-icon class="ml-1"> <InfoFilled /></el-icon>
                            </el-tooltip>
                        </div>
                    </template>
                    <!-- 表单区域 -->
                    <el-custom-form-item :column="item" :query-params />
                </el-form-item>
            </el-col>
        </el-row>
        <el-collapse-transition>
            <el-row v-show="isExpand" :gutter>
                <el-col v-for="item in searchColumns.slice(4)" :key="item.prop" v-bind="getColLayout(item)">
                    <el-form-item :label-width="item.search?.width">
                        <!-- label 区域 -->
                        <template #label>
                            <div class="flex items-center">
                                <span>{{ item.search?.label ?? item.label }}</span>
                                <el-tooltip
                                    v-if="item.search?.tooltip"
                                    placement="top"
                                    effect="dark"
                                    :content="item.search?.tooltip">
                                    <el-icon class="ml-1"> <InfoFilled /></el-icon>
                                </el-tooltip>
                            </div>
                        </template>
                        <!-- 表单区域 -->
                        <el-custom-form-item :column="item" :query-params />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-collapse-transition>
        <!-- 自定义插槽搜索区域 -->
        <el-col v-bind="searchCol">
            <slot></slot>
        </el-col>
        <el-row class="flex flex-wrap">
            <el-button type="primary" :icon="Search" @click="handleSearch"> 搜 索 </el-button>
            <el-button :icon="RefreshLeft" @click="handleReset"> 重 置 </el-button>
            <el-button type="success" :icon="isExpand ? ArrowUp : ArrowDown" plain @click="handleExpand">
                {{ isExpand ? '收 缩' : '展 开' }}
            </el-button>
        </el-row>
    </el-form>
</template>

<script setup lang="ts">
import ElCustomFormItem from './ElCustomFormItem.vue';
import { Search, RefreshLeft, ArrowUp, ArrowDown } from '@element-plus/icons-vue';
import { ElForm } from 'element-plus';
import { ColumnProps } from '@/components/ElCustomTable';
import { SearchColType } from '@/components/ElCustomForm';
import { isNullOrUndefined } from '@/utils/common';

interface CustomSearchProps {
    searchColumns?: ColumnProps[]; // 搜索参数列 => 必传
    queryParams?: { [key: string]: any }; // 搜索参数
    searchCol?: SearchColType; // 搜索栏布局
    labelPosition?: 'left' | 'right' | 'top';
    search?: () => void;
    reset?: () => void;
    resize?: () => void;
}

const props = withDefaults(defineProps<CustomSearchProps>(), {
    searchColumns: () => [],
    searchCol: () => ({ gutter: 20, xs: 24, sm: 12, md: 12, lg: 6, xl: 6 })
});

// el-row 布局
const gutter = computed(() => props.searchCol.gutter!);

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
// 搜索、重置
const handleSearch = () => props.search?.();
const handleReset = () => props.reset?.();

// 展开搜索
let isExpand = ref(false);
const handleExpand = () => {
    isExpand.value = !isExpand.value;
    props.resize?.();
};
</script>
