import React, { Component } from 'react'
import './index.less'
import { browserHistory } from 'react-router'
import { Form, Input, Button, message, Radio } from 'antd';
import {
  addStaffInfo,
  fetchMasterInfo,
  staffNameCheck,
  mobileCodeCheck,
  fetchVerifyCode
} from 'src/service/setting/index'
const [FormItem, RadioGroup] = [Form.Item, Radio.Group]
// 获取验证码按钮 false 未获取
let [timer, getCodeFlag, ajaxFlag, firstCode] = [null, false, false, false]

class AddStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      codeText: '获取验证码',
      createStaff: 1, // 选择创建权限
      initialValues: {}, // 初始化数据
      key: '', // 添加高级管理员时需要
      code: '', // 添加高级管理员时需要
      confirmDirty: false,
      masterTel: '', // 创始者手机号
      roleId: 1, // 管理员级别
    }
  }
  componentDidMount() {
    this.getMasterTel()
  }
  componentWillUnmount() {
    clearInterval(timer)
    getCodeFlag = false
  }
  getMasterTel() { // 获取创始者手机号码 用于短信
    if (!this.state.masterTel) {
      fetchMasterInfo({}).then(res => {
        this.setState({
          masterTel: res.data && res.data.mobile
        })
      })
    }
  }
  changeRoleId = (e) => {
    this.setState({
      roleId: e.target.value,
    })
  }
  getVerificationCode = (e) => {
    // 1发送短信请求
    fetchVerifyCode({}).then(res => {
      // 2倒计时
      let downTime = 120
      getCodeFlag = true
      firstCode = true
      timer = setInterval(() => {
        this.setState({
          codeText: `${--downTime}秒后重发`
        })
        if (!downTime) {
          getCodeFlag = false
          clearInterval(timer)
          this.setState({
            codeText: '发送验证码',
          })
        }
      }, 1000)
      this.setState({
        key: res.data.key,
      })
    })
  }
  validMobileCode = (rule, value, callback) => { // 实时校验手机验证码的正确性
    const { key } = this.state
    if (!value) callback()
    if (value && value.length >= 4 && !ajaxFlag) {
      ajaxFlag = true
      mobileCodeCheck({
        "key": key,
        "code": value
      }).then(res => {
        ajaxFlag = false
        this.setState({
          code: value
        })
        callback()
      }, err => {
        ajaxFlag = false
        callback('验证码错误')
      })
    } else {
      callback('验证码错误')
    }
  }
  cancelVisible(modal2Visible) { // 取消按钮
    browserHistory.push('/tour-setting/staff')
  }
  submitVisible(modal2Visible) { // 确认按钮
    this.setState({ editCode: modal2Visible })
  }
  handleSubmit = (e) => { // 表单提交
    const form = this.props.form
    const {roleId, key, code} = this.state
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) { // 验证通过后
        let params = {
          userName: values.userName,
          password: values.password,
          name: values.name,
          mobile: values.mobile,
          roleId: Number(roleId)
        }
        if (Number(roleId) === 2) { // 高级管理员的情况处置
          params.key = key
          params.code = code
        }
        addStaffInfo(params).then((res) => {
          if (!parseInt(res.errcode, 10)) {
            browserHistory.push('/tour-setting/staff')
            message.success('添加成功', 3)
          } else {
            this.setState({
              confirmDirty: false
            })
            message.error('添加失败， 请重试')
          }
        }, (err) => {
        })
      }
    });
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true })
    }
    callback()
  }
  // 实时校验用户名是否已存在
  checkAccount = (rule, userName, callback) => {
    const reg = /^[A-Za-z0-9\u4E00-\u9FA5]+$/
    let value = (userName && userName.trim()) || ''
    if (value.length < 6) {
      callback('至少6位！')
    } else if (value.length >= 20) {
      callback('最多不超过20位！')
    } else if (!reg.test(value)) {
      callback('可填英文、中文、数字，特殊字符除外！')
    } else {
      if (!ajaxFlag) {
        ajaxFlag = true
        staffNameCheck({
          userName: value
        }).then(res => {
          ajaxFlag = false
          !Number(res.data) ? callback('用户名已存在') : callback()
        }, err => {
          ajaxFlag = false
          callback()
        })
      } else {
        callback('请重试')
      }
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { masterTel, roleId } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 10 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 10 },
        sm: { span: 8 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 10,
          offset: 0,
        },
        sm: {
          span: 8,
          offset: 3,
        },
      },
    }
    const radioStyle = {
      display: 'block',
      height: '30px',
      width: '600px',
      // padding: '0 30px',
      lineHeight: '30px',
    }
    return (
      <div className="addStaff">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="员工账号："
            hasFeedback
          >
            {getFieldDecorator('userName', {
              rules: [{
                required: true, message: '请输入员工登录账号!',
              }, {
                validator: this.checkAccount
              }],
            })(
              <Input type="text" placeholder="请填写员工账号，如手机号" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="员工密码："
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入员工登录密码!',
              }, {
                min: 6, message: '请输入至少6位!',
              }, {
                max: 20, message: '最多输入20位!',
              }],
            })(
              <Input type="password" placeholder="请填写登录密码，至少6位，不超过20位" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="员工姓名："
            hasFeedback
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入员工姓名!'
              }, {
                pattern: /^[A-Za-z\u4E00-\u9FA5]+$/, message: '中文或英文均可，特殊字符除外'
              }],
            })(
              <Input placeholder="请填写员工姓名" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="联系方式："
            hasFeedback
          >
            {getFieldDecorator('mobile', {
              rules: [{
                required: true, message: '请输入联系方式',
              }, {
                pattern: /^(1\d{10}|0\d{2,3}-\d{7,8}|400-?\d{3}-?\d{4})$/,
                message: '请输入准确的手机或固话（固话格式：0755-6666666）！'
              }],
            })(
              <Input placeholder="请填写联系方式，手机号或座机号" />
              )}
          </FormItem>
          <div className="chooseRadio" style={{ display: 'flex' }}>
            <div className="ant-form-item-label ant-col-xs-10 ant-col-sm-3" style={{ display: 'inline-block', lineHeight: '29px' }}>权限：</div>
            <RadioGroup className="chooseLimit" onChange={this.changeRoleId} value={roleId}>
              <Radio style={radioStyle} value={2}>
                <span style={{ display: 'inline-block', width: '120px' }}>高级管理员</span>（具备后台所有管理权限）
              </Radio>
              <Radio style={radioStyle} value={1}>
                <span style={{ display: 'inline-block', width: '120px' }}>普通管理员</span>（具备后台除了员工添加，删除，小程序配置，支付配置，财务结算的所有管理权限）
              </Radio>
              <Radio style={radioStyle} value={3}>
                <span style={{ display: 'inline-block', width: '120px' }}>核销员</span>（具备登录核销app，扫码核销和查看核销记录的所有权限）
              </Radio>
            </RadioGroup>
          </div>

          {Number(roleId) === 2 ? (<div> <FormItem
            className="captcha"
            style={{ marginTop: '10px' }}
            {...{
              labelCol: {
                xs: { span: 10 },
                sm: { span: 3 },
              },
              wrapperCol: {
                xs: { span: 3 },
                sm: { span: 3 },
              },
            }}
            label="短信验证码："
            hasFeedback
          >
            {getFieldDecorator('captcha', {
              rules: [{
                required: true, message: '请输入短信验证码!'
              }, {
                validator: this.validMobileCode
              }],
            })(
                <Input disabled={!getCodeFlag && !firstCode} style={{ verticalAlign: 'top', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
            )}
            <Button type='primary' disabled={getCodeFlag} onClick={(e) => this.getVerificationCode(e)} style={{ position: 'absolute', verticalAlign: 'top', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>{this.state.codeText}</Button>
          </FormItem>
            <div>
              <div className="ant-form-item-label ant-col-xs-10 ant-col-sm-3"></div>
              <div style={{ lineHeight: '30px' }} className="ant-form-item-control-wrapper ant-col-xs-10 ant-col-sm-16">验证短信将发送到创始人绑定的手机：{masterTel}，请注意查收</div>
            </div></div>) : null}
          <div id="buttonList" className="clearfix ant-form-item-label ant-col-xs-18 ant-col-sm-18" style={{ position: 'fixed', bottom: '20px' }}>
            <FormItem  {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" className="sureEdit"> 保存</Button>
            </FormItem>
            <div className="mindlebox"></div>
            <FormItem {...tailFormItemLayout} className="cancelEdit">
              <Button onClick={() => this.cancelVisible(false)}>取消</Button>
            </FormItem>
          </div>
        </Form>
        {/*<div id="buttonList" className="clearfix">*/}
        {/*<Button type="primary" htmlType="submit" className="login-form-button sureEdit">
              确认修改
            </Button>*/}

        {/*</div>*/}

      </div>
    )
  }
}
const AddStaffs = Form.create()(AddStaff);
export default AddStaffs