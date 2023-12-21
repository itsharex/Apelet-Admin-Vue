<template>
	<div>
		<div class="item btn">
			<span>数据大屏</span>
		</div>
		<div class="item">
			<el-icon><BellFilled /></el-icon>
			<span>待办消息</span>
		</div>
		<div class="item">
			<el-icon><UserFilled /></el-icon>
			<span>系统管理员</span>
		</div>
		<div class="item">
			<el-icon><SwitchButton /></el-icon>
			<span>退出</span>
		</div>
		<div class="item" @click="openSetting">
			<el-icon><Tools /></el-icon>
			<span>设置</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus';

const openSetting = () => {
	mittBus.emit('openLayoutDrawer');
};
</script>

<style scoped lang="scss"></style>
