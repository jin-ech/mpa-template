
import React from "react";
import cls from 'classnames';

import './index.less';

const PREFIX = 'card-wrapper';
const PREFIX_TITLE = PREFIX + '-title';
const PREFIX_CONTENT = PREFIX + '-content';

const Card = ({
    className,
    title,
    children,
    style
}) => {
    const prefix = cls(PREFIX, className);

    return (
        <div className={prefix} style={style}>
            {title && (
                <div className={PREFIX_TITLE}>{title}</div>
            )}
            <div className={PREFIX_CONTENT}>
                {children}
            </div>
        </div>
    );
};

export default Card;