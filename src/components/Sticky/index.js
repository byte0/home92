/*
  封装一个吸顶组件
*/
import React from 'react'
import styles from './index.module.css'

class Sticky extends React.Component {

  placeholder = React.createRef()

  content = React.createRef()

  handleScroll = () => {
    // 占位符DOM
    const p = this.placeholder.current
    // 目标内容DOM
    const c = this.content.current
    // 获取目标内容的高度
    const {height} = this.props
    // 获取元素到顶部的距离
    let {top} = p.getBoundingClientRect()
    // 判断元素是否超出可视区上边界
    if (top <= 0) {
      // 超出上边界，进行吸顶：占位符设置高度；目标元素进行定位
      p.style.height = height + 'px'
      // 元素中添加类名（classList.add是标准原生方法）
      c.classList.add(styles.toFix)
    } else {
      // 没有超出上边界，恢复原始状态：占位符高度设置为0；目标元素取消定位
      p.style.height = 0 + 'px'
      // 元素中添加类名（classList.remove是标准原生方法）
      c.classList.remove(styles.toFix)
    }
  }

  componentDidMount () {
    // 组件渲染时监听滚动事件
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    // 组件销毁时，解绑scroll事件
    window.removeEventListener('scroll', this.handleScroll)
  }

  render () {
    return (
      <React.Fragment>
        {/*占位符：当筛选条件定位时，临时占位*/}
        <div ref={this.placeholder}></div>
        {/*目标内容元素*/}
        <div ref={this.content}>{this.props.children}</div>
      </React.Fragment>
    )
  }
}

export default Sticky