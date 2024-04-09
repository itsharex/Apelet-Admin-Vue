<template>
    <div v-if="isShow" class="fixed z-99 flex-center w-fit h-fit top-40% right-0 rounded-l-md cursor-pointer">
        <el-card shadow="never" :body-style="{ padding: '8px' }">
            <div
                class="p-2 bg-[var(--el-color-primary-light-9)] b-rounded flex-col-center"
                @click="settingVisible = !settingVisible">
                <Icon name="el-icon-setting" size="16" color="var(--el-color-primary)" />
                <span class="text-primary text-3">系统设置</span>
            </div>
            <el-popover placement="left" width="220" trigger="hover">
                <template #reference>
                    <div class="mt-2 p-2 bg-[var(--el-color-warning-light-9)] b-rounded flex-col-center">
                        <Icon name="el-icon-operation" size="16" color="var(--el-color-warning)" />
                        <span class="text-warning text-3">工具栏</span>
                    </div>
                </template>
                <div class="flex-y-center">
                    <Search />
                    <SystemMessage />
                    <Language />
                    <Refresh />
                    <FullScreen />
                </div>
            </el-popover>
            <div class="mt-2 p-2 bg-[var(--el-color-error-light-9)] b-rounded flex-col-center" @click="clearCache">
                <Icon name="el-icon-setting" size="16" color="var(--el-color-error)" />
                <span class="text-error text-3">清除缓存</span>
            </div>
        </el-card>
    </div>
    <el-drawer
        class="drawer"
        append-to-body
        v-model="settingVisible"
        :title="$t('setting.settings')"
        size="320px"
        direction="rtl">
        <layout-drawer />
    </el-drawer>
</template>

<script lang="ts" setup>
import Refresh from '../NavBar/components/Refresh.vue';
import SystemMessage from '../NavBar/components/SystemMessage.vue';
import Language from '../NavBar/components/Language.vue';
import Search from '../NavBar/components/Search.vue';
import FullScreen from '../NavBar/components/FullScreen.vue';
import LayoutDrawer from '@/layouts/components/LayoutDrawer/index.vue';
const settingVisible = ref<boolean>(false);
// 生产模式不需要可自行修改
const isShow = import.meta.env.DEV && import.meta.env.VITE_APP_SETTING === 'Y';

const clearCache = () => {
    localStorage.clear();
    window.location.reload();
};
</script>

<style lang="scss" scoped></style>
