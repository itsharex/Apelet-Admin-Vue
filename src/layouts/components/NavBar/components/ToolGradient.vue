<template>
    <div class="text-center px-1 py-0.5 cursor-pointer b-1 b-[var(--al-gradient-text-color)]">
        <span class="text-[var(--al-gradient-text-color)]">数据大屏</span>
    </div>
    <div class="text-center flex-center cursor-pointer" v-for="(item, index) in toolList" :key="index">
        <el-icon color="var(--al-gradient-text-color)" size="16">
            <component :is="item.icon" />
        </el-icon>
        <span class="text-[var(--al-gradient-text-color)] pl-1">{{ item.name }}</span>
    </div>
</template>

<script setup lang="ts">
const toolList = reactive([
    {
        icon: 'BellFilled',
        name: '待办消息',
        width: 'w-30',
        handle: () => {}
    },
    {
        icon: 'UserFilled',
        name: '系统管理员',
        width: 'w-25',
        handle: () => {}
    },
    {
        icon: 'SwitchButton',
        name: '退出',
        width: 'w-22',
        handle: () => {}
    }
]);
</script>

<style scoped lang="scss"></style>
