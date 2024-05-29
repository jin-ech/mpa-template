
import { graphic } from 'echarts';

export default {
    color: ['#79FFEF', '#2797FE', '#FFBA53'],
    tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: 'transparent'
            }
        },
        // backgroundColor: 'transparent',
        backgroundColor: 'rgba(0, 178, 202, 0.4)',
        textStyle: {
            color: '#ffffffc5'
        },
        borderColor: 'transparent'
    },
    legend: {
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        textStyle: {
            color: '#ffffffc5',
            fontSize: 12,
            lineHeight: 12
        },
        right: 0,
        top: 0,
        data: ['3F', '4F', '5F']
    },
    grid: {
        top: '32%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#ffffffc5'
            }
        },
        axisLabel: {

        },
        axisTick: {
            show: false
        },
        data: ['01', '02', '03', '04', '05', '06', '07']
    },
    yAxis: [
        {
            type: 'value',
            name: '（℃）',
            nameLocation: 'end',
            axisLabel: {
                fontSize: 10 // 修改文字大小
                // 其他样式配置项...
            },
            axisLine: {
                lineStyle: {
                    color: '#ffffffc5'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(0, 161, 299, .44)',
                    type: 'dashed'
                }
            }
        }
    ],
    series: [
        {
            name: '3F',
            type: 'line',
            smooth: true,
            symbolSize: 2,
            areaStyle: {
                normal: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#79FFEF'
                    }, {
                        offset: 1,
                        color: 'transparent'
                    }])
                }
            },
            data: []
        },
        {
            name: '4F',
            type: 'line',
            smooth: true,
            symbolSize: 2,
            areaStyle: {
                normal: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#2797FE'
                    }, {
                        offset: 1,
                        color: 'transparent'
                    }])
                }
            },
            data: []
        },
        {
            name: '5F',
            type: 'line',
            smooth: true,
            symbolSize: 2,
            areaStyle: {
                normal: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#FFBA53'
                    }, {
                        offset: 1,
                        color: 'transparent'
                    }])
                }
            },
            data: []
        }
    ]
};