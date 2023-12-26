<template>
    <div class="grid">
        <div class="item" v-for="(item, index) in images" :key="index">
            <img
                :src="item"
                :class="{ active: currIndex === index }"
                :style="{
                    transition: 'all 0.5s',
                    opacity: hoverIndex === -1 ? 1 : index === hoverIndex ? 1 : 0.2
                }"
                @mouseenter="handleMouseEnter(index)"
                @mouseleave="handleMouseLeave"
                @click="handleChange($event.target)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '@/store';
// 获取图片主色工具库
import ColorThief from 'colorthief';
import img01 from '@/assets/images/gradient/1.jpg';
import img02 from '@/assets/images/gradient/2.jpg';
import img03 from '@/assets/images/gradient/3.jpg';
import img04 from '@/assets/images/gradient/4.jpg';

const layoutStore = useLayoutStore();
const currIndex = computed(() => layoutStore.hoverIndex);

const hoverIndex = ref<number>(-1);
let images = ref<string[]>([img01, img02, img03, img04]);
const colorThief = new ColorThief();

const handleMouseEnter = async (i: number) => {
    hoverIndex.value = i;
};
const handleChange = async (target: EventTarget | null) => {
    let colors = await colorThief.getPalette(target, 3);
    colors = colors.map((c: number[]) => `rgb(${c[0]},${c[1]},${c[2]})`);
};
const handleMouseLeave = () => {
    hoverIndex.value = -1;
};
</script>

<style scoped lang="scss">
.grid {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    // justify-items: center; // 水平居中
    width: 100%;
    height: 180px;
    & .item {
        width: 100px;
        height: 80px;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s ease-in-out;
        & img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
    }
    & .item:hover {
        box-shadow: 0 0 5px 2px var(--el-color-primary);
    }
    .active {
        box-shadow: 0 0 7px 3px var(--el-color-primary);
    }
}
</style>
