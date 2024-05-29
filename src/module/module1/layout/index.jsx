import React from "react";

import './index.less';

const PREFIX = 'layout-wrapper';

const Layout = () => {

    return (
        <div className={PREFIX}>
            <h1>module1</h1>
            <img style={{ width: 240, height: 'auto' }} src='/static/img/back1.jpg' />
        </div>
    );
};

export default Layout