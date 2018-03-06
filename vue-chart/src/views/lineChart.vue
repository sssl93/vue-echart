<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts';

  export default {
    props: {
      data: {
        type: Object
      },
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      }
    },
    data() {
      return {
        chart: null,
        colorMap: {
          '执行中': '#00aeef',
          '成功': '#27c24c',
          '失败': '#f05050',
          '取消': '#fad733'
        }
      };
    },
    mounted() {
      this.handleData();
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChart(xAxis, legend, series) {
        let that = this;
        that.chart = echarts.init(document.getElementById(that.id));
        that.chart.setOption({
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: legend,
          },
          toolbox: {
            show: false,
            feature: {
              mark: {show: true},
              magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              saveAsImage: {show: true}
            },
            right: 20
          },
          grid: {
            left: '1%',
            right: '20',
            top: '10%',
            bottom: '6%',
            containLabel: true
          },
          series: series,
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: xAxis
          }],
          yAxis: [{
            type: 'value',
          }],
          series: series
        }, true)
      },
      handleData() {
        let legendData = [], series = [];
        this.data.values.forEach(item => {
          legendData.push(item.name);
          series.push({
            name: item.name,
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: {type: 'default'},
                color: this.colorMap[item.name],
                opacity: 0.8
              }
            },
            data: item.data
          });
          this.initChart(this.data.keys, legendData, series)
        });
      }
    }
  }
</script>
