import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router'

export default class Nav3 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menu: {
        mode: 'horizontal',
      }
    }
  }
  getItemList(list) {
    return (list.map(val =>
      // 针对全网发布小程序的三级菜单，在未注册小程序时，是看不到该菜单的，所以使用了一个标识和props.canPublish
      // 注册成功后，通过canPublish参数，表示此时，在菜单item不能隐藏了，需要show出来
      <Menu.Item className={`font-size14 ${val.hideFlag && !this.props.canPublish ? 'hide' : 'show'}`} key={val.key}>
        <Link to={val.path}>{val.title}</Link>
      </Menu.Item>
    ))
  }
  // 通过路由，获取当前二级导航菜单应该选中的item的key值
  getSelectedKeys(routes) {
    const currentNav3Name = routes[routes.length - 1].breadcrumbName
    const nav3Data = this.props.nav3Data
    let result = null
    for (let i = 0, len = nav3Data.length; i < len; i++) {
      if (nav3Data[i].title === currentNav3Name) {
        result = nav3Data[i].key
      }
    }
    return result
  }
  render () {
    let selectedKeys = this.getSelectedKeys(this.props.routes)
    return (
      <div className={selectedKeys ? 'show ant-layout-wrapper' : 'hide ant-layout-wrapper'}>
        <Menu mode={this.state.menu.mode} selectedKeys={[selectedKeys]}>{this.getItemList(this.props.nav3Data)}</Menu>
      </div>
    )
  }
}