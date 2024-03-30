<template>
    <div>
        <!-- 解决 Component inside `＜Transition＞` renders non-element root node that cannot be animated 问题 -->
        <!-- 切勿将注释写在最外层下，否则vue会将该注释当做 fragment 格式 渲染，从而导致页面空白 -->
        <el-custom-table
            ref="customTableRef"
            :init-params="initParams"
            :table-columns="tableColumns"
            :request-api="getMenuList"
            :data-callback="dataCallBack"
        >
            <template #operateButton="scope">
                <el-button type="primary" plain :icon="Plus" @click="openDialog('新增')">新 增</el-button>
                <el-button
                    type="success"
                    plain
                    :icon="EditPen"
                    :disabled="scope.mutiple"
                    @click="openDialog('修改', scope.rows[0])"
                    >修 改</el-button
                >
                <el-button type="warning" plain :icon="Download">导 出</el-button>
                <el-button type="danger" plain :icon="Delete" :disabled="scope.single">删 除</el-button>
            </template>
            <template #routerNameHeader="scope">
                <el-button type="success">{{ scope.column.label }}</el-button>
            </template>
            <el-table-column fixed="right" label="操作" align="center" width="150">
                <template #default="scope">
                    <el-button type="primary" size="small" link :icon="EditPen" @click="openDialog('查看', scope.row)"
                        >查 看</el-button
                    >
                    <el-button type="primary" size="small" link :icon="EditPen" @click="openDialog('修改', scope.row)"
                        >修 改</el-button
                    >
                    <el-button type="primary" size="small" link :icon="Delete">删 除</el-button>
                </template>
            </el-table-column>
        </el-custom-table>
        <!-- 新增/修改 -->
        <MenuDialog ref="menuDialogRef" />
    </div>
</template>

<script setup lang="tsx">
import MenuDialog from './components/MenuDialog.vue';
import { Plus, EditPen, Delete, Download } from '@element-plus/icons-vue';
import { RequestMenu, ResponseMenu } from '@/api/system/menu/types';
import { ColumnProps, ElCustomTable, ElCustomTableInstance } from '@/components/ElCustomTable';
import { getMenuList } from '@/api/system/menu';

const customTableRef = ref<ElCustomTableInstance>();

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
    {
        prop: 'path',
        label: '菜单路径',
        search: {
            el: 'el-input',
            props: {
                type: 'text'
            },
            order: 4
        }
    },
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
            // tooltip: '路由名称，例如：MenuName',
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
        prop: 'menuTypeStr',
        label: '菜单类型',
        search: {
            el: 'el-select',
            props: {
                clearable: true
            },
            order: 5
        }
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

let initParams = ref<RequestMenu>({
    pageNum: 1,
    pageSize: 10
});

// 接口成功回调
const dataCallBack = (data: any) => {
    console.log('我是成功回调哦！数据在这里 --->', data);
    return data;
};

// 弹窗操作
const menuDialogRef = ref<InstanceType<typeof MenuDialog>>();
const openDialog = (title?: string, row?: ResponseMenu) => {
    let params = {
        title,
        view: title === '查看',
        row: { ...row },
        getList: customTableRef.value?.getList,
        close: customTableRef.value?.clearSelection
    };
    menuDialogRef.value?.open(params);
};
</script>
