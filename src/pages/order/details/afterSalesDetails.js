import React, { Component } from 'react'
import { Pagination, Row, Col } from 'antd'
import { fetchOfterSalesDetail } from 'src/service/order/index'
import { timestampFormat, afterSalesStatus, orderType, refundReason, refundStatusText } from 'src/util/filter'
import { priceFilter, getQuery, sub } from 'src/util/common'
import { fetchBaseInfo } from 'src/service/setting/index'
import './index.less'
import 'src/pages/order/orderList/index.less'

class AfterSalesDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailsData: {
                afterSales: {},
                afterSalesDetail: [],
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
      fetchOfterSalesDetail({id: parseInt(getQuery('id'))}).then((res) => {
        this.setState({
          detailsData: res.data
        })
        console.log('res.data',res.data)
      })
    }
    render () {
      return (
        <div className="orderDetails">
          <div className="orderInfor">
            <div className="titleText"><span>售后信息</span></div>
            <div className="orderInforContent">
                  <Row className="item">
        	   <Col span={8}><span className="inforTitle">售后编号:</span><span className="inforText">{this.state.detailsData.afterSales.serviceNo}</span></Col>
        	   <Col span={8}><span className="inforTitle">维权原因:</span><span className="inforText">{refundReason(this.state.detailsData.afterSales.refundReason)}</span></Col>
        	   <Col span={8}><span className="inforTitle">申请时间:</span><span className="inforText">{timestampFormat(this.state.detailsData.afterSales.created)}</span></Col>
        	</Row>
                <Row className="item">
        	   <Col span={8}><span className="inforTitle">应退金额:</span><span className="inforText">{priceFilter(this.state.detailsData.afterSales.applyRefundMoney)}</span></Col>
        	   <Col span={8}><span className="inforTitle">退款手续费:</span><span className="inforText">{priceFilter(this.state.detailsData.afterSales.extraMoney)}</span></Col>
        	   <Col span={8}><span className="inforTitle">实退金额:</span><span className="inforText">{priceFilter(this.state.detailsData.afterSales.refundMoney)}</span></Col>
        	</Row>
                <Row className="item">
        	   <Col span={8}><span className="inforTitle">退款状态:</span><span className="inforText">{afterSalesStatus(this.state.detailsData.afterSales.extStatus)}</span></Col>
        	   <Col span={8}><span className="inforTitle">退款方式:</span><span className="inforText">原路退回支付账户</span></Col>
        	   <Col span={8}><span className="inforTitle">退款说明:</span><span className="inforText">{this.state.detailsData.afterSales.extStatusTxt}</span></Col>
        	</Row>
              <Row className="item">
                 <Col span={8}><span className="inforTitle">订单编号:</span><span className="inforText">{this.state.detailsData.order.orderNo}</span></Col>
                 <Col span={8}><span className="inforTitle">外部订单号:</span><span className="inforText">{this.state.detailsData.order.otherOrderNo || '—'}</span></Col>
                 <Col span={8}><span className="inforTitle">支付流水号:</span><span className="inforText">{this.state.detailsData.orderPayInfo.tradeNo || '—'}</span></Col>
              </Row>
                <Row className="item">
                 <Col span={8}><span className="inforTitle">订单类型:</span><span className="inforText">{orderType(this.state.detailsData.order.orderType)}</span></Col>
                 <Col span={8}><span className="inforTitle">购买者:</span><span className="inforText">{this.state.detailsData.order.phoneNo}</span></Col>
                 <Col span={8}><span className="inforTitle">归属网点:</span><span className="inforText">{this.state.detailsData.store.name}</span></Col>
              </Row>
            </div>          	
          </div>
          <div className="orderContent">
            <div className="titleText"><span>售后商品</span></div>
            <table className="tx-table">
                  <thead className="tx-table-thead">
                    <tr className=" tx-table-thead-tr">
                        <th className="tx-table-selection" style={{width: '30%'}}>商品</th>
                        <th className="tx-table-selection">应退金额</th>
                        <th className="tx-table-selection">退款手续费</th>
                        <th className="tx-table-selection">实退金额</th>
                        <th className="tx-table-selection">实名信息</th>
                        <th className="tx-table-selection">状态</th>
                    </tr>
                  </thead>
                  <tbody className="tx-table-tbody">
                    {this.state.detailsData.afterSalesDetail.map((obj, index) => {
                       return (
                          <tr className="tx-table-row" key={index}>
                            <td className="tx-table-selection-column">
                            <div className="scenic-name" style={{'display': '-webkit-box', 'WebkitBoxOrient': 'vertical'}}>{obj.sceneryOrderDetail.sceneryTicketName}</div>
                            <div className="scenic-time">{timestampFormat(obj.sceneryOrderDetail.sceneryTicketSkuDayUse, 'YYYY年MM月DD')}日 {obj.sceneryOrderDetail.sceneryTicketSkuStartTime}~{obj.sceneryOrderDetail.sceneryTicketSkuEndTime}</div>
                            </td>
                            <td className="tx-table-selection-column text-center">{priceFilter(obj.refundMoney)}</td>
                            <td className="tx-table-selection-column text-center">{priceFilter(obj.extraMoney)}</td>
                            <td className="tx-table-selection-column text-center">{priceFilter(sub(obj.refundMoney, obj.extraMoney))}</td>
                            <td className="tx-table-selection-column text-center">
                              <div>{obj.personalInfo ? obj.personalInfo.personalName : '—'}</div>
                              <div>{obj.personalInfo ? obj.personalInfo.personalID : ''}</div>
                            </td>
                            <td className="tx-table-selection-column text-center">{refundStatusText(this.state.detailsData.afterSales.extStatus)}</td>
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
export default AfterSalesDetails