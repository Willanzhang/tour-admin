
// 时间选择 TimeSlot.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { DatePicker, Input, Button } from 'antd'
import { timestampFormat } from 'src/util/filter'
const { RangePicker } = DatePicker

export default class TimeSlot extends Component {

  static propTypes = {
    timeStart: PropTypes.string,
    timeEnd: PropTypes.string,
    datas: PropTypes.object,
    search: PropTypes.func,
    timeChange: PropTypes.func,
    searchInput: PropTypes.func,
    searchDisable: PropTypes.bool
  }

  static defaultProps = {
    datas: {
      name: '时间段',
      hasInput: false,
      holder: ''
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      startDate: '',
      endDate: ''
    }
  }

  componentWillMount() {
    if (!this.props.timeStart) { // 默认昨日时间
      const yesterday = timestampFormat(Date.parse(new Date()) / 1000 - 24*60*60, 'YYYY-MM-DD')
      this.setState({
        startDate: yesterday,
        endDate: yesterday
      })
    } else {
      this.setState({
        startDate: this.props.timeStart,
        endDate: this.props.timeEnd
      })
    } 
  }

  disabledDate(current) {
    if (this.props.datas.noNowDate) {
      return current.valueOf() > new Date() - 24 * 60 * 60*1000;
    }
    return current.valueOf() > Date.now()
  }

  render() {
    const dateFormat = 'YYYY/MM/DD'
    return (
      <div style={{fontSize: '14px'}}>
        <span>{this.props.datas.name}</span> 
        <RangePicker defaultValue={[moment(this.state.startDate, dateFormat), moment(this.state.endDate, dateFormat)]} format={dateFormat} onChange={this.props.timeChange} disabledDate={this.disabledDate.bind(this)} style={{margin: '0 15px'}} />
        {
          this.props.datas.hasInput ? <Input placeholder={this.props.datas.holder} onChange={this.props.searchInput} style={{width: '200px', marginRight: '15px'}} /> : null
        }
        <Button type="primary" disabled={this.props.searchDisable} onClick={this.props.search}>查询</Button>
      </div>
    )
  }
}