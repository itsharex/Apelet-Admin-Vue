<template>
    <el-main class="!p-4 bg-[var(--el-bg-color-page)] h-full overflow-x-hidden shadow-inner">
        <!-- 自定义指令实现 滚动加载 -->
        <el-scrollbar>
            <div class="h-full">
                <router-view>
                    <template #default="{ Component, route }">
                        <el-backtop title="回到顶部" target=".el-main .el-scrollbar__wrap" />
                        <transition :name="layoutStore.animateMode" mode="out-in" appear>
                            <keep-alive>
                                <component :is="Component" :key="route.fullPath" v-if="appStore.reload" />
                            </keep-alive>
                        </transition>
                    </template>
                </router-view>
            </div>
        </el-scrollbar>
    </el-main>
</template>

<script setup lang="ts" name="AppMain">
import { useLayoutStore, useAppStore } from '@/store';
const layoutStore = useLayoutStore();
const appStore = useAppStore();
</script>

<style scoped lang="scss"></style>
