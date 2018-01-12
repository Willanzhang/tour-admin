// payDetail 支付明细

import React, {Component} from 'react'
import { Button, Table, Modal } from 'antd'
import TimeSlot from 'components/cashier/TimeSlot'
import {fetchFindPay} from 'src/service/cashier/index'
import { priceFilter, timestampFormat, payStatusFilter, payTypeFilter } from 'src/util/filter'
import { baseUrl } from 'src/util/env'
import './../index.less'
const [confirm, info]= [Modal.confirm, Modal.info]

let selectedKeys = []
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    selectedKeys = selectedRowKeys
  }
}

class PayDetail extends Component {
  state = {
    page: 1,
    count: 10,
    timeBegin: '',
    timeEnd: '',
    listData: [],
    pagination: {}, // 分页数据
    loading: false,
    startDate: '',
    endDate: '',
    startChoice: '', // 时间插件暂存开始时间值
    endChoice: '',
    storeId: '',
    merchantId: '',
    timeSlotDatas: {
      name: '结算区间',
      hasInput: false,
      holder: ''
    },
    columns: [{
      title: '支付时间',
      dataIndex: 'payTime',
      key: 'payTime'
    }, {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo'
    }, {
      title: '外部订单号',
      dataIndex: 'externalOrderNo',
      key: 'externalOrderNo'
    }, {
      title: '支付金额',
      dataIndex: 'paySum',
      key: 'paySum'
    }, {
      title: '支付状态',
      dataIndex: 'payStatus',
      key: 'payStatus'
    }, {
      title: '支付方式',
      dataIndex: 'payType',
      key: 'payType'
    }]
  }

  fetchData() {
    let params = {
      Page: this.state.page,
      Count: this.state.count,
      timeBegin: this.state.timeBegin,
      timeEnd: this.state.timeEnd
    }
    fetchFindPay(params).then((res) => {
      const datas = res.data.data.rows
      const pagination = { ...this.state.pagination }
      pagination.total = res.data.page.totalCount
      let listData = datas.map((data, i) => {
        return {
          key: data.id,
          payTime: timestampFormat(data.payTime, 'YYYY/MM/DD hh:mm:ss'),
          orderNo: data.orderNo,
          externalOrderNo: data.outTransactionId || '无',
          paySum: priceFilter(data.money),
          payStatus: payStatusFilter(data.state),
          payType: payTypeFilter(data.payType),
          storeId: data.storeId
        }
      })
      this.setState({
        listData: listData,
        merchantId: datas.length > 0 ? datas[0].merchantId : '',
        storeId : datas.length > 0 ? datas[0].storeId : '',
        pagination
      })
    })
  }
  componentWillMount() {
    if (this.props.location.query.timeBegin) {
      let [timeBegin, timeEnd] = [this.props.location.query.timeBegin, this.props.location.query.timeEnd]
      this.setState({
        timeBegin: timeBegin,
        timeEnd: timeEnd,
        startDate: timestampFormat(timeBegin, 'YYYY-MM-DD'),
        endDate: timestampFormat(timeEnd, 'YYYY-MM-DD')
      })
    } else {
      const yesterday = timestampFormat(Date.parse(new Date()) / 1000 - 24*60*60, 'YYYY-MM-DD')
      this.setState({
        startDate: yesterday,
        endDate: yesterday,
        timeBegin: new Date(yesterday + ' 00:00:00').getTime() / 1000,
        timeEnd: new Date(yesterday + ' 23:59:59').getTime() / 1000
      })
    }
  }

  componentDidMount() {
    this.fetchData()
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
      endDate: this.state.endChoice || this.state.endDate
    })
    this.fetchData()
  }

  showConfirm() { // 导出所选
    let {timeBegin, timeEnd, storeId, merchantId} = this.state
    if (!selectedKeys.length) {
      info({
        content: (
          <div style={{fontSize: '14px'}}>还未选择需要导出的结算明细</div>
        ),
        onOk() {},
      });
    } else {
      confirm({
        title: '导出所选',
        content: (
          <div style={{fontSize: '14px'}}>确认导出所选?</div>
        ),
        onOk() {
          window.open(`${baseUrl}/store/data_order/exports-find-pay?merchantId=${merchantId}&storeId=${storeId}&timeBegin=${timeBegin}&timeEnd=${timeEnd}&ids=${selectedKeys}`)
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
          window.open(`${baseUrl}/store/data_order/exports-find-pay?merchantId=${merchantId}&storeId=${storeId}&timeBegin=${timeBegin}&timeEnd=${timeEnd}`)
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
      this.fetchData()
    })
  }

  render() {
    return (
      <div className="settlement-account">
        <TimeSlot datas={this.state.timeSlotDatas} timeStart={this.state.startDate} timeEnd = {this.state.endDate} timeChange={this.timeChange.bind(this)} search={this.search.bind(this)}/>

        <div className="data-form">
          <h3>支付明细</h3>
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

export default PayDetail