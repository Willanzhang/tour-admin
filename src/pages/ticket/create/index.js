import React, { Component } from 'react'
import { Form, Input, Button, InputNumber, Select, TimePicker, Card, message } from 'antd'
import { fetchCreateTicket } from 'src/service/ticket/index'
import Wysiwyg from 'components/common/wysiwyg'
import SetPriceModel from 'components/ticket/SetPriceModel'
import { fetchGroupList } from 'src/service/ticket/index'
import { mul, timeTextListEvent } from 'src/util/common'
import { browserHistory } from 'react-router'
import './index.less'
const FormItem = Form.Item
const Option = Select.Option
let timeTextList = timeTextListEvent() || []
class CreateTicket extends Component {
  state = {
    isSaveBtnDisable: false, // 保存按钮是否禁用
    modalVisible: false, // 销售价和库存弹框显示状态
    setDatas:[], // 库存数据
    groupingList: [], //分组列表
    timeText: '',
    skuModel: '1',
    isSku: false,
    initialValues: { // 表单的初始化数据
      name: '', // 票务名称
      groupId: '0', // 票务类型
      modelType: '0', // 票务模式
      needPersonalInfo: '0', // 实名模式
      keyword: [], // 标签
      retailPrice: '0', // 销售价
      marketPrice: '0', // 市场价
      buyLimit: 0, // 购买限制,0表不限制
      sort: 0,//序号
      detailContent: '',  //票务详情
      additionalContent: '',  //购买须知
      sceneryTicketSku: []
    },
    sku:{
      startDate: Date.parse(new Date()) / 1000, // 弹框设置默认开始时间
      endDate: Date.parse(new Date()) / 1000 + 24*60*60*7, // 弹框设置默认结束时间
      startTime: '16', //预约开始时间段
      endTime: '36', //预约结束时间段
      interval: '2', //预约时间间隔
      modelType: '1', //库存模式
      num: 1
    }
  }
  componentDidMount() {
    this.getGrouping()
  }
  getGrouping() { //获取分组列表
    fetchGroupList({page: 1, count: 1000}).then(res => {
      this.setState({
        groupingList: res.data || []
      })
    })
  }
  handleSubmit = (e) => { // 保存
    e.preventDefault();
    console.log(this.state)
     this.props.form.validateFields((err, values) => {
       this.state.isSku = this.state.initialValues.sceneryTicketSku.length ? false : true
        if (err || this.state.isSku) return
        this.state.initialValues.sceneryTicketSku.map((obj, i) => {
        obj.details.map((oo, j) => {
          oo.price = mul(oo.price, 100)
        })
      })
        var parameter ={
          name: values.name, // 票务名称
          groupId: parseInt(values.groupId), // 票务类型（分组id）
          modelType: parseInt(values.modelType), // 票务模式
          needPersonalInfo: parseInt(values.needPersonalInfo), // 实名模式
          keyword: values.keyword?values.keyword.join():'', //标签
          retailPrice: Number(values.retailPrice) * 100, // 销售价
          marketPrice: Number(values.marketPrice) * 100, // 市场价
          buyLimit: values.buyLimit, // 购买限制,0表不限制
          sort: values.sort, //序号
          skuModel: Number(this.state.skuModel), //库存模型（1.按天设置 2.按时间段设置）
          sceneryTicketInfo: {
            enterTime: this.state.timeText,
            detailContent: this.state.initialValues.detailContent,  //票务详情
            additionalContent: this.state.initialValues.additionalContent  //购买须知
          },
          sceneryTicketSku: this.state.initialValues.sceneryTicketSku
        }
        fetchCreateTicket(parameter).then((res) => {
          message.success('添加成功！');
          browserHistory.push('/tour-ticket/ticketList')
        })
      });
  }
  cancelEdit() { // 取消
      browserHistory.push('/tour-ticket/ticketList')
  }
  showModal = () => { // 设置库存和销售价弹框
    this.setState({
      modalVisible: true,
    })
  }
  handleOk = (val, props) => { // 确认库存和销售价弹框
      this.state.isSku = false
      this.state.skuModel= val.modelType
      this.state.timeText = timeTextList[val.startTime]+'~'+timeTextList[val.endTime]
      this.state.initialValues.sceneryTicketSku = val.setDatas
      this.state.modalVisible = false
      this.state.setDatas = val
      this.setState({})
  }
  
  handleCancel = () => { // 取消
    this.state.isSku = true
    this.setState({
      modalVisible: false,
    })
  }
  richTextFun(obj, num) {
    if (num === 1) {
      this.state.initialValues.additionalContent=obj //购买须知
     if (obj) this.props.form.setFieldsValue({additionalContent: obj})
    } else {
      this.state.initialValues.detailContent=obj //票务详情
     if (obj) this.props.form.setFieldsValue({detailContent: obj})
    }
  }
  checkGroup(rule, value, callback) {  // 分组校验
     if (value !== '0') return callback();
    callback('请选择分组!');
  }
  checkMode(rule, value, callback) {  // 请选择票务模式
     if (value !== '0') return callback();
    callback('请选择票务模式!');
  }
  checkNameType(rule, value, callback) {  // 请选择模式类型
     if (value !== '0') return callback();
    callback('请选择模式类型!');
  }
  checkRetailPrice(rule, value, callback) {  // 请输入销售价
     if (value >= 0) return callback();
    callback('请输入销售价!');
  }
  checkMarketPrice(rule, value, callback) {  // 请输入市场价
    console.log(888888888888)
     if (value  >= 0) return callback();
    callback('请输入市场价!');
  }
  render() {
    let { isSaveBtnDisable, initialValues } = this.state
    console.log('content={this.state.initialValues.additionalContent}',initialValues.detailContent)
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {labelCol: {xs: { span: 24 }, sm: { span: 6 }},wrapperCol: {xs: { span: 24 }, sm: { span: 14 }} }
    const limitBuyLayout = {labelCol: {xs: { span: 24 }, sm: { span: 6 }},wrapperCol: {xs: { span: 6 }, sm: { span: 4 }} }
    const tailFormItemLayout = { wrapperCol: {xs: {span: 24, offset: 0 },sm: { span: 14, offset: 6 }}}
    
    return (
      <div className="create">
        <Form onSubmit={this.handleSubmit} className='width80 padding-left30'>
          {/* 基础信息 */}
          <div className='flex margin-bottom20'>
            <span className='info-category border-green'>基础信息</span>
          </div>
          <FormItem {...formItemLayout} label="票务名称" hasFeedback >
            {getFieldDecorator('name', {
              initialValue: `${initialValues.name}`,
              rules: [{
                required: true, message: '请输入票务名称!',
              }, {
                max: 30, message: '最多不超过30位！'
              }],
            })(
              <Input placeholder=" 请填写票务名称，不超过30个汉字" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="分组" >
            {getFieldDecorator('groupId', {
              initialValue: `${initialValues.groupId}`,
              rules: [
              { 
                validator: this.checkGroup 
              }],
            })(
              <Select style={{ width: 120 }}>
                <Option value="0">选择分组</Option>
                 {this.state.groupingList.map((item, index) => {
                    return (
                      <Option key={index} value={item.id.toString()}>{item.name}</Option>
                      )
                 })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="票务模式" >
            {getFieldDecorator('modelType', {
              initialValue: `${initialValues.modelType}`,
              rules: [{
                validator: this.checkMode
              }],
            })(
              <Select style={{ width: 120 }}>
                <Option value="0">选择模式</Option>
                <Option value="1">自主创建</Option>
                <Option value="2"  disabled>接口对接</Option>
              </Select>
            )}
            <span style={{marginLeft: '20px'}}>（选择接口对接模式，将无法使用POS机核销门票）</span>
          </FormItem>
          <FormItem {...formItemLayout} label="实名模式" >
            {getFieldDecorator('needPersonalInfo', {
              initialValue: `${initialValues.needPersonalInfo}`,
              rules: [{
                validator: this.checkNameType
              }],
            })(
              <Select style={{ width: 120 }}>
                <Option value="0">选择模式</Option>
                <Option value="1">需要填写身份证</Option>
                <Option value="2">无需填写身份证</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="标签" >
            {getFieldDecorator('keyword', {
              rules: [{
                required: true, message: '请输入标签!',
              }]
            })(
              <Select mode="tags"  placeholder="输入内容按Enter按键"  style={{ width: '100%' }}>{initialValues.keyword}</Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="价格(元)" >
            <FormItem style={{float: 'left'}}>
                <span>销售价: </span>
                {getFieldDecorator('retailPrice', {
                  initialValue: `${initialValues.retailPrice}`,
                  rules: [{
                    validator: this.checkRetailPrice
                  },{
                    pattern: /^(([0-9][0-9]{0,5})|1000000|(([0]\.\d{1,2}|[1-9][0-9]{0,5}\.\d{1,2})))$/, message: '销售价小于或等于1000000,小数点不超过2位。'
                  }],
                })(
                  <InputNumber min={0} placeholder="请输入价格" max={1000000} step={1} />
                )}
            </FormItem>
            <FormItem style={{float: 'left'}}>
                <span style={{marginLeft: '20px'}}>市场价: </span>
                {getFieldDecorator('marketPrice', {
                  initialValue: `${initialValues.marketPrice}`,
                  rules: [{
                    validator: this.checkMarketPrice
                  },{
                    pattern: /^(([0-9][0-9]{0,5})|1000000|(([0]\.\d{1,2}|[1-9][0-9]{0,5}\.\d{1,2})))$/, message: '市场价小于或等于1000000,小数点不超过2位。'
                  }],
                })(
                  <InputNumber min={0} placeholder="请输入价格" max={1000000} step={1} />
                )}
          </FormItem>
          </FormItem>
          {/* 使用信息 */}
          <div className='flex margin-bottom20'>
            <span className='info-category border-green'>使用信息</span>
          </div>
          <FormItem {...formItemLayout} label="购买日期" >
            <Button type="primary" onClick={this.showModal}>设置日期库存和实际销售价</Button>
            <p className={this.state.isSku?'color':'hide'}>请设置日期库存和实际销售价</p>
          </FormItem>
          <FormItem {...limitBuyLayout} label="购买限制" hasFeedback >
            {getFieldDecorator('buyLimit', {
              rules: [{
                required: true, message: '请输入限购数量!',
              },{
                  pattern: /^[0-9]+$/, message: '请能输入数字'
                }],
            })(
              <InputNumber style={{width: '100%', minWidth: '150px'}} min={0} placeholder="最大限购数量100000" max={100000}  step={1} />
            )}
          </FormItem>
          <FormItem {...limitBuyLayout} label="序号" hasFeedback >
            {getFieldDecorator('sort', {
              rules: [{
                required: true, message: '请输入序号!',
              },{
                  pattern: /^[0-9]+$/, message: '请能输入数字'
                }],
            })(
              <InputNumber style={{width: '100%', minWidth: '150px'}} min={0} max={1000} placeholder="最大序号1000" step={1} />
            )}
          </FormItem>
          {/* 详细信息 */}
          <div className='flex margin-bottom20'>
            <span className='info-category border-green'>详细信息</span>
          </div>
          <FormItem {...formItemLayout} label="购买须知" >
              <Card title=" 请编辑购买须知（富文本框）" bordered={true} >
                {getFieldDecorator('additionalContent', {
                   initialValue: `${initialValues.additionalContent}`,
                    rules: [{
                      required: true, message: '票务详情必填!',
                    }],
                  })(
                    <Wysiwyg richTextFun={this.richTextFun.bind(this)}  num={1}  content={initialValues.additionalContent}/>
                  )}
              </Card>
          </FormItem>
          <FormItem {...formItemLayout} label="票务详情" >
              <Card title=" 请编辑票务详情（富文本框）" bordered={true} >
                {getFieldDecorator('detailContent', {
                 initialValue: `${initialValues.detailContent}`,
                  rules: [{
                    required: true, message: '票务详情必填!',
                  }],
                })(
                  <Wysiwyg richTextFun={this.richTextFun.bind(this)}  num={2}  content={initialValues.detailContent}/>
                )}
              </Card>
          </FormItem>
          <FormItem {...tailFormItemLayout} className='text-center' style={{margin: '40px 0'}}>
            <Button type="primary" disabled={isSaveBtnDisable} htmlType="submit" size="large">保存</Button>
            <Button type="" style={{margin: '0 20px'}} size="large" onClick={this.cancelEdit}>取消</Button>
          </FormItem>
        </Form>
        {/*设置库存和销售价弹框*/}
        <SetPriceModel className="modeanem" {...this.state}
          visible={this.state.modalVisible}
          ref={this.saveFormRef}
          setDatas={this.setDatas}
          onCancel={this.handleCancel}
          onCreate={this.handleOk}
        />
      </div>
    )
  }
}
const WrappedCreateTicketForm = Form.create()(CreateTicket);
export default WrappedCreateTicketForm