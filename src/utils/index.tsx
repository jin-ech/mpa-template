/*
 * @Author: JC 13478707150@163.com
 * @Date: 2022-12-28 16:00:30
 * @LastEditors: WIN-JK0MIV6Q22K\EDY 13478707150@163.com
 * @LastEditTime: 2024-04-01 18:13:17
 * @FilePath: \lynkros-manage\src\utils\index.ts
 * @Description: 通用工具包
 */


import React from 'react';
import * as XLSX from 'xlsx';

import { Col, ColProps, Form, FormItemProps, Row, RowProps } from 'antd';

/**
 * @description: 将文件二进制流转为base64可用格式
 * @param {Blob} source
 * @return {*}
 */
export const tranformBolbToBase64 = (source: Blob): Promise<string | ArrayBuffer> => {
    return new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.onloadend = e => {
            resolve(e.target.result);
        };
        fileReader.readAsDataURL(source);
    });
};

/**
 * @description: 枚举转数组
 * @param {any} obj
 * @return {*}
 */
export const transformObjectToArr = (obj: any): { title?: string; value?: string }[] => {
    return Object.keys(obj).reduce((res: any[], key: string) => {
        return [...res, obj[key]];
    }, []);
};

export type FormItemExtraProps = FormItemProps & { component?: React.ReactNode; colProps?: ColProps; key?: any; };

export interface RenderFormItemsProps {
    items: Array<FormItemExtraProps | Array<FormItemExtraProps>>;
    inline?: boolean;
    rowProps?: RowProps;
    colProps?: ColProps;
    render?: (child: React.ReactNode, key: any, item: FormItemExtraProps) => React.ReactNode;
}

export const renderFormItem = (props: FormItemExtraProps) => {
    const { component, ...itemProps } = props;
    return <Form.Item {...itemProps}>{component}</Form.Item>;
};

/**
 * @description: 表单渲染函数
 * @param {RenderFormItemsProps} param1
 * @return {*}
 */
export const renderFormItems = ({
    items = [],
    rowProps,
    colProps: $colProps,
    inline = false,
    render
}: RenderFormItemsProps) => {
    return items.map((item, itemKey) => {
        if (Array.isArray(item)) {
            const formItems = renderFormItems({ inline: true, colProps: $colProps, rowProps, items: item, render });
            return (
                <Row key={itemKey} {...rowProps}>
                    {formItems}
                </Row>
            );
        }
        const { component, colProps, ...itemProps } = item;
        if (inline) {
            return (
                <Col key={itemKey} {...(colProps ? colProps : $colProps)}>
                    {renderFormItem({ ...itemProps, component })}
                </Col>
            );
        }
        return renderFormItem({ ...itemProps, component, key: itemKey });
    });
};


/**
 * @description: 模拟请求函数
 * @param {Function} func
 * @param {number} delay
 * @return {*}
 */
export function mockRequest<T>(func: Function, delay: number): Promise<T> {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                const res = func();
                resolve(res);
            }, delay);
        }
        catch (err) {
            reject(err);
        }
    });
};

/**
 * @description: 获取url的search参数
 * @param {*} name
 * @return {*}
 */
export const getUrlParam = (name = '') => {
    // 获取当前URL
    const url = new URL(window.location.href);

    // 获取查询参数对象
    const searchParams = url.searchParams;

    return searchParams.get(name);
};

/**
 * @description: form list数据格式化 `account-${index}-${uniqueId()}` => data: [{a, b, c}, {a, b, c}]
 * @param {any} data
 * @return {*}
 */
export const transformData = (data: any) => {
    const transformedData: any = {};

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const parts = key.split('-');
            const fieldName = parts[0];
            const lineNumber = +parts[1];
            const id = parts[2];

            if (lineNumber && id) {
                if (!transformedData.data) {
                    transformedData.data = [];
                }

                if (!transformedData.data[lineNumber - 1]) {
                    transformedData.data[lineNumber - 1] = {};
                }

                transformedData.data[lineNumber - 1][fieldName] = data[key];
            }
            else {
                transformedData[fieldName] = data[key];
            }
        }
    }

    return { ...transformedData, data: transformedData?.data?.filter(Boolean) };
};

/**
 * @description: 枚举列表中查找文案
 * @param {any} arr
 * @param {any} value
 * @param {*} name
 * @return {*}
 */
export const findEnumLabel = (obj: any, value: any, name = 'value') => {
    if (!obj) {
        return value;
    }
    let arr = obj;
    if (!Array.isArray(obj)) {
        arr = transformObjectToArr(obj);
    }
    return arr?.find((item: any) => +item[name] === +value)?.label || '-';
};

/**
 * @description: 源数据转可用的树结构
 * @param {*} config
 * @return {*}
 */
import Icon, * as icons from '@ant-design/icons';
interface transformDataToTreeDataProps {
    config: any[];
    withDataRef?: Boolean;
    withIcon?: Boolean;
};
export const transformDataToTreeData = ({
    config = [],
    withDataRef = true,
    withIcon = false
}: transformDataToTreeDataProps) => {
    return config.reduce((res, item) => {
        const {
            react_key: key,
            react_path: path,
            react_label: label,
            _child: children,
            ...extraProps
        } = item;
        let $item: any = {
            key,
            title: label,
            path,
            label,
            ...(withIcon ? ({
                // @ts-ignore
                icon: <Icon component={icons[extraProps.oico]} />
            }) : {})
        };
        if (withDataRef) {
            $item = {
                ...$item,
                dataRef: {
                    ...extraProps,
                    key,
                    path,
                    label,
                    children
                }
            };
        }
        if (children) {
            $item.children = transformDataToTreeData({ config: children, withDataRef, withIcon: true });
        }
        res.push($item);
        return res;
    }, []).filter((item: any) => !!item.key);
};

/**
 * @description: 从表格columns获取mock数据
 * @param {*} columns
 * @param {*} total
 * @return {*}
 */
export const getMockData = (columns: any[] = [], total = 6) => {
    const itemNames = columns.reduce((res, colItem) => ([...res, colItem.dataIndex]), ['key']);
    return new Array(total).fill('').map((_, index) => {
        return itemNames.reduce((res: any, key: string) => {
            res[key] = `${key}${index}`;
            return res;
        }, {});
    });
};

/**
 * @description: 导出excel
 * @return {*}
 */
const excelDefaultData = [
    { name: 'John', age: 25, city: 'New York' },
    { name: 'Jane', age: 30, city: 'San Francisco' },
    { name: 'Bob', age: 35, city: 'Seattle' }
];
export const exportExcel = (data: any[], filename: string = 'data') => {
    // 创建一个工作簿
    const workbook = XLSX.utils.book_new();

    // 创建一个工作表
    const worksheet = XLSX.utils.json_to_sheet(data || excelDefaultData);

    // 将工作表添加到工作簿
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // 导出工作簿为 Excel 文件
    XLSX.writeFile(workbook, filename + '.xlsx');
};

export const exportExcelByTimeChart = (chart: any, filename: string, columns: string[] = ['时间', '实时功率(kWh)']) => {
    const option = chart.getOption();
    const series = option.series;
    const $map: any = {};
    const seriesData = series.reduce((res: any[], series: any) => {
        const name = series.name;
        const data = series.data;
        if (!!$map[name] || $map[name] === 0) {
            $map[name] += 1;
        }
        else {
            $map[name] = 0;
        }
        res.push({
            name: name + ($map[name] === 0 ? '' : $map[name]),
            data: data
        });
        return res;
    }, []);

    // 创建工作簿对象
    const workbook = XLSX.utils.book_new();

    // 遍历每个系列数据
    seriesData.forEach((series: any) => {
        const sheetName = series.name;

        // 创建工作表对象
        const worksheet = XLSX.utils.aoa_to_sheet([
            columns,
            ...series.data.map(([date, value]: [string, string]) => ([
                date,
                value
            ]))
        ]);

        // 将工作表对象添加到工作簿中
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    });

    // 将工作簿保存为 Excel 文件
    const excelFilePath = filename + '.xlsx';
    XLSX.writeFile(workbook, excelFilePath);
};

/**
 * @description: 将带表格表单的数据转换为可提交表单数据
 * @param {any} sourceData
 * @param {string} dataFieldName
 * @return {*}
 */
export const transformTableFormData = (sourceData: any, dataFieldName: string) => {
    const transformedData: any = {};
    const regex = /(.+)-(\d+)/;
    for (const key in sourceData) {
        if (!key.includes('-')) {
            transformedData[key] = sourceData[key];
        }
        else {
            const match = regex.exec(key);
            const fieldName = match[1];
            const index = parseInt(match[2], 10);

            if (!transformedData[dataFieldName]) {
                transformedData[dataFieldName] = [];
            }
            if (!transformedData[dataFieldName][index - 1]) {
                transformedData[dataFieldName][index - 1] = {};
            }
            transformedData[dataFieldName][index - 1][fieldName] = sourceData[key];
        }
    }
    transformedData[dataFieldName] = transformedData[dataFieldName]?.filter(Boolean);
    return transformedData;
};

export const toFixed = (val: number | string = 0, count: number = 2) => {
    if (!val && val !== 0) {
        return '-';
    }
    if (typeof val === 'string') {
        const $val = +val;
        if (Object.is($val, NaN)) {
            return '-';
        }
        return $val.toFixed(count);
    }
    if (typeof val === 'number') {
        return val.toFixed(count);
    }
    return '-';
};

export const tooltipFormatter = (title: string, unit?:string) => {
    return (params: any[]) => {
        const [item] = params;
        const itemList = params.reduce((res, item) => {
            const div = `
                <div style="display: flex; justify-content: space-between;">
                    <div>${item.marker}${title || item.seriesName}</div>&nbsp;&nbsp;
                    ${toFixed(Array.isArray(item.value) ? item.value?.[1] : item.value)}${unit ?? ''}
                </div>
            `;
            res += div;
            return res;
        }, '');
        return `
            <div>
                <div>${item.name || item.value?.[0]}</div>
                ${itemList}
            </div>
        `;
    };
}

