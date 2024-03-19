<template>
    <el-card>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="body" label="文章内容"></el-table-column>
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
defineProps<{
    tableData: Array<any>;
}>();
</script>
