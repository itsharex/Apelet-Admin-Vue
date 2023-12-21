<template>
	<div class="flex-center h-14 w-10 cursor-pointer hover:bg-fill" @click="openSetting">
		<Icon name="el-icon-setting" size="20" />
	</div>
</template>

<script setup lang="ts">
import mittBus from '@/utils/mittBus';

const openSetting = () => {
	mittBus.emit('openLayoutDrawer');
};
</script>

<style scoped lang="scss"></style>
