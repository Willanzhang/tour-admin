// 核销

import React, { Component } from 'react'
import { Button, Table, Modal } from 'antd'
import { Link } from 'react-router'
import DataSellect from 'components/cashier/DataSellect'
import DateChoose from 'components/cashier/DateChoose'
import { fetchVerificationTotal, fetchVerificationByDate } from 'src/service/cashier/index'
import { priceFilter, timestampFormat, priceFilterNoPrefix } from 'src/util/filter'
import { baseUrl } from 'src/util/env'
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
const [confirm, info] = [Modal.confirm, Modal.info]
const subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo'))

let selectedKeys = []
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    selectedKeys = selectedRowKeys
  }
}

const nowDateTime = new Date()
const nowDateStart = +new Date(nowDateTime.getFullYear(), nowDateTime.getMonth(), nowDateTime.getDate()) / 1000

class Verification extends Component {
  state = {
    timeBegin: nowDateStart - 7 * 24 * 3600, // 默认开始时间
    timeEnd: nowDateStart, // 秒为单位
    listData: [], // 列表数据
    loading: true, // table loading是否展示
    totalData: [], // 数据汇总
    searchDisable: false, // 查询按钮是否禁用
    myChart: '', // echart实例
    merchantId: subsystemTourInfo.merchantId || (subsystemTourInfo.merchantData && subsystemTourInfo.merchantData.id),
    storeId:  (subsystemTourInfo.storeData && subsystemTourInfo.storeData.id) || subsystemTourInfo.id,
    chartOptions: {
      title: {
        // text: 'ECharts 入门示例'
      },
      legend: {
        data: ['核销张数', '核销金额']
      },
      toolbox: {
        show: false,
        feature: {
          magicType: { show: false, type: ['stack', 'tiled'] },
          saveAsImage: { show: false }
        }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
      },
      yAxis: {},
      series: [{
        name: '核销张数',
        type: 'line',
        data: []
      }, {
        name: '核销金额',
        type: 'line',
        data: []
      }]
    },
    timeSlotDatas: {
      name: '时间区间',
      hasInput: false,
      holder: '默认查询全部网点',
      noNowDate: true
    },
    columns: [{
      title: '核销日期',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => timestampFormat(text, 'YYYY-MM-DD')
    }, {
      title: '核销总张数',
      dataIndex: 'writeoffCount',
      key: 'writeoffCount'
    }, {
      title: '核销总金额(元)',
      dataIndex: 'writeoffAmount',
      key: 'writeoffAmount',
      render: (text, record) => priceFilterNoPrefix(text)
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => <Link to={`/tour-statistics/verification/detail?time=${record.date}`}>核销明细</Link>
    }]
  }

  edit(totalNum) { // 过滤汇总数据
    let totalData = [{
      name: '核销总张数',
      value: totalNum.writeoffCount
    }, {
      name: '成交总额',
      value: priceFilter(totalNum.writeoffAmount)
    }]
    this.setState({ totalData })
  }

  fetchTotal() { // 数据汇总
    const {timeBegin, timeEnd} = this.state
    let params = {
      timeBegin,
      timeEnd
    }
    fetchVerificationTotal(params).then(res => {
      this.edit(res.data)
    })
  }

  fetchListData() { // 核算数据明细
    return new Promise((resolve, reject) => {
      const { chartOptions, timeBegin, timeEnd } = this.state
      let params = {
        timeBegin,
        timeEnd
      }
      fetchVerificationByDate(params).then(res => {
        let writeoffCount = [] // 核销张数
        let writeoffAmount = [] // 核销数额
        let xAxisData = []
        this.setState({
          listData: res.data,
          loading: false
        })
        res.data.forEach((val, idx) => {
          writeoffCount.push(val.writeoffCount)
          writeoffAmount.push(Number(priceFilterNoPrefix(val.writeoffAmount)))
          xAxisData.push(timestampFormat(val.date, 'YYYY-MM-DD'))
        })
        chartOptions.series[0].data = writeoffCount
        chartOptions.series[1].data = writeoffAmount
        chartOptions.xAxis.data = xAxisData
        resolve(chartOptions)
      })
    })
  }

  componentDidMount() {
    this.fetchTotal()
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'))
    this.setState({myChart})
    this.fetchListData().then(chartOptions => {
      myChart.setOption(this.state.chartOptions);
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
    const {myChart} = this.state
    this.fetchTotal()
    this.setState({
      searchDisable: true
    })
    this.fetchListData().then(chartOptions => {
      // 基于准备好的dom，初始化echarts实例
      myChart.setOption(chartOptions)
      this.setState({
        searchDisable: false
      })
    }).catch(() => {
      this.setState({
        searchDisable: false
      })
    })
  }

  showConfirm() { // 导出所选
    let { timeBegin, timeEnd, merchantId, storeId } = this.state
    if (!selectedKeys.length) {
      info({
        content: (
          <div style={{ fontSize: '14px' }}>还未选择需要导出的结算明细</div>
        ),
        onOk() { },
      })
    } else {
      confirm({
        title: '导出所选',
        content: (
          <div style={{ fontSize: '14px' }}>确认导出所选?</div>
        ),
        onOk() {
          window.open(`${baseUrl}/store/writeoff/exports-find-total-all?merchantId=${merchantId}&storeId=${storeId}&timeBegin=${timeBegin}&timeEnd=${timeEnd}&date=${selectedKeys}`)
        },
        onCancel() { },
      })
    }
  }

  showConfirmAll() { // 导出全部
    let { timeBegin, timeEnd, merchantId, storeId, listData } = this.state
    if (listData.length > 0) {
      confirm({
        title: '导出全部',
        content: '确认导出全部?',
        onOk() {
          window.open(`${baseUrl}/store/writeoff/exports-find-total-all?merchantId=${merchantId}&storeId=${storeId}&timeBegin=${timeBegin}&timeEnd=${timeEnd}`)
        },
        onCancel() { },
      })
    } else {
      info({
        content: (
          <div style={{ fontSize: '14px' }}>没有数据可导出!</div>
        ),
        onOk() { },
      })
    }
  }

  render() {
    const {
      timeSlotDatas, timeBegin, timeEnd,
      totalData, loading, columns, listData,
      searchDisable
    } = this.state
    return (
      <div className="settlement-account">
        <DateChoose datas={timeSlotDatas}
                    timeStart={timestampFormat(timeBegin, 'YYYY-MM-DD')}
                    timeEnd={timestampFormat(timeEnd - 24 * 3600, 'YYYY-MM-DD')}
                    startChange={this.startChange.bind(this)}
                    endChange={this.endChange.bind(this)}
                    searchDisable={searchDisable}
                    search={this.search.bind(this)} />
        <div id="main" style={{ height: '400px', width: '90%', marginTop: '76px' }}></div>

        <div className="data-center">
          <h3>数据汇总 <span> ( {timestampFormat(timeBegin, 'YYYY-MM-DD') + '~' + timestampFormat(timeEnd - 24 * 3600, 'YYYY-MM-DD')} ) </span></h3>
          <DataSellect totalData={totalData} />
        </div>

        <div className="data-form">
          <h3>数据明细</h3>
          <div className="export">
            <Button type="primary" onClick={this.showConfirm.bind(this)}>导出所选</Button>
            <Button type="primary" onClick={this.showConfirmAll.bind(this)}>导出全部</Button>
          </div>
          <Table rowSelection={rowSelection}
                 rowKey="date"
                 pagination={false}
                 loading={loading}
                 columns={columns}
                 dataSource={listData} bordered />
        </div>

      </div>
    )
  }
}

export default Verification