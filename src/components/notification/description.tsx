/*
 * @Author: JC 13478707150@163.com
 * @Date: 2022-12-27 10:47:36
 * @LastEditors: JC 13478707150@163.com
 * @LastEditTime: 2022-12-27 10:47:58
 * @FilePath: \lynkros-manage\src\components\Notification\Description.tsx
 * @Description: 提示框-描述
 */

import React from 'react';

import {DescriptionDomProps} from './interface';
import './index.less';

const Description: React.FC<DescriptionDomProps> = ({description}) => {
    return description ? <div className="description-wrap">{description}</div> : null;
};

export default Description;
