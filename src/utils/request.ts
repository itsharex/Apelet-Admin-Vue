import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useUserStore } from '@/store';
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
});

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore();
    if (userStore.token) {
        config.headers['token'] = userStore;
    }
    return config;
});

request.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (err: AxiosResponse) => {
        return Promise.reject(err);
    }
);
export default request;
