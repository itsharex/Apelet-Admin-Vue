<template>
    <!-- 解决 Component inside `＜Transition＞` renders non-element root node that cannot be animated 问题 -->
    <div>
        <el-custom-table ref="customTableRef" :table-columns="tableColumns" :table-data="menuList">
            <template #operateButton>
                <el-button type="primary">新增</el-button>
                <el-button type="success">修改</el-button>
                <el-button type="warning">导出</el-button>
                <el-button type="danger">删除</el-button>
            </template>
            <template #routerNameHeader="scope">
                <el-button type="success">{{ scope.column.label }}</el-button>
            </template>
        </el-custom-table>
    </div>
</template>

<script setup lang="tsx">
import { getMenuList } from '@/api/system/menu';
import { RequestMenu, ResponseMenu } from '@/api/system/menu/types';
import { ColumnProps, ElCustomTable } from '@/components/ElCustomTable';

let queryParams = reactive<RequestMenu>({
    pageNum: 1,
    pageSize: 10
});

let menuList = ref<ResponseMenu[]>([]);

// 不推荐使用 reactive() 的泛型参数，因为处理了深层次 ref 解包的返回值与泛型参数的类型不同, 而且也会导致TS类型报错。
const tableColumns: ColumnProps<ResponseMenu>[] = reactive([
    { type: 'index', label: '序号', width: 55 },
    { type: 'selection', fixed: 'left', width: 70 },
    { type: 'sortable', label: '拖拽排序', width: 100 },
    { type: 'expand', label: '展开', width: 85 },
    { prop: 'id', label: '菜单id' },
    { prop: 'menuName', label: '菜单名称' },
    { prop: 'path', label: '菜单路径' },
    { prop: 'routerName', label: '路由名称' },
    { prop: 'menuTypeStr', label: '菜单类型' },
    {
        prop: 'status',
        label: '菜单状态',
        renderer: scope => {
            return (
                <>
                    <el-switch
                        model-value={scope.row.status}
                        active-text={scope.row.status ? '正常' : '禁用'}
                        active-value={1}
                        inactive-value={0}
                        onChange={(value: number) => (scope.row.status = value)}
                    />
                </>
            );
        }
    }
]);

const getList = async () => {
    let { data } = await getMenuList(queryParams);
    menuList.value = data;
};

onMounted(async () => {
    getList();
});
</script>
