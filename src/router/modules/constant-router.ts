import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layouts/index.vue';

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Layout',
        redirect: '/index',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Index',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    icon: 'HomeFilled',
                    hidden: false,
                    title: 'homepage',
                    isCache: true,
                    isFixed: true
                }
            },
            {
                path: 'dashboard',
                name: 'DashBoard',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    icon: 'HomeFilled',
                    hidden: false,
                    title: 'dashboard',
                    isCache: true
                }
            }
        ],
        meta: {
            icon: 'HomeFilled',
            hidden: false,
            title: 'homepage'
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
