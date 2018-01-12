import React, { Component } from 'react'
import { Form, Button, Input, InputNumber, message } from 'antd'
import { fetchUpdateGroup, fetchDetailGroup } from 'src/service/ticket/index'
import { browserHistory } from 'react-router'
import { getQuery } from 'src/util/common'

import './index.less'

const FormItem = Form.Item

class EditGroup extends Component {
  state = {
    id: parseInt(getQuery('id'), 10),
    name: '',
    sort: 0
  }
 componentDidMount() {
     fetchDetailGroup({id: parseInt(getQuery('id'), 10)}).then((res) => {
      this.setState({
        name: res.data?res.data.name:'',
        sort: res.data?res.data.sort: ''
      })
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.sort = parseInt(values.sort, 10)
        let params = {id: Number(this.props.location.query.id), ...values}
        fetchUpdateGroup(params).then((res) => {
          message.success('编辑成功！', 1.5)
          browserHistory.push('/tour-ticket/ticketGroup')
        })
      }
    })
  }

  cancelEdit = () => {
    this.props.form.resetFields()
    browserHistory.push('/tour-ticket/ticketGroup')
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
      }
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
      <div className="edit-group">
        <div className="content width60">
          <Form onSubmit={this.handleSubmit}>

            <div className='flex margin-bottom20'>
              <span className='info-category border-green'>基础信息</span>
            </div>
            <FormItem
              {...formItemLayout}
              label="分组名称"
              hasFeedback
            >
              {getFieldDecorator('name', {
               initialValue: `${this.state.name}`,
                rules: [{
                  required: true, message: '请输入分组名称!',
                }, {
                  max: 10, message: '最多不超过10位！'
                }
                // , {
                //   pattern: /^[A-Za-z\u4E00-\u9FA5]+$/, message: '中文或英文均可，特殊字符除外'
                // }
                ],
              })(
                <Input placeholder="请填写票务分组名称，不超过10个字符"/>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="序号"
              hasFeedback
            >
              {getFieldDecorator('sort', {
               initialValue: `${this.state.sort}`,
                rules: [{
                  required: true, message: '请输入分组序号!',
                },{
                  pattern: /^[0-9]+$/, message: '只能输入数字'
                }],
              })(
                <InputNumber style={{ width: '100%' }} min={0} max={999999} placeholder="请输入分组序号" step={1} />
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout} className='text-center' style={{margin: '40px 0'}}>
              <Button type="primary" htmlType="submit" size="large">保存</Button>
              <Button type="" style={{margin: '0 20px'}} size="large" onClick={this.cancelEdit}>取消</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(EditGroup)