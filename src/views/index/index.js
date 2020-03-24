/*
  主页模块
*/
import React from 'react'
import { Carousel } from 'antd-mobile'
import axios from 'axios'

class Index extends React.Component {

  state = {
    swiperData: []
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

  componentDidMount () {
    this.loadSwiper()
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

  render () {
    return (
      <div>
        {/*轮播图*/}
        {this.renderSwiper()}
      </div>
    )
  }
}

export default Index
