import React from 'react';
import { Route, IndexRoute } from 'react-router'
import { getQuery } from 'src/util/common'

const App = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('container/app/index').default)
  })
}

// 首页
const Home = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/home/index').default)
  })
}

// 登录
const Login = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/login/index').default)
  })
}

// 票务
// 票务列表
const TicketList = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/ticket/list/index').default)
  })
}

// 创建票务
const CreateTicket = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/ticket/create/index').default)
  })
}

// 编辑票务
const EditTicket = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/ticket/edit/index').default)
  })
}

// 票务分组
const TicketGroup = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/ticket/group/index').default)
  })
}

// 创建票务分组
const CreateGroup = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/ticket/createGroup/index').default)
  })
}

// 编辑票务分组
const EditGroup = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/ticket/editGroup/index').default)
  })
}

// 数据

// 财务结算
const SettlementAccount = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/statistics/cashier/settlementAccount/index').default)
  })
}

// 交易分析
const Transaction = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/statistics/transaction/index').default)
  })
}

// 核销统计
const Verification = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/statistics/verification/index').default)
  })
}

// 核销明细
const VerificationDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/statistics/verification/detail/index').default)
  })
}

// 结算明细
const SettlementDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/statistics/cashier/settlementDetail/index').default)
  })
}

// 支付明细
const PayDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/statistics/cashier/payDetail/index').default)
  })
}

// 退款明细
const RefundDetail = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/statistics/cashier/refundDetail/index').default)
  })
}

// 设置
const Auth = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/setting/wxmini/auth/index').default)
  })
}

// 基本信息
const OperatorsBasic = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/setting/wxmini/basic/index').default)
  })
}

// 员工管理
const StaffManages = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/setting/staff/staffManages').default)
  })
}

// 添加员工
const AddStaff = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/setting/staff/addStaff').default)
  })
}

// 编辑员工
const EditStaff = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('pages/setting/staff/editStaff').default)
  })
}

/*订单*/
const OrderList = (location, cd) => {
  require.ensure([], require => {
    cd(null, require('pages/order/orderList/index').default)
  })
}

const OrderDetails = (location, cd) => {
  require.ensure([], require => {
    cd(null, require('pages/order/details/orderDetails').default)
  })
}

const AfterSalesList = (location, cd) => {
  require.ensure([], require => {
    cd(null, require('pages/order/afterSalesList/index').default)
  })
}

const AfterSalesDetails = (location, cd) => {
  require.ensure([], require => {
    cd(null, require('pages/order/details/afterSalesDetails').default)
  })
}

/* 进入路由的判断 */
function isLogin(nextState, replaceState) {
  let subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo'))
  const token = getQuery('token')
  if (!subsystemTourInfo) subsystemTourInfo = {}
  if (token) subsystemTourInfo.token = token
  localStorage.setItem('subsystemTourInfo', JSON.stringify(subsystemTourInfo))
  if (!subsystemTourInfo.token) {
    replaceState('/tour-login')
  }
}

const routes = (
  <Route>
    <Route path="/" getComponent={App} onEnter={isLogin}>
      <IndexRoute breadcrumbName="首页" getComponent={Home} />
      <Route path="tour-ticket" breadcrumbName="票务">
        <Route path="ticketList" breadcrumbName="票务列表" getComponent={TicketList} />
        <Route path="ticketList" breadcrumbName="票务列表">
          <Route path="createTicket" breadcrumbName="创建票务" getComponent={CreateTicket} />
          <Route path="editTicket" breadcrumbName="编辑票务" getComponent={EditTicket} />
        </Route>
        <Route path="ticketGroup" breadcrumbName="票务分组" getComponent={TicketGroup} />
        <Route path="ticketGroup" breadcrumbName="票务分组">
          <Route path="createGroup" breadcrumbName="创建分组" getComponent={CreateGroup} />
          <Route path="editGroup" breadcrumbName="编辑分组" getComponent={EditGroup} />
        </Route>
      </Route>
      <Route path="tour-order" breadcrumbName="订单">
        <Route path="" breadcrumbName="订单列表">
          <Route path="list" breadcrumbName="景区订单" getComponent={OrderList}/>
          <Route path="details" breadcrumbName="订单详情" getComponent={OrderDetails}/>
        </Route>
        <Route path="" breadcrumbName="售后维权">
          <Route path="afterSalesList" breadcrumbName="景区售后" getComponent={AfterSalesList}></Route>
          <Route path="afterSalesDetails" breadcrumbName="售后详情" getComponent={AfterSalesDetails}></Route>
        </Route>
      </Route>
      <Route path="tour-statistics" breadcrumbName="数据">
        <Route path="settlementAccount" breadcrumbName="财务结算" getComponent={SettlementAccount} />
        <Route path="transaction" breadcrumbName="交易分析" getComponent={Transaction} />
        <Route path="verification" breadcrumbName="核销统计" getComponent={Verification} />
        <Route path="settlementAccount" breadcrumbName="财务结算">
          <Route path="settlementDetail" breadcrumbName="结算明细" getComponent={SettlementDetail} />
          <Route path="settlementDetail" breadcrumbName="结算明细">
            <Route path="payDetail" breadcrumbName="支付明细" getComponent={PayDetail} />
            <Route path="refundDetail" breadcrumbName="退款明细" getComponent={RefundDetail} />
          </Route>
        </Route>
        <Route path="verification" breadcrumbName="核销统计">
          <Route path="detail" breadcrumbName="核销明细" getComponent={VerificationDetail} />
        </Route>
      </Route>
      <Route path="tour-setting" breadcrumbName="设置">
        <Route path="basic" breadcrumbName="景区信息" getComponent={OperatorsBasic} />
        <Route path="wxmini/auth" breadcrumbName="退票设置" getComponent={Auth} />
        <Route path="staff" breadcrumbName="员工管理" getComponent={StaffManages} />
        <Route path="staff" breadcrumbName="员工管理" >
          <Route path="addStaff" breadcrumbName="添加员工" getComponent={AddStaff} />
          <Route path="editStaff" breadcrumbName="编辑员工" getComponent={EditStaff} />
        </Route>
      </Route>
    </Route>
    <Route path="/tour-login" breadcrumbName="登录" getComponent={Login} />
  </Route>
);

export default routes
