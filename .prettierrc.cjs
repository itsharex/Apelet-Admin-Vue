// @see: https://prettier.nodejs.cn/docs/en/options.html

/**
 * 配置文件
 */
module.exports = {
	// 指定最大换行长度  在代码样式指南中，最大行长度规则通常设置为 100 或 120
	printWidth: 120,
	// 缩进制表符宽度 | 空格数
	tabWidth: 4,
	// 使用制表符而不是空格缩进行 (true：制表符，false：空格)
	useTabs: true,
	// 结尾不用分号 (true：有，false：没有)
	semi: true,
	// 使用单引号 (true：单引号，false：双引号)
	singleQuote: true,
	// 在对象字面量中决定是否将属性名用引号括起来 可选值 "<as-needed|consistent|preserve>"
	/**
        "as-needed" - 仅在需要时在对象属性周围添加引号。
        "consistent" - 如果一个对象中至少有一个属性需要引号，请引用所有属性。
        "preserve" - 尊重对象属性中引号的输入使用。
     */
	quoteProps: 'as-needed',
	// 在JSX中使用单引号而不是双引号 (true：单引号，false：双引号)
	jsxSingleQuote: false,
	// 多行时,最后一行是否需要尾随逗号 可选值"<none|es5|all>"
	trailingComma: 'none',
	// 在对象，数组括号与文字之间加空格 "{ foo: bar }" (true：有，false：没有)
	bracketSpacing: true,
	// 将 > 多行元素放在最后一行的末尾，而不是单独放在下一行 (true：放末尾，false：单独一行)
	bracketSameLine: true,
	// (x) => {} 箭头函数参数只有一个时是否要有小括号 (avoid：省略括号，always：不省略括号)
	arrowParens: 'avoid',
	// 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码 (rangeStart：开始，rangeEnd：结束)
	rangeStart: 0,
	rangeEnd: Infinity,
	// 指定要使用的解析器，不需要写文件开头的 @prettier
	requirePragma: false,
	// 可以在文件顶部插入一个特殊标记，指定该文件已使用 Prettier 格式化
	insertPragma: false,
	// 用于控制文本是否应该被换行以及如何进行换行
	/**
        "always" - 如果散文超出打印宽度，则将其换行。
        "never" - 将每一段散文拆成一行。
        "preserve" - 什么都不做，让散文保持原样。 在 v1.9.0 中首次可用
     */
	proseWrap: 'preserve',
	// 在html中空格是否是敏感的 "css" - 遵守 CSS 显示属性的默认值， "strict" - 空格被认为是敏感的 ，"ignore" - 空格被认为是不敏感的
	htmlWhitespaceSensitivity: 'css',
	// 控制在 Vue 单文件组件中 <script> 和 <style> 标签内的代码缩进方式
	/**
        false - 不要在 Vue 文件中缩进脚本和样式标签。
        true - 在 Vue 文件中缩进脚本和样式标签
     */
	vueIndentScriptAndStyle: false,
	// 换行符使用 lf 结尾是 可选值 "<auto|lf|crlf|cr>"
	endOfLine: 'auto'

	/**
        其余请看 Prettier中文网
    */
};
