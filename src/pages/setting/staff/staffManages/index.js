import React, { Component } from 'react'
import './index.less'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { timestampFormat, roleFilter } from 'src/util/filter'
import { Modal, Form, Input, Button, message, Select, Table } from 'antd';
import {
  fetchStaffLists,
  fetchVerifyCode,
  fetchMasterInfo,
  mobileCodeCheck,
  fetchDelStaff
} from 'src/service/setting/index'
const FormItem = Form.Item
const Option = Select.Option
const confirm = Modal.confirm
let [timer, getCodeFlag, ajaxFlag, firstCode] = [null, false, false, false]

class SiteSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: {
        page: 1,
        size: 10
      },
      roleSelect: 0, // 管理员筛选
      pagination: {
        pageSize: 10,
        defaultPageSize: 10,
        defaultCurrent: 1,
        current: 1
      },
      masterTel: '', // 创始人手机号码
      delStaffModal: false, // 删除弹窗
      loading: false,
      allTypes: ['普通管理员', '高级管理员', '核销员'],
      codeText: '获取验证码',
      listData: [],
      columns: [{
        title: '账号',
        dataIndex: 'userName',
      }, {
        title: '员工姓名',
        dataIndex: 'name',
      }, {
        title: '联系方式',
        dataIndex: 'mobile',
      }, {
        title: '权限',
        dataIndex: 'roleId',
        render: (text, record) => roleFilter(text)
      }, {
        title: '添加时间',
        dataIndex: 'created',
        render: (text, record) => timestampFormat(text)
      }, {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => Number(record.roleId) !== 110  && this.props.signinInfo.roleId >= 2 ? (<span><a style={{ paddingRight: '6px' }} onClick={() => this.edit(text, record)}>编辑</a><a onClick={() => this.delStaff(text, record)}>删除</a></span>) : (<span>-</span>),
      }]
    }

  }
  componentDidMount() {
    this.getTableLists()
    this.getMasterTel()
  }

  componentWillUnmount() {
    getCodeFlag = false
    clearInterval(timer)
  }

  cancelVisible(modal2Visible) { // 取消按钮
    this.setState({
      delStaffModal: modal2Visible
    })
  }

  goAddStaff() { // 添加员工
    browserHistory.push('/tour-setting/staff/addStaff')
  }
  
  edit(t, r) { // 去编辑界面
    browserHistory.push(`/tour-setting/staff/editStaff?id=${r.id}`)
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

  getDelStaff(id) {
    fetchDelStaff({ id: Number(id) }).then((res) => {
      if (!parseInt(res.errcode, 10)) {
        message.success('删除成功', 3)
        this.getTableLists(this.state.roleSelect)
      } else {
        message.error('删除失败， 请重试入')
      }
    }, (err) => {
    })
  }

  delStaff(text, record) { // 删除当前员工
    // 判断 是高级弹出modal
    if (Number(record.roleId) === 2) {
      this.setState({
        delStaffModal: true,
        id: record.id
      })
    } else {
      const _this = this
      confirm({
        title: '删除员工提示',
        content: '是否确定删除该员工？',
        onOk() {
          _this.getDelStaff(record.id)
        }
      })
    }
  }
  tableChange = (pagination, filters, sorter) => { // 分页页码改变
    const pager = { ...this.state.pagination }
    let page = this.state.page
    pager.current = pagination.current
    page.page = pager.current
    this.setState({
      page: page,
      pagination: pager
    })
    this.getTableLists(this.state.roleSelect)
  }
  getTableLists(type) { // 获取列表 type（0不限 1:普通管理员 2:超级管理员 3:核销员）
    this.setState({ loading: true });
    let params = { ...this.state.page }
    params.roleId = type || 0
    fetchStaffLists(params).then((res) => {
      let temPage = this.state.pagination
      temPage.total = res.page.totalCount
      // temPage.total = 200
      temPage.current = res.page.currentPage
      this.setState({
        pagination: temPage,
        listData: res.data || [],
        loading: false
      })
    })
  }
  getVerificationCode = (e) => { // 实时验证验证码是否正确
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
        bindKey: res.data.key,
      })
    })
  }
  validMobileCode = (rule, value, callback) => { // 实时校验手机验证码的正确性
    const { bindKey } = this.state
    if (!value) callback()
    if (value && value.length >= 4 && !ajaxFlag) {
      ajaxFlag = true
      mobileCodeCheck({
        "key": bindKey,
        "code": value
      }).then(res => {
        ajaxFlag = false
        callback()
      }, err => {
        ajaxFlag = false
        callback('验证码错误')
      })
    } else {
      callback('验证码错误')
    }
  }
  handleRoleSelect = (e) => {
    let page = {
      page: 1,
      size: 10
    }
    this.setState({
      page,
      roleSelect: Number(e)
    })
    this.getTableLists(Number(e))
  }
  handleSubmit = (e) => { // 表单提交
    const form = this.props.form
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      } else { // 验证通过后
        this.setState({
          delStaffModal: false
        })
        this.getDelStaff(this.state.id)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { signinInfo } = this.props
    const { allTypes, pagination, loading, columns,
      listData, delStaffModal, masterTel, codeText } = this.state
    // const { previewVisible, previewImage, fileList } = this.state
    /*const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )*/
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
      <div className="staffManages">
        <div style={{ marginBottom: 40, marginTop: 20, overflow: 'hidden' }}>
          <Button type='primary' style={{float: 'left'}} className={signinInfo && (signinInfo.roleId >= 2 ? '' : 'hide')}
                  onClick={this.goAddStaff.bind(this)}>添加员工</Button>
          <Select defaultValue="0" style={{ width: 200, float: 'right'}} onChange={this.handleRoleSelect}>
            <Option value="0">全部</Option>
            {
              allTypes.map((data, index) => (
                <Option key={data} value={index + 1 + ''}>{data}</Option>
              ))
            }
          </Select>
        </div>
        <div>
          <Table
            pagination={pagination}
            rowKey="id"
            loading={loading}
            columns={columns}
            dataSource={listData}
            onChange={this.tableChange.bind(this)}
            bordered />
        </div>
        <Modal
          title="删除高级管理员"
          wrapClassName="vertical-center-modal-mine"
          visible={delStaffModal}
          onOk={() => this.submitVisible(false)}
          onCancel={() => this.cancelVisible(false)}
          footer={false}
          header={false}
        >
          <div className="delStaff" style={{ paddingLeft: '25px', lineHeight: '24px' }} >
            <p>删除高级管理员需要进行创建人短信验证，</p>
            <p>删除后将无法管理后台，请谨慎操作</p>
          </div>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: '12px' }}>
            <FormItem style={{ width: '152px', marginLeft: '25px' }}
            >
              {getFieldDecorator('oldpassword', {
                rules: [{
                  required: true, message: '请输入验证码!',
                }, {
                  validator: this.validMobileCode
                }],
              })(
                <div >
                  <Input disabled={!getCodeFlag && !firstCode} style={{ verticalAlign: 'middle', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                  <Button onClick={(e) => this.getVerificationCode(e)} disabled={getCodeFlag} type='primary' style={{ verticalAlign: 'middle', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>{codeText}</Button>
                </div>
                )}
            </FormItem>
            <div style={{ paddingLeft: '24px', marginBottom: '16px' }}>验证短信将发送到创建人绑定的手机：{masterTel}，请注意查收</div>

            <div id="buttonList" className="clearfix">

              <FormItem  {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className="sureEdit">确认移除</Button>
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
        </Modal>
      </div>
    )
  }
}

function select(state) {
  return {
    signinInfo: state.signin.signinInfo
  }
}

const SiteSetting = Form.create()(SiteSettings)

export default connect(select)(SiteSetting)
