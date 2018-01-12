import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { fetchRealTime } from 'src/service/common/index'
import { priceFilter } from 'src/util/filter'
import { fetchBaseInfo } from 'src/service/setting/index'
import { getQuery } from 'src/util/common'
import { initPlatform } from 'src/store/actions/initPlatform'
import './index.less'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      realTimeData: [],
      frequentLink: [
        {
          name: '财务结算',
          id: 1,
          needRoleId: 2,
          path: '/tour-statistics/settlementAccount'
        },
        {
          name: '订单查询',
          id: 2,
          needRoleId: 1,
          path: '/tour-order/list'
        },
        {
          name: '创建票',
          id: 3,
          needRoleId: 1,
          path: '/tour-ticket/ticketList/createTicket'
        },
        {
          name: '退票设置',
          id: 4,
          needRoleId: 1,
          path: '/tour-setting/wxmini/auth'
        },
        {
          name: '订单统计',
          id: 5,
          needRoleId: 1,
          path: '/tour-order/list'
        },
      ]
    }
  }

  componentWillMount() {
    fetchBaseInfo({}).then((res) => {
      const token = getQuery('token')
      if (token) {
        res.data.token = token
        localStorage.setItem('subsystemTourInfo', JSON.stringify(res.data))
        this.props.dispatch(initPlatform(res.data))
      }
    })
  }
  componentDidMount() {
    // 请求运营商实时数据
    fetchRealTime({}).then((res) => {
      let realTimeData = []
      let data = res.data
      realTimeData.push({name: '成交笔数', value: data['finishOrder']})
      realTimeData.push({name: '成交总额', value: priceFilter(data['payAmount'])})
      realTimeData.push({name: '退款总笔数', value: data['refundOrder']})
      realTimeData.push({name: '退款总额', value: priceFilter(data['refundAmount'])})
      realTimeData.push({name: '总交易净额', value: priceFilter(data['payAmount'] - data['refundAmount'])})
      this.setState({realTimeData})
    })
  }

  // 常用链接跳转，根据key值，先更新一级导航的状态，然后再跳转
  linkTo = (data, e) => {
    e.preventDefault()
    browserHistory.push(data.path)
  }

  render() {
    const { platformInfo, signinInfo } = this.props
    return (
      <div style={{ height: '100%', overflow: 'auto' }}>
        <h2 className='shop-name margin-bottom20'>{platformInfo.name}</h2>
        <div style={{ padding: '10px 30px' }}>
          <h3 className='font-size16 padding10'>今日实时数据</h3>
          <div className='bg-grey width80' style={{ padding: '40px 10px', minHeight: 140 }}>
            <ul className='flex text-center'>
              {this.state.realTimeData.map((data, idx) => (
                <li className='flex-cell' key={idx}>
                  <p className='font-size28 blue'>{data.type === 1 ? priceFilter(data.value) : data.value}</p>
                  <p className='font-size14'>{data.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ padding: '10px 30px' }}>
          <h3 className='font-size16 padding10'>常用功能</h3>
          <div className='width80'>
            <ul className="text-center" style={{overflow: 'hidden'}}>
              {
                this.state.frequentLink.map((data) => (
                  // <Link key={data.id} to={data.path} className='flex-cell black'
                  //       style={{lineHeight: 5, borderRight: '2px solid #fff'}}>
                  //   <li>{data.name}</li>
                  // </Link>
                  <li className={`black common-use-link bg-grey font-size14 ${signinInfo.roleId && (signinInfo.roleId >= data.needRoleId ? '' : 'hide')}`}
                      onClick={(e) => this.linkTo(data, e)} key={data.id}
                      style={{lineHeight: 5, width: 'calc(25% - 2px)', marginBottom: 2, marginRight: 2, float: 'left'}}>{data.name}</li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    platformInfo: state.platform.platformInfo,
    signinInfo: state.signin.signinInfo
  }
}

export default connect(select)(Home)
