// settlementDetail 结算明细

import React, {Component} from 'react'
import { Button, Table, Modal } from 'antd'
import DataSellect from 'components/cashier/DataSellect'
import DateChoose from 'components/cashier/DateChoose'
import {fetchVerificationTotal, fetchVerificationDetail} from 'src/service/cashier/index'
import { priceFilter, priceFilterNoPrefix, timestampFormat } from 'src/util/filter'
import { baseUrl } from 'src/util/env'
import './../index.less'
const [confirm, info]= [Modal.confirm, Modal.info]
const subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo'))

let selectedKeys = []
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    selectedKeys = selectedRowKeys
  }
}

class VerificationDetail extends Component {
  state = {
    timeBegin: '',
    timeEnd: '',
    selectedStore: {}, // 选中的store 筛选条件
    searchStore: {}, // 搜索过的store 导出表格时，会用到
    listData: [],
    pagination: {
      pageSize: 10,
      defaultPageSize: 10,
      defaultCurrent: 1,
      current: 1
    },
    searchDisable: false, // 查询按钮是否禁用
    loading: true,
    totalData: [],
    merchantId: subsystemTourInfo.merchantId || (subsystemTourInfo.merchantData && subsystemTourInfo.merchantData.id),
    storeId: subsystemTourInfo.storeId || (subsystemTourInfo.storeData && subsystemTourInfo.storeData.id),
    timeSlotDatas: {
      name: '时间区间',
      noNowDate: true,
      hasInput: false,
      holder: '默认查询全部网点'
    },
    columns: [{
      title: '核销时间',
      dataIndex: 'checkTime',
      render: (text, record) => timestampFormat(text)
    }, {
      title: '核销内容',
      dataIndex: 'sceneryTicketName',
    }, {
      title: '实名信息',
      dataIndex: 'personalID',
      render: (text, record) => (<div>
        <div>{record.personalName}</div>
        <div>{record.personalID}</div>
      </div>)
    }, {
      title: '核销金额(元)',
      dataIndex: 'price',
      render: (text, record) => priceFilterNoPrefix(text)
    }, {
      title: '核销人',
      dataIndex: 'checkStaffName',
    }, {
      title: '所属网点',
      dataIndex: 'storeName',
    }, {
      title: '关联订单',
      dataIndex: 'orderNo',
    }]
  }

  fetchTotal() {
    const {timeBegin, timeEnd} = this.state
    let params = {timeBegin, timeEnd}
    fetchVerificationTotal(params).then(res => {
      let totalNum = res.data
      let totalData = [{
        name: '核销总张数',
        value: totalNum.writeoffCount
      }, {
        name: '核销总金额',
        value: priceFilter(totalNum.writeoffAmount)
      }]
      this.setState({totalData})
    })
  }

  fetchListData(page) { // 核算数据明细
    const {timeBegin, timeEnd, pagination} = this.state
    let params = {
      timeBegin,
      timeEnd,
      page,
      count: pagination.pageSize
    }
    fetchVerificationDetail(params).then(res => {
      let temPage = pagination
      temPage.total = res.page.totalCount
      temPage.current = res.page.currentPage
      this.setState({
        pagination: temPage,
        listData: res.data,
        loading: false,
        searchDisable: false
      })
    })
  }

  componentDidMount() {
    const { time, storeName, storeId } = this.props.location.query
    this.setState({
      searchStore: {
        id: storeId,
        name: storeName
      },
      timeBegin: Number(time),
      timeEnd: Number(time) + 24 * 3600
    }, () => {
      this.fetchTotal()
      this.fetchListData(1)
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
    const { selectedStore } = this.state
    this.setState({
      searchDisable: true,
      searchStore: selectedStore
    })
    this.fetchTotal()
    this.fetchListData(1)
  }

  showConfirm() { // 导出所选
    let {timeBegin, timeEnd, searchStore, merchantId} = this.state
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
          window.open(`${baseUrl}/admin/writeoff/exports-find?merchantId=${merchantId}&storeId=${searchStore.id}&timeBegin=${timeBegin}&timeEnd=${timeEnd}&ids=${selectedKeys}`)
        },
        onCancel() {},
      })
    }
  }

  showConfirmAll() { // 导出全部
    let {timeBegin, timeEnd, searchStore, merchantId, listData} = this.state
    if (listData.length > 0) {
      confirm({
        title: '导出全部',
        content: '确认导出全部?',
        onOk() {
          window.open(`${baseUrl}/admin/writeoff/exports-find?merchantId=${merchantId}&storeId=${searchStore.id}&timeBegin=${timeBegin}&timeEnd=${timeEnd}`)
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
    this.fetchListData(pagination.current)
  }

  render() {
    const initTime = this.props.location.query.time
    const { timeSlotDatas, totalData, timeBegin, timeEnd,
            pagination, loading, columns, listData,
            searchDisable } = this.state
    return (
      <div className="settlement-account">
        <DateChoose datas={timeSlotDatas}
                    timeStart={timestampFormat(timeBegin || initTime, 'YYYY-MM-DD')}
                    timeEnd={timestampFormat((timeEnd && (timeEnd - 24 * 3600)) || initTime, 'YYYY-MM-DD')}
                    startChange={this.startChange.bind(this)}
                    endChange={this.endChange.bind(this)}
                    searchDisable={searchDisable}
                    search={this.search.bind(this)} />

        <div className="data-center">
          <h3>数据汇总 <span> ( {timestampFormat(timeBegin, 'YYYY-MM-DD') + '~' + timestampFormat(timeEnd - 24 * 3600, 'YYYY-MM-DD')} ) </span></h3>
          <DataSellect totalData={totalData} />
        </div>

        <div className="data-form">
          <h3>结算明细</h3>
          <div className="export">
            <Button type="primary" onClick={this.showConfirm.bind(this)}>导出所选</Button>
            <Button type="primary" onClick={this.showConfirmAll.bind(this)}>导出全部</Button>
          </div>
          <Table rowSelection={rowSelection}
                 rowKey="id"
                 pagination={pagination}
                 loading={loading}
                 columns={columns}
                 dataSource={listData}
                 onChange={this.tableChange.bind(this)} bordered />
        </div>
      </div>
    )
  }
}

export default VerificationDetail