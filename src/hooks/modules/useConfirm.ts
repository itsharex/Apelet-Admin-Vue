import { ElMessage, ElMessageBox } from 'element-plus';
import { ConfirmType } from '../interface';

/**
 * 二次封装消息弹出框
 * @param api 处理请求Api
 * @param params  请求参数
 * @param message 消息
 * @param type 弹出框类型
 * @param draggable 是否可拖放
 */
export const useConfirm = (
    api: (params: any) => Promise<ApiResponse<any>>,
    params: any = {},
    message: string = '',
    type: ConfirmType = 'warning',
    draggable: boolean = false
) => {
    return new Promise((resolve, reject) => {
        ElMessageBox.confirm(`是否${message}?`, '温馨提示', {
            confirmButtonText: '确 认',
            cancelButtonText: '取 消',
            type,
            draggable
        })
            // .then(() => api(params))
            .then(() => {
                ElMessage({
                    type: 'success',
                    message: `${message}成功!`
                });
                resolve(true);
            });
    });
};
