import React, { Component } from 'react'
import { Layout, Breadcrumb } from 'antd'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { changeNav1 } from 'src/store/actions/changeNav'
import { signinInfo } from 'src/store/actions/signinInfo'
import nav2Data from 'container/app/nav2Data'
import Nav1 from './nav1'
import Nav2 from './nav2'
import Nav3 from './nav3'
import { fetchNowUser } from 'src/service/setting/index'
import './index.less'
const {
  Content
} = Layout

function itemRender(route, params, routes, paths) {
  let routeIndex = routes.indexOf(route)
  const last = routeIndex === routes.length - 1
  if (routeIndex >= 2) {
    return last ? <span>{route.breadcrumbName}</span>
                : <Link style={{color: '#108ee9'}} to={'/' + paths.join('/')}>{route.breadcrumbName}</Link>
  } else {
    return null
  }
}

class App extends Component {
  state = {
    platformInfo: {},
    menu: {
      mode: 'vertical',
      children: [
        {
          key: 'a',
          icon: 'home',
          initPath: '/',
          categoryName: '/',
          needRoleId: 1, // 权限管理最低roleId， 1：普通管理员 2: 高级管理员 110：创始人
          title: '首页'
        },
        {
          key: 'b',
          icon: 'solution',
          initPath: '/tour-ticket/ticketList',
          categoryName: 'tour-ticket',
          needRoleId: 1,
          title: '票务'
        },
        {
          key: 'c',
          icon: 'bars',
          initPath: '/tour-order/list',
          categoryName: 'tour-order',
          needRoleId: 1,
          title: '订单'
        },
        {
          key: 'd',
          icon: 'line-chart',
          initPath: '/tour-statistics/transaction',
          categoryName: 'tour-statistics',
          needRoleId: 1,
          title: '数据'
        },
        {
          key: 'e',
          icon: 'setting',
          initPath: '/tour-setting/basic',
          categoryName: 'tour-setting',
          needRoleId: 1,
          title: '设置'
        },
      ]
    }
  }

  componentDidMount() {
    this.getSigninInfo()
  }

  // 获取登录信息，并存储到全局store中（考虑到请求时可能登录信息失效，会重新进行登录操作，因此登录后，也会进行一次登录信息请求存储的过程
  getSigninInfo() {
    fetchNowUser({}).then(res => {
      this.props.dispatch(signinInfo(res.data))
    })
  }

  getNav1SelectedKeys(routes) {
    const currentMenu = routes[2] && routes[2].path
    let result
    this.state.menu.children.forEach(val => {
      if (~val.initPath.indexOf(currentMenu)) result = val.key
    })
    if (!currentMenu || currentMenu === '/') result = 'a'
    return result
  }

  getNav2SelectedKeys(routes, nav1) {
    const currentNav2Name = routes[3] && routes[3].breadcrumbName
    const curNav2Data = nav2Data[nav1]
    let result = null
    if (curNav2Data.subMenu) {
      for (let i = 0, len = curNav2Data.subMenu.length; i < len; i++) {
        if (curNav2Data.subMenu[i].title === currentNav2Name) {
          result = curNav2Data.subMenu[i].key
        }
      }
    } else {
      return null
    }
    return result
  }
  // 通过路由，获取当前三级导航菜单应该选中的item的key值
  getNav3SelectedKeys(routes, nav3Data) {
    const currentNav3Name = routes[routes.length - 1].breadcrumbName
    let result = null
    for (let i = 0, len = nav3Data.length; i < len; i++) {
      if (nav3Data[i].title === currentNav3Name) {
        result = nav3Data[i].key
      }
    }
    return result
  }
  // 获取nav3的数据
  getNav3Data(curNav2Data, currentNav2) {
    for (let i = 0, len = curNav2Data.length; i < len; i++) {
      if (curNav2Data[i].key === currentNav2) return curNav2Data[i].children
    }
    return null
  }
  render () {
    const { dispatch, canPublish, routes, platformInfo, params } = this.props
    const { menu } = this.state
    const nav1 = this.getNav1SelectedKeys(routes)
    const curNav2Data = nav2Data[nav1].subMenu || []
    const isHome = nav1 === 'a' // 是否是首页
    const nav2 = this.getNav2SelectedKeys(routes, nav1)
    const nav3Data = this.getNav3Data(curNav2Data, nav2) || []
    const nav3 = this.getNav3SelectedKeys(routes, nav3Data)
    const showNav3 = nav3Data.length && nav3 ? true : false // 是否需要展示第三级导航菜单
    return (
      <div id="container">
        <Layout style={{height: '100%'}}>
          <Layout className='ant-layout-has-sider'>
             {/*一级导航*/}
            <Nav1 routes={routes} currentNav1={nav1} platformInfo={platformInfo} menu={menu}/>
            {/*二级导航*/}
            <Nav2 routes={routes} currentNav1={nav1}/>
            <Layout>
              <Breadcrumb  routes={routes.slice(1)}  params={params}  className={isHome || showNav3 ? 'hide' : 'show'}  style={{background: '#fff', padding: 15, fontSize: 14}}  itemRender={itemRender}  />
              {/*三级导航*/}
              <Nav3 routes={routes}  canPublish={canPublish}  nav3Data={nav3Data}  currentNav1={nav1}/>
              {/* <Content className={isHome ? '' : 'padding10'} style={{ backgroundColor: '#f2f2f2', display: 'flex'}}>
                <div className='padding20' style={{backgroundColor: '#fff', flex: 'auto'}}>{ this.props.children }</div>
              </Content> */}
              <Content className={isHome ? '' : 'padding10'}
                       style={{ backgroundColor: '#f2f2f2', height: '100%'}}>
                <div className='padding20'
                     style={{backgroundColor: '#fff', minHeight: '100%'}}>
                  { this.props.children }
                </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}

function select(state) {
  return {
    nav1: state.changeNav.nav1,
    canPublish: state.registerState.canPublish,
    platformInfo: state.platform.platformInfo
  }
}

export default connect(select)(App)