/*
  封装通用的权限验证组件
*/
import React from 'react'
import { getToken } from '../../utils/token.js'
import { Route, Redirect, withRouter } from 'react-router-dom'

export default ({path, component: Component}) => {
  // path 表示路由的路径
  // component 表示路由组件
  return <Route path={path} render={() => {
    // 判断用户是否已经登录
    const token = getToken()
    if (token) {
      // 已经登录(Component不是路由组件，只有路由组件默认才有历史对象)
      // 需要通过withRouter向组件中注入历史对象
      const WrapComponent = withRouter(Component)
      return <WrapComponent/>
    } else {
      // 没有登录，跳转到登录页面
      return <Redirect to='/login'/>
    }
  }}/>
}
