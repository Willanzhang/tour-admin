
/**
 * nav2侧边菜单的数据
 * nav2下面的subMenu的key对应的是一级导航栏的key
 */
const nav2Data = {
  a: {},
  b: {
    defaultOpenKeys: [],
    prev: '票务管理',
    subMenu: [
      {
        key: 'b1',
        path: '/tour-ticket/ticketList',
        title: '票务列表',
        needRoleId: 1, // 权限管理最低roleId， 1：普通管理员 2: 高级管理员 110：创始人
      },
      {
        key: 'b2',
        path: '/tour-ticket/ticketGroup',
        title: '票务分组',
        needRoleId: 1,
      }
    ]
  },
  c: {
    defaultOpenKeys: [],
    prev: '订单管理',
    subMenu: [
      {
        key: 'c1',
        path: '/tour-order/list',
        title: '订单列表',
        needRoleId: 1,
        children: [
          {
            key: 'c11',
            path: '/tour-order/list',
            title: '景区订单',
            needRoleId: 1,
          }
        ]
      },
      {
        key: 'c2',
        path: '/tour-order/afterSalesList',
        title: '售后维权',
        needRoleId: 1,
        children: [
          {
            key: 'c21',
            path: '/tour-order/afterSalesList',
            title: '景区售后',
            needRoleId: 1,
          }
        ]
      }
    ]
  },
  d: {
    defaultOpenKeys: [],
    prev: '数据统计',
    subMenu: [
      {
        key: 'd1',
        path: '/tour-statistics/transaction',
        title: '交易分析',
        needRoleId: 1,
      },
      {
        key: 'd2',
        path: '/tour-statistics/verification',
        title: '核销统计',
        needRoleId: 1,
      },
      {
        key: 'd3',
        path: '/tour-statistics/settlementAccount',
        title: '财务结算',
        needRoleId: 2,
      }
    ]
  },
  e: {
    defaultOpenKeys: [],
    prev: '设置',
    subMenu: [
      {
        key: 'e1',
        path: '/tour-setting/basic',
        title: '景区信息',
        needRoleId: 1,
      },
      {
        key: 'e2',
        path: '/tour-setting/wxmini/auth',
        title: '退票设置',
        needRoleId: 1,
      },
      {
        key: 'e3',
        path: '/tour-setting/staff',
        title: '员工管理',
        needRoleId: 1,
      }
    ]
  },
}

export default nav2Data