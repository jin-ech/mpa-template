/*
 * @Author: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @Date: 2023-06-28 16:45:43
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-10-08 10:44:27
 * @FilePath: \lynkros-manage\src\hooks\useRequest\index.ts
 * @Description: 通用请求
 */

import { useState } from 'react';

import type { Request } from '@/request/utils';

interface UseRequestListProps<P, R> {
    action?: Request<P, R>;
    onOk?: () => void;
    initFilterParams?: Partial<P>;
};

function useRequestSubmit<P, R>({
    action,
    onOk
}: UseRequestListProps<P, R>) {
    const [loading, updateLoading] = useState(false);
    const [data, updateData] = useState<R>();

    const actionTask = async (params: P, loading = true) => {
        try {
            loading && updateLoading(true);
            const res = await action(params);
            updateData(res);
            onOk?.();
            return res;
        }
        catch (err) {
            console.log('err: ', err);
            return Promise.reject(err);
        }
        finally {
            loading && updateLoading(false);
        }
    };

    return {
        actionTask,
        loading,
        data
    };
}

export default useRequestSubmit;