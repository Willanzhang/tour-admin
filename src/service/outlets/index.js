import fetch from 'src/util/fetch'

// 获取网点看板数据
const fetchOutletsOverall = params => fetch('GET', '/store/outlets/overall', params)

// 获取网点列表
const fetchOutletsList = params => fetch('GET', '/store/outlets/list', params)

export {
  fetchOutletsOverall,
  fetchOutletsList
}