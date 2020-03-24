/*
  主页模块
*/
import React from 'react'
import { Carousel, Flex } from 'antd-mobile'
import axios from 'axios'
import './index.scss'
// 导入菜单图片
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'

class Index extends React.Component {

  state = {
    swiperData: [],
    groupData: []
  }

  // 加载轮播图接口数据
  loadSwiper = async () => {
    // axios.get('http://api-haoke-dev.itheima.net/home/swiper')
    //  .then(res => {
    //   this.setState({
    //     swiperData: res.data.body
    //   })
    //  })
    const res = await axios.get('http://api-haoke-dev.itheima.net/home/swiper')
    this.setState({
      swiperData: res.data.body
    })
  }

  // 加载租房小组的数据
  loadGroup = async () => {
    const res = await axios.get('http://api-haoke-dev.itheima.net/home/groups')
    this.setState({
      groupData: res.data.body
    })
  }

  componentDidMount () {
    this.loadSwiper()
    this.loadGroup()
  }

  renderSwiper = () => {
    const swiperItems = this.state.swiperData.map(item => (
      <img key={item.id} src={"http://api-haoke-dev.itheima.net" + item.imgSrc} alt=""/>
    ))
    return (
      <Carousel dots infinite autoplay>
        {swiperItems}
      </Carousel>
    )
  }

  renderMenu = () => {
    const menuData = [{
      id: 1,
      title: '整租',
      img: nav1
    }, {
      id: 2,
      title: '合租',
      img: nav2
    }, {
      id: 3,
      title: '地图找房',
      img: nav3
    }, {
      id: 4,
      title: '去出租',
      img: nav4
    }]
    const menuTag = menuData.map(item => (
      <Flex.Item key={item.id}>
        <img src={item.img} alt=""/>
        <p>{item.title}</p>
      </Flex.Item>
    ))
    return (
      <Flex className='index-menu'>
        {menuTag}
      </Flex>
    )
  }

  renderGroup = () => {
    // 渲染租房小组模板
    return (
      <div className="group">
        <Flex className="group-title" justify="between">
          <h3>租房小组</h3>
          <span>更多</span>
        </Flex>
      </div>
    )
  }

  render () {
    return (
      <div>
        {/*轮播图*/}
        {this.renderSwiper()}
        {/*菜单*/}
        {this.renderMenu()}
        {/*租房小组*/}
        {this.renderGroup()}
      </div>
    )
  }
}

export default Index