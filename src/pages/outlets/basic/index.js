import React, { Component } from 'react'
import { 
  Select,
} from 'antd'
import {
  fetchOutletsOverall,
  fetchOutletsList
} from 'src/service/outlets/index'
import { priceFilter, timestampFormat } from 'src/util/filter'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入折线图
import  'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'

const Option = Select.Option

export default class CreateOutlets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataList: [], // 数据列表
      outletsList: [], // 网点列表
      nowDate: new Date() / 1000, // 秒为单位
    }
  }
  componentDidMount() {
    // 获取网点实时数据
    this.fetchDataList()
    // 获取网点列表
    this.fetchOutletsList()
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    // 绘制图表
    myChart.setOption({
      title: {
          text: '趋势图'
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data:['成交订单','成交金额'],
          show: true
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              name:'成交订单',
              type:'line',
              stack: '总量',
              data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
              name:'成交金额',
              type:'line',
              stack: '总量',
              data:[220, 182, 191, 234, 290, 330, 310]
          },
      ]
    })
  }
  // 获取网点实时数据
  fetchDataList(outletId) {
    fetchOutletsOverall({id: outletId}).then((res) => {
      this.setState({
        dataList: res
      })
    })
  }
  // 获取网点列表
  fetchOutletsList() {
    fetchOutletsList({}).then((res) => {
      this.setState({
        outletsList: res
      })
    })
  }
  // 更改网点处理函数，获取新网点实时数据
  handleOutletsChange = (value) => {
    console.log(`selected ${value}`)
    this.fetchDataList(Number(value))
  }
  render () {
    return (
      <div className="width90">
        <div style={{padding: '10px 30px'}}>
          <div className="flex flex-justify-between">
            <span className='font-size16 padding10 bold'>
              <span>数据看板</span>
              <span>（{timestampFormat(this.state.nowDate - 7 * 24 * 3600, 'YYYY-MM-DD')}</span>
              <span> ~ </span>
              <span>{timestampFormat(this.state.nowDate - 24 * 3600, 'YYYY-MM-DD')}）</span>
            </span>
            <Select className='padding10' defaultValue="0" style={{ width: 200 }} onChange={this.handleOutletsChange}>
              <Option value="0">全部网点</Option>
              {
                this.state.outletsList.map((data) => (
                  <Option key={data.id} value={data.id.toString()}>{data.name}</Option>
                ))
              }
            </Select>
          </div>
          <div className='bg-grey' style={{padding: '40px 10px', minHeight: 140}}>
            <ul className='flex text-center'>
              {this.state.dataList.map((data, idx) => (
                <li className='flex-cell' key={idx}>
                  <p className='font-size28 blue'>{data.type === 1 ? priceFilter(data.value) : data.value}</p>
                  <p>{data.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div id="main" style={{ width: '100%', height: 400, marginTop: 20 }}></div>
        </div>
      </div>
    )
  }
}