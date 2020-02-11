export default {
    component:{
        'CompTitle':{
            unit:'px',
            outerStyleUnit:{
                top:0,
                left: 0,
                width: 300,
                height:30,
            },
            outerStyle:{
                background:'transparent'
            },
            name: 'CompTitle',
            nameText:'文本',
            innerStyleUnit: {
                'font-size': 20,
                padding:5
            }
        },
        'CompTable':{
            unit:'px',
            outerStyleUnit:{
                top:0,
                left: 0,
                width: 400,
                height:300,
            },
            outerStyle:{
                'background-color':'transparent',
            },
            name: 'CompTable',
            nameText:'表格',
            innerStyleUnit: {
                'font-size': 20
            },
            option:{
                tableData:[
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        number: '55',
                        height:'188'
                    }
                ],
                rowNum:10,
                colNum:3,
                col:[
                    {
                        prop:"date",
                        label:"日期"
                    },
                    {
                        prop:"name",
                        label:"姓名"
                    },
                    {
                        prop:"number",
                        label:"年龄"
                    },
                    {
                        prop:"height",
                        label:"身高"
                    }
                    ],
                tableBoxStyleUnit:{
                    'border-width':1
                },
                tableBoxStyle:{
                    "border-style":"none",
                    "border-color":'#000'
                },
                tableHeaderStyle:{
                    background:"rgba(234,246,254,1)",
                },
                tableHeaderStyleUnit:{
                    height:42,
                    padding:0
                },
                cellStyle:{
                    'white-space':'nowrap'
                },
                cellStyleUnit:{
                    height:40,
                    padding:0,
                }
            }
        },
        'CompTextarea':{
            unit:'px',
            outerStyleUnit:{
                top:0,
                left: 0,
                width: 100,
                height:100,
            },
            name: 'CompTextarea',
            nameText:'多行文本',
            innerStyleUnit: {
                'font-size': 20,
                padding:5
            }
        },
        'CompChart':{
            unit:'px',
            outerStyleUnit:{
                top:0,
                left: 0,
                width: 300,
                height:200,
            },
            type:{
                'bar':{
                    defaultOption:{
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [120, 200, 150, 80, 70, 110, 130],
                            type: 'bar'
                        }]
                    },
                    nameText:'柱状图',
                },
                'line':{
                    defaultOption:{
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [120, 200, 150, 80, 70, 110, 130],
                            type: 'line'
                        }]
                    },
                    nameText:'曲线图',
                },
                'gauge':{
                    defaultOption:{
                        tooltip: {
                            formatter: '{a} <br/>{b} : {c}%'
                        },
                        toolbox: {
                            feature: {
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        series: [
                            {
                                name: '业务指标',
                                type: 'gauge',
                                detail: {formatter: '{value}%'},
                                data: [{value: 50, name: '完成率'}]
                            }
                        ]
                    },
                    nameText:'仪表盘',
                },
                'pie':{
                    defaultOption:{
                        title: {
                            text: '某站点用户访问来源',
                            subtext: '纯属虚构',
                            left: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                        },
                        series: [
                            {
                                name: '访问来源',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: [
                                    {value: 335, name: '直接访问'},
                                    {value: 310, name: '邮件营销'},
                                    {value: 234, name: '联盟广告'},
                                    {value: 135, name: '视频广告'},
                                    {value: 1548, name: '搜索引擎'}
                                ],
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    },
                    nameText:'饼图',
                },
                'map':{
                    defaultOption:{
                        backgroundColor: '#404a59',
                        geo: {
                            map: 'china',
                        },
                        series: [
                            // 常规地图
                            {
                                type: 'map',
                                mapType: 'china',
                                itemStyle: {
                                    normal: {
                                        areaColor: '#999',
                                        borderColor: '#666'
                                    },
                                    emphasis: {
                                        areaColor: '#333'
                                    }
                                }
                            },

                        ]
                    },
                    nameText:'地图',
                },
            },
            name: 'CompChart',

        }
    }
}
