import fetch from 'src/util/fetch'

// 获取票务列表信息
const fetchTicketList = params => fetch('POST', '/store/scenery_ticket/find', params)

// 创建票(自主创建)
const fetchCreateTicket = params => fetch('POST', '/store/scenery_ticket/create', params)

// 编辑票
const fetchTicketUpdate = params => fetch('POST', '/store/scenery_ticket/update', params)

// 票详情
const fetchTicketDetail = params => fetch('POST', '/store/scenery_ticket/detail', params)

// 删除票
const fetchTicketDelete = params => fetch('POST', '/store/scenery_ticket/delete', params)

// 禁用票
const fetchTicketClose = params => fetch('POST', '/store/scenery_ticket/close', params)

// 启用票
const fetchTicketOpen = params => fetch('POST', '/store/scenery_ticket/open', params)

// 分组列表
const fetchGroupList = params => fetch('POST', '/store/ticket_group/find', params)

// 创建分组
const fetchCreateGroup = params => fetch('POST', '/store/ticket_group/create', params)

// 编辑分组
const fetchUpdateGroup = params => fetch('POST', '/store/ticket_group/update', params)

// 删除分组
const fetchDeleteGroup = params => fetch('POST', '/store/ticket_group/delete', params)

// 分组详情
const fetchDetailGroup = params => fetch('POST', '/store/ticket_group/detail', params)

export {
  fetchTicketList,
  fetchCreateTicket,
  fetchTicketUpdate,
  fetchTicketDetail,
  fetchTicketDelete,
  fetchTicketClose,
  fetchTicketOpen,
  fetchGroupList,
  fetchCreateGroup,
  fetchUpdateGroup,
  fetchDeleteGroup,
  fetchDetailGroup
}