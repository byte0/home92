import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Grid, Button } from 'antd-mobile'

// import { BASE_URL } from '../../utils'
import { BASE_IMG_URL } from '../../utils/config.js'
import request from '../../utils/request.js'
import { removeToken } from '../../utils/token.js'
import styles from './index.module.css'

// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity'
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]

// 默认头像
const DEFAULT_AVATAR = BASE_IMG_URL + '/img/profile/avatar.png'

export default class Profile extends Component {

  state = {
    info: null
  }

  loadUserInfo = async () => {
    // 加载用户相关信息
    const res = await request({
      url: 'user'
      // headers: {
      //   Authorization: getToken()
      // }
    })
    this.setState({
      info: res.body
    })
  }

  componentDidMount () {
    this.loadUserInfo()
  }

  logOut = async () => {
    // 实现退出功能：如果服务端不存储token，不需要调用后台接口；如果存储token需要调用接口
    const res = await request({
      method: 'post',
      url: 'user/logout'
      // headers: {
      //   Authorization: getToken()
      // }
    })
    if (res.status === 200) {
      // 退出成功，清除token，清除info
      removeToken()
      this.setState({
        info: null
      })
    }
  }

  render() {
    const { history } = this.props
    const { info } = this.state

    return (
      <div className={styles.root}>
        {/* 个人信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={BASE_IMG_URL + '/img/profile/bg.png'}
            alt="背景图"
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img className={styles.avatar} src={DEFAULT_AVATAR} alt="icon" />
            </div>
            <div className={styles.user}>
              
              {/* 登录后展示： */}
              { info?(<React.Fragment>
                <div className={styles.name}>{info.nickname}</div>
                <div className={styles.auth}>
                  <span onClick={this.logOut}>退出</span>
                </div>
                <div className={styles.edit}>
                  编辑个人资料
                  <span className={styles.arrow}>
                    <i className="iconfont icon-arrow" />
                  </span>
                </div>
                </React.Fragment>): (
                <React.Fragment>
                  <div className={styles.name}>游客</div>
                  <div className={styles.edit}>
                    <Button
                      type="primary"
                      size="small"
                      inline
                      onClick={() => history.push('/login')}
                    >
                      去登录
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>

        {/* 九宫格菜单 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={item =>
            item.to ? (
              <Link to={item.to}>
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
              <div className={styles.menuItem}>
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </div>
            )
          }
        />

        {/* 加入我们 */}
        <div className={styles.ad}>
          <img src={BASE_IMG_URL + '/img/profile/join.png'} alt="" />
        </div>
      </div>
    )
  }
}
