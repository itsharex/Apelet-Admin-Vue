<template>
	<el-dropdown trigger="click">
		<span class="flex-center h-14 p-3 cursor-pointer hover:bg-fill">
			<el-avatar :src="avatar" class="shrink-0 mr-2" />
			<span>admin</span>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item>个人中心</el-dropdown-item>
				<el-dropdown-item divided>退出</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import avatar from '@/assets/images/avatar.jpg';
</script>

<style scoped lang="scss"></style>
