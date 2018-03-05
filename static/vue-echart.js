Vue.directive('echart', {
    myChart: '',
    getOption: function (value) {
        if (value) {
            var length = value.length
        } else {
            var length = 20
        }

        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, length]
            }]
        };
        return option
    },
    getDefaultOption: function (el, options) {
        function getXData(){
            for (var i=0;i<options.length;i++){
                options[i]['data']
            }
        }

        return {
            title: el.getAttribute('title'),
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xData
            },
            yAxis: [{
                type: 'value',
                boundaryGap: [0, '100%']
            }],
            grid: {
                left: '8%',
                right: '10%',
                bottom: '4%',
                containLabel: true
            },
            legend: options.legend,
            series: series
        }
    },
    inserted: function (el, binding) {
        console.log(binding);
        console.log(el);
        binding.def.myChart = echarts.init(el);
        binding.def.myChart.setOption(binding.def.getOption())
    },
    update: function (el, binding) {
        binding.def.myChart.setOption(binding.def.getOption(binding.value))
    }
});
