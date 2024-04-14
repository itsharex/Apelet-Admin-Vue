import axios, { AxiosResponse } from 'axios';
import { useUserStore } from '@/store';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';

const service = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
});

service.interceptors.request.use(
	(config: RequestInterceptorsConfig) => {
		const userStore = useUserStore();
		if (userStore.token) {
			config.headers['Authorization'] = 'Bearer ' + userStore.token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

service.interceptors.response.use(
	async (response: AxiosResponse) => {
		const userStore = useUserStore();
		// 设置默认状态码
		const code = response.data.code || 200;
		// 获取错误信息
		const msg = response.data.msg;
		if (code === 401) {
			await userStore.logout();
			ElMessageBox.confirm('登录状态已过期，是否重新登录！', '系统提示', {
				confirmButtonText: '重新登录',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				location.href = import.meta.env.VITE_APP_CONTEXT_PATH;
			});
			return Promise.reject('会话过期或失效，请重新登录！');
		} else if (code !== 200) {
			ElMessage({
				message: msg,
				type: 'error',
			});
			return Promise.reject('error');
		} else {
			return Promise.resolve(response);
		}
	},
	(err: AxiosResponse) => {
		return Promise.reject(err);
	},
);

export default async function request<T = any>(config: RequestConfig) {
	// axios实例的 request 接受的第一个泛型参数，就是返回数据data的类型
	return service.request<ApiResponse<T>>(config).then((res) => res.data); // 返回axios的里data数据
}
