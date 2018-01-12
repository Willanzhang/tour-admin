import React, { Component } from 'react'
import { Row, Col, Select, Input, DatePicker, Button } from 'antd';
import moment from 'moment';
import { timestampFormat } from 'src/util/filter'
import './index.less'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker
const dateFormat = 'YYYY/MM/DD';
let interactionObj= null
class searchBox extends Component {
  constructor(props) {
    super(props)
    interactionObj = props.searchBoxParameter
    this.state = {
      textOn: '1',
      orderNoDisplay:{
        display: 'block'
      },
      phoneNoDisplay:{
        display: 'none'
      },
      serviceNoDisplay:{
        display: 'none'
      },
      extStatusNameDisplay:{
        display: interactionObj.text === 1 ? 'none' : 'block'
      },
      selectNumDisplay:{
        display: interactionObj.text === 1 ? 'block' : 'none'
      }
    }
    this.query = this.query.bind(this)
    this.defaultValueChange = this.defaultValueChange.bind(this)
  }
  componentDidMount() {}
  componentWillReceiveProps() {
      interactionObj = this.props.searchBoxParameter
  }
  handleChange(value) {
    switch (parseInt(value)) {
      case 1:
        this.assignment('phoneNo', null)
        this.assignment('serviceNo', null)
        this.setState({
          orderNoDisplay:{
            display: 'block'
          },
          phoneNoDisplay:{
            display: 'none'
          },
          serviceNoDisplay:{
            display: 'none'
          }
        })
        return
      case 2:
        this.assignment('orderNo', null)
        this.assignment('serviceNo', null)
        this.setState({
          orderNoDisplay:{
            display: 'none'
          },
          phoneNoDisplay:{
            display: 'block'
          },
          serviceNoDisplay:{
            display: 'none'
          }
        })
        return
      case 3:
        this.assignment('orderNo', null)
        this.assignment('phoneNo', null)
        this.setState({
          orderNoDisplay:{
            display: 'none'
          },
          phoneNoDisplay:{
            display: 'none'
          },
          serviceNoDisplay:{
            display: 'block'
          }
        })
        return
    }
  }
  defaultValueChange(event, name) {
    if (name) {
        this.assignment(name, event)
    } else {
        let enentTa = event.target
        this.assignment(enentTa.name, enentTa.value)
    }
  }
  assignment(name, value) {
    interactionObj[name] = value
    this.props.callbackFun(interactionObj, 1)
  }
  query() {
     this.props.callbackFun(interactionObj, 2)
  }
  disabledDate(current) {
    return current && current.valueOf() > Date.now();
  }
  timeChange(value, dateString) {
    interactionObj.createdStart = dateString[0]
    interactionObj.createdEnd = dateString[1]
    this.props.callbackFun(interactionObj, 1)
}
queryArea(value) {
    interactionObj.createdStart = timestampFormat(Date.parse(new Date()) / 1000 - 86400 *(value-1), 'YYYY-MM-DD') // 起始时间
    interactionObj.createdEnd = timestampFormat(Date.parse(new Date()) / 1000 , 'YYYY-MM-DD') // 结束时间
    this.props.callbackFun(interactionObj, 1)
}
  render() {
    return (
        <div className="searchBox">
          <Row className="rowName">
            <Col span="6">
               <div className="flex">
                  <Select defaultValue={this.state.textOn} className="titleNme"  onChange={this.handleChange.bind(this)}>
                    <Option value="1">订单号</Option>
                    <Option value="2">手机号</Option>
                    <Option value="3" style={this.state.selectNumDisplay}>退款编号</Option>
                  </Select>
                  <Input className="width200" style={this.state.orderNoDisplay} name="orderNo" value={this.props.searchBoxParameter.orderNo} onChange={this.defaultValueChange}/>
                  <Input className="width200" style={this.state.phoneNoDisplay} name="phoneNo" value={this.props.searchBoxParameter.phoneNo} onChange={this.defaultValueChange}/>
                  <Input className="width200" style={this.state.serviceNoDisplay} name="serviceNo" value={this.props.searchBoxParameter.serviceNo} onChange={this.defaultValueChange}/>
               </div>
            </Col>
            <Col span="10">
              <div className="flex">
                <div className="titleNme text-align-r line-h30">下单时间</div>
                <RangePicker defaultValue={[moment(this.props.searchBoxParameter.createdStart, dateFormat), moment(this.props.searchBoxParameter.createdEnd, dateFormat)]}
                value={[moment(this.props.searchBoxParameter.createdStart, dateFormat), moment(this.props.searchBoxParameter.createdEnd, dateFormat)]} format={dateFormat} disabledDate={this.disabledDate} onChange={this.timeChange.bind(this)}  className="width200"/>
                <div className="width180">
                  <Button className="margin-r-l20" onClick={this.queryArea.bind(this, 7)}>近7天</Button>
                  <Button onClick={this.queryArea.bind(this, 30)}>近30天</Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="rowName" style={this.state.extStatusNameDisplay}>
          <Col span="6">
             <div className="flex">
                <div className="titleNme text-align-r line-h30 nowrap">订单状态</div>
                <Select defaultValue={this.props.searchBoxParameter.extStatus} value={this.props.searchBoxParameter.extStatus} name="extStatus" className="width200" onChange={(e) => this.defaultValueChange(e, "extStatus")}>
                  <Option value="0">全部</Option>
                  <Option value="1">待付款</Option>
                  <Option value="2">已完成</Option>
                  <Option value="3">退款中</Option>
                  <Option value="4">已关闭</Option>
                </Select>
             </div>
          </Col>
          <Col span="10">
             <div className="flex">
                <div className="titleNme text-align-r line-h30 nowrap">游客姓名</div>
                <Input className="width200" name="travelerName" value={this.props.searchBoxParameter.travelerName} onChange={this.defaultValueChange}/>
                <div className="width180"></div>
             </div>
          </Col>
        </Row>
          <Row className="rowName">
          <Col span="6">
             <div className="flex">
                <div className="titleNme text-align-r line-h30 nowrap">维权状态</div>
                <Select defaultValue={this.props.searchBoxParameter.refundExtStatus} value={this.props.searchBoxParameter.refundExtStatus} className="width200" name="refundExtStatus" onChange={(e) => this.defaultValueChange(e, "refundExtStatus")}>
                  <Option value="0">全部</Option>
                  <Option value="1">退款中</Option>
                  <Option value="2">退款完成</Option>
                </Select>
             </div>
          </Col>
          <Col span="10">
             <div className="flex">
                <div className="titleNme text-align-r line-h30 nowrap"></div>
                <div className="width200 ant-select ant-select-enabled"></div>
                <div className="width180">
                  <Button type="primary" className="buttonName" onClick={this.query}>查询</Button>
                </div>
             </div>
          </Col>
        </Row>
        </div>
    )
  }
}

export default searchBox
