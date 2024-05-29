
import React from "react";
import { createRoot } from "react-dom/client";
import moment from "moment";

import { ConfigProvider } from 'antd';
import Layout from "./layout";

import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';

import './app.less';
import 'antd/dist/antd.css';

moment.locale('zh-cn');

console.log('process: ', process.env.BASE_URL);
console.log('module2');

const App = () => {
    return (
        <ConfigProvider locale={zhCN}>
            <Layout />
        </ConfigProvider>
    );
};

const root = document.querySelector('#root');
const app = createRoot(root);

app.render(<App />);

// Webpack Hot Module Replacement API
if (module?.hot) {
    module?.hot.accept();
}