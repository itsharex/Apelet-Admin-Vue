<template>
    <!-- 解决 Component inside `＜Transition＞` renders non-element root node that cannot be animated 问题 -->
    <div>
        <el-custom-table ref="customTableRef" :table-data="menuList" :table-columns :query-params>
            <template #operateButton>
                <el-button type="primary" plain>新 增</el-button>
                <el-button type="success" plain>修 改</el-button>
                <el-button type="warning" plain>导 出</el-button>
                <el-button type="danger" plain>删 除</el-button>
            </template>
            <template #routerNameHeader="scope">
                <el-button type="success">{{ scope.column.label }}</el-button>
            </template>
            <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-button type="primary" link>修 改</el-button>
                    <el-button type="primary" link>删 除</el-button>
                    <el-button type="primary" link>{{ scope.row.id }}</el-button>
                </template>
            </el-table-column>
        </el-custom-table>
    </div>
</template>

<script setup lang="tsx">
import { ResponseMenu } from '@/api/system/menu/types';
import { ColumnProps, ElCustomTable, ElCustomTableInstance } from '@/components/ElCustomTable';
import { useMenu } from './hooks/useMenu';

let customTableRef = ref<ElCustomTableInstance | null>(null);

// 不推荐使用 reactive() 的泛型参数，因为处理了深层次 ref 解包的返回值与泛型参数的类型不同, 而且也会导致TS类型报错。
// const tableColumns: Ref<ColumnProps<ResponseMenu>[]> = ref([})
const tableColumns: ColumnProps<ResponseMenu>[] = reactive([
    { type: 'index', label: '序号', width: 55 },
    { type: 'selection', fixed: 'left', width: 70 },
    { type: 'sortable', label: '拖拽排序', width: 100 },
    {
        type: 'expand',
        label: '展开',
        width: 85,
        renderer: scope => {
            return (
                <>
                    <el-text class="mx-1" type="success">
                        tsx渲染：{JSON.stringify(scope.row)}
                    </el-text>
                </>
            );
        }
    },
    { prop: 'id', label: '菜单id' },
    {
        prop: 'menuName',
        label: '菜单名称',
        search: {
            el: 'el-input',
            props: {
                type: 'text'
            },
            order: 2
        }
    },
    { prop: 'path', label: '菜单路径' },
    {
        prop: 'routerName',
        label: '路由名称',
        limitLine: true,
        popoverWidth: 200,
        lineClamp: 'line-clamp-2',
        dicts: [
            {
                label: '测试',
                value: 'ceshi'
            },
            {
                label: '测试2哦',
                value: 'ceshi2'
            }
        ],
        search: {
            el: 'el-select',
            tooltip: '路由名称，例如：MenuName',
            props: {
                clearable: true
                // 如果是级联框， 可以配置 props
                // props: {
                //     value: 'dictValue'
                // }
            },
            order: 1
        }
    },
    { prop: 'menuTypeStr', label: '菜单类型' },
    {
        prop: 'status',
        label: '菜单状态',
        dicts: [
            {
                dictValue: '0',
                dictLabel: '正常'
            },
            {
                dictValue: '1',
                dictLabel: '禁用'
            }
        ],
        search: {
            order: 3,
            // Vue3 的 TSX中可直接使用 v-model v-model={[queryParams.status, ['trim']] 为 v-model 的修饰符
            renderer: ({ queryParams, dicts }) => {
                return (
                    <>
                        <el-select v-model={queryParams.status} clearable>
                            {dicts.map(item => (
                                <el-option
                                    key={item.dictValue}
                                    value={item.dictValue}
                                    label={item.dictLabel}
                                ></el-option>
                            ))}
                        </el-select>
                    </>
                );
            }
        },
        renderer: scope => {
            return (
                <>
                    <el-switch
                        v-model={scope.row.status}
                        active-text={scope.row.status ? '正常' : '禁用'}
                        active-value={1}
                        inactive-value={0}
                    />
                </>
            );
        }
    }
]);

const { queryParams, menuList } = useMenu();
</script>
