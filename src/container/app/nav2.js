import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'
import nav2Data from 'container/app/nav2Data'
const { Sider } = Layout

class Nav2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nav2Data: nav2Data
    }
  }

  isEmptyObject(obj) {
    for ( var name in obj ) {
			return false
		}
		return true
  }
  /**
   * 递归调用获取侧边栏菜单
   */
  recursion(dataSource) {
    const {signinInfo} = this.props
    return (
      dataSource.map((menu, index) => {
        return (<Menu.Item className={`font-size14 ${signinInfo && (signinInfo.roleId >= menu.needRoleId ? '' : 'hide')}`} key={menu.key}>
          <Link to={menu.path}>{menu.title}</Link>
        </Menu.Item>)
      })
    )
  }
  // 通过路由，获取当前二级导航菜单应该选中的item的key值
  getSelectedKeys(routes) {
    const currentNav2Name = routes[3] && routes[3].breadcrumbName
    const curNav2Data = this.state.nav2Data[this.props.currentNav1]
    let result = null
    for (let i = 0, len = curNav2Data.subMenu.length; i < len; i++) {
      if (curNav2Data.subMenu[i].title === currentNav2Name) {
        result = curNav2Data.subMenu[i].key
      }
    }
    return [result]
  }
  render () {
    let curNav2Data = this.state.nav2Data[this.props.currentNav1]
    curNav2Data = JSON.parse(JSON.stringify(curNav2Data))
    return !this.isEmptyObject(curNav2Data) ? (
      <Sider width={110} style={{ background: '#fff', minHeight: '100%', overflow: 'hidden'}}>
        <div className='font-size14'  style={{lineHeight: '50px', textAlign: 'center', border: '1px solid #dfdfdf'}}> {curNav2Data.prev}</div>
        <Menu  mode='inline'  selectedKeys={this.getSelectedKeys(this.props.routes)}  style={{ height: '100%'}} >
          {/* <SubMenuList /> */}
          {this.recursion(curNav2Data.subMenu)}
        </Menu>
      </Sider>
    ) : (
      <span></span>
    )
  }
}

export default connect()(Nav2)