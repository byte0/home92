/*
  列表找房模块
*/
import React from 'react'
import { Flex, Toast } from 'antd-mobile'
import { getCurrentCity } from '../../utils/config.js'
import request from '../../utils/request.js'
import './index.scss'
import Filter from './components/Filter/index.js'
import {List, AutoSizer, WindowScroller, InfiniteLoader} from 'react-virtualized'
import HouseItem from '../../components/HouseItem/index.js'
import NoHouse from '../../components/NoHouse/index.js'
import Sticky from '../../components/Sticky/index.js'

// 测试长列表假数据
// const list = Array.from(new Array(50)).map((item, index) => {
//   return `第${index}条数据`
// })

class Find extends React.Component {

  state = {
    // 当前城市名称
    cityName: '',
    // 房源列表总数
    count: 0,
    // 房源列表数据
    houseList: [],
    // 请求参数
    filter: {},
  }

  // 判断接口调用是否成功
  isFinished = true
  
  // 获取房源列表数据
  loadData = async (start, end) => {
    const { filter } = this.state
    // 显示加载提示
    Toast.loading('正在加载...', 0)
    // 发送请求时，修改状态表示正在请求
    this.isFinished = false
    const city = await getCurrentCity()
    return request({
      url: 'houses',
      params: {
        ...filter,
        cityId: city.value,
        start: start? start: 1,
        end: end? end: 20
      }
    }).then(res => {
      this.setState({
        count: res.body.count,
        // 分页加载的数据进行追加操作
        houseList: [...this.state.houseList, ...res.body.list]
      }, () => {
        this.isFinished = true
        // 默认情况render的重新触发有props和state的变化触发
        // 数据更新成功后，手动触发render的重新渲染
        this.forceUpdate()
        // 隐藏提示
        Toast.hide()
      })
    })
  }

  // 获取组装好的请求参数
  onFilter = (filter) => {
    this.setState({
      filter: filter,
      // 切换条件时，把原有的数据清空
      houseList: [],
      count: 0
    }, () => {
      // 隐藏没有房源的提示
      this.isFinished = false
      this.forceUpdate()
      this.loadData()
    })
  }

  componentDidMount () {
    getCurrentCity().then(res => {
      this.setState({
        cityName: res.label
      })
    })
    this.loadData()
  }

  rowRenderer = ({key, style, index}) => {
    // 渲染列表条目
    // let item = list[index]
    // 只有列表数据获取成功后才渲染List组件
    const { houseList } = this.state
    const item = houseList[index]
    // return <div key={key} style={style}>123</div>
    return <HouseItem key={key} style={style} {...item}/>
  }

  // 当前行数据是否已经加载成功
  isRowLoaded = ({ index }) => {
    // 双叹号表示布尔值
    return !!this.state.houseList[index]
  }

  // 加载下一页数据(必须返回Promise对象)
  loadMoreRows = ({ startIndex, stopIndex }) => {
    // startIndex表示从第几条数据开始查询
    // stopIndex表示查询到第几条数据
    return this.loadData(startIndex, stopIndex)
  }

  // 渲染长列表组件
  renderList = () => {
    const { houseList, count } = this.state
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={count}
        >
        {({onRowsRendered, registerChild}) => {
          return (
            <WindowScroller>
              {({height, isScrolling, onChildScroll, scrollTop}) => {
                return (
                  <AutoSizer>
                    {({width}) => {
                      // 必须保证获取列表数据后才进行List的渲染
                      if (houseList.length > 0) {
                        return (
                          <List
                            autoHeight
                            className='houseList'
                            onRowsRendered={onRowsRendered}
                            ref={registerChild}
                            width={width}
                            height={height}
                            isScrolling={isScrolling}
                            onScroll={onChildScroll}
                            scrollTop={scrollTop}
                            rowHeight={120}
                            rowCount={houseList.length}
                            rowRenderer={this.rowRenderer}
                            />
                        )
                      } 
                    }}
                  </AutoSizer>
                )
              }}
            </WindowScroller>
          )
        }}
      </InfiniteLoader>
      
    )
  }

  render () {
    return (
      <React.Fragment>
        {/*导航栏*/}
        <Flex className='header'>
          <i onClick={() => {
            // 点击时，跳转到主页
            this.props.history.push('/home/index')
          }} className="iconfont icon-back" />
          <Flex className='search-box searchHeader'>
            {/* 左侧白色区域 */}
            <Flex className="search">
              {/* 位置 */}
              <div className="location" onClick={() => {
                // 点击城市名称，去切换城市
                this.props.history.push('/city')
              }}>
                <span className="name">{this.state.cityName}</span>
                <i className="iconfont icon-arrow" />
              </div>
              {/* 搜索表单 */}
              <div className="form" >
                <i className="iconfont icon-seach" />
                <span className="text">请输入小区或地址</span>
              </div>
            </Flex>
            {/* 右侧地图图标 */}
            <i className="iconfont icon-map" />
          </Flex>
        </Flex>
        {/*筛选条件*/}
        <Sticky height={40}>
          <Filter onFilter={this.onFilter}/>
        </Sticky>
        {/*房源列表*/}
        {this.renderList()}
        {/*如果没有筛选出房源列表就提示没有房源*/}
        {(this.state.houseList.length === 0 && this.isFinished) && <NoHouse>没有符合条件的房源！</NoHouse>}
        {/*控制回到顶部*/}
        <div onClick={() => {
          // 控制页面回到顶部
          window.scrollTo(0, 0)
        }} className='toTop'>顶部</div>
      </React.Fragment>
    )
  }
}

export default Find
