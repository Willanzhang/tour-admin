import React from 'react'
import './index.less'
import { Component } from 'react'
// import { Carousel } from 'antd'
import { Modal, Form, Input, Button, message } from 'antd';
import { fetchBaseInfo, editPassword, fetchMasterInfo } from 'src/service/setting/index'
import { connect } from 'react-redux'
const FormItem = Form.Item
let subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo'))
// let marchantInfo = localInfo.merchant || localInfo.merchantData
let imageUrl = subsystemTourInfo.storeData ? subsystemTourInfo.storeData.logo : subsystemTourInfo.logo
// logo 编辑时可用
// const Option = Select.Option
// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

class SiteSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      masterInfo: {},
      imageUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=345644109,1620774369&fm=27&gp=0.jpg',
      confirmDirty: false,
      editCode: false
      // previewVisible: false,
      // previewImage: '',
      // fileList: [{
      //   uid: -1,
      //   name: 'xxx.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // }]
    }
    this.edit = this.edit.bind(this)
  }
  componentDidMount() {
    this.getMasterInfo()
    this.getBaseInfo()
  }

  getMasterInfo() {
    fetchMasterInfo({}).then((res) => {
      this.setState({
        masterInfo: res.data || {}
      })
    })
  }

  getBaseInfo() {
    fetchBaseInfo({}).then((res) => {
      this.setState({
        data: res.data,
        // detailAddress: res.data.area.fullAddress + res.data.address
        detailAddress: res.data.address
      })
    })
  }

  handleConfirmBlur = (e) => { // 确定密码
    const value = e.target.value;
    console.log(value, '搜狐焦点的值')
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  edit() { // 编辑
    this.setState({
      editCode: true
    })
  }
  cancelVisible(modal2Visible) { // 取消按钮
    const form = this.props.form
    form.resetFields()
    this.setState({
      editCode: modal2Visible,
      oloPassword: '',
      newPassword: '',
      repeatPassword: '',
      confirmDirty: false
    })
  }
  submitVisible(modal2Visible) { // 确认按钮
    this.setState({ editCode: modal2Visible })
    alert('submit')
  }
  handleSubmit = (e) => { // 表单提交
    const form = this.props.form
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      } else { // 验证通过后
        this.setState({
          oloPassword: form.getFieldValue('oldpassword'),
          newPassword: form.getFieldValue('password'),
          repeatPassword: form.getFieldValue('confirm')
        })
        let params = {
          password: form.getFieldValue('oldpassword'),
          newPassword: form.getFieldValue('password'),
          repeatPassword: form.getFieldValue('confirm')
        }
        editPassword(params).then((res) => {
          if (!parseInt(res.errcode, 10)) {
            this.setState({
              editCode: false,
              oloPassword: '',
              newPassword: '',
              repeatPassword: '',
              confirmDirty: false
            })
            // 重置输入所有表单值 2 
            form.resetFields()
            message.success('修改密码成功', 3)
          } else {
            this.setState({
              editCode: false,
              oloPassword: '',
              newPassword: '',
              repeatPassword: '',
              confirmDirty: false
            })
            // 重置输入所有表单值 2 
            form.resetFields()
            message.error('密码修改失败， 请重新输入')
          }
        }, (err) => { // 账号不存在或者密码错误
          // message.error('旧密码输入错误,请重新输入')
          // this.setState({
          //   editCode: false,
          //   oloPassword: '',
          //   newPassword: '',
          //   repeatPassword: '',
          //   confirmDirty: false
          // })
          // 重置输入所有表单值 1
          // form.setFieldsValue({'oldpassword':'','password': '','confirm':''}) 
          // 重置输入所有表单值 2 
          // form.resetFields()
        })
      }
    });
  }
  checkConfirm = (rule, value, callback) => { // 新密码自定义验证
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  checkPassword = (rule, value, callback) => { // 再次输入密码验证
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('密码不一致!');
    } else {
      callback();
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { signinInfo } = this.props
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
    return (
      <div className="setting">
        <div>
          <div className="h1 border-green">基础信息</div>
          <div className="contentContainer">
            <p><span className="left">景区名称：</span><span>{this.state.data.name}</span></p>
            <p><span className="left">网点店址：</span><span>{this.state.detailAddress}</span></p>
            <div className="editBox"><span className="left">网点logo：</span>
              <img src={imageUrl} alt="logo" className="avatar showImg" />
              {/*<img style={{height: '150px', width: '150px', display: 'inline-block'}} src={imageUrl} alt="logo" className="avatar showImg" />*/}
              <div className="clearfix imgLogo">
                {/*暂时没有编辑*/}
                {/*<Upload
                  className="avatar-uploader"
                  name="avatar"
                  showUploadList={false}
                  action={baseUrl + "/admin/upload/image"}
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                  headers={headers}
                >
                  {
                    this.state.imageUrl ?
                      <img src={this.state.imageUrl} alt="logo" className="avatar showImg" /> :
                      <Icon type="plus" className="avatar-uploader-trigger" />
                  }
                </Upload>*/}
              </div>
            </div>
            <p><span className="left">联系电话：</span><span>{this.state.data.mobile}</span></p>
          </div>
        </div>
        <div>
          <div className="h1 border-green">账号信息</div>
          <div className="contentContainer">
            <p><span className="left">登录账号：</span><span>{signinInfo && signinInfo.userName}</span></p>
            <p className="editBox"><span className="left">登录密码：</span><span>{(signinInfo && signinInfo.password) || '●●●●●●'}</span> <span className="edit" onClick={this.edit} style={{ color: "#108ee9" }}>修改</span></p>
          </div>
        </div>
        <div>
          <div className="last h1 border-green">管理员信息</div>
          <div className="contentContainer">
            <p><span className="left">管理员姓名：</span><span>{this.state.masterInfo.name || '暂无姓名'}</span></p>
            <p><span className="left">手机号：</span><span>{this.state.masterInfo.mobile}</span></p>
          </div>
        </div>
        {/*<Button type="primary" onClick={() => this.setModal2Visible(true)}>Vertically centered modal dialog</Button>*/}
        <Modal
          title="修改密码"
          wrapClassName="vertical-center-modal-mine"
          visible={this.state.editCode}
          onOk={() => this.submitVisible(false)}
          onCancel={() => this.cancelVisible(false)}
          footer={false}
          header={false}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="请输入旧密码："
              hasFeedback
            >
              {getFieldDecorator('oldpassword', {
                rules: [{
                  required: true, message: '请输入旧密码!',
                }, {
                  min: 6, message: '请输入至少6位!',
                }],
              })(
                <Input type="password" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="请输入新密码："
              hasFeedback
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '请输入密码!',

                }, {
                  min: 6, message: '请输入至少6位!',
                }, {
                  max: 20, message: '最多输入20位!',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" />
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="重复新密码："
              hasFeedback
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: '密码不一致',
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
                )}
            </FormItem>
            <div id="buttonList" className="clearfix">

              <FormItem  {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className="sureEdit"> 确认修改</Button>
              </FormItem>
              <div className="mindlebox"></div>
              <FormItem {...tailFormItemLayout} className="cancelEdit">
                <Button onClick={() => this.cancelVisible(false)}>返回</Button>
              </FormItem>
            </div>
          </Form>
        </Modal>
      </div>
    )
  }
}
const SiteSetting = Form.create()(SiteSettings)

function select(state) {
  return {
    signinInfo: state.signin.signinInfo
  }
}

export default connect(select)(SiteSetting)
