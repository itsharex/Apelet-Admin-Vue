<template>
	<div class="flex-center px-2">
		<div class="text-center px-2 py-0.5 m-2 cursor-pointer b-1 b-[var(--al-gradient-text-color)]">
			<span class="text-[var(--al-gradient-text-color)]">{{ $t('tools.dataScreen') }}</span>
		</div>
		<div
			class="m-2 text-center flex-center cursor-pointer"
			v-for="(item, index) in toolList"
			:key="index"
			@click="item.handle"
		>
			<el-icon color="var(--al-gradient-text-color)" size="16">
				<component :is="item.icon" />
			</el-icon>
			<span class="text-[var(--al-gradient-text-color)] pl-1">{{ $t(item.name) }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	const toolList = reactive([
		{
			icon: 'BellFilled',
			name: 'tools.todoMessage',
			handle: () => {},
		},
		{
			icon: 'UserFilled',
			name: 'tools.admin',
			handle: () => {},
		},
		{
			icon: 'SwitchButton',
			name: 'login.loginOut',
			handle: () => {},
		},
	]);
</script>

<style scoped lang="scss"></style>
