<template>
    <div>
        <el-custom-table :table-data="ArticleList">
            <template #operateButton>
                <el-button type="primary">Primary</el-button>
                <el-button type="success">Success</el-button>
                <el-button type="info">Info</el-button>
                <el-button type="warning">Warning</el-button>
                <el-button type="danger">Danger</el-button>
            </template>
            <el-table-column prop="title" label="文章标题"></el-table-column>
            <el-table-column prop="body" label="文章内容"></el-table-column>
        </el-custom-table>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ElCustomTable } from '@/components/ElCustomTable';

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
