import { GlobalState } from './interface';
// 默认值
export const defaultTheme = {
    /**
     * hex ----> getThemeLightOrDarkHexColor
     * rgb ----> getThemeLightOrDarkRgbColor
     */
    themeColor: '#1e90ff' // 根据自己需求写格式，需要更改useTheme 中的 方法
};

const themeConfig: GlobalState = {
    // 布局切换
    layout: 'vertical',
    // 内容区滚动条加载进度
    isOpenProgress: false,
    // 菜单栏模式(light|dark)
    menuMode: 'light',
    // 暗黑模式
    isDark: false,
    // 主题颜色
    themeColor: '',
    // 是否重置渐变背景为主题颜色
    isResetGradient: false,
    // 渐变背景颜色
    backgroundColor: [],
    // 渐变背景索引
    hoverIndex: -1,
    // 渐变背景文字颜色
    gradientTextColor: '',
    // 标签栏
    tabsHidden: true,
    // 标签风格 圆滑smooth | 卡片card | 灵动nimble
    tabStyle: 'smooth',
    // 标签栏图标
    tabsIcon: true,
    // 标签栏是否缓存
    tabsCache: false,
    // 面包屑
    breadcrumbs: true,
    // 面包屑图标
    breadcrumbsIcon: true,
    // 菜单手风琴模式
    menuUnique: false,
    // 是否灰色模式
    grayMode: false,
    // 色弱
    weakness: false,
    // 动画
    animateMode: 'zoom-fade'
};
export default themeConfig;
