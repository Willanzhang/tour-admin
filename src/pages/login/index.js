import React, { Component } from 'react'
import {message, Form, Input, Button } from 'antd'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { fetchLogin } from 'src/service/common/index'
import { signinInfo } from 'src/store/actions/signinInfo'
import { fetchNowUser } from 'src/service/setting/index'
import { baseUrl } from 'src/util/env'
import './index.less'

const FormItem = Form.Item

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captchaSrc: '',
      captchaToken: '',
      isSubmit: false
    };
  }
  componentDidMount() {
    this.getCaptcha()
  }
  
  getCaptcha() {
    const captchaToken = generateUuid()
    this.setState({
      captchaSrc: `${baseUrl}/public/captcha?captchaToken=${captchaToken}`,
      captchaToken: captchaToken
    })
  }

  // 获取登录信息，并存储到全局store中, (其实最好的做法是，登陆后就返回必要的登录信息)
  getSigninInfo() {
    fetchNowUser({}).then(res => {
      this.props.dispatch(signinInfo(res.data))
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = values
        params.captchaToken = this.state.captchaToken
        this.setState({
          isSubmit: true
        })
        fetchLogin(params).then((res) => {
          localStorage.setItem('subsystemTourInfo', JSON.stringify(res.data))
          this.getSigninInfo()
          message.success('登录成功！', 1.5)
          browserHistory.push('/')
        }).catch(err => {
          this.getCaptcha()
          this.setState({
            isSubmit: false
          })
        })
      }
    });
  }

  
  render() {
    const { getFieldDecorator } = this.props.form
    const {captchaSrc, isSubmit} = this.state
    return (
      <div className="flex flex-justify-center flex-align-center login-container">
        <div className="login">
          <div className="login-head">景区后台</div>
          <div className="login-body">
          <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem className="custom-form-item">
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入账号!' }],
                })(
                  <Input prefix={<img src="/static/icons/icon-user.png" style={{width: 24, height: 22}} alt=""/>} className="login-input" style={{height: 58}} placeholder="请输入账号" />
                )}
              </FormItem>
              <FormItem className="custom-form-item">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input prefix={<img src="/static/icons/icon-password.png" style={{width: 21, height: 24}} alt=""/>}  className="login-input"  style={{height: 58}}  type="password" placeholder="请输入密码" />
                )}
              </FormItem>
              <FormItem className="custom-form-item2">
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: '请输入验证码!' }],
                })(
                  <Input prefix={<img src="/static/icons/icon-captcha.png" style={{width: 23, height: 23}} alt=""/>}  className="login-input"  style={{height: 58, width: '60%', marginRight: 20}}  type="text" placeholder="请输入验证码" />
                )}
                <img className='code' style={{width: '30%', height: 58, float: 'right'}} src={captchaSrc} onClick={(e) => this.getCaptcha(e)} alt=""/>
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-button" loading={isSubmit}>
                  登录
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}

function generateUuid() {
  const prefix = 'SCPIAOWU'
  const timeStamp = new Date().getTime()
  const randomNum = Math.floor(Math.random() * 1000)
  return prefix + timeStamp + randomNum
}


const wrappedLoginForm = Form.create()(Login)

export default connect()(wrappedLoginForm)