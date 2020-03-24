/*
  主页
*/
import React from 'react'
import { Link, Route } from 'react-router-dom'

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
  render () {
    return (
      <div>
        {/*路由组件显示的位置*/}
        <Route path='/home/index' component={Index}/>
        <Route path='/home/find' component={Find}/>
        <Route path='/home/info' component={Info}/>
        <Route path='/home/my' component={My}/>
        <hr/>
        {/*二级菜单路由的链接*/}
        <Link to='/home/index'>首页</Link>
        <Link to='/home/find'>找房</Link>
        <Link to='/home/info'>资讯</Link>
        <Link to='/home/my'>我的</Link>
      </div>
    )
  }
}

export default Home
