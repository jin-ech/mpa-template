import React from "react";

import { Statistic as AntdStatistic } from "antd";
import CountUp from 'react-countup';

import { toFixed } from "@/utils";

const formatter = (value, unit) => (
    <div style={{ color: '#1677ff' }}>
        <CountUp end={value} separator="," /> {unit}
    </div>
);

const Statistic = ({
    value = 0,
    count = 2,
    unit = ''
}) => {

    return (
        <AntdStatistic
            value={toFixed(value, count)}
            formatter={value => formatter(value, unit)}
        />
    );
};

export default Statistic;