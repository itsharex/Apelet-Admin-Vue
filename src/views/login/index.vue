<template>
    <div class="login-container">
        <Particles id="ts-particles" />
    </div>
</template>

<script setup lang="ts" name="Login"></script>

<style scoped lang="scss">
.login-container {
    @apply relative wh-full bg-cover dark:bg-#101628 bg-no-repeat bg-center-top;

    background-image: url('@/assets/images/background.svg');
}
</style>
