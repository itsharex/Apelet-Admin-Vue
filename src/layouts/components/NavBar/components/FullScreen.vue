<template>
	<div class="flex-center h-14 w-10 cursor-pointer hover:bg-fill" @click="handleFull">
		<svg-icon :name="!isFullscreen ? 'fullscreen' : 'fullscreen-exit'" width="20" height="20" />
	</div>
</template>

<script lang="ts" setup>
	import { useFullscreen } from '@vueuse/core';

	const { isFullscreen, enter, exit } = useFullscreen();
	// 是否全屏
	const handleFull = () => (isFullscreen.value ? exit() : enter());
</script>

<style lang="scss" scoped></style>
