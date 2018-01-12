import React, { Component } from 'react'
import { 
  Table,Button,
  Form, Input, Icon
} from 'antd'
import { Link } from 'react-router'
import { fetchOutletsList } from 'src/service/outlets/index'

const FormItem = Form.Item

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
// 网点列表
class OutletsList extends Component {
  state = {
    dataSource: [],
    columns: [{
      title: '网点名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '联系电话',
      dataIndex: 'contact',
      key: 'cantact',
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => (
        <span>
          <a className='margin-right10'>启用</a>
          <a className='margin-right10'>编辑</a>
          <a className='margin-right10'>越权操作</a>
        </span>
      )
    }]
  }
  componentDidMount() {
    fetchOutletsList({}).then((res) => {
      res.forEach((val, idx) => {
        val.key = val.id + ''
      })
      this.setState({
        dataSource: res
      })
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    const userNameError = isFieldTouched('userName') && getFieldError('userName')
    return (
      <div>
        <div className='padding-bottom10 flex flex-justify-between'>
          <Link to='/outlets/management/detail'>
            <Button type='primary'>创建网点</Button>
          </Link>
          <Form onSubmit={this.handleSubmit} layout='inline'>
            <FormItem
              validateStatus={userNameError ? 'error' : ''}
              help={userNameError || ''}
            >
            {getFieldDecorator('searchName', {
              rules: [{ required: true, message: '请输入要查询的网点!' }],
            })(
              <Input prefix={<Icon type="search" style={{ fontSize: 13 }} />} placeholder="搜索网点" />
            )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
              >
                搜索
              </Button>
            </FormItem>
          </Form>
        </div>
        <Table className='table-text-center' dataSource={this.state.dataSource} bordered columns={this.state.columns} />
      </div>
    )
  }
}

const WrappedOutletsList = Form.create()(OutletsList);

export default WrappedOutletsList