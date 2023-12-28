<template>
    <div
        v-if="!settingVisible"
        class="fixed z-9999 flex-center w-10 h-10 bg-primary top-50% right-0 rounded-l-md cursor-pointer"
        @click="settingVisible = !settingVisible"
    >
        <Icon name="el-icon-setting" size="22" color="#fff" />
    </div>
    <el-drawer class="drawer" v-model="settingVisible" :title="$t('setting.settings')" size="320px" direction="rtl">
        <layout-drawer />
    </el-drawer>
</template>

<script lang="ts" setup>
import LayoutDrawer from '@/layouts/components/LayoutDrawer/index.vue';
const settingVisible = ref<boolean>(false);
// 生产模式不需要可自行修改
</script>

<style lang="scss" scoped></style>
