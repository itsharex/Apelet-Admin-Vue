<template>
    <el-main class="!p-0 bg-[var(--el-bg-color-page)]">
        <!-- 自定义指令实现 滚动加载 -->
        <div class="h-full">
            <el-scrollbar ref="scrollbarRef" @scroll="handleScorll">
                <!-- 解决子元素超出父元素高度问题 -->
                <div :class="['p-4', { 'py-0': isGradient }]">
                    <router-view>
                        <template #default="{ Component, route }">
                            <el-backtop target=".el-main div .el-scrollbar__wrap" title="回到顶部" />
                            <transition :name="layoutStore.animateMode" mode="out-in" appear>
                                <keep-alive>
                                    <component :is="Component" :key="route.fullPath" v-if="appStore.reload" />
                                </keep-alive>
                            </transition>
                        </template>
                    </router-view>
                </div>
            </el-scrollbar>
        </div>
    </el-main>
</template>

<script setup lang="ts" name="AppMain">
import { useConfig } from '@/hooks';
import { useLayoutStore, useAppStore } from '@/store';
import { ElScrollbar } from 'element-plus';
import { useRoute } from 'vue-router';
const { useProgress } = useConfig();
const layoutStore = useLayoutStore();
const appStore = useAppStore();
const route = useRoute();

const isGradient = computed(() => layoutStore.layout === 'gradient');

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();

// 增加滚动进度条，如不需要，可在配置中将 isOpenProgress 设置为 false, 并清除缓存
const handleScorll = () => useProgress(scrollbarRef.value?.wrapRef!);

// 更新滚动条位置和滚动条状态
watch(
    () => route.path,
    () => {
        scrollbarRef.value?.setScrollTop(0);
        scrollbarRef.value?.update();
    }
);
</script>

<style scoped lang="scss"></style>
