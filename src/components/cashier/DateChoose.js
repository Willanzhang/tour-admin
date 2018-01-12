
// 时间选择 DateChoose.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { DatePicker, Button, Select } from 'antd'
import { timestampFormat } from 'src/util/filter'
let yesterday
const Option = Select.Option

export default class DateChoose extends Component {

  static propTypes = {
    timeStart: PropTypes.string,
    timeEnd: PropTypes.string,
    datas: PropTypes.object,
    search: PropTypes.func,
    timeChange: PropTypes.func,
    searchInput: PropTypes.func,
  }

  static defaultProps = {
    datas: {
      name: '时间段',
      hasInput: false,
      holder: ''
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      startDate: '',
      endDate: ''
    }
  }

  componentWillMount() {
    if (!this.props.timeStart) { // 默认昨日时间
      yesterday = timestampFormat(Date.parse(new Date()) / 1000 - 24 * 60 * 60, 'YYYY-MM-DD')
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
  componentWillUpdata() {
    console.log(this.state.data)
  }
  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }
  onStartChange = (date, dateString) => {
    this.props.startChange(date, dateString)
    this.onChange('startDate', date);
  }

  onEndChange = (date, dateString) => {
    this.props.endChange(date, dateString)
    this.onChange('endDate', date);
  }

  disabledStartDate = (current) => {
    const endDate = this.state.endDate;
    if (!current || !endDate) {
      return false;
    }
    if (current.valueOf() < new Date() - 90 * 24 * 60 * 60 * 1000) {
      return true
    } else if (current.valueOf() > new Date() - 24 * 60 * 60 * 1000) {
      return true
    } else if (current.valueOf() > endDate.valueOf()) {
      return true
    }
  }

  disabledEndDate = (current) => {
    const startDate = this.state.startDate;
    if (!current || !startDate) {
      return false;
    }
    if (current.valueOf() > new Date() - 24 * 60 * 60 * 1000) {
      return true
    } else if (current.valueOf() < new Date() - 90 * 24 * 60 * 60 * 1000) {
      return true
    } else if (current.valueOf() < startDate.valueOf()) {
      return true
    }
  }

  render() {
    const dateFormat = 'YYYY/MM/DD'
    const {datas, search, searchDisable, searchInput, outletsList, initInputValue} = this.props
    const {startDate, endDate} = this.state
    return (
      <div style={{ fontSize: '14px' }}>
        {/*<span>{datas.name}</span>
        <RangePicker defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]} format={dateFormat} onChange={timeChange} disabledDate={this.disabledDate.bind(this)} style={{ margin: '0 15px' }} />
        {
          datas.hasInput ? <Input placeholder={datas.holder} onChange={searchInput} style={{ width: '200px', marginRight: '15px' }} /> : null
        }*/}
        <span>{datas.name}</span>
        <DatePicker
          style={{ margin: "0 10px 0 20px" }}
          disabledDate={this.disabledStartDate}
          onChange={this.onStartChange}
          defaultValue={moment(startDate, dateFormat)}

        />
        至
        <DatePicker
          style={{ margin: "0 20px 0 10px" }}
          defaultValue={moment(endDate, dateFormat)}
          disabledDate={this.disabledEndDate}
          onChange={this.onEndChange}
        />
        {
          datas.hasInput ? (
            <CustomSelect datas={datas} initInputValue={initInputValue}
                          outletsList={outletsList}
                          searchInput={searchInput} />
          ) : null
        }
        {/* {
           datas.hasInput ? <Input placeholder={datas.holder} onChange={searchInput} style={{ width: '200px', marginRight: '15px' }} /> : null
        } */}
        <Button type="primary" onClick={search} disabled={searchDisable}>查询</Button>
      </div>
    )
  }
}

function CustomSelect(props) {
  const {datas, initInputValue, outletsList, searchInput} = props
  let select
  if (initInputValue) {
    select = <Select
      showSearch
      style={{ width: '200px', marginRight: '15px' }}
      placeholder={datas.holder}
      optionFilterProp="children"
      value={initInputValue}
      onChange={(selectId) => 
        searchInput(Number(selectId) ? outletsList.filter(data => Number(data.id) === Number(selectId))[0] : {})
      }
      filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
    >
      <Option key="0">全部网点</Option>
      {
        outletsList && outletsList.map(data => {
          return <Option key={data.id}>{data.name}</Option>
        })
      }
    </Select>
  } else {
    select = <Select
      showSearch
      style={{ width: '200px', marginRight: '15px' }}
      placeholder={datas.holder}
      optionFilterProp="children"
      onChange={(selectId) => 
        searchInput(Number(selectId) ? outletsList.filter(data => Number(data.id) === Number(selectId))[0] : {})
      }
      filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
    >
      <Option key="0">全部网点</Option>
      {
        outletsList && outletsList.map(data => {
          return <Option key={data.id}>{data.name}</Option>
        })
      }
    </Select>
  }
  return select
}