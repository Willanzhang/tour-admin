import React, { Component } from 'react'
import { Layout, message, Menu, Button, Popconfirm, Icon } from 'antd'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import ImgPlaceHolder from 'components/widgets/ImgPlaceHolder'
const { Sider } = Layout

class Nav1 extends Component {
  constructor (props) {
    super(props)
    let subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo'))
    this.state = {
      logoutText: '确认退出？',
      logo: subsystemTourInfo.storeData ? subsystemTourInfo.storeData.logo : subsystemTourInfo.logo
    }
    this.handleClick = this.handleClick.bind(this);
    this.confirmLogout = this.confirmLogout.bind(this);
  }
  
  handleClick({item, key, keyPath}) {
    browserHistory.push(item.props.initPath)
  }
  getItemList(list) {
    const {signinInfo} = this.props
    return (list.map(val =>
      <Menu.Item className={`font-size14 margin-bottom10 margin-top10 ${signinInfo && (signinInfo.roleId >= val.needRoleId ? '' : 'hide')}`}
                  key={val.key} initPath={val.initPath}>
        <Icon type={val.icon} />
        {val.title}
      </Menu.Item>
    ))
  }
  
  // 确认退出
  confirmLogout() {
    localStorage.removeItem('subsystemTourInfo') // 先清除缓存
    message.success('退出成功！', 1.5)
    browserHistory.push('/tour-login')
  }
  render () {
    const { currentNav1, menu, platformInfo } = this.props
    const { logoutText, logo } = this.state
    // let subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo'))
    // let logo = subsystemTourInfo.storeData ? subsystemTourInfo.storeData.logo : subsystemTourInfo.logo
    return (
      <Sider width={100}>
        <div className="flex flex-justify-center flex-align-center"
             style={{width: 100, height: 80}}>
          <div style={{width: 60, height: 60, borderRadius: 60}}>
            <ImgPlaceHolder dataSrc={logo || platformInfo.logo}
                         style={{width: '100%', height: '100%', borderRadius: 60}}/>
          </div>
        </div>
        <Menu  theme="dark"  mode={menu.mode}  selectedKeys={[currentNav1]}  defaultSelectedKeys={['a']}  className="s1-selected-rewrite"  onClick={this.handleClick}  >
          {this.getItemList(menu.children)}
        </Menu>
        <Popconfirm placement="bottomRight"  title={logoutText}  okText="确认"  cancelText="取消"  onConfirm={this.confirmLogout}>
          <Button type="primary"  style={{position: 'absolute',  left: 0, bottom: 0,  backgroundColor: '#333',  borderColor: '#333',  borderRadius: 0,  width: '100%'}}>退出</Button>
        </Popconfirm>
      </Sider>
    )
  }
}

function select(state) {
  return {
    platformInfo: state.platform.platformInfo
  }
}

export default connect(select)(Nav1)