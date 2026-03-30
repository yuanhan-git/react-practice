import { post_json } from '@/utils/http/api.ts';
export const queryLogin = async (data) => {
    // console.log('数据', await post_json('/api/login', data))
    return await post_json('/api/login', data);
}