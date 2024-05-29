import { graphic } from 'echarts';

export const option = {
    legend: {
        show: true
    },
    color: [
        new graphic.LinearGradient(0, 0, 0, 1.5, [{
            offset: 0,
            color: '#3894FF'
        }, {
            offset: 1,
            color: 'rgba(56, 148, 255, 0.4)'
        }]),
        new graphic.LinearGradient(0, 0, 0, 1.5, [{
            offset: 0,
            color: '#5BE2FF'
        }, {
            offset: 1,
            color: 'rgba(91, 226, 255, 0.4)'
        }]),
        new graphic.LinearGradient(0, 0, 0, 1.5, [{
            offset: 0,
            color: '#73d13d'
        }, {
            offset: 1,
            color: 'rgba(115, 209, 61, 0.4)'
        }])
    ],
    tooltip: {
        show: true,
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: 'transparent'
            }
        },
        backgroundColor: 'rgba(15.7%, 17.3%, 20.4%, 0.4)',
        textStyle: {
            color: '#ffffffc5'
        },
        borderColor: 'transparent',
        // formatter: '{b0}: {c0}<br />{d}%'
    },
    series: [
        {
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            center: ['50%', '50%'],
            radius: '75%',
            pointer: {
                show: false,
                itemStyle: {
                    borderColor: 'transparent'
                }
            },
            itemStyle: {
                borderWidth: 0,
                borderColor: 'transparent',
                normal: {
                    borderRadius: [5, 5, 0, 0]
                }
            },
            progress: {
                show: true,
                overlap: false,
                roundCap: true,
                clip: false,
                itemStyle: {
                    borderWidth: 1,
                    borderColor: '#464646'
                }
            },
            axisLine: {
                lineStyle: {
                    color: [[0, 'rgba(40, 44, 52, 0.8)'], [1, 'rgba(40, 44, 52, 0.8)']],
                    width: 40,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10
                }
            },
            splitLine: {
                show: false,
                distance: 0,
                length: 10
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                distance: 50
            },
            title: {
                show: false,
                fontSize: 14
            },
            detail: {
                show: true,
                width: 50,
                height: 14,
                fontSize: 12,
                borderColor: 'inherit'
            }
        }
    ]
};