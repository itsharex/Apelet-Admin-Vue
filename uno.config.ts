import { defineConfig } from '@unocss/vite';
import presetUno from '@unocss/preset-uno';
import presetRemToPx from '@unocss/preset-rem-to-px';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
	content: {
		pipeline: {
			exclude: ['node_modules', 'dist', '.git', '.husky', '.vscode', 'public', 'build', 'vite'],
		},
	},
	// css预设
	presets: [presetUno({ dark: 'class' }), presetRemToPx()],
	// unoCss 转换器
	transformers: [transformerDirectives()],
	// 规则
	rules: [],
	// 自定义预设别名
	shortcuts: {
		'wh-full': 'w-full h-full',
		'flex-center': 'flex justify-center items-center',
		'flex-col-center': 'flex-center flex-col',
		'flex-x-center': 'flex justify-center',
		'flex-y-center': 'flex items-center',
		'flex-between': 'flex-y-center justify-between',
		'i-flex-center': 'inline-flex justify-center items-center',
		'i-flex-x-center': 'inline-flex justify-center',
		'i-flex-y-center': 'inline-flex items-center',
		'flex-col': 'flex flex-col',
		'flex-col-stretch': 'flex-col items-stretch',
		'i-flex-col': 'inline-flex flex-col',
		'i-flex-col-stretch': 'i-flex-col items-stretch',
		'flex-1-hidden': 'flex-1 overflow-hidden',
		'absolute-lt': 'absolute left-0 top-0',
		'absolute-lb': 'absolute left-0 bottom-0',
		'absolute-rt': 'absolute right-0 top-0',
		'absolute-rb': 'absolute right-0 bottom-0',
		'absolute-tl': 'absolute-lt',
		'absolute-tr': 'absolute-rt',
		'absolute-bl': 'absolute-lb',
		'absolute-br': 'absolute-rb',
		'absolute-center': 'absolute-lt flex-center wh-full',
		'fixed-lt': 'fixed left-0 top-0',
		'fixed-lb': 'fixed left-0 bottom-0',
		'fixed-rt': 'fixed right-0 top-0',
		'fixed-rb': 'fixed right-0 bottom-0',
		'fixed-tl': 'fixed-lt',
		'fixed-tr': 'fixed-rt',
		'fixed-bl': 'fixed-lb',
		'fixed-br': 'fixed-rb',
		'fixed-center': 'fixed-lt flex-center wh-full',
		'nowrap-hidden': 'whitespace-nowrap overflow-hidden',
		'ellipsis-text': 'nowrap-hidden text-ellipsis',
		'page-card': 'flex-col overflow-hidden p-5 rounded color-text bg-card',
		'transition-base': 'transition-all duration-300 ease-in-out',
	},
	// 主题颜色
	theme: {
		colors: {
			primary: 'var(--el-color-primary)',
			primary_dark: 'var(--el-color-primary-light-5)',
			info: 'var(--el-color-info)',
			success: 'var(--el-color-success)',
			warning: 'var(--el-color-warning)',
			error: 'var(--el-color-error)',
			fill: 'var(--el-fill-color-light)',
			text: 'var(--el-text-color-primary)',
			card: 'var(--el-bg-color-overlay)',
			background: 'var(--el-bg-color)',
			borderColor: 'var(--el-border-color-lighter)',
		},
	},
});
