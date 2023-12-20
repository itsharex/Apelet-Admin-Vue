<template>
    <div class="h-full">
        <el-card shadow="never">
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="16">
                    <div class="flex items-center h-full">
                        <img src="@/assets/images/avatar.jpg" class="w-20 rounded-full px-3" alt="avatar" />
                        <div class="flex-col justify-around">
                            <h3 class="font-bold text-lg">Admin, 欢迎你!</h3>
                            <span class="text-gray text-sm">
                                一天写点，天天写点，不知道写了个啥，今天在下雪，天气很冷!
                            </span>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="8">
                    <div class="h-full flex-center justify-around py-4">
                        <div class="flex-col-center">
                            <span class="text-zinc-500">项目数</span>
                            <span class="text-6 font-medium">16</span>
                        </div>
                        <div class="flex-col-center">
                            <span class="text-zinc-500">待办任务</span>
                            <span class="text-6 font-medium">10/<span class="text-zinc-500">24</span></span>
                        </div>
                        <div class="flex-col-center">
                            <span class="text-zinc-500">项目访问</span>
                            <span class="text-6 font-medium">2,222</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <el-row :gutter="10" class="my-4">
            <el-col :xs="24" :lg="16">
                <el-card shadow="never">
                    <div class="flex justify-between relative">
                        <h3 class="font-semibold text-base antialiased ml-4 title-before">进行中的项目</h3>
                        <el-link type="primary" :underline="false">全部项目</el-link>
                    </div>
                    <div
                        class="grid gap-8 py-4 <lg:grid-cols-2 <sm:grid-cols-1 <md:grid-cols-2 <xl:grid-cols-2 grid-cols-3"
                    >
                        <div v-for="(item, index) in projectList" :key="index">
                            <div class="flex items-center">
                                <Icon :name="item.icon" size="20" color="var(--el-color-primary)" />
                                <span class="pl-2 font-700">{{ item.projectName }}</span>
                            </div>
                            <p class="text-gray py-2 <sm:truncate">{{ item.projectDesc }}</p>
                            <div class="flex justify-between">
                                <span class="text-neutral-500">{{ item.author }}</span>
                                <span class="text-neutral-400">{{ item.createTime }}</span>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :lg="8">
                <el-card shadow="never">
                    <div class="flex justify-between relative">
                        <h3 class="font-semibold text-base antialiased ml-4 title-before">项目指数</h3>
                    </div>
                    <div></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="10" class="my-4">
            <el-col :span="16" :xs="24">
                <el-card shadow="never"></el-card>
            </el-col>
            <el-col :span="8" :xs="24">
                <el-card shadow="never"></el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
const projectList = reactive([
    {
        icon: 'el-icon-checked',
        projectName: '消息列表体验优化',
        projectDesc: '这是一条描述信息这是一条描述信息这是一条描述信息',
        author: '特怪小分队',
        createTime: '2小时前'
    },
    {
        icon: 'el-icon-checked',
        projectName: 'xx 平台',
        projectDesc: '这是一条描述信息这是一条描述信息这是一条描述信息',
        author: '特怪小分队',
        createTime: '2小时前'
    },
    {
        icon: 'el-icon-checked',
        projectName: '5月日常小需求',
        projectDesc: '这是一条描述信息这是一条描述信息这是一条描述信息',
        author: '特怪小分队',
        createTime: '2小时前'
    },
    {
        icon: 'el-icon-checked',
        projectName: '功能效能',
        projectDesc: '这是一条描述信息这是一条描述信息这是一条描述信息',
        author: '特怪小分队',
        createTime: '2小时前'
    },
    {
        icon: 'el-icon-checked',
        projectName: '智能运营中心',
        projectDesc: '这是一条描述信息这是一条描述信息这是一条描述信息',
        author: '特怪精英战队',
        createTime: '2小时前'
    },
    {
        icon: 'el-icon-checked',
        projectName: 'bug处理',
        projectDesc: '这是一条描述信息这是一条描述信息这是一条描述信息',
        author: '特怪二分队',
        createTime: '2小时前'
    }
]);
</script>

<style scoped lang="scss"></style>
