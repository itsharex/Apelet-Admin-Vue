<template>
    <div>
        <custom-table :table-data="ArticleList"></custom-table>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { CustomTable } from '@/components/CustomTable';

type Article = {
    body: string;
    id: number;
    title: string;
    userId: number;
};

let ArticleList = ref<Article[]>([]);

const getList = async () => {
    let res = await axios.get('http://jsonplaceholder.typicode.com/posts');
    ArticleList.value = res.data as Article[];
};

onMounted(async () => {
    getList();
});
</script>
