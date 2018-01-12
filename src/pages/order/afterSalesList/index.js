import React, { Component } from 'react'
import { Pagination } from 'antd'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import SearchBox from 'src/pages/order/searchBox/index'
import { timestampFormat, afterSalesStatus } from 'src/util/filter'
import { nullValueFilter, priceFilter } from 'src/util/common'
import { fetchOfterSalesList } from 'src/service/order/index'
import 'src/pages/order/orderList/index.less'
 let [parameterObj, refundExtStatusNum, count, page] = [null, '0', 10, 1]
class AfterSalesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchBoxParameter: { // 组件参数
        text: 1,
        orderNo: null, // 订单号
        serviceNo: null, // 退款编号
        createdStart: timestampFormat(Date.parse(new Date()) / 1000 - 518400, 'YYYY-MM-DD'), // 起始时间
        createdEnd: timestampFormat(Date.parse(new Date()) / 1000 , 'YYYY-MM-DD'), // 结束时间
        storeId: '0', // 景区id
        extStatus: '', // 对接订单状态（1待付款 2已完成 3退款中 4已关闭）
        travelerName: null, // 旅客姓名
        phoneNo: null, // 手机号
        refundExtStatus: '0' // 对接售后状态（1退款中 2已完成)
      },
      orderList: [{
        afterSales: {},
        orderInfo: [],
        store:{}
    }],
    pages: {}
    }
    this.getData = this.getData.bind(this)
  }
  componentDidMount() {
    parameterObj = JSON.parse(JSON.stringify(this.state.searchBoxParameter))
    this.getData(parameterObj, 1, count)
  }
  getData(obj, page, count) {
    page = page
    let param = JSON.parse(JSON.stringify(obj))
    if (param.createdStart) param.createdStart = (new Date(param.createdStart +' 00:00:00').getTime()) / 1000
    if (param.createdEnd) param.createdEnd = (new Date(param.createdEnd+' 21:59:59').getTime()) / 1000
    param.storeId = parseInt(param.storeId)
    param.refundExtStatus = parseInt(param.refundExtStatus)
    param = nullValueFilter(param)
    param.page = page
    param.count = count
    fetchOfterSalesList(param).then((res) => {
      this.setState({
        orderList: res.data,
        pages: res.page
      })
    })
  }
  callbackFun(obj, num) {
     if (num === 1) {
        this.setState({
          searchBoxParameter: obj
        })
     } else {
      this.getData(obj, 1, count)
    }
  }
  tabFun(value) {
    this.state.searchBoxParameter = JSON.parse(JSON.stringify(parameterObj)) 
    this.state.searchBoxParameter.refundExtStatus = value
    refundExtStatusNum = value
    this.setState({
      ...this.state
    })
    this.getData(this.state.searchBoxParameter, 1, count)
  }
  jump(obj, e) {
    browserHistory.push('/tour-order/afterSalesDetails?id=' + obj.afterSales.id)
  }

  render() {
    return (
      <div className="order">
        <SearchBox searchBoxParameter={this.state.searchBoxParameter} callbackFun={this.callbackFun.bind(this)}/>
        <div className="tabbable">
          <ul className="nav-tabs">
            <li onClick={this.tabFun.bind(this, '0')} className = {refundExtStatusNum === '0' ? "active" : '' }>全部</li>
            <li onClick={this.tabFun.bind(this, '1')} className = {refundExtStatusNum === '1' ? "active" : '' }>退款中</li>
            <li onClick={this.tabFun.bind(this, '2')} className = {refundExtStatusNum === '2' ? "active" : '' }>退款完成</li>
          </ul>
          <div className="tab-content">
             <div className="list-content">
                <table className="tx-table">
                  <thead className="tx-table-thead">
                    <tr className=" tx-table-thead-tr">
                        <th className="tx-table-selection">退款编号</th>
                        <th className="tx-table-selection" style={{width: '30%'}}>订单编号/商品</th>
                        <th className="tx-table-selection">购买者</th>
                        <th className="tx-table-selection">订单金额</th>
                        <th className="tx-table-selection">退款金额</th>
                        <th className="tx-table-selection">申请时间</th>
                        <th className="tx-table-selection">退款状态</th>
                        <th className="tx-table-selection">操作</th>
                    </tr>
                  </thead>
                  {this.state.orderList.map((obj, index) => {
                    return (
                      <tbody className="tx-table-tbody" key={index}>
                          <tr className="tx-table-row">
                            <td className="tx-table-selection-column text-center" style={{'wordWrap': 'break-word'}}>{obj.afterSales.serviceNo}</td>
                            <td className="tx-table-selection-column">
                              {obj.orderInfo.map((item, k) => {
                                return (
                                  <div key={k}>
                                    <div style={{'padding': '10px 0'}}>{item.orderNo}</div>
                                    <div className="scenic-name" style={{'display': '-webkit-box', 'WebkitBoxOrient': 'vertical'}}>{item.sceneryTicketName}</div>
                                  </div>
                                )
                              })}
                            </td>
                            <td className="tx-table-selection-column text-center">{obj.afterSales.userPhone}</td>
                            <td className="tx-table-selection-column text-center">{priceFilter(obj.afterSales.applyRefundMoney)}</td>
                            <td className="tx-table-selection-column text-center">{priceFilter(obj.afterSales.refundMoney)}</td>
                            <td className="tx-table-selection-column text-center">{timestampFormat(obj.afterSales.created)}</td>
                            <td className="tx-table-selection-column text-center">{afterSalesStatus(obj.afterSales.extStatus)}</td>
                            <td className="tx-table-selection-column text-center" onClick={(e) => this.jump(obj, e)}><a>查看详情</a></td>
                          </tr>
                      </tbody>
                      )
                  })}
                </table>
                <Pagination current={this.state.pages.currentPage} onChange={this.getData.bind(this, this.state.searchBoxParameter)} total={this.state.pages.totalCount} className="pageClass"/>
             </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect()(AfterSalesList)