import axios, { AxiosResponse, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { useUserStore } from '@/store';
import { ElNotification } from 'element-plus';

// 自定义请求接口headers头参数类型
type RequestHeader = AxiosRequestHeaders & { token?: string };

// 自定义请求接口request参数类型，可以加一些自己自定义的参数
interface RequestConfig extends AxiosRequestConfig {
    // 放入请求头
    headers?: RequestHeader;
}
interface RequestInterceptorsConfig extends RequestConfig {
    // 请求拦截器使用
    headers: RequestHeader;
}

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
});

service.interceptors.request.use((config: RequestInterceptorsConfig) => {
    const userStore = useUserStore();
    if (userStore.token) {
        config.headers['token'] = userStore.token;
    }
    return config;
});

service.interceptors.response.use(
    (response: AxiosResponse) => {
        // 设置默认状态码
        const code = response.data.code || 200;
        // 获取错误信息
        const msg = response.data.msg;
        if (code !== 200) {
            ElNotification.error({ title: msg });
            return Promise.reject('error');
        } else {
            return Promise.resolve(response);
        }
    },
    (err: AxiosResponse) => {
        return Promise.reject(err);
    }
);

// 传入泛型约束返回数据类型
// ApiResponse 主体后端返回格式
interface ApiResponse<T = any> {
    code: number;
    msg: string;
    data: T; // 这里定义请求返回data数据类型
}
export default async function request<T>(config: RequestConfig) {
    // axios实例的 request 接受的第一个泛型参数，就是返回数据data的类型
    return service.request<ApiResponse<T>>(config).then(res => res.data); // 返回axios的里data数据
}
