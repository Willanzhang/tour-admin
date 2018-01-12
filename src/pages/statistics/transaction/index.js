// 交易分析

import React, { Component } from 'react'
import { Icon } from 'antd'
import DateChoose from 'components/cashier/DateChoose'
import { fetchTransactionTotal, fetchTransactionByDate } from 'src/service/cashier/index'
import { priceFilterNoPrefix, timestampFormat, toPercentage } from 'src/util/filter'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入折线图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'
import './index.less'

const nowDateTime = new Date()
const nowDateStart = +new Date(nowDateTime.getFullYear(), nowDateTime.getMonth(), nowDateTime.getDate()) / 1000

class Transaction extends Component {
  state = {
    storeName: '',
    timeBegin: nowDateStart - 7 * 24 * 3600, // 默认开始时间
    timeEnd: nowDateStart, // 秒为单位
    listData: [],
    searchDisable: false, // 查询按钮是否禁用
    transactionTotal: {
      finishOrder: 0,
      payAmount: 0,
      finishNum: 0,
      orderNum: 0,
      orderAmount: 0,
      orderCount: 0,
      visitor:0,
    },
    storeId: '',
    merchantId: '',
    chartOptions: {
      title: {
        // text: 'ECharts 入门示例'
      },
      legend: {
        data: ['付款金额', '付款人数', '下单转化率', '付款转化率', '平台转化率'],
        selected: {
          // 不选中
          '下单转化率': false,
          '付款转化率': false,
          '平台转化率': false,
        }
      },
      toolbox: {
        show: false,
        feature: {
          magicType: { show: false, type: ['stack', 'tiled'] },
          saveAsImage: { show: false }
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params, ticket, callback) {
          let str = ''
          let name
          params.forEach((value, index) => {
            name = value.name + '</br>'
            if (value.seriesIndex >= 2) {
              str = str + value.seriesName + ':' + value.value + '%<br>'
            } else {
              str = str + value.seriesName + ':' + value.value + '<br>'
            }
          })
          return name + str
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        // axisLine: { onZero: false },
        data: [],
        // x: 'left'
      },
      yAxis: [{
        type: 'value',
        // axisPointer: {
        //   show: true,
        //   type: 'line',
        //   label: {
        //     formatter: '{value}'
        //   }
        // },
      },
      {
        // onZeroAxisIndex: 1,
        name: '转化率',
        nameLocation: 'end',
        type: 'value',
        max: 100,
        axisPointer: {
          // show: true,
          type: 'line',
          label: {
            show: true,
            formatter: '{value} %'
          }
        },
        inverse: false,
        triggerEvent: true,
        axisLabel: {
          show: true,
          interval: 'auto',
          formatter: '{value} %'
        },
      }],
      series: [{
        name: '付款金额',
        type: 'line',
        data: []
      }, {
        name: '付款人数',
        type: 'line',
        data: []
      }, {
        name: '下单转化率',
        type: 'line',
        yAxisIndex: 1,
        // label: { normal: { show: true, position: 'top', formatter: '{c} ℃' }, },
        // tooltip: { trigger: 'axis' },
        data: []
      }, {
        name: '付款转化率',
        type: 'line',
        yAxisIndex: 1,
        data: []
      }, {
        name: '平台转化率',
        type: 'line',
        yAxisIndex: 1,
        data: []
      }
      ]
    },
    timeSlotDatas: {
      name: '时间区间',
      hasInput: false,
      holder: '默认查询全部网点',
      noNowDate: true
    }
  }

  fetchTotal() { // 数据汇总
    const {timeBegin, timeEnd} = this.state
      let params = {
        timeBegin,
        timeEnd
      }
    fetchTransactionTotal(params).then(res => {
      this.setState({
        transactionTotal: res.data
      })
    })
  }

  fetchListData() { // 结算明细
    return new Promise((resolve, reject) => {
      const {chartOptions, timeBegin, timeEnd} = this.state
      let params = {
        timeBegin,
        timeEnd
      }
      fetchTransactionByDate(params).then(res => {
        let payAmount = [] // 付款总额
        let finishNum = [] // 付款人数
        let toOrderRate = [] // 订单转化率集合
        let orderToPaymentRate = [] // 付款转化率集合
        let visitorToPayRate = [] // 平台转化率
        let xAxisData = []
        res.data.forEach((val, idx) => {
          payAmount.push(Number(priceFilterNoPrefix(val.payAmount)))
          finishNum.push(val.finishNum)
          toOrderRate.push((val.visitor && (val.orderNum / val.visitor) * 100).toFixed(2) || 0)
          orderToPaymentRate.push(val.orderNum && ((val.finishNum / val.orderNum) * 100).toFixed(2))
          visitorToPayRate.push((val.visitor && (val.finishNum / val.visitor) * 100).toFixed(2) || 0)
          xAxisData.push(timestampFormat(val.date, 'YYYY-MM-DD'))
        })
        chartOptions.series[0].data = payAmount
        chartOptions.series[1].data = finishNum
        chartOptions.series[2].data = toOrderRate
        chartOptions.series[3].data = orderToPaymentRate
        chartOptions.series[4].data = visitorToPayRate
        chartOptions.xAxis.data = xAxisData
        resolve(chartOptions)
      })
    })
  }

  componentDidMount() {
    this.fetchTotal()
    const myChart = echarts.init(document.getElementById('main'))
    this.setState({myChart})
    this.fetchListData().then((chartOptions) => {
      // 基于准备好的dom，初始化echarts实例
      myChart.setOption(chartOptions)
    })
  }

  startChange(date, dateString) { // 开始时间
    const temp = dateString.split('-')
    const timeBegin = +new Date(temp[0], temp[1] - 1, temp[2]) / 1000
    this.setState({
      timeBegin
    })
  }
  endChange(date, dateString) { // 结束时间
    const temp = dateString.split('-')
    const timeEnd = +new Date(temp[0], temp[1] - 1, temp[2]) / 1000
    this.setState({
      timeEnd: timeEnd + 24 * 3600
    })
  }

  search() {
    this.fetchTotal()
    this.setState({
      searchDisable: true
    })
    this.fetchListData().then((chartOptions) => {
      // 基于准备好的dom，初始化echarts实例
      this.state.myChart.setOption(chartOptions);
      this.setState({
        searchDisable: false
      })
    }).catch(() => {
      this.setState({
        searchDisable: false
      })
    })
  }

  render() {
    const { timeSlotDatas, timeBegin, timeEnd, searchDisable, outletsList } =this.state
    const { visitor, finishOrder, payAmount, finishNum, orderNum, orderAmount, orderCount } = this.state.transactionTotal
    return (
      <div className="settlement-account">
        {/*<TimeSlot datas={this.state.timeSlotDatas} timeChange={this.timeChange.bind(this)} search={this.search.bind(this)} />*/}
        <DateChoose datas={timeSlotDatas}
                    timeStart={timestampFormat(timeBegin, 'YYYY-MM-DD')}
                    timeEnd={timestampFormat(timeEnd - 24 * 3600, 'YYYY-MM-DD')}
                    startChange={this.startChange.bind(this)}
                    endChange={this.endChange.bind(this)}
                    searchDisable={searchDisable}
                    search={this.search.bind(this)} />
        <div className="imgS clearfix">
          <div className="overview">
            <div className="cell ">
              <div className="cell_header">
                <span className="lable">访客数</span>
              </div>
              <div>
                <span className="number">{visitor}</span>
              </div>
              {/* <DayChange prev={1} current={2}/> */}
            </div>
          </div>
          {/*第二行*/}
          <div className="overview">
            <div className="cell ">
              <div className="cell_header">
                <span className="lable">下单人数</span>
              </div>
              <div>
                <span className="number">{orderNum}</span>
              </div>
            </div>
            <div className="cell ">
              <div className="cell_header">
                <span className="lable">下单笔数</span>
              </div>
              <div>
                <span className="number">{orderCount}</span>
              </div>
            </div>
            <div className="cell ">
              <div className="cell_header">
                <span className="lable">下单金额（元）</span>
              </div>
              <div>
                <span className="number">{priceFilterNoPrefix(orderAmount)}</span>
              </div>
            </div>
          </div>
          <div className="overview" style={{ border: 'none' }}>
            <div className="cell ">
              <div className="cell_header">
                <span className="lable">付款人数</span>
              </div>
              <div>
                <span className="number">{finishNum}</span>
              </div>
            </div>
            <div className="cell ">
              <div className="cell_header">
                <span className="lable">付款订单数</span>
              </div>
              <div>
                <span className="number">{finishOrder}</span>
              </div>
            </div>
            {/*第三行*/}
            <div className="cell ">
              <div className="cell_header">
                <span className="lable">付款金额（元）</span>
              </div>
              <div>
                <span className="number">{priceFilterNoPrefix(payAmount)}</span>
              </div>
            </div>
            <div className="cell ">
              <div className="cell_header">
                <span className="lable">客单价（元）</span>
              </div>
              <div>
                <span className="number">{priceFilterNoPrefix(finishNum && (payAmount / finishNum))}</span>
              </div>
            </div>
          </div>
          <div className="tixing">
            <div className="region order">
              <p className="title">下单转化率</p>
              <p className="num">{toPercentage(visitor && (orderNum / visitor))}</p>
            </div>
            <div className="region pay">
              <p className="title">付款转化率</p>
              <p className="num">{toPercentage(orderCount && (finishOrder / orderCount))}</p>
            </div>
            <div className="region shop">
              <p className="title">平台转化率</p>
              <p className="num">{toPercentage(visitor && (finishNum / visitor))}</p>
            </div>
          </div>
        </div>
        <div id="main" style={{ height: '400px', width: '90%', marginTop: '76px' }}>
        </div>
      </div>
    )
  }
}

/**
 * props下传入两个参数，一个是前一天的数额，一个是当前数额
 */
function DayChange(props) {
  const dValue = Number(props.current) - Number(props.prev)
  const up = dValue >= 0
  const rate = (Math.abs(dValue / Number(props.prev)) * 100).toFixed(0) + '%'
  return (<div className="cell_footer">
            <p>较前一天</p>
            <span> <Icon type={up ? 'arrow-up' : 'arrow-down'} className={up ? 'red' : 'green'}></Icon>{rate}</span>
          </div>)
}

export default Transaction