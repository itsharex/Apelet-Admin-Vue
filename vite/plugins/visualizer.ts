import { visualizer } from 'rollup-plugin-visualizer';

export default function createVisualizer(env?: Record<string, string>) {
    return visualizer({
        open: true,
        filename: 'visualizer.html' //分析图生成的文件名
    });
}
