<template>
    <el-main class="!p-0 bg-[var(--el-bg-color-page)]">
        <!-- 自定义指令实现 滚动加载 -->
        <div class="h-full">
            <!-- 解决子元素超出父元素高度问题 -->
            <div :class="['p-4', { 'py-0': isGradient }]">
                <router-view>
                    <template #default="{ Component, route }">
                        <el-backtop title="回到顶部" />
                        <transition :name="layoutStore.animateMode" mode="out-in" appear>
                            <keep-alive>
                                <component :is="Component" :key="route.fullPath" v-if="appStore.reload" />
                            </keep-alive>
                        </transition>
                    </template>
                </router-view>
            </div>
        </div>
    </el-main>
</template>

<script setup lang="ts" name="AppMain">
import { useLayoutStore, useAppStore } from '@/store';
const layoutStore = useLayoutStore();
const appStore = useAppStore();

const isGradient = computed(() => layoutStore.layout === 'gradient');
</script>

<style scoped lang="scss"></style>
