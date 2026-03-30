import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

let process = { env: { REACT_APP_API_URL: false } };

const instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://192.168.1.143:3001',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// 请求拦截器：添加认证 token
instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 响应拦截器：统一处理错误
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.data.code !== 200) {
            return Promise.reject(response.data.message);
        }
        return response.data.data;
    },
    (error) => {
        // 处理 HTTP 状态码错误
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || error.message;

            switch (status) {
                case 400:
                    console.error('请求参数错误:', message);
                    alert('请求参数错误');
                    break;
                case 401:
                    console.error('未授权，请重新登录');
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    break;
                case 403:
                    console.error('拒绝访问:', message);
                    alert('拒绝访问');
                    break;
                case 404:
                    console.error('请求的资源不存在:', message);
                    alert('请求的资源不存在');
                    break;
                case 500:
                    console.error('服务器内部错误:', message);
                    alert('服务器内部错误，请稍后重试');
                    break;
                case 502:
                    console.error('网关错误:', message);
                    alert('网关错误，请稍后重试');
                    break;
                case 503:
                    console.error('服务不可用:', message);
                    alert('服务不可用，请稍后重试');
                    break;
                default:
                    console.error(`HTTP错误 ${status}:`, message);
                    alert(`请求失败: ${message}`);
            }
        } else if (error.request) {
            // 请求已发出但没有收到响应
            console.error('网络错误，请检查网络连接:', error.message);
            alert('网络错误，请检查网络连接');
        } else {
            // 请求配置出错
            console.error('请求配置错误:', error.message);
            alert('请求配置错误');
        }

        return Promise.reject(error);
    }
);

export const post_json = async (url: string, data: any) => {
    try {
        let res = await instance.post(url, data);
        return res;
    } catch (error) {
        console.error('POST请求失败:', url, error);
        throw error;
    }
};

// 添加 GET 请求封装
export const get_json = async (url: string, params?: any) => {
    try {
        let res = await instance.get(url, { params });
        return res;
    } catch (error) {
        console.error('GET请求失败:', url);
        throw error;
    }
};

export default instance;
