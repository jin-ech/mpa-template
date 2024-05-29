/*
 * @Author: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @Date: 2023-06-20 13:40:34
 * @LastEditors: WIN-JK0MIV6Q22K\EDY 13478707150@163.com
 * @LastEditTime: 2024-03-28 15:10:13
 * @FilePath: \business-register-web\src\hooks\useRequestList\index.ts
 * @Description: 通用列表接口请求
 */

import { useEffect, useRef, useState } from 'react';

import notification from '@/components/notification';
import type { Request } from '@/request/utils';

interface UseRequestListProps<P, R> {
    action?: Request<P, R>;
    immediate?: boolean;
    onOk?: () => void;
    initFilterParams?: Partial<P>;
    showMsg?: boolean;
};

function useRequestList<P, R>({
    action,
    immediate = true,
    onOk,
    initFilterParams,
    showMsg = false
}: UseRequestListProps<P, R>) {
    const [loading, updateLoading] = useState(false);
    const filterParamsRef = useRef(initFilterParams);
    // const [filterParams, updateFilterParams] = useState(initFilterParams);
    const [data, updateData] = useState<R>();

    const getDataTask = async (params: P, loading = true) => {
        try {
            loading && updateLoading(true);
            const filterParams = filterParamsRef.current;
            const queryParams = { ...filterParams, ...params };
            // console.log('params: ', filterParams, params, queryParams);
            // console.log('==============');
            const res = await action(queryParams);
            filterParamsRef.current = queryParams;
            // updateFilterParams(queryParams);
            updateData(res);
            onOk?.();
            return res;
        }
        catch (err) {
            showMsg && notification.error(`${err}`);
        }
        finally {
            loading && updateLoading(false);
        }
    };

    useEffect(() => {
        if (!immediate) {
            return;
        }
        getDataTask({} as P);
    }, []);

    return {
        getDataTask,
        loading,
        data,
        filterParams: filterParamsRef.current
    };
}

export default useRequestList;