import React, { Component } from 'react'
import { Button, Cascader , Input, Table, message, Popconfirm } from 'antd'
import { Link } from 'react-router'
import { fetchTicketList, fetchGroupList, fetchTicketDelete, fetchTicketClose, fetchTicketOpen } from 'src/service/ticket/index'
import { priceFilter, timestampFormat, modeTypeFilter } from 'src/util/filter'
import './index.less'

const Search = Input.Search
const InputGroup = Input.Group
let selectedKeys = []
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    selectedKeys = selectedRowKeys
  }
}

export default class TicketList extends Component {
  state = {
    page: 1,
    count: 10,
    name: '', // 搜索名称
    groupId: [], // 分组id集合
    groupData: [],
    value: '',
    pagination: {}, // 分页数据
    loading: false,
    listData: [],
    columns: [{
      title: '票务/销售价',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '销售价',
      dataIndex: 'marketPrice',
      key: 'marketPrice'
    }, {
      title: '总销量',
      dataIndex: 'salesTotal',
      key: 'salesTotal'
    }, {
      title: '序号',
      dataIndex: 'sort',
      key: 'sort'
    }, {
      title: '分组',
      dataIndex: 'groupName',
      key: 'groupName'
    }, {
      title: '票务模式',
      dataIndex: 'modeTypeText',
      key: 'modeTypeText'
    }, {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created'
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return (
          <span>
            <Link style={{marginRight: '20px'}} to={`/tour-ticket/ticketList/editTicket?id=${record.key}`}>编辑</Link>
            {
              record.modelType === 1 ? <Popconfirm placement="topLeft" title="确定要删除吗？" onConfirm={this.opera.bind(this, fetchTicketDelete, record.key, 1)} okText="确定" cancelText="取消"><a style={{marginRight: '20px'}} >删除</a></Popconfirm> : ''
            }
            {
              record.deleted === 2 ? <Popconfirm placement="topLeft" title="确定要启用吗？" onConfirm={this.opera.bind(this, fetchTicketOpen, record.key, 2)} okText="确定" cancelText="取消"><a style={{marginRight: '20px'}}>启用</a></Popconfirm> : <Popconfirm placement="topLeft" title='确定要禁用吗？' onConfirm={this.opera.bind(this, fetchTicketClose, record.key, 3)} okText="确定" cancelText="取消"><a style={{marginRight: '20px'}}>禁用</a></Popconfirm>
            }
          </span>
        )
      }
    }]
  }

  handleChange(val) {
    this.setState({
      groupId: val
    }, () => {
      this.fetchTicketData()
    })
  }

  opera(fetchRoute, id, val) { // 删除/启用/禁用操作
    fetchRoute({'id': id}).then(res => {
      switch(val)
      {
      case 1:
        message.success('删除成功!');
        break;
      case 2:
        message.success('开启成功!');
        break;
      case 3:
        message.success('禁用成功!');
        break;
      default:
        message.success('res');
      }
      this.fetchTicketData()
    })
  }

  fetchGroupList() { // 获取分组信息
    fetchGroupList({page: 1, count: 1000}).then(res => {
      const datas = res.data
      let groupData = datas.map((data, i) => {
        return {
          label: data.name,
          value: data.id
        }
      })
      this.setState({
        groupData
      })
    })
  }

  fetchTicketData() { // 获取票列表信息
    let params = {
      page: this.state.page,
      count: this.state.count,
      name: this.state.name,
      groupId: this.state.groupId
    }
    fetchTicketList(params).then(res => {
      const datas = res.data
      const pagination = {...this.state.pagination}
      pagination.total = res.page.totalCount
      let listData = datas.map((data, i) => {
        return {
          key: data.id,
          name: data.name,
          marketPrice: priceFilter(data.retailPrice),
          salesTotal: data.salesTotal,
          sort: data.sort,
          groupName: data.ticketGroup.name,
          modeTypeText: modeTypeFilter(data.modelType),
          created: timestampFormat(data.created, 'YYYY-MM-DD hh:mm:ss'),
          statusNum: data.statusNum,
          modelType: data.modelType,
          deleted: data.deleted
        }
      })
      this.setState({
        listData,
        pagination
      })
    })
  }
  
  tableChange(pagination) { // 分页页码改变
    console.log(selectedKeys)
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
      page: pagination.current
    }, () => {
      this.fetchTicketData()
    })
  }

  searchList(value) { // 搜索列表
    this.setState({
      name: value
    }, () => {
      this.fetchTicketData()
    })
    
  }

  componentDidMount() {
    this.fetchTicketData()
    this.fetchGroupList()
  }

  render() {
    
    return (
      <div className="ticket-list">
        <div className="content">
          <InputGroup>
            <Button type="primary" size="large">
              <Link to='/tour-ticket/ticketList/createTicket'>创建票务</Link>
            </Button>
            <Search className="search" placeholder="搜索" onSearch={this.searchList.bind(this)} />
            <Cascader
              className="select"
              options={this.state.groupData}
              onChange={this.handleChange.bind(this)}
              placeholder="所有分组"
              showSearch
            />
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
