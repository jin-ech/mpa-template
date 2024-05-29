/*
 * @Author: JC 13478707150@163.com
 * @Date: 2022-12-27 10:47:36
 * @LastEditors: WIN-JK0MIV6Q22K\EDY 13478707150@163.com
 * @LastEditTime: 2024-04-25 15:06:31
 * @FilePath: \lynkros-manage\src\components\Notification\Message.tsx
 * @Description: 提示框-消息部分
 */

import React, {useState, useEffect} from 'react';
import {notification as notifincationAntd} from 'antd';

import {MessageDomProps} from './interface';
import './index.less';

const Message: React.FC<MessageDomProps> = ({content, message, countdown = 3, notificationKey}) => {
    const timeRef = React.useRef<NodeJS.Timeout | null>();
    const [counter, setCounter] = useState<number>(countdown);

    useEffect(() => {
        if (counter > 0) {
            timeRef.current = setTimeout(() => {
                setCounter(counter - 1);
            }, 1000);
        }

        if (counter === 0) {
            notifincationAntd.destroy(notificationKey);
        }

        return () => {
            timeRef.current && clearTimeout(timeRef.current);
            timeRef.current = null;
        };
    }, [counter]);

    return (
        <div className="message-wrap">
            <div className="message-wrap-left">{content || `${message}`}</div>
            <div className="message-wrap-right">({counter}S)</div>
        </div>
    );
};

export default Message;
