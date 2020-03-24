/*
  主页
*/
import React from 'react'
import { Link, Route } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import './index.css'

function Index () {
  return <div>index</div>
}
function Find () {
  return <div>Find</div>
}
function Info () {
  return <div>info</div>
}
function My () {
  return <div>my</div>
}

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'index'
    }
  }

  // 动态生成底部的菜单
  renderMenuItems = () => {
    const menuData = [{
      key: 'index',
      title: '首页'
    }, {
      key: 'find',
      title: '找房'
    }, {
      key: 'info',
      title: '资讯'
    }, {
      key: 'my',
      title: '我的'
    }]
    return menuData.map(item => (
      <TabBar.Item
        title={item.title}
        key={item.key}
        icon={<div style={{
          width: '22px',
          height: '22px',
          background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
        />
        }
        selectedIcon={<div style={{
          width: '22px',
          height: '22px',
          background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
        />
        }
        selected={this.state.selectedTab === item.key}
        onPress={() => {
          // 控制菜单的点击切换
          this.setState({
            selectedTab: item.key,
          });
        }}
      >
        {item.title}
      </TabBar.Item>
    ))
  }

  render () {
    return (
      <div className='home-menu'>
        {/*路由组件显示的位置*/}
        {/*<Route path='/home/index' component={Index}/>
        <Route path='/home/find' component={Find}/>
        <Route path='/home/info' component={Info}/>
        <Route path='/home/my' component={My}/>*/}
        {/*二级菜单路由的链接*/}
        {/*<Link to='/home/index'>首页</Link>
        <Link to='/home/find'>找房</Link>
        <Link to='/home/info'>资讯</Link>
        <Link to='/home/my'>我的</Link>*/}

        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white">
          {this.renderMenuItems()}
        </TabBar>
      </div>
    )
  }
}

export default Home
