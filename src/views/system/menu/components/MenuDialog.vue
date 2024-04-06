<template>
    <el-dialog v-model="dialogVisible" :title="form.title" width="60%" @close="handleClose">
        <el-form
            ref="ruleFormRef"
            :model="form.row"
            :rules="rules"
            :disabled="form.view"
            :hide-required-asterisk="form.view"
            label-width="auto"
            label-position="left"
            label-suffix=":"
            status-icon>
            <el-form-item label="上级目录" prop="parentId">
                <el-tree-select
                    v-model="form.row.parentId"
                    :data="menuTrees"
                    :props="defaultProps"
                    clearable
                    check-strictly
                    :render-after-expand="false" />
            </el-form-item>
            <el-form-item label="菜单图标" prop="menuIcon">
                <el-select v-model="form.row.menuIcon"> </el-select>
            </el-form-item>
            <el-form-item label="菜单类型" prop="menuType">
                <el-radio-group v-model="form.row.menuType">
                    <el-radio :value="1">目录</el-radio>
                    <el-radio :value="2">菜单</el-radio>
                    <el-radio :value="0">按钮</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单名称" prop="menuName">
                <el-input v-model="form.row.menuName" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button v-if="!form.view" type="primary" @click="submitForm(ruleFormRef)"> 保 存 </el-button>
                <el-button @click="resetForm">取 消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ResponseMenu } from '@/api/system/menu/types';
import type { FormInstance, FormRules } from 'element-plus';
import { menuTreeselect } from '@/api/system/menu';

type ParamsType = {
    title?: string;
    view: boolean;
    row: Partial<ResponseMenu>;
    api?: (params: any) => Promise<ApiResponse<ResponseMenu[]>>;
    getList?: () => void;
};

// 表单字段
const form = ref<ParamsType>({
    title: '',
    view: false,
    row: {}
});

// 校验规则
const rules = reactive<FormRules<Omit<ResponseMenu, 'children'>>>({
    menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }]
});

let dialogVisible = ref(false);
const ruleFormRef = ref<FormInstance>();

const open = (params: ParamsType) => {
    form.value = params;
    form.value.row.menuType = form.value.row.menuType || 1;
    dialogVisible.value = true;
};

// 获取菜单下拉树
let menuTrees = ref<ResponseMenu[]>([]);
const defaultProps = reactive({
    value: 'id'
});
const getMenuTreeSelect = async () => {
    const { data } = await menuTreeselect();
    menuTrees.value = data;
};

// 提交
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            handleClose();
            form.value.getList && form.value.getList();
        } else {
            console.log('error submit!', fields);
        }
    });
};

// 重置校验
const resetForm = () => {
    if (!ruleFormRef.value) return;
    dialogVisible.value = false;
    ruleFormRef.value.resetFields();
};

const handleClose = () => {
    resetForm();
};

onMounted(() => {
    getMenuTreeSelect();
});

defineExpose({
    open
});
</script>
