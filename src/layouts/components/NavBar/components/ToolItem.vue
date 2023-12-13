<template>
    <!-- 搜索 -->
    <Search />
    <!-- 系统消息 -->
    <SystemMessage />
    <!-- i18图标 -->
    <Language />
    <!-- 布局尺寸图标 -->
    <!-- 刷新 -->
    <Refresh />
    <!-- 全屏 -->
    <FullScreen />
    <!-- 用户信息 -->
    <ClassicUser />
    <!-- 布局设置 -->
    <SystemSetting />
</template>

<script setup lang="ts">
import Refresh from './Refresh.vue';
import ClassicUser from './ClassicUser.vue';
import SystemMessage from './SystemMessage.vue';
import Language from './Language.vue';
import Search from './Search.vue';
import FullScreen from './FullScreen.vue';
import SystemSetting from './SystemSetting.vue';
</script>

<style scoped lang="scss"></style>
