import ElCustomTable from './src/ElCustomTable.vue';

export * from './src/interface';
export type { CustomTableProps } from './src/ElCustomTable.vue';
export { ElCustomTable };

/**
 * 二次封装ElTable表格，适用于普通、树形等场景，数据不易过多，否则页面卡顿明显，请考虑数据分页、过滤器等优化方案。
 * 若需要大数据量展示，且不用分页，请使用VxeTable 或 ElTableV2, 推荐： vxe-table。
 * 请注意： 即使虚拟化的表格是高效的，但是当数据负载过大时，网络和内存容量也会成为您应用程序的瓶颈。
 */
