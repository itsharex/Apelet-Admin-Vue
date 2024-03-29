/// <reference types="vite/client" />

import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

declare global {
    // 自定义请求接口headers头参数类型
    type RequestHeader = AxiosRequestHeaders & { token?: string };

    // 自定义请求接口request参数类型，可以加一些自己自定义的参数
    interface RequestConfig extends AxiosRequestConfig {
        // 放入请求头
        headers?: RequestHeader;
    }
    // 请求拦截器类型
    interface RequestInterceptorsConfig extends RequestConfig {
        // 请求拦截器使用
        headers: RequestHeader;
    }

    // 传入泛型约束返回数据类型
    // ApiResponse 主体后端返回格式
    interface ApiResponse<T = any> {
        code: number;
        msg: string;
        data: T; // 这里定义请求返回data数据类型
        total: number;
    }

    interface PageRequest {
        pageNum: number;
        pageSize: number;
    }
}
