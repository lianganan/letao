$(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector('.left'));

  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '2017注册人数'
    },
    tooltip: {},
    legend: {
      data: ['月份']
    },
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1115, 1230, 436, 1800, 1530, 220, 1390, 1295, 1244, 1386, 1534, 1632]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);

  var myChart1 = echarts.init(document.querySelector('.right'));
  var option1 = {
    title: {
      text: '热销品牌销售',
      subtext: '2017年4月',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克', '阿迪达斯', '新百伦', '乔丹', 'AJ']
    },
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [{
          value: 335,
          name: '耐克'
        },
        {
          value: 310,
          name: '阿迪达斯'
        },
        {
          value: 234,
          name: '新百伦'
        },
        {
          value: 135,
          name: '乔丹'
        },
        {
          value: 1548,
          name: 'AJ'
        }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
  myChart1.setOption(option1);
})