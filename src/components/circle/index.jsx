import React from "react";
import cls from 'classnames';

import './index.less';

const PREFIX = 'circle-wrapper';
const PREFIX_INNER = PREFIX + '-inner';
const PREFIX_WAVE = PREFIX_INNER + '-wave';

const Circle = ({
    className,
    style
}) => {
    const prefix = cls(PREFIX, className);

    return (
        <div className={prefix} style={style}>
            <div className={PREFIX_INNER}>
                <div className={PREFIX_WAVE}></div>
            </div>
        </div>
    );
};

export default Circle