<template>
	<el-dropdown trigger="click" @command="handleCommand">
		<span class="flex-center h-14 p-3 cursor-pointer hover:bg-fill">
			<el-avatar :src="avatar" class="shrink-0 mr-2" />
			<span>admin</span>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
				<el-dropdown-item command="logout" divided>退出</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
	import avatar from '@/assets/images/avatar.jpg';
	import { useUserStore } from '@/store';

	const userStore = useUserStore();

	const handleCommand = (command: string) => {
		switch (command) {
			case 'logout':
				logout();
				break;
			case 'userCenter':
				break;
		}
	};

	const logout = () => {
		userStore.logout();
		location.href = '/login';
	};
</script>

<style scoped lang="scss"></style>
