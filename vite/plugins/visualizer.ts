import { visualizer } from 'rollup-plugin-visualizer';

export default function createVisualizer() {
    return visualizer({
        open: true,
        filename: 'visualizer.html' //分析图生成的文件名
    });
}
