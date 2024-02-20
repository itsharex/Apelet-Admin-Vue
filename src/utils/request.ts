import axios, { AxiosResponse, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { useUserStore } from '@/store';
import { ElMessageBox, ElNotification } from 'element-plus';

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

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
});

service.interceptors.request.use(
    (config: RequestInterceptorsConfig) => {
        const userStore = useUserStore();
        if (userStore.token) {
            config.headers['Authorization'] = userStore.token;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        // 设置默认状态码
        const code = response.data.code || 0;
        // 获取错误信息
        const msg = response.data.msg;
        if (code === 106) {
            ElNotification.error({ title: '会话过期或失效，请重新登录！' });
            ElMessageBox.confirm('登录状态已过期，请重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                useUserStore()
                    .logout()
                    .then(() => {
                        location.href = '/';
                    });
            });
            return Promise.reject(msg);
        } else if (code !== 0) {
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
export interface ApiResponse<T = any> {
    code: number;
    msg: string;
    data: T; // 这里定义请求返回data数据类型
}
export default async function request<T>(config: RequestConfig) {
    // axios实例的 request 接受的第一个泛型参数，就是返回数据data的类型
    return service.request<ApiResponse<T>>(config).then(res => res.data); // 返回axios的里data数据
}
