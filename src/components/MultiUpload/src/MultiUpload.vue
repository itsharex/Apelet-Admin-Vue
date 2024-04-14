<template>
	<el-upload
		v-model:file-list="fileList"
		class="upload-demo"
		multiple
		:method="requestMethod"
		:limit="limit"
		:drag="drag"
		:data="params"
		:disabled="disabled"
		:show-file-list="showFileList"
		:before-upload="beforeUpload"
		:on-preview="handlePreview"
		:on-remove="handleRemove"
		:before-remove="beforeRemove"
		:on-success="handleSuccess"
		:on-error="handleError"
		:on-exceed="handleExceed"
	>
		<el-button type="primary" :size="size" :disabled="disabled">{{ btnText }}</el-button>
		<template #tip>
			<div class="el-upload__tip">
				请上传格式为
				<span class="upload-desc">{{ currFileType }}</span>
				<br />
				大小不超过
				<span class="upload-desc">{{ fileSize }}M</span>
				的文件
			</div>
		</template>
	</el-upload>
</template>

<script setup lang="ts" name="MultiUpload">
	import { ElMessageBox, UploadFile, UploadFiles, UploadProps, UploadRawFile, UploadUserFile } from 'element-plus';
	import { Awaitable, EpPropMergeType } from 'element-plus/es/utils';

	const props = withDefaults(
		defineProps<{
			// 文件列表
			fileList: UploadUserFile[];
			// 文件个数
			limit: number;
			// 按钮文字
			btnText: string;
			// 按钮大小
			size?: EpPropMergeType<StringConstructor, '' | 'default' | 'small' | 'large', never>;
			// 文件格式
			fileType: string[];
			// 文件大小
			fileSize: number;
			// 请求方式
			requestMethod: string;
			// 请求头
			requestHeader: any;
			// 是否显示已上传文件列表
			showFileList: boolean;
			// 是否启用拖拽上传
			drag: boolean;
			// 上传参数
			params: any;
			// 是否禁用
			disabled: boolean;
		}>(),
		{
			fileList: () => [],
			limit: 1,
			btnText: '上传文件',
			size: 'default',
			fileType: () => ['doc', 'docx', 'pdf'],
			fileSize: 20,
			requestMethod: 'post',
			requestHeader: () => {},
			showFileList: true,
			drag: false,
			params: () => {},
			disabled: false,
		},
	);

	const { fileList, fileType } = toRefs(props);

	// 文件格式
	const currFileType = computed(() => {
		return fileType.value && fileType.value.join('、');
	});

	// 上传文件之前的钩子
	const beforeUpload: UploadProps['beforeUpload'] = (rawFile: UploadRawFile) => {
		console.log(rawFile);
	};
	// 删除文件之前的钩子
	const beforeRemove: UploadProps['beforeRemove'] = (
		uploadFile: UploadFile,
		uploadFiles: UploadFiles,
	): Awaitable<boolean> => {
		return ElMessageBox.confirm(`Cancel the transfer of ${uploadFile.name} ${uploadFiles} ?`).then(
			() => true,
			() => false,
		);
	};
	// 点击文件列表中已上传的文件时的钩子
	const handlePreview: UploadProps['onPreview'] = (uploadFile: UploadFile) => {
		console.log(uploadFile);
	};

	// 文件列表移除文件时的钩子
	const handleRemove: UploadProps['onRemove'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
		console.log(uploadFile, uploadFiles);
	};
	// 文件上传成功时的钩子
	const handleSuccess: UploadProps['onSuccess'] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
		console.log(response, uploadFile, uploadFiles);
	};

	// 文件上传失败时的钩子
	const handleError: UploadProps['onError'] = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
		console.log(error, uploadFile, uploadFiles);
	};

	// 当超出限制时，执行的钩子函数
	const handleExceed: UploadProps['onExceed'] = (files: File[], uploadFiles: UploadUserFile[]) => {
		console.log(files, uploadFiles);
	};
</script>

<style scoped lang="scss"></style>
