<template>
    <div class="h-full">
        <!-- 解决 Component inside `＜Transition＞` renders non-element root node that cannot be animated 问题 -->
        <!-- 切勿将注释写在最外层下，否则vue会将该注释当做 fragment 格式 渲染，从而导致页面空白 -->
        <el-custom-table
            ref="customTableRef"
            :init-params="initParams"
            :table-columns="tableColumns"
            :request-api="getUserList"
            :data-callback="dataCallBack"
            :tree-props="{ children: 'children' }"
            default-expand-all>
            <template #operateButton>
                <el-button type="primary" plain :icon="Plus" @click="openDialog('新增')">用户新增</el-button>
            </template>
            <el-table-column fixed="right" label="操作" align="center" width="150">
                <template #default="scope">
                    <el-button type="primary" size="small" link :icon="Plus" @click="openDialog('新增')">新 增</el-button>
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
    </div>
</template>

<script setup lang="tsx">
import { Plus, EditPen, Delete, View } from '@element-plus/icons-vue';
import { ColumnProps, ElCustomTable, ElCustomTableInstance } from '@/components/ElCustomTable';
import { getUserList } from '@/api/system/user';
import { useConfirm } from '@/hooks';
import { UserInfo } from '@/api/system/user/types';

const customTableRef = ref<ElCustomTableInstance>();

// 不推荐使用 reactive() 的泛型参数，因为处理了深层次 ref 解包的返回值与泛型参数的类型不同, 而且也会导致TS类型报错。
// const tableColumns: Ref<ColumnProps<MenuInfo>[]> = ref([})
const tableColumns: ColumnProps<UserInfo>[] = reactive([
    {
        type: 'selection',
        fixed: 'left',
        width: 55
    },
    {
        prop: 'userName',
        label: '用户名',
        search: {
            el: 'el-input',
            width: 100
        }
    },
    {
        prop: 'nickName',
        label: '用户昵称',
        search: {
            el: 'el-input',
            width: 100
        }
    },
    {
        prop: 'deptName',
        label: '部门名称',
        search: {
            el: 'el-select',
            width: 100
        }
    },
    {
        prop: 'phonenumber',
        label: '手机号',
        search: {
            el: 'el-input',
            width: 100
        }
    },
    {
        prop: 'email',
        label: '用户邮箱',
        search: {
            el: 'el-input',
            width: 100
        }
    },
    {
        prop: 'status',
        label: '状态',
        search: {
            el: 'el-select',
            width: 100
        }
    },
    {
        prop: 'createTime',
        label: '创建时间'
    }
]);

let initParams = ref<PageRequest>({
    pageNum: 1,
    pageSize: 10
});

// 接口成功回调
const dataCallBack = (data: UserInfo[]) => {
    return data.map(item => ({ ...item, deptName: item.dept?.deptName }));
};

const openDialog = (title?: string, row?: UserInfo) => {};

// 删除
const handleDelete = async (row: UserInfo | UserInfo[]) => {
    let userNames = Array.isArray(row) ? row.map(item => item.nickName).toString() : row.nickName;
    await useConfirm(getUserList, {}, `删除名称为 ${userNames} 的菜单`);
    customTableRef.value?.getList();
};
</script>
