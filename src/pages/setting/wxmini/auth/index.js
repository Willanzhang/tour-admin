import React from 'react'
import './index.less'
import { Component } from 'react'
import { Button, message, InputNumber, Icon, Switch, Radio } from 'antd';
import { fetchSettingInfo, fetchSettingSales } from 'src/service/setting/index'
import { connect } from 'react-redux'
const RadioGroup = Radio.Group
// import { changeRegisterState } from 'src/store/actions/miniRegister'

// function TacticsList(props) {
//   // return null
//   if (!props.data.length) {
//     return null
//   }
//   let arr = props.data.map(function (val, index) {
//     return (<div key={index}><span>距截止退票时间小于</span> <input />小时，收取手续费<input />元<sapn onClick={() => this.deltList(val.key)}></sapn></div>)
//   })
//   return <div>{arr}</div>
// }
class SiteSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      greaterTime: '', // 大于时间
      rate: '', // 收取费率
      listNum: 1, // 数组长度
      listsInput: [{ key: 0, minHor: '' }], // 构造的数组
      key: 0, // 给数组每个对象特定的id
      limitTime: '',// 限制退票时间
      isReturn: false, // 是否开启退票
      temParams: {}, // 暂存参数
      limitHour: '', // 门票使用当天 x 时
      limitMin: '', // 门票使用当天 x 分
      endType: 1, // 退票类型
      feeStatus: true, // 是否收取手续费
      params: {
        id: '', // 获取独有
        endTime: '',
        maxLimit: { maxHour: 9, amount: 9 },
        minLimit: [{ minHour: 2, amount: 12 }]
        // storeId: '' // 设置独有
      }
    }
    // this.delList = this.delList.bind(this)
  }
  componentDidMount() {
    this.getSettingInfo()
  }
  getSettingInfo() { // 获取设置信息
    // let storeId = window.localStorage.getItem('storeId')
    fetchSettingInfo({}).then((data) => {
      let listsNum
      this.setState({
        temParams: data.data,
      })
      let res = data.data || { endTime: '', maxLimit: { maxHour: '' }, minLimit: [], endType: 1, feeStatus: 1 }
      let temArr
      res.minLimit === '' && (res.minLimit = [])
      if (res.minLimit.length) {
        temArr = res.minLimit.map((val, ind) => {
          // { ...val, key: ind } 
          return { minHour: val.minHour, amount: val.amount / 100, key: ind }
        })
      } else {
        if (res.maxLimit.maxHour === 0) { // 假如 第一条策略时间为0 第二条不需要存在
          temArr = []
          listsNum = 0
        } else {
          temArr = [{ key: 0, minHour: res.maxLimit.maxHour }]
          listsNum = 1
        }
      }
      this.setState({
        limitTime: res.endTime,
        listsInput: temArr,
        isReturn: parseInt(res.deleted, 10) === 1 ? true : false,
        feeStatus: parseInt(res.feeStatus, 10) === 1 ? true : false,
        greaterTime: res.maxLimit.maxHour,
        limitHour: res.endDate ? res.endDate.split(':')[0] - 0 : '',
        limitMin: res.endDate ? res.endDate.split(':')[1] - 0 : '',
        endType: res.endType,
        rate: res.maxLimit.amount === undefined ? '' : res.maxLimit.amount / 100,
        // key: res.minLimit && res.minLimit.length,
        key: res.minLimit && res.minLimit.length,
        listNum: (res.minLimit && res.minLimit.length) || listsNum,
      })
    })
  }
  settingSales(params) { // 设置策略
    fetchSettingSales(params).then((res) => {
      message.success('保存成功', 2)
      setTimeout(function () {
        window.location.href = ''
      }, 1000)
    })
  }
  delList(e) { // 删除一行策略
    let arr = this.state.listsInput
    arr.forEach((val, ind) => {
      if (parseInt(val.key, 10) === e) {
        arr.splice(ind, 1)
      }
    })
    this.setState({
      listsInput: arr,
      listNum: this.state.listNum - 1
    })
  }
  changeGreaterTime(e) { // 改变大于时间
    if (e === undefined) return
    let temArr = this.state.listsInput
    temArr[0] && (temArr[0].minHour = Math.floor(e))
    if (!e) {
      message.error('当第一条策略时间为0时,下面的策略将会失效')
      // temArr = [] // 清空数组会
      // this.setState({
      //   listNum: 0
      // })
    }
    this.setState({
      greaterTime: Math.floor(e),
      listsInput: temArr
    })
  }
  changeRate(e) { // 改变费率
    if (e === undefined) return
    this.setState({
      rate: e
    })
  }
  changeLimitTime(e) { // 改变限制退票时间
    if (e === undefined) return
    this.setState({
      limitTime: Math.floor(e)
    })
  }
  changeLimitHour(e) { // 改变限制退票时
    if (e === undefined) return
    if (e === 24) {
      this.setState({
        limitHour: Math.floor(e),
        limitMin: 0
      })
      return
    }
    this.setState({
      limitHour: Math.floor(e)
    })
  }
  changeLimitMin(e) { // 改变限制退票分
    if (e === undefined) return
    if (this.state.limitHour === 24) {
      this.setState({
        limitMin: 0
      })
      return
    }
    this.setState({
      limitMin: Math.floor(e)
    })
  }
  changeLimitType = (e) => { // 改变退票 限制类型
    this.setState({
      endType: e.target.value,
    })
  }
  changeLess(obj, e) { // 小于时间输入改变
    let temArr = this.state.listsInput
    temArr.forEach((val, ind) => {
      if (parseInt(val.key, 10) === obj.key) {
        //每个时间要小于上一个的时间  
        //双向判断 防止添加后修改上一条策略  即当前这条的值要小于下一条的值！！！ 暂未
        if (ind === 0) { // 第一个对象值 要小于 > 的值
          if (this.state.greaterTime === 0) {
            temArr = []
            this.setState({
              listNum: 0
            })
            return
          }
          if (e <= this.state.greaterTime) {
            val.minHour = Math.floor(e)
          } else {
            val.minHour = this.state.greaterTime
            // val.minHour = this.state.greaterTime - 0.01
          }
        } else { // 数组中的对象的minHour值要小于 上个对象的值
          // 填写的时候没有下一个
          if (e <= this.state.listsInput[ind - 1].minHour) {
            val.minHour = Math.floor(e)
          } else {
            val.minHour = this.state.listsInput[ind - 1].minHour - 1
            // val.minHour = this.state.listsInput[ind - 1].minHour - 0.01
          }
        }
      }
    })
    this.setState({
      listsInput: temArr
    })
  }
  changeMoney(obj, e) { // 改变手续费
    let temArr = this.state.listsInput
    temArr.forEach((val, ind) => {
      if (parseInt(val.key, 10) === obj.key) {
        val.amount = e
      }
    })
    this.setState({
      listsInput: temArr
    })
  }
  saveChange() { // 保存策略
    let temArr = this.state.listsInput
    // let temNum = -1 // 开始是想筛选最小值
    let isCanSave = false
    let isCompleted = false
    if (!this.state.isReturn) { // 关闭退票
      if (this.state.temParams) { // 有数据 存过数据
        let params
        if (this.state.temParams.endType === 2) {
          params = {
            endTime: this.state.temParams.endTime,
            maxLimit: this.state.temParams.maxLimit,
            minLimit: this.state.temParams.minLimit || [],
            deleted: this.state.temParams.isReturn ? 1 : 2,
            endType: this.state.temParams.endType,
            feeStatus: this.state.temParams.feeStatus,
            endDate: `${this.state.limitHour}:${this.state.limitMin}`
          }
        } else {
          params = {
            endTime: this.state.temParams.endTime,
            maxLimit: this.state.temParams.maxLimit,
            minLimit: this.state.temParams.minLimit || [],
            deleted: this.state.temParams.isReturn ? 1 : 2,
            endType: this.state.temParams.endType,
            feeStatus: this.state.temParams.feeStatus
          }
        }
        // let cacheArr = JSON.parse(JSON.stringify(params))
        // cacheArr.maxLimit.amount = cacheArr.maxLimit.amount*100
        // cacheArr.minLimit = cacheArr.minLimit.map((val, ind)=>{
        //   return {minHour:val.minHour,amount:val.amount*100}
        // })
        this.settingSales(params)
        return
      } else { // data 没有数据 首次进入 且什么都没修改 选取的不开启退票 
        message.success('保存成功', 1, () => {
          window.location.href = ''
        })
        return
      }
    }
    if (this.state.limitTime === '' && this.state.endType === 1) { // 退票截止时间 段
      isCompleted = true
      return message.error('请将表单填写完成', 2)
    }
    if (this.state.endType === 2 && (this.state.limitHour === '' || this.state.limitMin === '')) { // 退票截止 时间点
      isCompleted = true
      return message.error('请将表单填写完成', 2)
    }
    if (!this.state.feeStatus) { // 若不开启退票手续费
      temArr.forEach(val => {
        val.amount = val.amount * 100
      })
      let params = {
        endTime: this.state.limitTime,
        maxLimit: { maxHour: this.state.greaterTime, amount: this.state.rate * 100 },
        minLimit: temArr,
        deleted: this.state.isReturn ? 1 : 2,
        feeStatus: this.state.feeStatus ? 1 : 2,
        endDate: this.state.endType === 2 ? `${this.state.limitHour}:${this.state.limitMin}` : '',
        endType: this.state.endType
      }
      if (this.state.endType === 1) {
        params = {
          endTime: this.state.limitTime,
          maxLimit: { maxHour: this.state.greaterTime, amount: this.state.rate * 100 },
          minLimit: temArr,
          deleted: this.state.isReturn ? 1 : 2,
          feeStatus: this.state.feeStatus ? 1 : 2,
          endType: this.state.endType
        }
      } else {
        let params = {
          maxLimit: { maxHour: this.state.greaterTime, amount: this.state.rate * 100 },
          minLimit: temArr,
          deleted: this.state.isReturn ? 1 : 2,
          feeStatus: this.state.feeStatus ? 1 : 2,
          endDate: `${this.state.limitHour}:${this.state.limitMin}`,
          endType: this.state.endType
        }
      }
      this.settingSales(params)
      return
    }
    if (!(this.state.greaterTime !== "" && this.state.rate !== '')) { // 限制时间、大于时间段、扣费、不为空
      // if (this.state.greaterTime === 0) {
      //   return message.error('第一条策略的时间不能为0', 2)
      // }
      isCompleted = true
      return message.error('请将表单填写完成', 2)
    }
    if (this.state.greaterTime === 0 && this.state.listsInput.length) { // 第一个策略设置为0 时  下面的策略自动失效 并删除
      let arr = []
      this.setState({
        listsInput: arr,
        listNum: 0
      })
      message.error('当第一条策略时间为0时,下面的策略将会失效')
      return
      // debugger
    }
    // let temArr = this.state.listsInput
    temArr.forEach((val, index) => {
      if (!val.minHour || (val.amount === '' || val.amount === undefined)) {
        isCompleted = true
      }
      if (index === 0) {
        // temNum = val.minHour
        return
      } else {
        if (val.minHour > temArr[index - 1].minHour) {
          isCanSave = true
        } else {
          // temNum = val.minHour
        }
      }
    })
    if (isCompleted) {
      return message.error('请将表单填写完成', 2)
    }
    temArr.length && ((this.state.greaterTime < temArr[0].minHour) && (isCanSave = true))
    if (!isCanSave) {
      // 提交 
      let temArr = this.state.listsInput.map((val, ind) => {
        return { minHour: val.minHour, amount: val.amount * 100 }
      })
      let params = {
        endTime: this.state.limitTime,
        maxLimit: { maxHour: this.state.greaterTime, amount: this.state.rate * 100 },
        minLimit: temArr,
        deleted: this.state.isReturn ? 1 : 2,
        feeStatus: this.state.feeStatus ? 1 : 2,
        endDate: this.state.endType === 2 ? `${this.state.limitHour}:${this.state.limitMin}` : '',
        endType: this.state.endType
      }
      if (this.state.endType === 1) {
        params = {
          endTime: this.state.limitTime,
          maxLimit: { maxHour: this.state.greaterTime, amount: this.state.rate * 100 },
          minLimit: temArr,
          deleted: this.state.isReturn ? 1 : 2,
          feeStatus: this.state.feeStatus ? 1 : 2,
          endType: this.state.endType
        }
      } else {
        params = {
          maxLimit: { maxHour: this.state.greaterTime, amount: this.state.rate * 100 },
          minLimit: temArr,
          deleted: this.state.isReturn ? 1 : 2,
          feeStatus: this.state.feeStatus ? 1 : 2,
          endDate: this.state.endType === 2 ? `${this.state.limitHour}:${this.state.limitMin}` : '',
          endType: this.state.endType
        }
      }

      this.settingSales(params)
    } else {
      return message.error('请确保每条策略的时间都小于上一条策略的时间', 2)
    }
  }
  changeIsReturn = (e) => {
    this.setState({
      isReturn: e
    })
  }
  changeFeeFlag = (e) => {
    this.setState({
      feeStatus: e
    })
  }
  addList() { // 添加策略条
    if (this.state.listsInput.length >= 4) {
      return message.error('最多添加五条策略', 2)
    }
    if (!(this.state.greaterTime !== "" && this.state.rate !== '')) {
      return message.error('请输入完第一行策略再添加新策略', 2)
    }

    let length = this.state.listsInput.length
    let temObj = this.state.listsInput[length - 1]
    if (this.state.listNum && !(temObj.minHour && temObj.amount !== '' && temObj.amount !== undefined)) {
      return message.error('请输入完上一行策略再添加新策略', 2)
    }
    this.setState({
      listNum: ++this.state.listNum,
      key: ++this.state.key
    })
    let newArr = this.state.listsInput
    if (this.state.listNum === 1) {
      newArr.push({ key: this.state.key, minHour: this.state.greaterTime })
    }
    else {
      newArr.push({ key: this.state.key })
    }
    // for (let i = 0; i < this.state.listNum; i++) {
    //   newArr.push({ key: i })
    // }
    this.setState({
      listsInput: newArr
    })
  }
  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      width: '600px',
      // padding: '0 30px',
      lineHeight: '30px',
    }
    return (
      <div className="applet">
        <div className="isReturn"><span className="returnText">是否开启退票</span><Switch checked={this.state.isReturn} onChange={this.changeIsReturn} checkedChildren="开启" unCheckedChildren="关闭" /></div>
        {this.state.isReturn ? (
          <div>
            <div className="titles">截止退票时间设置</div>
            <RadioGroup className="chooseLimit" onChange={this.changeLimitType} value={this.state.endType}>
              <Radio style={radioStyle} value={1}><div className="inline-block"><span>距票失效时间</span> <InputNumber min={0} disabled={this.state.endType === 1 ? false : true} onChange={this.changeLimitTime.bind(this)} value={this.state.limitTime} style={{ margin: '0 10px' }} />小时，停止退票</div></Radio>

              <Radio style={radioStyle} value={2}><div className="inline-block"><span>门票使用当天</span> <InputNumber min={0} max={24} disabled={this.state.endType === 1 ? true : false} onChange={this.changeLimitHour.bind(this)} value={this.state.limitHour} style={{ margin: '0 10px' }} />时<InputNumber min={0} max={59} disabled={this.state.endType === 1 ? true : false} onChange={this.changeLimitMin.bind(this)} value={this.state.limitMin} style={{ margin: '0 10px' }} />分，停止退票</div></Radio>

            </RadioGroup>
            {/*<div> <input type="radio" name="stopLimit" value="1" /><span>距票失效时间</span> <InputNumber min={0} onChange={this.changeLimitTime.bind(this)} value={this.state.limitTime} style={{ margin: '0 10px' }} />小时，停止退票</div>
            <div> <input type="radio" name="stopLimit" value="2" /><span>距票失效时间</span> <InputNumber min={0} onChange={this.changeLimitTime.bind(this)} value={this.state.limitTime} style={{ margin: '0 10px' }} />小时，停止退票</div>*/}
            <div className="titles titleTop">退票时间及手续费设置</div>
            <div style={{ lineHeight: '38px' }}><span className="returnText" style={{ paddingRight: '18px' }}>手续费开启/关闭</span><Switch onChange={this.changeFeeFlag} checked={this.state.feeStatus} checkedChildren="开启" unCheckedChildren="关闭" /></div>
            {/*若开关为打开 隐藏策略*/}
            {this.state.feeStatus ? (<div><div><span>距截止退票时间大于</span> <InputNumber style={{ margin: '0 10px' }} min={0} value={this.state.greaterTime} onChange={this.changeGreaterTime.bind(this)} />小时，每张收取<InputNumber style={{ margin: '0 10px' }} min={0} value={this.state.rate} onChange={this.changeRate.bind(this)} />元手续费</div>
              {
                this.state.listsInput.map((val, index) => {
                  return (
                    <div className="inputLists" key={index}>
                      <span>距截止退票时间小于</span>
                      <InputNumber style={{ margin: '0 10px' }} min={index === 0 ? 0 : 1} disabled={index === 0} value={this.state.listsInput[index].minHour} onChange={this.changeLess.bind(this, val)} />
                      小时，每张收取手续费
                    <InputNumber style={{ margin: '0 10px' }} min={0} value={this.state.listsInput[index].amount} onChange={this.changeMoney.bind(this, val)} />元
                    {index === 0 ? null
                        :
                        (<span className="delPoint" style={{ marginLeft: '20px' }} onClick={() => this.delList(val.key)}>
                          <Icon type="delete" style={{ fontSize: 16, color: '#08c' }} />
                        </span>)}
                    </div>)
                })
              }
              <Button onClick={this.addList.bind(this)}>添加手续费策略</Button></div>) : null}
          </div>)
          :
          null}
        <div className="saveBtn"><Button type="primary" onClick={this.saveChange.bind(this)}>保存</Button></div>
      </div>
    )
  }
}

export default connect()(SiteSetting)
