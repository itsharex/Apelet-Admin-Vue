<template>
    <div>
        <!-- 解决 Component inside `＜Transition＞` renders non-element root node that cannot be animated 问题 -->
        <!-- 切勿将注释写在最外层下，否则vue会将该注释当做 fragment 格式 渲染，从而导致页面空白 -->
        <el-custom-table
            ref="customTableRef"
            row-key="menuId"
            :init-params="initParams"
            :table-columns="tableColumns"
            :pagination="false"
            :offsetHeight="38"
            :request-api="getMenuList"
            :data-callback="dataCallBack"
            :tree-props="{ children: 'children' }"
            default-expand-all>
            <template #operateButton>
                <el-button type="primary" plain :icon="Plus" @click="openDialog('新增')">菜单新增</el-button>
                <!-- <el-button
                    type="success"
                    plain
                    :icon="EditPen"
                    :disabled="scope.mutiple"
                    @click="openDialog('修改', scope.rows[0])"
                    >修 改</el-button
                >
                <el-button type="danger" plain :icon="Delete" :disabled="scope.single" @click="handleDelete(scope.rows)"
                    >删 除</el-button
                > -->
            </template>
            <el-table-column fixed="right" label="操作" align="center" width="150">
                <template #default="scope">
                    <el-button type="primary" size="small" link :icon="Plus" @click="openDialog('修改', scope.row)"
                        >新 增</el-button
                    >
                    <el-button type="primary" size="small" link :icon="View" @click="openDialog('查看', scope.row)"
                        >查 看</el-button
                    >
                    <el-button type="primary" size="small" link :icon="EditPen" @click="openDialog('修改', scope.row)"
                        >修 改</el-button
                    >
                    <el-button type="primary" size="small" link :icon="Delete" @click="handleDelete(scope.row)">删 除</el-button>
                </template>
            </el-table-column>
        </el-custom-table>
        <!-- 新增/修改 -->
        <MenuDialog ref="menuDialogRef" />
    </div>
</template>

<script setup lang="tsx">
import MenuDialog from './components/MenuDialog.vue';
import arrayToTree from 'array-to-tree';
import { Plus, EditPen, Delete, View } from '@element-plus/icons-vue';
import { ResponseMenu } from '@/api/system/menu/types';
import { ColumnProps, ElCustomTable, ElCustomTableInstance } from '@/components/ElCustomTable';
import { getMenuList } from '@/api/system/menu';
import { useConfirm } from '@/hooks';

const customTableRef = ref<ElCustomTableInstance>();

// 不推荐使用 reactive() 的泛型参数，因为处理了深层次 ref 解包的返回值与泛型参数的类型不同, 而且也会导致TS类型报错。
// const tableColumns: Ref<ColumnProps<ResponseMenu>[]> = ref([})
const tableColumns: ColumnProps<ResponseMenu>[] = reactive([
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

// 接口成功回调
const dataCallBack = (data: ResponseMenu[]) => {
    // console.log('我是成功回调哦！数据在这里 --->', data);
    return arrayToTree(data, {
        parentProperty: 'parentId',
        customID: 'menuId'
    });
};

// 弹窗操作
const menuDialogRef = ref<InstanceType<typeof MenuDialog>>();
const openDialog = (title?: string, row?: ResponseMenu) => {
    let params = {
        title,
        view: title === '查看',
        row: { ...row },
        getList: customTableRef.value?.getList
    };
    menuDialogRef.value?.open(params);
};

// 删除
const handleDelete = async (row: ResponseMenu | ResponseMenu[]) => {
    let menuNames = Array.isArray(row) ? row.map(item => item.menuName).toString() : row.menuName;
    await useConfirm(getMenuList, {}, `删除名称为 ${menuNames} 的菜单`);
    customTableRef.value?.getList();
};
</script>
