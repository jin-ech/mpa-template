/*
 * @Author: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @Date: 2023-08-14 14:42:33
 * @LastEditors: WIN-JK0MIV6Q22K\EDY 13478707150@163.com
 * @LastEditTime: 2024-04-25 14:38:22
 * @FilePath: \lynkros-dlut-dashboard\src\components\chart\index.jsx
 * @Description: 图表
 */

import React, { useEffect, useRef, useImperativeHandle } from 'react';
import cls from 'classnames';
import { init } from 'echarts';

import lineOptions from './options/line';

import './index.less';

const Chart = React.forwardRef((props, ref) => {
    const {
        options = lineOptions,
        className,
        style,
        ...extraProps
    } = props;
    const prefix = cls('container', className);
    const rootRef = useRef();
    const chartRef = useRef();

    useImperativeHandle(ref, () => ({
        getInstance: () => chartRef.current
    }));

    useEffect(() => {
        const root = rootRef.current;
        const $chart = init(root);
        chartRef.current = $chart;
        chartRef.current?.setOption(options);
        const resizeEvent = () => {
            $chart.resize();
        };
        window.addEventListener('resize', resizeEvent);
        return () => {
            window.removeEventListener('resize', resizeEvent);
        };
    }, [options]);

    return (
        <div className={prefix} style={style} {...extraProps} ref={rootRef}></div>
    );
});

export default Chart;