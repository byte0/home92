import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, NavBar, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import styles from './index.module.css'
import request from '../../utils/request.js'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  handleItem = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    // 禁止默认的表单提交
    e.preventDefault()
    const res = await request({
      url: '/user/login',
      method: 'post',
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
    if (res.status === 200) {
      // 登录成功，缓存token，跳转到主页
      sessionStorage.setItem('mytoken', res.body.token)
      this.props.history.push('/home')
    } else {
      // 登录失败，进行提示
      Toast.info(res.description)
    }
  }

  render() {
    const { username, password } = this.state
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavBar className={styles.navHeader} mode="dark">
          账号登录
        </NavBar>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="username"
                value={username}
                onChange={this.handleItem}
                placeholder="请输入账号"
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="password"
                value={password}
                onChange={this.handleItem}
                type="password"
                placeholder="请输入密码"
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button onClick={this.handleSubmit} className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

export default Login
