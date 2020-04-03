import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import { getCurrentCity } from '../../../utils/config.js'
import request from '../../../utils/request.js'

import styles from './index.module.css'

export default class Search extends Component {
  // 当前城市id
  // cityId = getCurrentCity().value

  state = {
    // 搜索框的值
    searchTxt: '',
    tipsList: []
  }

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li key={item.community} className={styles.tip}>
        {item.communityName}
      </li>
    ))
  }

  handleChange = (value) => {
    this.setState({
      searchTxt: value.trim()
    })
  }

  handleSubmit = async () => {
    // 回车时，触发接口调用
    const city = await getCurrentCity()
    const res = await request({
      url: '/area/community',
      params: {
        // 搜索关键字
        name: this.state.searchTxt,
        // 当前城市ID
        id: city.value
      }
    })
    this.setState({
      tipsList: res.body
    })
  }

  render() {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          showCancelButton={true}
          onCancel={() => history.replace('/rent/add')}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
}
