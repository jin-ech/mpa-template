
import { graphic } from 'echarts';
import moment from 'moment';

export const deepColor = new graphic.LinearGradient(0, 0, 0, 1.5, [{
    offset: 0,
    color: '#3894FF'
}, {
    offset: 1,
    color: 'transparent'
}]);

export const lightColor = new graphic.LinearGradient(0, 0, 0, 1.5, [{
    offset: 0,
    color: '#5BE2FF'
}, {
    offset: 1,
    color: 'transparent'
}]);

export default {
    color: ['#79FFEF', '#2797FE', '#FFBA53'],
    grid: {
        left: '4%',
        right: '4%',
        bottom: '14%'
    },
    legend: {
        show: true,
        data: ['充值', '缴费'],
        textStyle: {
            color: '#8CA3C6',
            fontSize: 14,
            align: 'right'
        },
        // right: 20, // 图例距离容器右侧的距离
        // top: 20, // 图例距离容器顶部的距离
        bottom: -6,
        right: '45%',
        itemWidth: 14, // 图例标记的宽度
        itemHeight: 12, // 图例标记的高度
        itemGap: 20 // 图例项之间的间距
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: 'transparent'
            }
        },
        // backgroundColor: 'transparent',
        backgroundColor: 'rgba(15.7%, 17.3%, 20.4%, 0.4)',
        textStyle: {
            color: '#ffffffc5'
        },
        borderColor: 'transparent'
    },
    xAxis: {
        type: 'category',
        name: '日',
        axisLine: {
            lineStyle: {
                color: '#ffffffc5'
            }
        },
        axisTick: {
            show: false
        },
        data: (() => {
            const currentDate = moment(); // 获取当前日期
            const startDate = currentDate.startOf('month'); // 获取当前月份的第一天
            const monthDates = []; // 存储日期的数组

            for (let i = 0; i < 30; i++) {
                const date = startDate.clone().add(i, 'days');
                monthDates.push(date.format('MM-DD'));
            }

            return monthDates;
        })()
    },
    yAxis: [
        {
            type: 'value',
            name: '(元)',
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: '#ffffffc5'
                }
            },
            splitLine: {
                show: false
                // lineStyle: {
                //     color: 'rgba(0, 161, 299, .44)',
                //     type: 'dashed'
                // }
            }
        }
        // {
        //     type: 'value',
        //     name: '(元)',
        //     position: 'right',
        //     axisLine: {
        //         lineStyle: {
        //             color: '#ffffffc5'
        //         }
        //     },
        //     splitLine: {
        //         show: false
        //         // lineStyle: {
        //         //     color: 'rgba(0, 161, 299, .44)',
        //         //     type: 'dashed'
        //         // }
        //     }
        // }
    ],
    series: [
        {
            data: new Array(30).fill('').map(_ => Math.floor(Math.random() * 300)),
            type: 'bar',
            name: '充值',
            showBackground: false,
            barWidth: 14,
            barGap: '60%',
            label: {
                // show: true,
                show: false,
                position: 'top',
                fontSize: 10,
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                color: '#ffffffc5'
            },
            itemStyle: {
                normal: {
                    borderRadius: [5, 5, 0, 0],
                    color: deepColor
                }
            }
        }
        // {
        //     data: new Array(30).fill('').map(_ => Math.floor(Math.random() * 200)),
        //     type: 'bar',
        //     name: '缴费',
        //     showBackground: false,
        //     barWidth: 12,
        //     barGap: '60%',
        //     // label: {
        //     //     show: true,
        //     //     position: 'top',
        //     //     fontSize: 12,
        //     // },
        //     itemStyle: {
        //         normal: {
        //             borderRadius: [5, 5, 0, 0],
        //             color: lightColor
        // }
    ]
};