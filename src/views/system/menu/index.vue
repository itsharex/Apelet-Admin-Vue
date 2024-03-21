<template>
    <el-custom-table ref="customTableRef" :columns="columns" :table-data="menuList">
        <template #operateButton>
            <el-button type="primary">新增</el-button>
            <el-button type="success">修改</el-button>
            <el-button type="warning">导出</el-button>
            <el-button type="danger">删除</el-button>
        </template>
    </el-custom-table>
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

const columns = reactive<Array<ColumnProps<ResponseMenu>>>([
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
