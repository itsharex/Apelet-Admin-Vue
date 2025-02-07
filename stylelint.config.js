// @ts-check

/** @type {import("stylelint").Config} */
export default {
	// 继承推荐规范配置
	extends: [
		'stylelint-config-standard',
		'stylelint-config-html/vue',
		'stylelint-config-standard-scss',
		'stylelint-config-recommended-vue/scss',
		'stylelint-config-recess-order',
	],
	// 指定不同文件对应的解析器
	overrides: [
		{
			files: ['**/*.(css|html|vue)'],
			customSyntax: 'postcss-html',
		},
	],
	// 自定义规则
	rules: {
		'property-no-unknown': null, // 禁止未知的属性
		'no-empty-source': null, // 禁止空源码
		'no-descending-specificity': null, // 不允许较低特异性的选择器出现在覆盖较高特异性的选择器
		'value-keyword-case': null, // 解决在 scss 中使用 v-bind 大写单词报错
		'selector-class-pattern': null, // 强制选择器类名的格式
		'font-family-no-missing-generic-family-keyword': null, // 禁止在字体族名称列表中缺少通用字体族关键字
		'selector-pseudo-class-no-unknown': [
			// 禁止未知的伪类选择器。
			true,
			{
				ignorePseudoClasses: ['global', 'v-deep', 'deep', 'export'],
			},
		],
	},
	// 排除文件
	ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.d.ts'],
};
