import React, { Component } from 'react'
/**
 * 图片加载处理（防止图片加载失败，图片展示失效，影响ui效果）
 * 如果不使用这种方法也可以使用background来达到类似的效果
 * @param {Object} props 默认placeholder占位图；可配置属性：placeholder(占位图)、dataSrc(图片地址)、style(图片样式)
 */
export default class ImgPlaceHolder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imgSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6BAMAAAB6wkcOAAAAD1BMVEXi4+La2trv7+/f4N/e3t5DqP7/AAABX0lEQVR42u3YQW7CMBAFUKLmAFjxAXqERPQAidr7n6lgC1jghTcdV+L9BYHV82RmFIXT52lg6L2h0+l0Op1Op9PpdDq9P3Q6nU6n0+l0Op1Op/eHTqfT6XQ6nU6n0+n0/tDpdDqdTqf/jX55zRqmz+k1S5g+pUb2KP1o6YG1L+flZ5u+vsvl9hlYe4M64mrfGnpg35u1v4c+9s6nQu2Dap9u+pzG6LX2LZ0H9v1IadjGlSfNOmzjpqu+DJu6dE0uv3L8xtWH7FqPEl571ZdylBze93TXy/QFb9yRatYyfTm071uli1suwXf+kfp9j526R+r45dCNeybP9RADan82PqchfU/7fB//6JmvKz9Mr1MfqxfvkfMU/S7T0AM37v/U/nbvsCP1j0sj7/KvEZ1Op9PpdDqdTqfTe0On0+l0Op1Op9PpdHp/6HQ6nU6n0+l0Op1O7w+dTqfT6XQ6nd7KLx1lWF/rd7v2AAAAAElFTkSuQmCC', // 默认的placeholder
      defaultStyle: {width: '100%', height: '100%'},
    }
  }
  componentDidMount () {
    const { dataSrc } = this.props
    const img = new Image()
    img.src = dataSrc
    img.onload = () => this.handleImgLoaded()
  }
  handleImgLoaded () {
    this.setState({
      imgSrc: this.props.dataSrc
    })
  }
  render () {
    const {imgSrc, defaultStyle} = this.state
    const {placeholder, style} = this.props
    return <img src={placeholder || imgSrc} style={style || defaultStyle} alt="img"/>
  }
}