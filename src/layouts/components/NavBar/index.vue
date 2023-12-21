<template>
    <el-header class="header">
        <tool-left />
        <tool-right />
    </el-header>
</template>

<script setup lang="ts" name="NavBar">
import ToolLeft from './ToolLeft.vue';
import ToolRight from './ToolRight.vue';
</script>

<style scoped lang="scss">
.header {
    @apply w-full flex-y-center justify-between border-b-1 border-solid border-[var(--el-color-info-light-8)] h-14 p-x-0 bg-[var(--el-bg-color)];
}
</style>
