
import { AxiosRequestConfig } from 'axios';
import { createService } from './utils';

// 接口服务
const service = createService({ responsePath: 'data' });
// 下载服务
const downloadService = createService({});

type DownloadProps = AxiosRequestConfig & { fileName?: string };

/**
 * @description: 下载方法
 * @param {AxiosRequestConfig} params
 * @return {*}
 */
export function download(params: DownloadProps): Promise<any> {
    return downloadService({
        responseType: 'blob',
        // responseType: 'blob',
        ...params
    }).then((res: any) => {
        const {
            data: blob,
            headers: { 'content-disposition': contentDisposition }
        } = res;
        const fileName = params.fileName ?? decodeURIComponent(
            contentDisposition.split('=')[1]
        );
        const navigator: any = window.navigator;
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName);
            return;
        }
        const selfURL = window.URL || window.webkitURL;
        params.url && selfURL.revokeObjectURL(params.url);
        const toBlobUrl = selfURL.createObjectURL(blob);
        const aEl = document.createElement('a');
        aEl.href = toBlobUrl;
        aEl.download = fileName.replaceAll('\"', '');
        aEl.click();
    }).catch((error: unknown) => {
        console.error(error);
    });
}

export const upload = (params: any) => {
    const { url = '/file', ...data } = params;
    const formData = Object.keys(data).reduce((res: FormData, key: string) => {
        res.append(key, data[key]);
        return res;
    }, new FormData());
    return service.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export * from './utils';
export default service;