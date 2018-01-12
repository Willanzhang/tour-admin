import fetch from 'src/util/fetch'

// 基础信息页
// 获取景区信息
const fetchBaseInfo = params => fetch('GET', '/store/store/info', params)

// 修改密码
const editPassword = params => fetch('POST', '/store/manager/change_password', params)

// 获取售后手续费配置
const fetchSettingInfo = params => fetch('POST', '/store/after_sales_setting/get_setting', params)

// 售后手续费配置
const fetchSettingSales = params => fetch('POST', '/store/after_sales_setting/save_setting', params)

// 获取当前用户信息
const fetchNowUser = params => fetch('GET', '/store/manager/current', params)

// 员工管理页面
// 获取管理员列表
const fetchStaffLists = params => fetch('POST', '/store/manager/list', params)

// 删除管理员
const fetchDelStaff = params => fetch('POST', '/store/manager/delete', params)

// 获取管理员详情
const fetchStaffInfo = params => fetch('POST', '/store/manager/detail', params)

// 添加管理员
const addStaffInfo = params => fetch('POST', '/store/manager/add', params)

// 编辑管理员
const editStaffInfo = params => fetch('POST', '/store/manager/update', params)

// 获取验证创始人的短信验证码
const mobileCodeCheck = params => fetch('POST', '/store/manager/mobile-code-check', params)

// 发送创始人短信
const fetchVerifyCode = params => fetch('POST', '/store/manager/send-mobile-code', params)

// 获取创始者手机号
const fetchMasterInfo = params => fetch('POST', '/store/manager/get-root-info', params)

// 员工用户是否存在检查
const staffNameCheck = params => fetch('POST', '/store/manager/username-check', params)

export {
  fetchBaseInfo,
  fetchSettingInfo,
  editPassword,
  fetchSettingSales,
  fetchNowUser,
  fetchStaffLists,
  fetchDelStaff,
  fetchStaffInfo,
  addStaffInfo,
  editStaffInfo,
  mobileCodeCheck,
  fetchVerifyCode,
  fetchMasterInfo,
  staffNameCheck
}