<template>
    <div class="login-container">
        <vue-particles
            id="tsparticles"
            :particles-init="particlesInit"
            :particles-loaded="particlesLoaded"
            :options="options"
        />
        <top-nav />
    </div>
</template>

<script setup lang="ts" name="Login">
import TopNav from './components/TopNav.vue';
// 粒子动画
import { loadSlim } from 'tsparticles-slim';
import { particles } from './helpers/particlesConfig';

const { options } = toRefs(particles);

const particlesInit = async engine => {
    await loadSlim(engine);
};

const particlesLoaded = async container => {
    console.log('Particles container loaded', container);
};
</script>

<style scoped lang="scss">
.login-container {
    @apply relative wh-full bg-cover bg-no-repeat bg-center-top;

    background-image: url('@/assets/images/background.svg');
}
</style>
