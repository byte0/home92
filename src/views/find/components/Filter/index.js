import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
import request from '../../../../utils/request.js'
import { getCurrentCity } from '../../../../utils/config.js'
import styles from './index.module.css'

export default class Filter extends Component {

  state = {
    // 用来控制菜单是否高亮
    menuStatus: {
      area: false,
      mode: false,
      price: true,
      more: false
    },
    // 用来保存筛选条件选中的值
    menuValues: {
      area: null,
      mode: null,
      price: null,
      more: null
    },
    // 当前点击的菜单类型
    openType: '',
    // 筛选条件的选项数据
    filterData: {}
  }

  componentDidMount () {
    this.loadFilterData()
  }

  // 获取筛选条件的选项数据
  loadFilterData = async () => {
    const city = await getCurrentCity()
    const res = await request({
      url: 'houses/condition',
      params: {
        id: city.value
      }
    })
    this.setState({
      filterData: res.body
    })
  }

  // 修改对应菜单的高亮状态
  changeStatus = (type) => {
    // console.log('change:' + type)
    // 先复制一份原有的数据
    let newMenuStatus = {...this.state.menuStatus}
    newMenuStatus[type] = true
    this.setState({
      menuStatus: newMenuStatus,
      openType: type
    })
    // ------------------------------
    // this.setState({
    //   menuStatus: {
    //     ...this.state.menuStatus,
    //     // 对象属性名称可以是动态的
    //     [type]: true
    //   },
    //   openType: type
    // })
  }

  // 点击取消按钮时关闭下拉列表
  onCancel = () => {
    this.setState({
      openType: ''
    })
  }

  // 点击确定按钮时关闭下拉列表
  onSave= (openType, value) => {
    // 把子组件传递过来的选项值保存到menuValues当中
    // let newMenuValues = {...this.state.menuValues}
    // newMenuValues[openType] = value
    // this.setState({
    //   menuValues: newMenuValues,
    //   openType: ''
    // }, () => {
    //   console.log(this.state.menuValues)
    // })
    // -----------------------------
    this.setState({
      menuValues: {
        ...this.state.menuValues,
        [openType]: value
      },
      openType: ''
    }, () => {
      // console.log(this.state.menuValues)
      // 组装请求参数
      const filter = this.handleRequestParams(this.state.menuValues)
      // 把组装好的请求参数传递到父组件
      this.props.onFilter(filter)
    })
  }

  // 组装请求参数
  handleRequestParams = (menuValues) => {
    // 最终的请求参数
    let filter = {}
    // 1、区域筛选
    if (menuValues.area && menuValues.area.length === 3) {
      // 获取第一项信息：area 或者 subway
      let key = menuValues.area[0]
      // 获取条件值
      let value = menuValues.area
      if (value[2] === 'null') {
        // 如果第三项值是null，那么第二项数据有效
        filter[key] = value[1]
      } else {
        // 第三项数据有效
        filter[key] = value[2]
      }
    }
    // 2、方式筛选
    if (menuValues.mode && menuValues.mode[0] !== 'null') {
      filter.rentType = menuValues.mode[0]
    }
    // 3、租金筛选
    if (menuValues.price && menuValues.price[0] !== 'null') {
      filter.price = menuValues.price[0]
    }
    // 4、更多筛选
    if (menuValues.more && menuValues.more.length > 0) {
      filter.more = menuValues.more.join(',')
    }
    return filter
  }

  render() {
    const { 
      openType, 
      menuValues,
      filterData
      // 子属性的解构赋值
      // filterData: { area, subway, rentType, price }
    } = this.state
    // 从filterData中解构出4个属性
    const { area, subway, rentType, price, roomType, oriented, floor, characteristic } = filterData
    
    // 下拉列表的数据
    let data = null
    // 列表的列的控制
    let cols = 1
    // 下拉列表的默认值
    let defaultValue = menuValues[openType]

    switch(openType){
      case 'area':
        // 区域筛选数据
        data = [area, subway]
        cols = 3
        break;
      case 'mode':
        // 方式筛选数据
        data = rentType
        break;
      case 'price':
        // 租金筛选数据
        data = price
        break;
      case 'more':
        // 第4个筛选菜单
        data = {roomType, oriented, floor, characteristic}
        break;
      default:
        break;  
    }

    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {(openType === 'area' || openType === 'mode' || openType === 'price') && <div className={styles.mask} />}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle 
            changeStatus={this.changeStatus}
            menuStatus={this.state.menuStatus}/>

          {/* 前三个菜单对应的内容： */}
          {(openType === 'area' || openType === 'mode' || openType === 'price') && <FilterPicker data={data} defaultValue={defaultValue} openType={openType} cols={cols} onCancel={this.onCancel} onSave={this.onSave}/> }

          {/* 最后一个菜单对应的内容： */}
          { openType === 'more' && <FilterMore defaultValue={defaultValue} onCancel={this.onCancel} onSave={this.onSave} openType={openType} data={data}/>}
        </div>
      </div>
    )
  }
}
