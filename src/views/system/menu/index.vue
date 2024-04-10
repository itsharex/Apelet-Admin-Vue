<template>
    <div class="h-full">
        <!-- 解决 Component inside `＜Transition＞` renders non-element root node that cannot be animated 问题 -->
        <MenuDialog ref="menuDialogRef" />
    </div>
</template>

<script setup lang="tsx">
import MenuDialog from './components/MenuDialog.vue';
import { Plus, EditPen, Delete, View } from '@element-plus/icons-vue';
import { MenuInfo } from '@/api/system/menu/types';
import { ColumnProps, ElCustomTable, ElCustomTableInstance } from '@/components/ElCustomTable';
import { getMenuList } from '@/api/system/menu';
import { useConfirm } from '@/hooks';

const customTableRef = ref<ElCustomTableInstance>();

// 不推荐使用 reactive() 的泛型参数，因为处理了深层次 ref 解包的返回值与泛型参数的类型不同, 而且也会导致TS类型报错。
// const tableColumns: Ref<ColumnProps<MenuInfo>[]> = ref([})
const tableColumns: ColumnProps<MenuInfo>[] = reactive([
    {
        prop: 'menuName',
        label: '菜单名称',
        align: 'left',
        search: {
            el: 'el-input',
            props: {
                type: 'text'
            },
            order: 2
        }
    },
    {
        prop: 'routerName',
        label: '路由名称',
        search: {
            el: 'el-input',
            props: {
                type: 'text'
            },
            order: 3
        }
    },
    {
        prop: 'permission',
        label: '按钮权限',
        limitLine: true,
        popoverWidth: 200,
        lineClamp: 'line-clamp-2'
    },
    {
        prop: 'menuSort',
        label: '菜单类别',
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
    {
        prop: 'menuType',
        label: '菜单类型',
        search: {
            el: 'el-select',
            props: {
                clearable: true
            },
            order: 4
        }
    },
    {
        prop: 'orderNum',
        label: '排序'
    },
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
            order: 5,
            // Vue3 的 TSX中可直接使用 v-model v-model={[queryParams.status, ['trim']] 为 v-model 的修饰符
            renderer: ({ queryParams, dicts }) => {
                return (
                    <>
                        <el-select v-model={queryParams.status} clearable>
                            {dicts.map(item => (
                                <el-option key={item.dictValue} value={item.dictValue} label={item.dictLabel}></el-option>
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

let initParams = ref<PageRequest>({
    pageNum: 1,
    pageSize: 10
});
</script>
