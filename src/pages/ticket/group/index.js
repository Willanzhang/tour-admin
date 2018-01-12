import React, { Component } from 'react'
import { Button, Input, Table, message, Popconfirm } from 'antd'
import { Link } from 'react-router'
import { fetchGroupList, fetchDeleteGroup } from 'src/service/ticket/index'
import { timestampFormat } from 'src/util/filter'

import './index.less'

const InputGroup = Input.Group
let selectedKeys = []
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    selectedKeys = selectedRowKeys
  }
}

export default class TicketGroup extends Component {
  state = {
    page: 1,
    count: 10,
    selectData: [],
    value: '',
    pagination: {}, // 分页数据
    loading: false,
    listData: [],
    columns: [{
      title: '分组名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '票务数量',
      dataIndex: 'ticketNum',
      key: 'ticketNum'
    }, {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created'
    }, {
      title: '序号',
      dataIndex: 'sort',
      key: 'sort'
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return (
          <span>
            <Link style={{marginRight: '20px'}} to={`/tour-ticket/ticketGroup/editGroup?id=${record.key}`}>编辑</Link>
            {
              record.isDefault === 2 ? <Popconfirm placement="topLeft" title="确定要删除吗？" onConfirm={this.opera.bind(this, fetchDeleteGroup, record.key)} okText="确定" cancelText="取消"><a>删除</a></Popconfirm> : null
            }
          </span>
        )
      }
    }]
  }

  opera(fetchRoute, id) { // 删除
    fetchRoute({'id': id}).then(res => {
      message.success('删除成功!');
      this.fetchGroupData()
    })
  }

  fetchGroupData() {
    let params = {
      page: this.state.page,
      count: this.state.count
    }
    fetchGroupList(params).then(res => {
      const datas = res.data
      const pagination = {...this.state.pagination}
      pagination.total = res.page.totalCount
      let listData = datas.map((data, i) => {
        return {
          key: data.id,
          name: data.name,
          ticketNum: data.ticketNum,
          created: timestampFormat(data.created, 'YYYY-MM-DD hh:mm:ss'),
          sort: data.sort,
          isDefault: data.isDefault
        }
      })
      this.setState({
        listData,
        pagination
      })
    })
  }
  
  tableChange(pagination) { // 分页页码改变
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
      page: pagination.current
    }, () => {
      this.fetchListData()
    })
  }

  componentDidMount() {
    this.fetchGroupData()
  }
  render() {
    
    return (
      <div className="group">
        <div className="content">
          <InputGroup>
            <Button type="primary" size="large">
              <Link to='/tour-ticket/ticketGroup/createGroup'>创建分组</Link>
            </Button>
          </InputGroup>
          <Table
            className="table"
            rowSelection={rowSelection}
            pagination={this.state.pagination}
            loading={this.state.loading}
            columns={this.state.columns}
            dataSource={this.state.listData}
            onChange={this.tableChange.bind(this)}
            bordered />
        </div>
      </div>
    )
  }
}
