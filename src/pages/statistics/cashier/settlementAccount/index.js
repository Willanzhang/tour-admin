// settlementAccount 财务结算

import React, {Component} from 'react'
import { Button, Table, Modal } from 'antd'
import { Link } from 'react-router'
import DataSellect from 'components/cashier/DataSellect'
import TimeSlot from 'components/cashier/TimeSlot'
import {fetchGetTotal, fetchFindTotal} from 'src/service/cashier/index'
import { priceFilter, timestampFormat } from 'src/util/filter'
import { baseUrl } from 'src/util/env'
import './../index.less'
const [confirm, info]= [Modal.confirm, Modal.info]

let selectedKeys = []
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    selectedKeys = selectedRowKeys
  }
}

class SettlementAccount extends Component {
  state = {
    page: 1,
    count: 10,
    timeBegin: '',
    timeEnd: '',
    listData: [],
    pagination: {}, // 分页数据
    loading: false,
    searchDisable: false, // 查询按钮是否禁用
    startDate: '', // 开始时间(日期格式)
    endDate: '',
    startChoice: '', // 时间插件暂存开始时间值(日期格式)
    endChoice: '',
    timeZone: '', // 点击结算明细携带的时间参数
    totalData: [],
    storeId: '',
    merchantId: '',
    timeSlotDatas: {
      name: '结算区间',
      hasInput: false,
      holder: ''
    },
    columns: [{
      title: '结算日期',
      dataIndex: 'blanceDate',
      key: 'blanceDate'
    }, {
      title: '成交笔数',
      dataIndex: 'completedNum',
      key: 'completedNum'
    }, {
      title: '成交金额',
      dataIndex: 'completedSum',
      key: 'completedSum'
    }, {
      title: '退款笔数',
      dataIndex: 'refundNum',
      key: 'refundNum'
    }, {
      title: '退款金额',
      dataIndex: 'refundSum',
      key: 'refundSum'
    }, {
      title: '交易净额',
      dataIndex: 'dealNetAmount',
      key: 'dealNetAmount'
    }, {
      title: '网点费率(‰)',
      dataIndex: 'rate',
      key: 'rate'
    }, {
      title: '手续费用',
      dataIndex: 'fee',
      key: 'fee'
    }, {
      title: '划账金额',
      dataIndex: 'depositAmount',
      key: 'depositAmount'
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => <Link to={`/tour-statistics/settlementAccount/settlementDetail?${this.state.timeZone}`}>结算明细</Link>
    }]
  }

  edit(totalNum) {
    let totalData = [{
      name: '成交总笔数',
      value: totalNum.finishOrder
    }, {
      name: '成交总额',
      value: priceFilter(totalNum.payAmount)
    }, {
      name: '退款总笔数',
      value: totalNum.refundOrder
    }, {
      name: '退款总额',
      value: priceFilter(totalNum.refundAmount)
    }, {
      name: '总交易净额',
      value: priceFilter(totalNum.payAmount - totalNum.refundAmount)
    }, {
      name: '总手续费用',
      value: priceFilter(totalNum.serviceCharge)
    }, {
      name: '总划账金额',
      value: priceFilter(totalNum.accountAmount)
    }]
    this.setState({totalData})
  }

  fetchTotal() { // 数据汇总
    let params = {
      timeBegin: this.state.timeBegin,
      timeEnd: this.state.timeEnd,
      storeName: this.state.storeName
    }

    let totalNum = {
      finishOrder: 0,
      payAmount: 0,
      refundOrder: 0,
      refundAmount: 0,
      serviceCharge: 0,
      accountAmount: 0
    }
    this.edit(totalNum)
    fetchGetTotal(params).then(res => {
      totalNum = res.data
      this.edit(totalNum)
    })
  }

  fetchListData() { // 结算明细
    let params = {
      Page: this.state.page,
      Count: this.state.count,
      timeBegin: this.state.timeBegin,
      timeEnd: this.state.timeEnd
    }
    fetchFindTotal(params).then(res => {
      const datas = res.data.data.rows
      const pagination = { ...this.state.pagination }
      pagination.total = res.data.page.totalCount
      let listData = datas.map((data, i) => {
        return {
          blanceDate: `${timestampFormat(this.state.timeBegin, 'YYYY/MM/DD')} - ${timestampFormat(this.state.timeEnd, 'YYYY/MM/DD')}`,
          key: data.id,
          completedNum: data.finishOrder,
          completedSum: priceFilter(data.payAmount),
          refundNum: data.refundOrder,
          refundSum: priceFilter(data.refundAmount),
          dealNetAmount: priceFilter(data.payAmount - data.refundAmount),
          rate: data.rate,
          fee: priceFilter(data.serviceCharge),
          depositAmount: priceFilter(data.accountAmount),
          storeId: data.id
        }
      })
      this.setState({
        listData: listData,
        merchantId: datas.length > 0 ? datas[0].merchantId : '',
        storeId : datas.length > 0 ? datas[0].storeId : '',
        pagination,
        searchDisable: false
      })
    }).catch(err => {
      this.setState({
        searchDisable: false
      })
    })
  }

  componentWillMount() {
    const yesterday = timestampFormat(Date.parse(new Date()) / 1000 - 24*60*60, 'YYYY-MM-DD')
    this.setState({
      startDate: yesterday,
      endDate: yesterday,
      timeBegin: new Date(yesterday + ' 00:00:00').getTime() / 1000,
      timeEnd: new Date(yesterday + ' 23:59:59').getTime() / 1000
    })
  }

  componentDidMount() {
    this.fetchTotal()
    this.fetchListData()
    if (this.state.timeBegin) {
      this.setState({
        timeZone: `&timeBegin=${this.state.timeBegin}&timeEnd=${this.state.timeEnd}`
      })
    }
  }
  
  // 时间变化赋值
  timeChange (dates, dateStrings) {
    this.setState({
      startChoice: dateStrings[0],
      endChoice: dateStrings[1],
      timeBegin: dates[0]._d.getTime() / 1000,
      timeEnd: dates[1]._d.getTime() / 1000 + 86399
    })
  }

  search() {
    this.setState({
      startDate: this.state.startChoice || this.state.startDate,
      endDate: this.state.endChoice || this.state.endDate,
      searchDisable: true
    })
    if (this.state.timeBegin) {
      this.setState({
        timeZone: `&timeBegin=${this.state.timeBegin}&timeEnd=${this.state.timeEnd}`
      })
    }
    this.fetchTotal()
    this.fetchListData()
  }

  showConfirm() { // 导出所选
    let {timeBegin, timeEnd, storeId, merchantId} = this.state
    if (!selectedKeys.length) {
      info({
        content: (
          <div style={{fontSize: '14px'}}>还未选择需要导出的结算明细</div>
        ),
        onOk() {},
      })
    } else {
      confirm({
        title: '导出所选',
        content: (
          <div style={{fontSize: '14px'}}>确认导出所选?</div>
        ),
        onOk() {
          window.open(`${baseUrl}/store/data_order/exports-find-total?merchantId=${merchantId}&storeId=${storeId}&timeBegin=${timeBegin}&timeEnd=${timeEnd}&ids=${selectedKeys}`)
        },
        onCancel() {},
      })
    }
  }

  showConfirmAll() { // 导出全部
    let {timeBegin, timeEnd, storeId, merchantId, listData} = this.state
    if (listData.length > 0) {
      confirm({
        title: '导出全部',
        content: '确认导出全部?',
        onOk() {
          window.open(`${baseUrl}/store/data_order/exports-find-total?merchantId=${merchantId}&storeId=${storeId}&timeBegin=${timeBegin}&timeEnd=${timeEnd}`)
        },
        onCancel() {},
      })
    } else {
      info({
        content: (
          <div style={{fontSize: '14px'}}>没有数据可导出!</div>
        ),
        onOk() {},
      })
    }
    
  }

  tableChange(pagination) { // 分页页码改变
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
      page: pagination.current
    }, () => {
      this.fetchListData()
    })
  }
  render() { 

    return (
      <div className="settlement-account">
        <TimeSlot datas={this.state.timeSlotDatas}
                  timeChange={this.timeChange.bind(this)}
                  searchDisable={this.state.searchDisable}
                  search={this.search.bind(this)}/>

        <div className="data-center">
          <h3>数据汇总 <span> ( {this.state.startDate + '~' + this.state.endDate} ) </span></h3>
          <DataSellect totalData={this.state.totalData} />
        </div>

        <div className="data-form">
          <h3>结算明细</h3>
          <div className="export">
            <Button type="primary" onClick={this.showConfirm.bind(this)}>导出所选</Button>
            <Button type="primary" onClick={this.showConfirmAll.bind(this)}>导出全部</Button>
          </div>
          <Table rowSelection={rowSelection} pagination={this.state.pagination} loading={this.state.loading} columns={this.state.columns} dataSource={this.state.listData} onChange={this.tableChange.bind(this)} bordered />
        </div>
        
      </div>
    )
  }
}

export default SettlementAccount