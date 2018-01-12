import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Pagination } from 'antd'
import SearchBox from 'src/pages/order/searchBox/index'
import { timestampFormat, orderStatus, refundStatusOrder } from 'src/util/filter'
import { nullValueFilter, priceFilter } from 'src/util/common'
import { fetchOrderList } from 'src/service/order/index'
import './index.less'
let [parameterObj, extStatusNum, count, page] = [null, '0', 10, 1]
class OrserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchBoxParameter: { // 组件参数
        orderNo: null, // 订单号
        createdStart: timestampFormat(Date.parse(new Date()) / 1000 - 518400, 'YYYY-MM-DD'), // 起始时间
        createdEnd: timestampFormat(Date.parse(new Date()) / 1000, 'YYYY-MM-DD'), // 结束时间
        storeId: '0', // 景区id
        extStatus: '0', // 对接订单状态（1待付款 2已完成 3退款中 4已关闭）
        travelerName: null, // 旅客姓名
        phoneNo: null, // 手机号
        refundExtStatus: '0' // 对接售后状态（1退款中 2已完成)
      },
      orderList: [{
        sceneryOrder: {
          SceneryOrderDetail: []
        },
        store: {}
      }],
      pages: {}
    }
    this.getData = this.getData.bind(this)
  }
  componentDidMount() {
    parameterObj = JSON.parse(JSON.stringify(this.state.searchBoxParameter))
    this.getData(parameterObj, 1, count)
  }
  componentWillUnmount() {
    extStatusNum = '0'
  }
  getData(obj, page, count) {
    page = page
    let param = JSON.parse(JSON.stringify(obj))
    if (param.createdStart) param.createdStart = (new Date(param.createdStart + ' 00:00:00').getTime()) / 1000
    if (param.createdEnd) param.createdEnd = new Date(param.createdEnd + ' 21:59:59').getTime() / 1000
    param.storeId = parseInt(param.storeId)
    param.extStatus = parseInt(param.extStatus)
    param.refundExtStatus = parseInt(param.refundExtStatus)
    param = nullValueFilter(param)
    param.page = page
    param.count = count
    fetchOrderList(param).then((res) => {
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
    this.state.searchBoxParameter.extStatus = value
    extStatusNum = value
    this.setState({
      ...this.state
    })
    // this.props.dispatch(searchBox(this.state))
    this.getData(this.state.searchBoxParameter, 1, count)
  }
  jump(obj, e) {
    browserHistory.push('/tour-order/details?id=' + obj.sceneryOrder.id)
    console.log(obj)
  }

  render() {
    return (
      <div className="order">
        <SearchBox searchBoxParameter={this.state.searchBoxParameter} callbackFun={this.callbackFun.bind(this)} />
        <div className="tabbable">
          <ul className="nav-tabs">
            <li onClick={this.tabFun.bind(this, '0')} className={extStatusNum === '0' ? "active" : ''}>全部</li>
            <li onClick={this.tabFun.bind(this, '1')} className={extStatusNum === '1' ? "active" : ''}>待付款</li>
            <li onClick={this.tabFun.bind(this, '2')} className={extStatusNum === '2' ? "active" : ''}>已完成</li>
            <li onClick={this.tabFun.bind(this, '3')} className={extStatusNum === '3' ? "active" : ''}>退款中</li>
            <li onClick={this.tabFun.bind(this, '4')} className={extStatusNum === '4' ? "active" : ''}>已关闭</li>
          </ul>
          <div className="tab-content">
            <div className="list-content">
              <table className="tx-table">
                <thead className="tx-table-thead">
                  <tr className=" tx-table-thead-tr">
                    <th className="tx-table-selection" style={{ width: '30%' }}>商品</th>
                    <th className="tx-table-selection">单价/数量</th>
                    <th className="tx-table-selection">售后</th>
                    <th className="tx-table-selection">购买者</th>
                    <th className="tx-table-selection">下单时间</th>
                    <th className="tx-table-selection">订单状态</th>
                    <th className="tx-table-selection">实付金额</th>
                  </tr>
                </thead>
                {this.state.orderList.map((obj, index) => {
                  return (
                    <tbody className="tx-table-tbody" key={index}>
                      <tr className="tx-table-row tr-empty"><td className="tx-table-selection-column" colSpan="7"></td></tr>
                      <tr className="tx-table-row tr-back-color">
                        <td className="tx-table-selection-column" colSpan="7">
                          <div className="tab-infor">
                            <div className="text-top">
                              <span className="order-on">订单号: {obj.sceneryOrder.orderNo}  <span className="clor pay">微信支付</span></span>
                              <span className="details" onClick={(e) => this.jump(obj, e)}>查看详情</span>
                            </div>
                            <div className="text-top">
                              <span className="order-on">外部订单号: <span className="clor">{obj.sceneryOrder.otherOrderNo || '—'}</span></span>
                              <span className="order-on">支付流水号: <span className="clor">{obj.orderPayInfo ? obj.orderPayInfo.tradeNo || '—' : '—'}</span></span>
                            </div>
                          </div>
                        </td>
                      </tr>
                      {obj.sceneryOrder.SceneryOrderDetail.map((item, k) => {
                        return (
                          <tr className="tx-table-row" key={k}>
                            <td className="tx-table-selection-column">
                              <div className="scenic-name" style={{ 'display': '-webkit-box', 'WebkitBoxOrient': 'vertical' }}>{item.sceneryTicketName}</div>
                              <div className="scenic-time">{timestampFormat(item.sceneryTicketSkuDayUse, 'YYYY年MM月DD')}日 {timestampFormat(item.sceneryTicketSkuStartTime, 'hh:mm')}~{timestampFormat(item.sceneryTicketSkuEndTime, 'hh:mm')}</div>
                            </td>
                            <td className="tx-table-selection-column text-center">{priceFilter(item.price)}/({item.num}件)</td>
                            <td className="tx-table-selection-column text-center">{refundStatusOrder(item.refundStatus)}</td>
                            <td className="tx-table-selection-column text-center">{obj.sceneryOrder.phoneNo}</td>
                            <td className="tx-table-selection-column text-center">{timestampFormat(obj.sceneryOrder.created)}</td>
                            <td className="tx-table-selection-column text-center">{orderStatus(obj.sceneryOrder.extStatus)}</td>
                            <td className="tx-table-selection-column text-center">{obj.sceneryOrder.SceneryOrderDetail.length === 1 ? priceFilter(obj.sceneryOrder.shouldPay) : priceFilter(item.price * item.num)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  )
                })}
              </table>
              <Pagination current={this.state.pages.currentPage} onChange={this.getData.bind(this, this.state.searchBoxParameter)} total={this.state.pages.totalCount} className="pageClass" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// function select(state) {
//   return {
//     searchBoxParameter: state.component.componentOrder
//   }
// }
export default connect()(OrserList)
