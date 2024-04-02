<template>
    <el-scrollbar>
        <el-divider>{{ $t('setting.layoutSetting') }}</el-divider>
        <div class="drawer-item">
            <span>{{ $t('setting.layout') }} </span>
            <el-select v-model="layoutStore.layout" class="w-34" @change="handleLayout">
                <el-option v-for="item in layoutMode" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <el-divider>{{ $t('setting.themeSetting') }}</el-divider>
        <!-- 主题颜色 -->
        <div class="drawer-item">
            <span>{{ $t('setting.themeColor') }}</span>
            <el-color-picker
                v-model="layoutStore.themeColor"
                color-format="hex"
                :predefine="predefineColors"
                @change="setThemeColor" />
        </div>
        <!-- 暗黑主题 -->
        <div class="drawer-item">
            <span>{{ $t('setting.darkTheme') }}</span>
            <el-switch
                v-model="layoutStore.isDark"
                inline-prompt
                :active-action-icon="Moon"
                :inactive-action-icon="Sunny"
                @change="switchDark" />
        </div>
        <!-- 渐变文字 -->
        <div class="drawer-item">
            <span>{{ $t('setting.gradientText') }}</span>
            <el-color-picker
                v-model="layoutStore.gradientTextColor"
                color-format="hex"
                :predefine="predefineGradientColors"
                @change="setGradientTextColor" />
        </div>
        <el-divider> {{ $t('setting.interfaceSetting') }} </el-divider>
        <!-- 深色菜单栏 -->
        <div class="drawer-item">
            <span>{{ $t('setting.menuMode') }}</span>
            <el-switch
                v-model="layoutStore.menuMode"
                active-value="dark"
                inactive-value="light"
                :disabled="layoutStore.layout === 'horizontal'"
                inline-prompt
                @change="changeMenuMode" />
        </div>
        <!-- 菜单手风琴模式 -->
        <div class="drawer-item">
            <span>{{ $t('setting.menuUnique') }}</span>
            <el-switch v-model="layoutStore.menuUnique" inline-prompt />
        </div>
        <!-- 标签页 -->
        <div class="drawer-item">
            <span>{{ $t('setting.tabs') }}</span>
            <el-switch v-model="layoutStore.tabsHidden" :disabled="isGradient" inline-prompt />
        </div>
        <!-- 标签页风格 -->
        <div class="drawer-item">
            <span>{{ $t('setting.tabsStyle') }}</span>
            <el-select v-model="layoutStore.tabStyle" class="w-35">
                <el-option v-for="item in tabsStyle" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <!-- 标签页图标 -->
        <div class="drawer-item">
            <span>{{ $t('setting.tabsIcon') }}</span>
            <el-switch v-model="layoutStore.tabsIcon" :disabled="isGradient" inline-prompt />
        </div>
        <!-- 标签页持久化 -->
        <div class="drawer-item">
            <span>{{ $t('setting.tabsCache') }}</span>
            <el-switch v-model="layoutStore.tabsCache" :disabled="isGradient" inline-prompt @change="handlePersistTabs" />
        </div>
        <!-- 面包屑 -->
        <div class="drawer-item">
            <span>{{ $t('setting.breadCrumb') }}</span>
            <el-switch v-model="layoutStore.breadcrumbs" :disabled="isGradient" inline-prompt />
        </div>
        <!-- 面包屑图标 -->
        <div class="drawer-item">
            <span>{{ $t('setting.breadCrumbIcon') }}</span>
            <el-switch v-model="layoutStore.breadcrumbsIcon" :disabled="isGradient" inline-prompt />
        </div>
        <!-- 灰色模式 -->
        <div class="drawer-item">
            <span>{{ $t('setting.grayMode') }}</span>
            <el-switch v-model="layoutStore.grayMode" :disabled="isGradient" inline-prompt @change="setGrayMode" />
        </div>
        <!-- 色弱模式 -->
        <div class="drawer-item">
            <span>{{ $t('setting.weaknessMode') }}</span>
            <el-switch v-model="layoutStore.weakness" :disabled="isGradient" inline-prompt @change="setWeakNessMode" />
        </div>
        <!-- 动画类型 -->
        <div class="drawer-item">
            <span> {{ $t('setting.animateMode') }} </span>
            <el-select v-model="layoutStore.animateMode" class="w-35">
                <el-option v-for="item in animateMode" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <el-divider>{{ $t('setting.tips') }}</el-divider>
        <el-alert :title="$t('setting.tipDesc')" type="warning" :closable="false" />
    </el-scrollbar>
</template>

<script setup lang="ts" name="LayoutDrawer">
import { Moon, Sunny } from '@element-plus/icons-vue';
import { useTheme } from '@/hooks';
import { useLayoutStore, useTabsStore, usePermissionStore } from '@/store';
import { animateMode, tabsStyle, layoutMode } from '@/config/settings';
import { deepClone } from '@/utils/common';

const layoutStore = useLayoutStore();
const permissionStore = usePermissionStore();
const { handlePersistTabs } = useTabsStore();
const { switchDark, setThemeColor, setGrayMode, setWeakNessMode, setMenuMode, setGradientTextColor } = useTheme();

// 主题颜色
const predefineColors = ref(['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']);

// 渐变文字颜色
const predefineGradientColors = ref(['#ff4500', '#ffffff', '#ffd700', '#c71585']);

// 是否是渐变布局
const isGradient = computed(() => layoutStore.layout === 'gradient');

// 改变菜单栏背景色
const changeMenuMode = () => setMenuMode();

// 切换布局对应的操作
const handleLayout = () => {
    const copyMenuRoutes = deepClone(permissionStore.copyMenuRoutes);
    // @ts-ignore
    permissionStore.$patch({ asideBarRoutes: copyMenuRoutes });
};
</script>

<style scoped lang="scss">
.drawer-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    padding-right: 10px;
    text-align: center;
    & > span {
        padding-right: 10px;
        white-space: nowrap;
        opacity: 0.7;
    }
}
</style>
