
// 数据汇总 DataCellect.js
import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

export default class DataCellect extends Component {

  render() {
    const text = this.props.totalData.length > 0 ? this.props.totalData.map((data, i) => <Col key={i}>
      <div style={{fontSize: '28px', color: '#38f', textAlign: 'center'}}><span>{data.value}</span></div>
      <div style={{fontSize: '14px', textAlign: 'center'}}>{data.name}</div>
    </Col>) : null

    return (
      <div style={{backgroundColor: '#f8f8f8', padding: '40px 10px'}}>
        <Row type="flex" justify="space-around">
          {text}
        </Row>
      </div>
    )
  }
}