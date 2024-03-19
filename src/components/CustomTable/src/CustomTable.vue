<template>
    <el-card class="mb-4" shadow="hover"> </el-card>
    <el-card shadow="hover">
        <el-row class="flex-between flex-wrap custom-table">
            <div>
                <slot name="operateButton"></slot>
            </div>
            <div>
                <slot name="toolButton">
                    <el-button circle :icon="Search" />
                    <el-button circle :icon="Edit" />
                </slot>
            </div>
        </el-row>
        <el-table ref="tableRef" :data="tableData" border style="width: 100%">
            <!-- 默认插槽 -->
            <slot />
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
import { Edit, Search } from '@element-plus/icons-vue';

defineProps<{
    tableData: Array<any>;
}>();
</script>
