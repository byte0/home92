import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'

export default class Filter extends Component {

  state = {
    // 用来控制菜单是否高亮
    menuStatus: {
      area: false,
      mode: false,
      price: true,
      more: false
    }
  }

  // 修改对应菜单的高亮状态
  changeStatus = (type) => {
    // console.log('change:' + type)
    // 先复制一份原有的数据
    // let newMenuStatus = {...this.state.menuStatus}
    // newMenuStatus[type] = true
    // this.setState({
    //   menuStatus: newMenuStatus
    // })
    // ------------------------------
    this.setState({
      menuStatus: {
        ...this.state.menuStatus,
        // 对象属性名称可以是动态的
        [type]: true
      }
    })
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle 
            changeStatus={this.changeStatus}
            menuStatus={this.state.menuStatus}/>

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
