/*
  主页模块
*/
import React from 'react'
import { Carousel, Flex, Grid, NavBar, Icon } from 'antd-mobile'
// import axios from 'axios'
import './index.scss'
// 导入菜单图片
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
import { BASE_IMG_URL } from '../../utils/config.js'
import request from '../../utils/request.js'

class Index extends React.Component {

  state = {
    swiperData: [],
    groupData: [],
    newsData: []
  }

  // 加载轮播图接口数据
  loadSwiper = async () => {
    // axios.get('http://api-haoke-dev.itheima.net/home/swiper')
    //  .then(res => {
    //   this.setState({
    //     swiperData: res.data.body
    //   })
    //  })
    // const res = await axios.get('http://api-haoke-dev.itheima.net/home/swiper')
    const res = await request({url: 'home/swiper'})
    this.setState({
      swiperData: res.body
    })
  }

  // 加载租房小组的数据
  loadGroup = async () => {
    // const res = await axios.get('http://api-haoke-dev.itheima.net/home/groups')
    const res = await request({url: 'home/groups'})
    this.setState({
      groupData: res.body
    })
  }

  // 加载最新资讯的数据
  loadNews = async () => {
    // const res = await axios.get('http://api-haoke-dev.itheima.net/home/news')
    const res = await request({url: 'home/news'})
    this.setState({
      newsData: res.body
    })
  }

  componentDidMount () {
    this.loadSwiper()
    this.loadGroup()
    this.loadNews()
  }

  renderSwiper = () => {
    const swiperItems = this.state.swiperData.map(item => (
      <img 
        key={item.id} 
        src={BASE_IMG_URL + item.imgSrc}
        onLoad={() => {
          // 图片加载完成后触发，手动触发一个resize事件，通知轮播图尺寸发生了变化
          window.dispatchEvent(new Event('resize'))
        }} 
        alt=""/>
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
        {/*标题*/}
        <Flex className="group-title" justify="between">
          <h3>租房小组</h3>
          <span>更多</span>
        </Flex>
        {/*宫格效果*/}
        <Grid 
          data={this.state.groupData}
          square={false}
          columnNum={2}
          renderItem={item => (
            <Flex className="grid-item" justify="between">
              <div className="desc">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <img src={`${BASE_IMG_URL}${item.imgSrc}`} alt="" />
            </Flex>
          )}
        />
      </div>
    )
  }

  renderNews = () => {
    // 渲染最新资讯模板
    const newsTag = this.state.newsData.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`${BASE_IMG_URL}${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))  
    return (
      <div className="news">
        <h3 className="group-title">最新资讯</h3>
        {newsTag}
      </div>
    )
  }

  renderNav = () => {
    // 渲染导航栏模板
    return (
      <NavBar
        mode="dark"
        leftContent="北京"
        onLeftClick={() => {
          // 左侧点击事件
          // 跳转到城市选择的页面
          this.props.history.push('/city')
        }}
        rightContent={[
          <Icon onClick={() => {
            console.log('right click')
          }} key="0" type="search" style={{ marginRight: '16px' }} />
        ]}
      >首页</NavBar>
    )
  }

  render () {
    return (
      <div className='index'>
        {/*导航栏*/}
        {this.renderNav()}
        {/*轮播图*/}
        {this.renderSwiper()}
        {/*菜单*/}
        {this.renderMenu()}
        {/*租房小组*/}
        {this.renderGroup()}
        {/*最新资讯*/}
        {this.renderNews()}
      </div>
    )
  }
}

export default Index
