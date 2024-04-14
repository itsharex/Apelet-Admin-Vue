import viteCompression from 'vite-plugin-compression';

export default function createCompression(env: Record<string, string>) {
	const { VITE_BUILD_COMPRESS } = env;

	const gzipComPress = viteCompression({
		verbose: true, // 是否在控制台中输出压缩结果
		disable: false,
		threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
		algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
		ext: '.gz',
		deleteOriginFile: true, // 源文件压缩后是否删除
	});

	const brotliComPress = viteCompression({
		verbose: true, // 是否在控制台中输出压缩结果
		disable: false,
		threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
		algorithm: 'brotliCompress', // 压缩算法，可选['gzip'，' brotliCompress '，'deflate '，'deflateRaw']
		ext: '.br',
		deleteOriginFile: true, // 源文件压缩后是否删除
	});

	if (VITE_BUILD_COMPRESS === 'gzip') return gzipComPress;
	if (VITE_BUILD_COMPRESS === 'brotli') return brotliComPress;
	// 默认 gzip 压缩
	return gzipComPress;
}
