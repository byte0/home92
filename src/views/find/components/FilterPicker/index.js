import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

// 组件的模板必须有唯一的跟节点
// <React.Fragment></React.Fragment> 主要用于作为组件的跟节点，但是本身不会渲染出来
// <React.Fragment></React.Fragment> 可以简写为 <></>
// 这种用法类似于Vue中的那个标签？<template></template>
// 也类似于小程序中的哪个标签？<block></block>
// v-show 是否可以用到template标签上？

export default class FilterPicker extends Component {

  state = {
    condition: this.props.defaultValue? this.props.defaultValue: null
  }

  handleCondition = (value) => {
    // 动态更新选中的值
    this.setState({
      condition: value
    })
  }

  render() {
    const { data, cols, openType } = this.props
    return (
      <React.Fragment>
        {/* 选择器组件： */}
        <PickerView 
          data={data} 
          onChange={this.handleCondition}
          value={this.state.condition} 
          cols={cols} />

        {/* 底部按钮 */}
        <FilterFooter 
          onSave={() => {
            this.props.onSave(openType, this.state.condition)
          }}
          onCancel={this.props.onCancel}/>
      </React.Fragment>
    )
  }
}
