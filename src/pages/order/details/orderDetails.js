import React, { Component } from 'react'
import { Pagination, Row, Col } from 'antd'
import { fetchOrderDetail } from 'src/service/order/index'
import { timestampFormat, orderType, orderStatus, extStatus, hoursFormat } from 'src/util/filter'
import { priceFilter, getQuery, mul } from 'src/util/common'
import { fetchBaseInfo } from 'src/service/setting/index'
import './index.less'
import 'src/pages/order/orderList/index.less'

class OrderDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailsData: {
                orderDetail: [],
                order: {},
                orderPayInfo: {},
                store: {}
            }
          }
    }
    componentDidMount() {
      const token = getQuery('token')
      if (token) {
        fetchBaseInfo({}).then((res) => {
          if (token) {
            res.data.token = token
            localStorage.setItem('subsystemTourInfo', JSON.stringify(res.data))
            this.getData()
          }
        })
      } else {
        this.getData()
      }
    }
    getData() {
      fetchOrderDetail({id: parseInt(getQuery('id'))}).then((res) => {
        this.setState({
          detailsData: res.data
        })
        console.log('detailsData', res.data)
      })
    }
    render () {
      return (
        <div className="orderDetails">
          <div className="orderInfor">
            <div className="titleText"><span>订单信息</span></div>
            <div className="orderInforContent">
            	<Row className="item">
	           <Col span={8}><span className="inforTitle">订单编号:</span><span className="inforText">{this.state.detailsData.order.orderNo}</span></Col>
                   <Col span={8}><span className="inforTitle">外部订单号:</span><span className="inforText">{this.state.detailsData.order.otherOrderNo || '—'}</span></Col>
                   <Col span={8}><span className="inforTitle">支付流水号:</span><span className="inforText">{this.state.detailsData.orderPayInfo ? this.state.detailsData.orderPayInfo.tradeNo || '—' : '—'}</span></Col>
	         </Row>
            	<Row className="item">
      	           <Col span={8}><span className="inforTitle">订单类型:</span><span className="inforText">{orderType(this.state.detailsData.order.orderType)}</span></Col>
      	          <Col span={8}><span className="inforTitle">订单状态:</span><span className="inforText">{orderStatus(this.state.detailsData.order.extStatus)}</span></Col>
      	         <Col span={8}><span className="inforTitle">实付金额:</span><span className="inforText">{priceFilter(this.state.detailsData.order.shouldPay)}</span></Col>
             </Row>
            <Row className="item">
  	      <Col span={8}><span className="inforTitle">归属网点:</span><span className="inforText">{this.state.detailsData.store.name}</span></Col>
  	      <Col span={8}><span className="inforTitle">购买者:</span><span className="inforText">{this.state.detailsData.order.phoneNo}</span></Col>
  	      <Col span={8}><span className="inforTitle">下单时间:</span><span className="inforText">{timestampFormat(this.state.detailsData.order.created)}</span></Col>
            </Row>
            </div>          	
          </div>
          <div className="orderContent">
            <div className="titleText"><span>商品信息</span></div>
            <table className="tx-table">
                  <thead className="tx-table-thead">
                    <tr className=" tx-table-thead-tr">
                        <th className="tx-table-selection" style={{width: '30%'}}>商品</th>
                        <th className="tx-table-selection">单价</th>
                        <th className="tx-table-selection">数量</th>
                        <th className="tx-table-selection">优惠</th>
                        <th className="tx-table-selection">小计</th>
                        <th className="tx-table-selection">实名信息</th>
                        <th className="tx-table-selection">状态</th>
                    </tr>
                  </thead>
                  <tbody className="tx-table-tbody">
                     {this.state.detailsData.orderDetail.map((obj, index) => {
                        return (
                              <tr className="tx-table-row" key={index}>
                                <td className="tx-table-selection-column">
                                <div className="scenic-name" style={{'display': '-webkit-box', 'WebkitBoxOrient': 'vertical'}}>{obj.sceneryTicketName}</div>
                                <div className="scenic-time">{timestampFormat(obj.sceneryTicketSkuDayUse, 'YYYY年MM月DD')}日  {hoursFormat(obj.sceneryTicketSkuStartTime)}~{hoursFormat(obj.sceneryTicketSkuEndTime)}</div>
                                </td>
                                <td className="tx-table-selection-column text-center">{priceFilter(obj.price)}</td>
                                <td className="tx-table-selection-column text-center">{obj.num}</td>
                                <td className="tx-table-selection-column text-center">—</td>
                                <td className="tx-table-selection-column text-center">{priceFilter(mul(obj.num, obj.price))}</td>
                                <td className="tx-table-selection-column text-center">
                                  <div>{obj.personalInfo.personalName || '—'}</div>
                                  <div>{obj.personalInfo.personalID}</div>
                                </td>
                                <td className="tx-table-selection-column text-center">{extStatus(obj.extStatus)}</td>
                             </tr>
                          )
                     })}
                    
                 </tbody>
             </table>
          </div>
        </div>
      )
    }
}
export default OrderDetails