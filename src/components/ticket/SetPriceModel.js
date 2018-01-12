/**
 * 设置库存和销售价弹框
 */

import React, { Component } from 'react'
import { InputNumber, Modal, DatePicker, TimePicker, Select, Button, Form, Input, Radio } from 'antd'
import { timestampFormat } from 'src/util/filter'
import moment from 'moment'
import { timeTextListEvent } from 'src/util/common'

import './setPriceModel.less'
const { RangePicker } = DatePicker
const Option = Select.Option
const FormItem = Form.Item;
let timeList = timeList = timeTextListEvent() || []
let isShow = true
class SetPriceModel extends Component {
  state = {
    startDate: '', // 弹框设置默认开始时间
    endDate: '', // 弹框设置默认结束时间
    isTime: false,
    setDatas: [{details:[]}],
    priceShow: false,
    stockShow: false,
    batchPrice: null, // 批量设置价格
    batchStock: null, // 批量设置库存
    startTime: '21', //预约开始时间
    endTime: '25', //预约结束时间
    interval: '1', //预约时间间隔
    modelType: '1' //库存模式
  }

  componentWillMount() {
    this.state = {
      startDate: this.props.sku.startDate, // 弹框设置默认开始时间
      endDate: this.props.sku.endDate, // 弹框设置默认结束时间
      setDatas: [{details:[]}],
      priceShow: false,
      stockShow: false,
      batchPrice: null, // 批量设置价格
      batchStock: null, // 批量设置库存
      startTime: this.props.sku.startTime, //预约开始时间
      endTime: this.props.sku.endTime, //预约结束时间
      interval: this.props.sku.interval, //预约时间间隔
      modelType: this.props.sku.modelType //库存模式
    }
    if (this.props.sku.num === 1) this.checkTime(this.state.startDate, this.state.endDate, parseInt(this.state.modelType), parseInt(this.state.interval), parseInt(this.state.startTime), parseInt(this.state.endTime))
  }
  componentWillReceiveProps() {
    if(this.props.sku.isTrue && isShow){
    this.state = {
      startDate: this.props.sku.startDate, // 弹框设置默认开始时间
      endDate: this.props.sku.endDate, // 弹框设置默认结束时间
      setDatas: [{details:[]}],
      priceShow: false,
      stockShow: false,
      batchPrice: null, // 批量设置价格
      batchStock: null, // 批量设置库存
      startTime: this.props.sku.startTime, //预约开始时间
      endTime: this.props.sku.endTime, //预约结束时间
      interval: this.props.sku.interval, //预约时间间隔
      modelType: this.props.sku.modelType, //库存模式
      isTrue: false
    }
    isShow = false
    this.checkTime(this.state.startDate, this.state.endDate, parseInt(this.state.modelType), parseInt(this.state.interval), parseInt(this.state.startTime), parseInt(this.state.endTime), this.props.sku.sceneryTicketSku)
    }
  }
  componentWillUnmount() {
    isShow = true
  }
  checkTime = (start, end, stast, section, startTime, endTime, skuObj ) => { // 组合数据
    var timeListCop = JSON.parse(JSON.stringify(timeList))
    var timePopVal = timeListCop[endTime]
    timeListCop = timeListCop.slice(startTime, endTime+1)
    let [i, totalDay, setDatas] = [0, (end - start) / 86400, []]
    for(; i <= totalDay; i++) {
      let [information, sku_price, sku_quota] = [[], null, null]
      if (stast===2){
        let [a, b] = [0, 0]
        timeListCop.forEach((obj, index) => {
          if(a===0){
            if (skuObj && skuObj[i] && skuObj[i].details[index]) {
              sku_price = skuObj[i].details[index].price
              sku_quota = skuObj[i].details[index].quota
            }
            b = index + section
            let endTimeText = JSON.parse(JSON.stringify(timeListCop[b] ? timeListCop[b] : timeListCop[timeListCop.length - 1]))
            var parameter ={
              dayUse: timestampFormat(start + i*24*60*60, 'YYYY-MM-DD'), //票的可使用日期
              price: sku_price, // 销售价格
              quota: sku_quota, // 剩余库存
              startTime: obj, // 时段的开始时间 HH:MM
              endTime: endTimeText, // 时段的结束时间 HH:MM
              text: obj + ' ~ ' + endTimeText
              }
              parameter[`price-${i}-${index}`] = sku_price
              parameter[`quota-${i}-${index}`] = sku_quota
              if (index + 1 !== timeListCop.length) {
                 information.push(parameter)
              }
          }
          a++
          if (a ===section) a = 0
        })
      } else {
         if (skuObj && skuObj[i] && skuObj[i].details[0]) {
          sku_price = skuObj[i].details[0].price
          sku_quota = skuObj[i].details[0].quota
        }
        information.push({
          dayUse: timestampFormat(start + i*24*60*60, 'YYYY-MM-DD'), //票的可使用日期
          price: sku_price, // 销售价格
          quota: sku_quota, // 剩余库存
          startTime: timeListCop[0], // 时段的开始时间 HH:MM
          endTime: timePopVal, // 时段的结束时间 HH:MM
          text: timeListCop[0] + ' ~ ' + timePopVal
        })
      }
      setDatas.push({
        date: timestampFormat(start + i*24*60*60, 'YYYY-MM-DD'),
        details: information
      })
    }
    this.setState({ setDatas })
  }

  changePrice(val) { // 价格输入框显示操作
    this.setState({
      priceShow: val
    })
  }
  changeStock(val) { // 库存输入框显示操作
    this.setState({
      stockShow: val
    })
  }

  priceChange = (val) => {
    if(!isNaN(val)) {
      this.state.batchPrice = val
    }
  }

  stockChange = (val) => {
    if(!isNaN(val)) {
      this.state.batchStock = val
    }
  }

    onChangeStock(o, ii, jj, val) {
    let {setDatas} = this.state
    setDatas.map((item, i) => {
      if(ii === i) {
          item.details.map((obj, j) => {
            if(jj === j) {
              obj.quota = val
              obj.price = obj.price 
              obj[`price-${i}-${j}`] = obj.price
              obj[`quota-${i}-${j}`] = val
            }
        })
      }
    })
    this.setState({setDatas})
  }
  onChangePrice(o, ii, jj, val) {
    this.state.setDatas.map((item, i) => {
      if(ii === i) {
          item.details.map((obj, j) => {
            if(jj === j) {
              obj.price = val 
              obj.quota = obj.quota 
              obj[`price-${i}-${j}`] = val
              obj[`quota-${i}-${j}`] = obj.quota
            }
        })
      }
    })
    this.setState({...this.state})
  }
  savePrice() {
    let {batchPrice, setDatas} = this.state
     var quotaText =this.props.form.getFieldsValue()
    setDatas.map((item, i) => {
       item.details.map((obj, j) => {
          obj.price = batchPrice
          obj.quota = obj.quota 
          obj[`price-${i}-${j}`] = batchPrice
          obj[`quota-${i}-${j}`] = obj.quota
           quotaText[`quota-${i}-${j}`] =obj.quota
           quotaText[`price-${i}-${j}`] = batchPrice
        })
    })
    this.setState({priceShow: false, batchPrice, setDatas})
    this.props.form.setFieldsValue(quotaText)
  }

  saveStock() {
    let {batchStock, setDatas} = this.state
     var quotaText =this.props.form.getFieldsValue()
    setDatas.map((item, i) => {
       item.details.map((obj, j) => {
          obj.price = obj.price 
          obj.quota = batchStock
          obj[`price-${i}-${j}`] = obj.price
          obj[`quota-${i}-${j}`] = batchStock
           quotaText[`quota-${i}-${j}`] = batchStock
           quotaText[`price-${i}-${j}`] = obj.price
        })
    })
    this.setState({stockShow: false, batchStock, setDatas})
    this.props.form.setFieldsValue(quotaText)
  }

  onOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.state.isTime) return
        this.props.onCreate(this.state)
      }
    });
  }

  onCancel = () => {
    isShow = true
    this.props.form.resetFields();
    this.props.onCancel(this.state);
  }

  handleChange(num, obj){
    this.props.form.resetFields();
    switch(num)
      {
      case 2:
        this.state.startTime = obj
        break;
      case 3:
        this.state.endTime = obj
        break;
      case 4:
        this.state.interval = obj
        break;
      case 5:
        this.state.modelType = obj
        break;
      case 6:
        const [startT, endT, section] = [obj[0]._d.getTime() / 1000, obj[1]._d.getTime() / 1000, (obj[0]._d.getTime() / 1000 + (86400 * 30))]
        // console.log(startT, endT, section)
        this.state.isTime = section<= endT ? true : false
        this.state.startDate = startT
        this.state.endDate = endT
        break;
      }
      this.checkTime(this.state.startDate, this.state.endDate, parseInt(this.state.modelType), parseInt(this.state.interval), parseInt(this.state.startTime), parseInt(this.state.endTime))
  }

  render() {
    const { visible, onCancel, form, initialValues} = this.props
    const isMmodelType =initialValues.modelType === '2' ? true :false
    const {setDatas, priceShow, stockShow} = this.state
    console.log(this.props)
    console.log('888',setDatas)
    console.log('this.state',this.state)
    console.log('9999',form.getFieldsValue())
    const dateFormat = 'YYYY/MM/DD'
     const { getFieldDecorator } = form
    return (
      <div>
        <Modal title="设置库存和销售价" className="modal-content" visible={visible} onOk={this.onOk} onCancel={this.onCancel} width={620}>

         <Form layout="vertical">
          <div className="queryTitleName">
            <span>设置区间：</span>
            <RangePicker allowClear={false} disabled={isMmodelType} defaultValue={[moment(timestampFormat(this.state.startDate, 'YYYY-MM-DD'), dateFormat), moment(timestampFormat(this.state.endDate, 'YYYY-MM-DD'), dateFormat)]}
              format={dateFormat} onChange={this.handleChange.bind(this, 6)} value={[moment(timestampFormat(this.state.startDate, 'YYYY-MM-DD'), dateFormat), moment(timestampFormat(this.state.endDate, 'YYYY-MM-DD'), dateFormat)]}/>
          <span className={this.state.isTime?'colorf041':''} style={{marginLeft: '20px'}}>（不超过30天）</span>
          </div>
          <div className="queryTitleName  margin-b">
            <span>库存模式：</span>
            <Select className="width120 margin-r" defaultValue={this.state.modelType} value={this.state.modelType} onChange={this.handleChange.bind(this, 5)} disabled={isMmodelType}>
              <Option value="1">按天设置库存</Option>
              <Option value="2">按时段设置库存</Option>
            </Select>
            <Select className= "width120" defaultValue={this.state.startTime} value={this.state.startTime} onChange={this.handleChange.bind(this, 2)} disabled={isMmodelType}>
                {timeList.map((obj, i) => {
                   return (
                    <Option value={i.toString()} key={i}>{obj}</Option>
                    )
                })}
            </Select>
            <span> ~ </span>
            <Select className="width120" defaultValue={this.state.endTime} value={this.state.endTime} onChange={this.handleChange.bind(this, 3)} disabled={isMmodelType}>
                {timeList.map((obj, i) => {
                   return (
                    <Option value={i.toString()} key={i}>{obj}</Option>
                    )
                })}
            </Select>
            <Select  className={this.state.modelType === '1' ? "hide" : 'width120 margin-l' } defaultValue={this.state.interval} value={this.state.interval}  onChange={this.handleChange.bind(this, 4)} disabled={isMmodelType}>
              <Option value="1">0.5小时</Option>
              <Option value="2">1小时</Option>
              <Option value="3">1.5小时</Option>
              <Option value="4">2小时</Option>
            </Select>
          </div>

          {/* 表格 */}
          <table className="edit-table">
            <thead>
              <tr>
                <th style={{width: '150px'}}>日期</th>
                <th style={{width: '200px'}}>库存</th>
                <th>销售价（元）</th>
              </tr>
            </thead>
          </table>
    
          <div  style={{width: '100%', maxHeight: '500px', minHeight: '200px', overflow: 'hidden', overflowY: 'auto'}}>
          <table className="edit-table">
            <tbody className="edit-body">
              {setDatas.map((item, i) => {
                return (
                  <tr key={i}>
                    <td  style={{width: '150px'}}>{item.date}</td>
                    <td  style={{maxWidth: '200px', minWidth: '200px'}}>
                      {item.details.map((obj, j) => {
                        return (
                          <FormItem className= {this.state.modelType === '2' ? "hegiht84" : 'padding-t-b5' } key={j}>
                          <span className = {this.state.modelType === '2' ? "" : 'hide' }>时段{j}（{obj.text}）</span>
                            {getFieldDecorator(`quota-${i}-${j}`, {
                              initialValue: obj.quota,
                              rules: [{
                               required: true, message: '必填' 
                              },
                              {
                                pattern: /^[0-9]*[0-9][0-9]*$/, message: '请输入正整数'
                              }],
                            })(
                              <InputNumber className="input-box" placeholder="最大库存100000"max={100000} initialValue={obj.quota} onChange={this.onChangeStock.bind(this, obj, i, j)} disabled={isMmodelType}/>
                            )}
                          </FormItem>
                          )
                      })}
                    </td>
                    <td>
                      {item.details.map((oo, o) => {
                        return (
                          <FormItem className= {this.state.modelType === '2' ? "hegiht84" : 'padding-t-b5' } key={o}>
                          <span  className = {this.state.modelType === '2' ? "empty" : 'hide' }></span>
                            {getFieldDecorator(`price-${i}-${o}`, {
                              initialValue: oo.price,
                              rules: [{ 
                                required: true, message: '必填' 
                              },
                              {
                                pattern: /^(([0-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/, message: '小数点不超过2位'
                              }],
                            })(
                              <InputNumber className="input-box" placeholder="最大价格1000000.00" max={1000000} initialValue={oo.price} onChange={this.onChangePrice.bind(this, oo, i, o)} disabled={isMmodelType}/>
                            )}
                          </FormItem>
                          )
                      })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          </div>

          {/* 操作 */}

          <div className="set">
            <span className="set-title">批量设置: </span>
            {
              priceShow === false && stockShow === false ?
                <span><a className="price" onClick={this.changeStock.bind(this, true)} disabled={isMmodelType} >库存</a><a onClick={this.changePrice.bind(this, true)} disabled={isMmodelType} >价格</a></span> :
                (
                  priceShow === true ?
                    <span>
                      <InputNumber className="input-box" min={0}  placeholder="最大价格1000000.00" max={1000000} step={0.01} onChange={this.priceChange} disabled={isMmodelType} />
                      <a className="save-btn" onClick={this.savePrice.bind(this)}>保存</a>
                      <a onClick={this.changePrice.bind(this, false)}>取消</a>
                    </span> :
                    <span>
                      <InputNumber className="input-box" placeholder="最大库存100000" min={0} max={100000} step={1} onChange={this.stockChange} disabled={isMmodelType} />
                      <a className="save-btn" onClick={this.saveStock.bind(this)}>保存</a>
                      <a onClick={this.changeStock.bind(this, false)}>取消</a>
                    </span>
                )
            }
          </div>
        </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(SetPriceModel);