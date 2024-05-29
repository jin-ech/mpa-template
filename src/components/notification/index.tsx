/*
 * @Author: JC 13478707150@163.com
 * @Date: 2022-12-27 10:47:36
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-04 17:13:27
 * @FilePath: \lynkros-manage\src\components\Notification\index.tsx
 * @Description: 提示框
 */

import React from 'react';
import { notification as notifincationAntd } from 'antd';
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled } from '@ant-design/icons';

import { FunctionName, NotificationProps, ConfigProps } from './interface';
import Message from './message';
import Description from './description';
import './index.less';

const PREFIX = 'notification-hastime';

const IconPool = {
    success: <CheckCircleFilled />,
    error: <CloseCircleFilled />,
    warning: <ExclamationCircleFilled />
};

const handler = {
    get: (_target: any, name: FunctionName) => {
        try {
            let key = `${+new Date()}`; // 通过key来强制关闭notification

            return (message: string, props?: ConfigProps) => {
                const { countdown = 3, content, className, description } = props || {};
                const args = {
                    key,
                    icon: IconPool[name],
                    duration: countdown,
                    className: className ? `${className} ${PREFIX}` : PREFIX,
                    top: 65,
                    message: (
                        <Message
                            content={content}
                            message={message}
                            countdown={countdown}
                            notificationKey={key}
                        />
                    ),
                    description: <Description description={description} />
                };

                return notifincationAntd[name](args);
            };
        }
        catch (err) {
            console.warn(err);
        }
    }
};

/**
 * 代理对象
 * 使用时: target.xxx会全部丢给notification 类似notification.xxx
 */
const target = {};

const notification: NotificationProps = new Proxy(target, handler);

export default notification;
