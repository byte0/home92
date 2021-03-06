import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile'

import { Link } from 'react-router-dom'
import request from '../../utils/request.js'
import HouseItem from '../../components/HouseItem'
import NoHouse from '../../components/NoHouse'

import styles from './index.module.css'

// const BASE_URL = 'http://localhost:8080'
export default class Rent extends Component {
  state = {
    // 出租房屋列表
    list: []
  }

  // 获取已发布房源的列表数据
  async getHouseList() {
    const res = await request({
      url: 'user/houses'
    })
    if (res.status === 200) {
      this.setState({
        list: res.body
      })
    }
  }

  componentDidMount() {
    this.getHouseList()
  }

  renderHouseItem() {
    const { list } = this.state
    const { history } = this.props

    // console.log(list, history)

    return list.map(item => {
      return (
        <HouseItem
          key={item.houseCode}
          onClick={() => {
            // history.push(`/detail/${item.houseCode}`)
            // 采用编程式导航传递参数
            history.push('/detail', {id: item.houseCode})
          }}
          houseImg={item.houseImg}
          title={item.title}
          desc={item.desc}
          tags={item.tags}
          price={item.price}
        />
      )
    })
  }

  renderRentList() {
    const { list } = this.state
    const hasHouses = list.length > 0

    if (!hasHouses) {
      return (
        <NoHouse>
          您还没有房源，
          <Link to="/rent/add" className={styles.link}>
            去发布房源
          </Link>
          吧~
        </NoHouse>
      )
    }

    return <div className={styles.houses}>{this.renderHouseItem()}</div>
  }

  render() {
    const { history } = this.props

    return (
      <div className={styles.root}>
        <NavBar
          className={styles.navHeader}
          rightContent={[
            <Icon onClick={() => {
              // 跳转到地图找房页面
              this.props.history.push('/rent/add')
            }} key="0" type="check-circle-o" style={{ marginRight: '6px' }} />
          ]}
          icon={<Icon type="left" />}
          mode="dark"
          onLeftClick={() => history.go(-1)}
        >
          房屋管理
        </NavBar>
        {this.renderRentList()}
      </div>
    )
  }
}
