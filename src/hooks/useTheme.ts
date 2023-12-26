import { useLayoutStore } from '@/store';
import { ElMessage } from 'element-plus';
import { defaultTheme } from '@/config/theme';
import { getThemeLightOrDarkHexColor } from '@/utils/color';

export const useTheme = () => {
    const layoutStore = useLayoutStore();
    const isDark = computed(() => layoutStore.isDark);
    const html = document.documentElement as HTMLElement;

    // 暗黑主题切换
    const switchDark = () => {
        if (isDark.value) {
            layoutStore.$patch({ menuMode: 'light' });
            html.className = 'layout-menu-light dark';
        } else {
            html.classList.remove('dark');
        }
        setThemeColor(layoutStore.themeColor);
    };

    // 设置菜单栏深色模式
    const setMenuMode = (menuMode?: string) => {
        if (!menuMode) {
            menuMode = layoutStore.menuMode;
        }
        const dark = isDark.value ? 'dark' : '';
        html.className = `layout-menu-${menuMode} ${dark} `;
    };

    // 设置主题颜色
    const setThemeColor = (val: string | null) => {
        if (!val) {
            val = defaultTheme.themeColor;
            ElMessage.success('主题颜色已重置');
        }
        const colour: number = isDark.value ? 20.5 : 255;
        const colors = {
            // 设置 自定义主题颜色
            '--el-color-primary': val,
            // 设置 自定义主题下 active 颜色
            '--el-color-primary-dark-2': getThemeLightOrDarkHexColor(val as string, 0.1, colour) as string,
            // 设置 自定义主题下 hover 颜色
            ...Array.from({ length: 9 }, (_: unknown, i: number) => ({
                [`--el-color-primary-light-${i + 1}`]: getThemeLightOrDarkHexColor(
                    val as string,
                    i / 10,
                    colour
                ) as string
            })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
        };
        const theme =
            (layoutStore.isDark ? 'html.dark' : ':root') + JSON.stringify(colors).replace(/,/g, ';').replace(/"/g, '');

        // 将主题style挂到head上
        let style = document.getElementById('theme-var');
        if (style) {
            style.innerHTML = theme;
        } else {
            style = document.createElement('style');
            style.textContent = theme;
            style.id = 'theme-var';
            document.head.append(style);
        }
        layoutStore.$patch({ themeColor: val });
    };

    // 灰色模式
    const setGrayMode = () => {
        html.classList.toggle('html-grey');
    };
    // 色弱模式
    const setWeakNessMode = () => {
        html.classList.toggle('html-weakness');
    };

    // 重置渐变背景
    const resetThief = () => {};

    // 设置渐变背景
    const setGradientColor = (color: string[] = []) => {
        if (color.length === 0) {
            color = defaultTheme.gradientBgColor;
        }
    };

    const initTheme = () => {
        // 初始化
        setMenuMode(layoutStore.menuMode);
        switchDark();
        layoutStore.grayMode && setGrayMode();
        layoutStore.weakness && setWeakNessMode();
    };

    return {
        initTheme,
        switchDark,
        setThemeColor,
        resetThief,
        setGrayMode,
        setWeakNessMode,
        setMenuMode,
        setGradientColor
    };
};
