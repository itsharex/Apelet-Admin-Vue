<template>
    <el-dialog v-model="dialogVisible" :title="form.title" width="500" @close="handleClose">
        <el-form
            ref="ruleFormRef"
            :model="form.row"
            :rules="rules"
            :disabled="form.view"
            :hide-required-asterisk="form.view"
            label-width="auto"
            label-position="left"
            label-suffix=":"
            status-icon
        >
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

type ParamsType = {
    title?: string;
    view: boolean;
    row: Partial<ResponseMenu>;
    api?: (params: any) => Promise<ApiResponse<ResponseMenu[]>>;
    getList?: () => void;
    close?: () => void;
};

const form = ref<ParamsType>({
    title: '',
    view: false,
    row: {}
});

const rules = reactive<FormRules<ResponseMenu>>({
    menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }]
});

let dialogVisible = ref(false);
const ruleFormRef = ref<FormInstance>();

const open = (params: ParamsType) => {
    form.value = params;
    dialogVisible.value = true;
};

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!');
            dialogVisible.value = false;
        } else {
            console.log('error submit!', fields);
        }
    });
};

const resetForm = () => {
    if (!ruleFormRef.value) return;
    dialogVisible.value = false;
    ruleFormRef.value.resetFields();
};

const handleClose = () => {
    resetForm();
    form.value.close?.();
};

defineExpose({
    open
});
</script>

<style></style>
