import React, { Component } from 'react'
import { 
  Form, Input,
  Button, Select,
  Row, Col, Modal
} from 'antd'
import { loadTenMapScript } from 'src/util/common'
import './index.less'

const FormItem = Form.Item
const Option = Select.Option
let initFlag = true // flag用来指明是否是第一次操作

// 初始化地图 地图出现一个很奇怪的现象，必须回调一个函数，才能初始化完成
// 由于需要在模态框中使用地图，dom需要在模态框show的时候才能获取到，因此，在模态框初次show的时候实例化地图
window.initMap = function(secondFlag) {
  if (secondFlag) {
    var myLatlng = new window.qq.maps.LatLng(-34.397, 150.644)
    var myOptions = {
      zoom: 8,
      center: myLatlng,
      mapTypeId: window.qq.maps.MapTypeId.ROADMAP
    }
    var map = new window.qq.maps.Map(document.getElementById("mapContainer"), myOptions)
  }
}

// 网点类型更改
function handleChange(value) {
  console.log(`selected ${value}`)
}

class RegistrationForm extends Component {
  state = {
    confirmDirty: false, // 两次输入密码是否不同
    visible: false, // 模态框是否可见
  }
  componentDidMount() {
    loadTenMapScript()
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
    if (initFlag) {
      setImmediate(() => {
        window.initMap(true)
      })
      initFlag = false
    }
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    })
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入不一致!')
    } else {
      callback()
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    }
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    );
    return (
      <div>
        <Modal title="设置网点地址" visible={this.state.visible}
               width={768}
               onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <div id="mapContainer" style={{width: '100%', height: 400}}></div>
        </Modal>
        <Form onSubmit={this.handleSubmit} className='width60 padding-left30'>
          <div className='flex margin-bottom20'>
            <span className='info-category border-green'>基础信息</span>
          </div>
          <FormItem
            {...formItemLayout}
            label="网点名称"
            hasFeedback
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入网点名称!',
                max: 20
              }],
            })(
              <Input placeholder="请填写网点名称，最多不超过20个汉字"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="网点类型"
          >
            {getFieldDecorator('outletsType', {
              initialValue: 'tour',
              rules: [{ required: true}],
            })(
              <Select style={{ width: 120 }} onChange={handleChange}>
                <Option value="tour">旅游景区</Option>
                <Option value="transport">车站码头</Option>
                <Option value="hotel">酒店客栈</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="网点地址"
          >
            <a onClick={this.showModal}>设置网点地址</a>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="联系电话"
          >
            <Col span="3">
              <FormItem>
                <Input placeholder="区号"/>
              </FormItem>
            </Col>
            <Col span="1">
              <p className="ant-form-split">-</p>
            </Col>
            <Col span="20">
              <FormItem>
              {getFieldDecorator('telephone', {
                rules: [{
                  required: true, message: '请输入联系电话!',
                }],
              })(
                <Input type="number" placeholder="填写准确的联系电话，便于买家联系（区号可留空）"/>
              )}
                
              </FormItem>
            </Col>
          </FormItem>
          <div className='flex margin-bottom20'>
            <span className='info-category border-green'>账号信息</span>
          </div>
          <FormItem
            {...formItemLayout}
            label="登录账户"
            hasFeedback
          >
            {getFieldDecorator('account', {
              rules: [{
                required: true, message: '请输入登录账户!',
                max: 20
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="登录密码"
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入登录密码!',
                max: 20
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
            hasFeedback
          >
            {getFieldDecorator('confirmPassword', {
              rules: [{
                required: true, message: '请输入确认密码!', max: 20
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <div className='flex margin-bottom20'>
            <span className='info-category border-green'>绑定管理员</span>
          </div>
          <FormItem
            {...formItemLayout}
            label="管理员姓名"
            hasFeedback
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '请输入管理员姓名!', max: 20 }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机号码"
          >
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入手机号码!', max: 20 }],
            })(
              <Input type="number" addonBefore={prefixSelector} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="短信验证"
          >
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: '请输入短信验证码!', max: 20 }],
                })(
                  <Input size="large" />
                )}
              </Col>
              <Col span={12}>
                <Button size="large">发送验证码</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem {...tailFormItemLayout} className='text-center'>
            <Button type="primary" htmlType="submit" size="large">保存</Button>
            <Button type="" style={{marginLeft: 10}} htmlType="submit" size="large">取消</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm