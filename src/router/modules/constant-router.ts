import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layouts/index.vue';

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/index',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'HomePage',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    icon: 'HomeFilled',
                    hidden: false,
                    title: 'homepage',
                    isCache: true,
                    isFixed: true
                }
            }
        ]
    },
    {
        path: '/workbench',
        name: 'WorkBench',
        redirect: '/workbench/dashboard',
        component: Layout,
        children: [
            {
                path: 'dashboard',
                name: 'DashBoard',
                component: () => import('@/views/workbench/dashboard/index.vue'),
                meta: {
                    icon: 'Odometer',
                    hidden: false,
                    title: 'dashboard',
                    isCache: true,
                    isFixed: true
                }
            },
            {
                path: 'analysis',
                name: 'Analysis',
                component: () => import('@/views/workbench/analysis/index.vue'),
                meta: {
                    icon: 'PieChart',
                    hidden: false,
                    title: 'analysis',
                    isCache: true
                }
            }
        ],
        meta: {
            icon: 'Platform',
            hidden: false,
            title: 'workbench'
        }
    },
    {
        path: '/audit',
        name: 'Audit',
        redirect: '/audit/internal',
        component: Layout,
        children: [
            {
                path: 'internal',
                name: 'Internal',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    icon: 'HomeFilled',
                    hidden: false,
                    title: 'internal'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            hidden: true,
            title: 'login'
        }
    }
];

export const errorRoutes: Array<RouteRecordRaw> = [
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/error/404.vue'),
        meta: {
            hidden: true,
            title: '网页走丢了~'
        }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/error/404.vue'),
        meta: {
            hidden: true,
            title: '404'
        }
    }
];
