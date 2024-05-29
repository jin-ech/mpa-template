import notification from '@/components/notification';
import axios from 'axios';
import { get } from 'lodash';

export const isDev = process.env.NODE_ENV === 'development';
export const baseURL = process.env.BASE_URL || '';
export const localUrl = window.location.origin;
export const timeout = 1000 * 30;

// const msgThrottle = throttle(msg => notification.error(msg), 5000);

/**
 * @description: 请求服务创建工具函数
 * @param {object} param1
 * @return {*}
 */
export const createService = ({ responsePath }: { responsePath?: string }) => {
    const service = axios.create({
        baseURL,
        timeout
    });

    service.interceptors.request.use(config => ({
        ...config
    }), error => {
        return Promise.reject(error);
    });

    service.interceptors.response.use(
        response => {
            const { data: { status, msg } } = response;
            switch (+status) {
                case 0:
                    notification.error(msg);
                    return Promise.reject(msg);
                default:
                    return responsePath ? get(response, responsePath) : response;
            }
        },
        error => {
            const { data } = error.response || {};
            const msg = data?.msg;
            notification.error(msg ?? `${error}`);
            return Promise.reject(error);
        }
    );

    return service;
};

export type Request<T, U> = (params: T) => Promise<U>;
export type AnyRequest = Request<any, any>;

