<template>
	<el-dialog v-model="dialogVisible" :title="form.title" lose="handleClose">
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
			<el-form-item label="菜单类别" prop="menuSort">
				<el-select v-model="form.row.menuSort"> </el-select>
			</el-form-item>
			<el-form-item label="上级目录" prop="parentId">
				<el-tree-select
					v-model="form.row.parentId"
					:data="menuTrees"
					:props="defaultProps"
					clearable
					check-strictly
					:render-after-expand="false"
				/>
			</el-form-item>
			<el-form-item label="菜单图标" prop="menuIcon">
				<el-select v-model="form.row.menuIcon"> </el-select>
			</el-form-item>
			<el-form-item label="菜单类型" prop="menuType">
				<el-radio-group v-model="form.row.menuType">
					<el-radio :value="2">目录</el-radio>
					<el-radio :value="1">菜单</el-radio>
					<el-radio :value="0">按钮</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-row :gutter="20">
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="菜单名称" prop="menuName">
						<el-input v-model="form.row.menuName" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="locales键名" prop="localesKey">
						<el-input v-model="form.row.localesKey" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="路由名称" prop="routerName">
						<el-input v-model="form.row.routerName" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="路由地址" prop="path">
						<el-input v-model="form.row.path" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="组件路径" prop="component">
						<el-input v-model="form.row.component" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="菜单顺序" prop="orderNum">
						<el-input v-model="form.row.orderNum" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="是否外链" prop="isLink">
						<el-radio-group v-model="form.row.isLink">
							<el-radio :value="1">是</el-radio>
							<el-radio :value="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="外链地址" prop="linkSrc">
						<el-input v-model="form.row.linkSrc" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="是否内嵌iframe" prop="isFrame">
						<el-radio-group v-model="form.row.isFrame">
							<el-radio :value="1">是</el-radio>
							<el-radio :value="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="内嵌iframe地址" prop="iframeSrc">
						<el-input v-model="form.row.iframeSrc" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="是否隐藏" prop="hidden">
						<el-radio-group v-model="form.row.hidden">
							<el-radio :value="1">是</el-radio>
							<el-radio :value="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="是否缓存" prop="keepAlive">
						<el-radio-group v-model="form.row.keepAlive">
							<el-radio :value="1">是</el-radio>
							<el-radio :value="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="菜单状态" prop="status">
						<el-radio-group v-model="form.row.status">
							<el-radio :value="0">正常</el-radio>
							<el-radio :value="1">禁用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-form-item label="备注" prop="remark">
						<el-input v-model="form.row.remark" />
					</el-form-item>
				</el-col>
			</el-row>
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
	import { MenuInfo } from '@/api/system/menu/types';
	import type { FormInstance, FormRules } from 'element-plus';
	import { menuTreeselect } from '@/api/system/menu';

	interface RowType extends MenuInfo {
		menuIcon: string;
		hidden: number;
		keepAlive: number;
	}

	type ParamsType = {
		title?: string;
		view: boolean;
		row: Partial<RowType>;
		api?: (params: any) => Promise<ApiResponse<MenuInfo[]>>;
		getList?: () => void;
	};

	// 表单字段
	const form = ref<ParamsType>({
		title: '',
		view: false,
		row: {
			menuType: 2,
			hidden: 0,
			keepAlive: 1,
			status: 0,
		},
	});

	// 校验规则
	const rules = reactive<FormRules<Omit<RowType, 'children'>>>({
		menuSort: [{ required: true, message: '请选择菜单类别', trigger: 'change' }],
		menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
		menuType: [{ required: true, message: '请选择菜单类型', trigger: 'change' }],
		menuSort: [{ required: true, message: '请选择菜单类别', trigger: 'change' }],
		path: [{ required: true, message: '请输入路由地址', trigger: 'blur' }],
		component: [{ required: true, message: '请输入组件路径', trigger: 'blur' }],
		hidden: [{ required: true, message: '请选择是否隐藏', trigger: 'change' }],
		keepAlive: [{ required: true, message: '请选择是否缓存', trigger: 'change' }],
		status: [{ required: true, message: '请选择菜单状态', trigger: 'change' }],
	});

	let dialogVisible = ref(false);
	const ruleFormRef = ref<FormInstance>();

	const open = (params: ParamsType) => {
		form.value = params;
		Object.assign(form.value.row, params.row);
		dialogVisible.value = true;
	};

	// 获取菜单下拉树
	let menuTrees = ref<MenuInfo[]>([]);
	const defaultProps = reactive({
		value: 'id',
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
		open,
	});
</script>
