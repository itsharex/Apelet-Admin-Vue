<template>
    <div class="login-container">
        <Particles id="ts-particles" class="login-particles" :options="options" />
    </div>
</template>

<script setup lang="ts" name="Login">
import { particles } from './helpers/particlesConfig';

const options = toRefs(particles);
</script>

<style scoped lang="scss">
.login-container {
    @apply flex-center;
}
.login-particles {
    @apply relative wh-full bg-cover dark bg-no-repeat bg-center-top;

    background-image: url('@/assets/images/background.svg');
}
</style>
