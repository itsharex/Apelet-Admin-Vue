import axios, { AxiosResponse } from 'axios';
import { useUserStore } from '@/store';
import { ElNotification } from 'element-plus';

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
});

service.interceptors.request.use(
    (config: RequestInterceptorsConfig) => {
        const userStore = useUserStore();
        if (userStore.token) {
            config.headers['Authorization'] = 'Bearer ' + userStore.token;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        const userStore = useUserStore();
        // 设置默认状态码
        const code = response.data.code || 200;
        // 获取错误信息
        const msg = response.data.msg;
        if (code === 401) {
            ElNotification.error({ title: '会话过期或失效，请重新登录！' });
            userStore.logout();
            location.href = '/';
            return Promise.reject(msg);
        } else if (code !== 200) {
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

export default async function request<T>(config: RequestConfig) {
    // axios实例的 request 接受的第一个泛型参数，就是返回数据data的类型
    return service.request<ApiResponse<T>>(config).then(res => res.data); // 返回axios的里data数据
}
