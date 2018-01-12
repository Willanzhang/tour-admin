import React, { Component } from 'react'
import './index.less'
import { browserHistory } from 'react-router'
import { Form, Input, Button, message, Radio } from 'antd';
import {
  fetchStaffInfo,
  editStaffInfo,
  fetchMasterInfo,
  mobileCodeCheck,
  fetchVerifyCode
} from 'src/service/setting/index'
const [FormItem, RadioGroup] = [Form.Item, Radio.Group]
// 获取验证码按钮 false 未获取
let [timer, getCodeFlag, ajaxFlag, firstCode] = [null, false, false, false]

class EditStaff extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {userName: '', password: '', name: '', mobile: '', roleId: ''},
      codeText: '获取验证码',
      userInfo: {},
      initialValues: {}, // 初始化数据
      key: '', // 编辑为高级管理员需要
      code: '', // 编辑为高级管理员需要
      confirmDirty: false,
      masterTel: '', // 创始者手机号
    }
    this.edit = this.edit.bind(this)
    // this.handleCancel = this.handleCancel.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    const id = this.props.location.query.id
    fetchStaffInfo({id: Number(id)}).then((res) => {
      this.setState({
        data: res.data
      })
    })
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
      data: {
        ...this.state.data,
        roleId: e.target.value
      }
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

  edit() { // 编辑
    this.setState({
      editCode: true
    })
  }
  cancelVisible(modal2Visible) { // 取消按钮
    browserHistory.push('/tour-setting/staff')
  }
  submitVisible(modal2Visible) { // 确认按钮
    this.setState({ editCode: modal2Visible })
  }
  handleSubmit = (e) => { // 表单提交
    const form = this.props.form
    const { roleId } = this.state.data
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      } else { // 验证通过后
        let params = {
          userName: values.userName,
          password: values.password,
          name: values.name,
          mobile: values.mobile,
          roleId: Number(roleId),
          id: Number(this.props.location.query.id)
        }
        if (Number(roleId) === 2) { // 编辑高级管理员需要
          params.key = this.state.key
          params.code = this.state.code
        }
        editStaffInfo(params).then((res) => {
          if (!parseInt(res.errcode, 10)) {
            browserHistory.push('/tour-setting/staff')
            message.success('修改成功', 3)
          } else {
            this.setState({
              confirmDirty: false
            })
            message.error('信息修改失败， 请重新输入')
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
  
  render() {
    const { getFieldDecorator } = this.props.form
    let { userName, password, name, mobile, roleId } = this.state.data
    let { masterTel } = this.state
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
          >
            <Input type="text" value={userName} placeholder="请填写员工账号，如手机号" disabled/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="员工密码："
            hasFeedback
          >
            {getFieldDecorator('password', {
              initialValue: `${password}`,
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
              initialValue: `${name}`,
              rules: [{
                required: true, message: '请输入员工姓名!',

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
              initialValue: `${mobile}`,
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
              <Button type="primary" htmlType="submit" className="sureEdit">保存</Button>
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
const EditStaffs = Form.create()(EditStaff);
export default EditStaffs
