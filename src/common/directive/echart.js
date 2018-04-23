/* eslint-disable */

const echarts = require('echarts')
export default {
  bind (el, binding) {
    // console.log(el, binding.value)
  },
  update (el, binding) {
    var config = binding.value
    var corGreen = '#29c00b'
    var corYellow = '#d07807'
    var corRed = '#e93740'
    var option = {
      tooltip: {
        formatter: '{c}%'
      },
      series: [
        {
          type: 'gauge',
          radius: '95%',
          axisLine: {
            lineStyle: {
              width: 10
            }
          },
          detail: {
            formatter: '{value}%',
            textStyle: {
              color: 'auto',
              fontSize: 14
            }
          },
          splitLine: {
            length: 12
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          pointer: {
            width: 2,
            color: 'auto'
          },
          data: [{value: config}]
        }
      ]
    }
    if (config.type === 'line') {
      option = {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            var res = '<div><p style="color: #fff;font-weight: normal; padding: 0;margin: 0;">' + params[0].name + '</p></div>'
            if (config.tooltip) {
              for (let i = 0; i < params.length; i++) {
                res += '<p style="color: #fff;font-weight: normal;padding: 0;margin: 0;"><i style="display:inline-block;margin-right:5px;border-radius:5px;width:10px;height:10px;background-color:' + params[i].color + '"></i>' + params[i].seriesName + '：' + (String(params[i].data).indexOf(".") > -1 ? params[i].data.toFixed(2) : params[i].data )
                + (params[i].data === 0 ? '' : config.tooltip) + '</p>'
              }
            } else {
              for (let i = 0; i < params.length; i++) {
                res += '<p style="color: #fff;font-weight: normal;padding: 0;margin: 0;"><i style="display:inline-block;margin-right:5px;border-radius:5px;width:10px;height:10px;background-color:' + params[i].color + '"></i>' + params[i].seriesName + '：' + (String(params[i].data).indexOf(".") > -1 ? params[i].data : params[i].data ) + '</p>'
              }
            }
            return res
          }
        },
        legend: {
          data: config.data.legendData,
          left: config.data.legend ? 'right' : 'left',
          top: '10px',
          show: config.data.legend ? true : false
        },
        grid: {
          top: config.data.legend ?'13%' : '12%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type : 'category',
            boundaryGap : false,
            data : config.data.dateList
          }
        ],
        yAxis: [
          {
            name: config.tooltip ? '单位（' + config.tooltip + '）' : '',
            nameGap: 10,
            type: 'value',
            min: 0,
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: function (value) {
                return String(value).indexOf(".") > -1 ? value.toFixed(4) : value
              }
            }
          }
        ],
        series: function(){
          var dataArr = [];
          for(var i = 0; i < config.data.legendData.length; i++){
            var item = {
              smooth: true,
              name: config.data.legendData[i] ,
              type: 'line',
              data: config.data.dataList[i]
            }
            dataArr.push(item)
          }
          return dataArr
        }()
      }
    } else if (config.type === 'welcome-pie') {
      option = {
        title: {
            text: config.name,
            x: '45%',
            y: '45%',
            textAlign: "center",
            textStyle: {
                fontSize: 12
            },
            subtextStyle: {
                fontSize: 14,
                color: '#3ea1ff'
            }
        },
        series: [
            {
                name: ' ',
                type: 'pie',
                radius: ['60%', '70%'],
                center: ['50%', '65%'],
                avoidLabelOverlap: false,
                startAngle: 180,
                minAngle: 180,
                color: ["#9f8fc1", "transparent"],
                hoverAnimation: false,
                legendHoverLink: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                    value: 75,
                    name: '1'
                }, {
                    value: 25,
                    name: '2'
                }]
            },
            {
                name: '',
                type: 'pie',
                radius: ['60%', '70%'],
                center: ['50%', '65%'],
                avoidLabelOverlap: false,
                startAngle: 0,
                minAngle: 0,
                color: ["#edebeb", "transparent"],
                hoverAnimation: false,
                legendHoverLink: false,
                clockwise: false,
                itemStyle:{
                    normal:{
                        borderColor:"transparent",
                        borderWidth:"20"
                    },
                    emphasis:{
                        borderColor:"transparent",
                        borderWidth:"20"
                    }
                }
                ,
                z:10,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                    // "value": (100 - value1) * 266 / 360,
                    name: ''
                }, {
                    // "value": 100 - (100 - value1) * 266 / 360,
                    name: ''
                }
                ]
            }
        ],
         animation: true,
         animationDuration: 5000,
         animationEasing: "Linear"
      };
      var value = config.data,
          value_ = (100 - value) * 180 / 360;
      option.title.subtext = value + "%";
      option.series[1].data[0].value = value_;
      option.series[1].data[1].value = 100 - value_;
      if(value >= 0 && value < config.warning){
          option.series[0].color[0] = corGreen;
          option.title.subtextStyle.color = corGreen;
      }
      else if(value >= config.warning && value < config.bad){
          option.series[0].color[0] = corYellow;
          option.title.subtextStyle.color = corYellow;
      }
      else {
          option.series[0].color[0] = corRed;
          option.title.subtextStyle.color = corRed;
      }
    }
    var myChart = echarts.init(el, 'macarons')
    myChart.setOption(option)
  },
  unbind (el, binding) {
    // console.log(el, binding.value)
  }
}
