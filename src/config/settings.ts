import { ContextMenuType } from '@/hooks/interface';
import { SettingType, LayoutMode } from './interface';
export const settingConfig: SettingType = {
    // 系统标题
    title: 'Apelet Admin',
    // 侧边栏展开与搜索临界点
    screenSize: 960,
    // 侧边栏最大宽度
    asideMaxWidth: '210px',
    // 侧边栏最小宽度
    asideMinWidth: '64px'
};

// 右键菜单配置项
export const contextMenu: Array<ContextMenuType> = [
    {
        icon: 'local-icon-refresh',
        label: '刷新页面',
        prop: 'refresh',
        show: true,
        disabled: false
    },
    {
        icon: 'el-icon-close',
        label: '关闭当前',
        prop: 'closeCurrent',
        show: true,
        disabled: false
    },
    {
        icon: 'el-icon-ArrowLeft',
        label: '关闭左侧',
        prop: 'closeLeft',
        show: true,
        disabled: false
    },
    {
        icon: 'el-icon-ArrowRight',
        label: '关闭右侧',
        prop: 'closeRight',
        show: true,
        disabled: false
    },
    {
        icon: 'el-icon-switch',
        label: '关闭其他',
        prop: 'closeOther',
        show: true,
        disabled: false
    },
    {
        icon: 'el-icon-remove',
        label: '关闭所有',
        prop: 'closeAll',
        show: true,
        disabled: false
    }
];

// 布局模式
export const layoutMode: LayoutMode[] = [
    { label: '纵向', value: 'vertical' },
    { label: '经典', value: 'basic' },
    { label: '横向', value: 'horizontal' },
    { label: '栅格', value: 'lattice' },
    { label: '渐变', value: 'gradient' }
];
// 动画类型
export const animateMode = [
    { label: '默认', value: 'zoom-fade' },
    { label: '滑动', value: 'fade-slide' },
    { label: '渐变', value: 'fade' },
    { label: '底部滑出', value: 'fade-bottom' },
    { label: '缩放消退', value: 'fade-scale' }
];

// 标签风格
export const tabsStyle = [
    { label: '卡片', value: 'card' },
    { label: '灵动', value: 'nimble' },
    { label: '圆滑', value: 'smooth' }
];

// 渐变背景
export const gradientBgColors = [
    {
        label: '蓝白',
        value: 'from-sky-500 via-sky-200 to-sky-100'
    },
    {
        label: '绿白',
        value: 'from-emerald-500 via-emerald-200 to-emerald-100'
    },
    {
        label: '蓝紫',
        value: 'from-cyan-500 via-cyan-200 to-cyan-100'
    }
];
